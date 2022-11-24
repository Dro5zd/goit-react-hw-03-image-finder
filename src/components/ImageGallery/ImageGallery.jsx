import React from 'react';
import {ImageGalleryList} from './ImageGallery.styled';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import * as PropTypes from 'prop-types';
import {getImages} from '../../api/fetchImages';
import Notiflix from 'notiflix';
import {Loader} from '../Loader/Loader';
import {Button} from '../Button/Button';

export class ImageGallery extends React.Component {

  state = {
    images: [],
    totalHits: 0,
    pageCounter: 1,
    isLoading: false,
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({isLoading: true});
      this.setState({pageCounter: 1});
      try {
        const response = await getImages(this.props.searchValue, this.state.pageCounter);
        const {hits, totalHits} = response.data;
        if (hits.length === 0) {
          this.setState({images: []});
          return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        this.setState({images: hits, totalHits: totalHits, isLoading: false});
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({isLoading: false});
      }
    }
    if (prevState.pageCounter !== this.state.pageCounter && this.state.pageCounter > 1) {
      this.setState({isLoading: true});
      try {
        const response = await getImages(this.props.searchValue, this.state.pageCounter);
        const {hits} = response.data;
        this.setState(prevState => ({images: [...prevState.images, ...hits]}));
        if (this.state.totalHits === this.state.images.length) {
          return Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({isLoading: false});
      }
    }
  }

  loadMoreHandler = () => {
    this.setState(prevState => ({pageCounter: prevState.pageCounter + 1}));
  };

  render() {
    const imgArr = this.state.images;
    return (
      <>
        <ImageGalleryList>
          {imgArr.map(img =>
            <ImageGalleryItem key={img.id}
                              smallImg={img.webformatURL}
                              bigImg={img.largeImageURL}
                              tag={img.tags}
            />)}
        </ImageGalleryList>
        <Loader isLoading={this.state.isLoading}/>
        {this.state.totalHits !== this.state.images.length
          && <Button loadMoreHandler={this.loadMoreHandler}/>}
      </>
    );
  }
}

ImageGallery.propTypes = {
  searchValue: PropTypes.string.isRequired,
};