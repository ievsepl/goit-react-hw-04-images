import React, { useState } from 'react';
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

const Searchbar = ({ onSubmitBtn }) => {
  const [searchName, setSearchName] = useState('');

  const onInput = e => {
    setSearchName(e.currentTarget.value.toLowerCase());
  };

  const onSendSearchQuery = e => {
    e.preventDefault();
    if (searchName.trim() === '') {
      return toast.error('Please write your query');
    }

    onSubmitBtn(searchName);
    reset();
  };

  const reset = () => {
    setSearchName('');
  };

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
};
export default Searchbar;
Searchbar.propTypes = {
  onSubmitBtn: PropTypes.func.isRequired,
};
