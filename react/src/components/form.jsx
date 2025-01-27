import React, { useState } from 'react';
import styles from '../css/AuthForm.module.css';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegistreForm';

export const AuthForm = () => {
    const [activeTab, setActiveTab] = useState('login');
  
    const handleTabChange = (tab) => {
      setActiveTab(tab);
    };
  
    return (
      <main className={styles.container}>
        <nav className={styles.navigation} aria-label="Authentication options">
          <button 
            name="loginTab"
            className={activeTab === 'login' ? styles.activeTab : styles.inactiveTab}
            onClick={() => handleTabChange('login')}
            aria-current={activeTab === 'login' ? 'page' : undefined}
          >
            Login
          </button>
          <button 
            name="registerTab"
            className={activeTab === 'register' ? styles.activeTab : styles.inactiveTab}
            onClick={() => handleTabChange('register')}
            aria-current={activeTab === 'register' ? 'page' : undefined}
          >
            Register
          </button>
        </nav>
        
        <h1 className={styles.welcomeText}>
          Добро пожаловать
        </h1>
        
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </main>
    );
  };