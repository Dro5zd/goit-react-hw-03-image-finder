import './App.css';
import {ImageGallery} from './components/ImageGallery/ImageGallery';
import {SearchBar} from './components/SearchBar/SearchBar';
import {Component} from 'react';
import {getImages} from './api/fetchImages';
import Notiflix from 'notiflix';
import {Loader} from './components/Loader/Loader';
import {Button} from './components/Button/Button';

class App extends Component {

  state = {
    images: [],
    totalHits: 0,
    isLoading: false,
    pageCounter: 1,
    searchValue: '',
  };

  searchValueSaver = (searchValue) => {
    this.setState({searchValue: searchValue});
  };

  onSubmitHandler = (searchValue) => {
    this.setState({isLoading: true});
    this.setState({pageCounter: 1},
      () => getImages(searchValue, this.state.pageCounter)
        .then(res => {
          const {hits, totalHits} = res.data;
          if (hits.length === 0) {
            this.setState({images: [], isLoading: false});
            return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          }
          this.setState({images: hits, totalHits: totalHits, isLoading: false});
          Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        })
        .catch(error => console.log(error)));
  };

  loadMoreHandler = () => {
    this.setState({isLoading: true});
    this.setState({pageCounter: this.state.pageCounter + 1},
      () => getImages(this.state.searchValue, this.state.pageCounter)
        .then(res => {
          const {hits} = res.data;
          this.setState(prevState => ({images: [...prevState.images, ...hits], isLoading: false}));
          if (this.state.totalHits === this.state.images.length) {
            return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
          }
        })
        .catch(error => console.log(error)));

  };

  render() {
    return (
      <section>
        <Loader isLoading={this.state.isLoading}/>
        <SearchBar onSubmitHandler={this.onSubmitHandler} searchValueSaver={this.searchValueSaver}/>
        <ImageGallery images={this.state.images}/>
        {this.state.totalHits !== this.state.images.length
          && <Button loadMoreHandler={this.loadMoreHandler}/>}
      </section>
    );
  }
}

export default App;
