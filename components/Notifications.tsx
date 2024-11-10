import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBell } from '@fortawesome/free-solid-svg-icons';
// old unsupported libs
import styles from '../styles/Notification.module.css';

const Notification: React.FC = () => {
  return (
    <div className={styles.notifications}>
      {/* <FontAwesomeIcon icon={faBell} className={styles.notification_bell} /> */}
      <span className={styles.notification_text}>Lorem ipsum lorem ipsum lorem ipsum</span>
    </div>
  );
};

export default Notification;