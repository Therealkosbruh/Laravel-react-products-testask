import React, { useState } from 'react';
import styles from '../css/header.module.css';
import Popup from './popup';
import { useUser } from '../UserContext'; 

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user } = useUser(); 

  console.log(user?.name); 
  console.log(user?.role); 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.nickname}>
        {user ? user.name : 'Nickname'} 
      </div>
      <div className={styles.icon} onClick={togglePopup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: 'rgba(0, 0, 0, 1)' }}
        >
          <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
        </svg>
      </div>
      {isPopupOpen && <Popup onClose={togglePopup} />}
    </header>
  );
}
