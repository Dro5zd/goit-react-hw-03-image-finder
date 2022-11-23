import React from 'react';
import {SearchbarHeader, SearchForm, SearchFormButton, SearchFormInput, SearchIcon} from './Searchbar.styled';

export class Searchbar extends React.Component {

  state={
    inputValue: ''
  }

  onSubmit = (e) =>{
    e.preventDefault()
    this.props.onSubmitHandler(this.state.inputValue)
    this.props.searchValueSaver(this.state.inputValue)
    this.setState({ inputValue: ''});
  }

  onChangeHandler=(e)=>{
    this.setState({inputValue: e.target.value})
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

