import React from 'react';
import styles from '../styles/BottomNav.module.css';

const LowerNavbar: React.FC = () => {
  return (
    <div className={styles.lowerNavbar}>
      <div className={styles.lowerNavbar__item} onClick={() => {}}>
        SPORTS
      </div>
      <div className={styles.lowerNavbar__item} onClick={() => {}}>
        FAVORITES
      </div>
      <div className={styles.lowerNavbar__item} onClick={() => {}}>
        INVITE
      </div>
      <div className={styles.lowerNavbar__item} onClick={() => {}}>
        CASINO LIVE
      </div>
      <div className={styles.lowerNavbar__item} onClick={() => {}}>
        CASHIER
      </div>
    </div>
  );
};

export default LowerNavbar;