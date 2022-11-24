import React from 'react';
import {SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput, SearchIcon} from './SearchBar.styled';
import * as PropTypes from 'prop-types';
import Notiflix from 'notiflix';

export class SearchBar extends React.Component {

  state={
    inputValue: ''
  }

  onSubmit = (e) =>{
    e.preventDefault()
    if(this.state.inputValue.trim() === ''){
      return Notiflix.Notify.failure('Sorry, but you didn\'t enter anything. Please try again.');
    }
    this.props.onSubmitHandler(this.state.inputValue)
    this.setState({ inputValue: ''});
  }

  onChangeHandler=(e)=>{
    this.setState({inputValue: e.target.value.toLowerCase()})
  };

  render() {
    const { inputValue } = this.state;
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.onSubmit}>
          <SearchFormButton type="submit" >
            <SearchIcon/>
            <span>Search</span>
          </SearchFormButton>
          <SearchFormInput
            onChange={this.onChangeHandler}
            type="text"
            autoComplete="off"
            value={inputValue}
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}

SearchBar.propTypes = {
  onSubmitHandler: PropTypes.func.isRequired,
}

