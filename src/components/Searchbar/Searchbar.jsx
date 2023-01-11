import React, { Component } from 'react';
import { toast } from 'react-toastify';
// import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import {
  SearchForm,
  SearchFormButton,
  SearchFormBtnLab,
  SearchFormInput,
  SearchbarStyles,
} from './Searchbar.styled';

class Searchbar extends Component {
  static propTypes = {
    onSubmitBtn: PropTypes.func.isRequired,
  };
  state = {
    searchName: '',
  };

  onInput = e => {
    this.setState({ searchName: e.currentTarget.value.toLowerCase() });
  };

  onSendSearchQuery = e => {
    e.preventDefault();
    if (this.state.searchName.trim() === '') {
      return toast.error('Please write your query');
    }

    this.props.onSubmitBtn(this.state.searchName);
    this.reset();
  };

  reset = () => {
    this.setState({ searchName: '' });
  };

  render() {
    //
    const {
      state: { searchName },
      onSendSearchQuery,
      onInput,
    } = this;

    return (
      <SearchbarStyles>
        <SearchForm onSubmit={onSendSearchQuery}>
          <SearchFormButton type="submit">
            <SearchFormBtnLab>s</SearchFormBtnLab>
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onInput={onInput}
            value={searchName}
          />
        </SearchForm>
      </SearchbarStyles>
    );
  }
}
export default Searchbar;
