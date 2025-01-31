import React, { useState } from 'react';
import styles from '../css/header.module.css';
import Popup from './popup';
import { useUser } from '../UserContext';
import axiosClient from '../axios-client'; 
import { useNavigate } from 'react-router-dom'; 

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { user, setUser } = useUser(); 
  const navigate = useNavigate(); 

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleLogout = async () => {
    try {
      await axiosClient.post('/logout'); 
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 
      setUser(null); 
      alert('Вы успешно вышли!');
      navigate('/auth'); 
    } catch (error) {
      console.error('Ошибка при выходе:', error);
      alert('Не удалось выйти. Попробуйте еще раз.');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.nickname}>
        {user ? user.name : 'Nickname'}
      </div>
      {/* Кнопка для открытия попапа */}
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
      <div className={styles.icon} onClick={handleLogout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style={{ fill: 'rgba(0, 0, 0, 1)', transform: '', msFilter: '' }}
        >
          <path d="m2 12 5 4v-3h9v-2H7V8z"></path>
          <path d="M13.001 2.999a8.938 8.938 0 0 0-6.364 2.637L8.051 7.05c1.322-1.322 3.08-2.051 4.95-2.051s3.628.729 4.95 2.051 2.051 3.08 2.051 4.95-.729 3.628-2.051 4.95-3.08 2.051-4.95 2.051-3.628-.729-4.95-2.051l-1.414 1.414c1.699 1.7 3.959 2.637 6.364 2.637s4.665-.937 6.364-2.637c1.7-1.699 2.637-3.959 2.637-6.364s-.937-4.665-2.637-6.364a8.938 8.938 0 0 0-6.364-2.637z"></path>
        </svg>
      </div>

      {isPopupOpen && <Popup onClose={togglePopup} />}
    </header>
  );
}
