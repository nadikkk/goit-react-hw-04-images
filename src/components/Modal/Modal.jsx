import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeModal);
  }

  closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.close();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.closeModal}>
        <div className={css.modal}>
          <img src={this.props.bigImg} alt="Big Pictures" />
        </div>
      </div>
    );
  }
}
Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
