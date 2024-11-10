import React from 'react';
import { AiOutlineBell } from 'react-icons/ai';
import styles from '../styles/Notification.module.css';

const Notification: React.FC = () => {
  return (
    <div className={styles.notifications}>
      <AiOutlineBell className={styles.notification__bell} />
      <span className={styles.notification__text}>Lorem ipsum lorem ipsum lorem ipsum</span>
    </div>
  );
};

export default Notification;