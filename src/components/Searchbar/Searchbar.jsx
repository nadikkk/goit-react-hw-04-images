import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

export default class Searchbar extends Component {
  state = {
    nameImg: '',
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.state.nameImg.trim() === '') {
      return alert('Please enter a search word');
    }
    this.props.onSubmit(this.state.nameImg);
  };
  changeNameImg = e => {
    this.setState({ nameImg: e.currentTarget.value.toLowerCase().trim() });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.onSubmit}>
          <button type="submit" className={css.button}>
            <FiSearch />
          </button>

          <input
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.nameImg}
            onChange={this.changeNameImg}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
