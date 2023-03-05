import { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export default function Searchbar({ onSubmit }) {
  const [nameImg, setNameImg] = useState('');

  const isSubmit = e => {
    e.preventDefault();
    if (nameImg.trim() === '') {
      return alert('Please enter a search word');
    }
    onSubmit(nameImg);
  };
  const changeNameImg = e => {
    setNameImg(e.currentTarget.value.toLowerCase().trim());
  };

  return (
    <header className={css.searchbar}>
      <form className={css.form} onSubmit={isSubmit}>
        <button type="submit" className={css.button}>
          <FiSearch />
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={nameImg}
          onChange={changeNameImg}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
