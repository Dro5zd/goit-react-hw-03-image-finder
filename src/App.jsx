import './App.css';
import {ImageGallery} from './components/2. ImageGallery/ImageGallery';
import {Searchbar} from './components/1. Searchbar/Searchbar';
import {Component} from 'react';
import {getImages} from './api/fetchImages';
import Notiflix from 'notiflix';
import {Loader} from './components/4. Loader/Loader';
import {Button} from './components/5. Button/Button';
import {Modal} from './components/6. Modal/Modal';

class App extends Component {

  state = {
    images: [],
    totalHits: 0,
    isLoading: false,
    isOpen: true,
    pageCounter: 1,
    searchValue: '',
    smallImg: '',
  };

  searchValueSaver = (searchValue) => {
    this.setState({searchValue: searchValue});
  };

  modalOpenHandler = (e) => {
    this.setState({smallImg: e.currentTarget.src});
    this.setState({isOpen: !this.state.isOpen});
  };

  filterByImage = () => {
    const filteredImg = this.state.images.find(imgObj => imgObj.webformatURL === this.state.smallImg) ?? 'photo';
    return filteredImg.largeImageURL;
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
        <Modal
          isOpen={this.state.isOpen}
          openModalToggle={this.modalOpenHandler}
          bigImg={this.filterByImage()}/>
        <Searchbar onSubmitHandler={this.onSubmitHandler} searchValueSaver={this.searchValueSaver}/>
        <ImageGallery images={this.state.images} isOpen={this.modalOpenHandler}/>
        {this.state.totalHits !== this.state.images.length
          && <Button loadMoreHandler={this.loadMoreHandler}/>}
      </section>
    );
  }
}

export default App;
