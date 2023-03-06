import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default function Modal({ bigImg, close }) {
  const closeModal = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      close();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', close);

    return () => {
      document.removeEventListener('keydown', close);
    };
  }, [close]);

  return (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modal}>
        <img src={bigImg} alt="Big Pictures" />
      </div>
    </div>
  );
}
Modal.propTypes = {
  bigImg: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};
