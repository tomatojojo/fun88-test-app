import React from 'react';
import styles from '../styles/Navbar.module.css';

interface NavbarProps {
  balance: number; // balance prop to pass remaining balance
}

const Navbar: React.FC<NavbarProps> = ({ balance }) => {
  return (
    <div className={styles.navbar}>
      {/* Three bars icon and title */}
      <div className={styles.navbar__left}>
        <div className={styles.navbar__menuIcon}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
        <div className={styles.navbar__title}>FUN88</div>
      </div>

      {/* Wallet icon, user icon, and balance */}
      <div className={styles.navbar__icons}>
        <div className={`${styles.navbar__icon} ${styles.navbar__walletIcon}`}>💰</div>
        <div className={styles.navbar__balance}>${balance.toFixed(2)}</div>
        <div className={`${styles.navbar__icon} ${styles.navbar__userIcon}`}>👤</div>
      </div>
    </div>
  );
};
  

export default Navbar;