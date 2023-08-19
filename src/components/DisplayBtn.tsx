import { Dispatch, SetStateAction } from 'react';
import styles from './DisplayBtn.module.css';
import { Icons } from './utils/Icons';

const DisplayBtn = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <header className={styles['display-header']}>
      <button
        onClick={() => {
          setShowModal(true);
        }}
        className={styles['display-btn']}
      >
        <Icons.settings className={styles['display-icon']} />
        <span className={styles['display-text']}>Display</span>
        <Icons.down className={styles['display-arrow-icon']} />
      </button>
    </header>
  );
};

export default DisplayBtn;
