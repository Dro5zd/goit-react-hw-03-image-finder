import './App.css';
import {ImageGallery} from './components/ImageGallery/ImageGallery';
import {SearchBar} from './components/SearchBar/SearchBar';
import {Component} from 'react';

class App extends Component {

  state = {
    searchValue: '',
  };

  onSubmitHandler = (searchValue) => {
    this.setState({searchValue: searchValue});
  };

  render() {
    return (
      <section>
        <SearchBar onSubmitHandler={this.onSubmitHandler}/>
        <ImageGallery searchValue={this.state.searchValue}/>
      </section>
    );
  }
}
export default App;
