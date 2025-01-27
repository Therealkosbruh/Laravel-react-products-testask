import React from 'react';
import styles from '../css/AuthForm.module.css';

export const AuthInput = ({ label, placeholder, type = 'text', name, value, onChange, fullWidth }) => {
  const inputId = `auth-input-${name}`;
  
  return (
    <div className={`${styles.inputGroup} ${fullWidth ? styles.fullWidth : ''}`}>
      <label htmlFor={inputId} className={styles.inputLabel}>
        {label}
      </label>
      <input 
        id={inputId}
        name={name}
        type={type}
        className={styles.inputField}
        placeholder={placeholder}
        value={value} 
        onChange={onChange} 
        aria-label={label}
        required
      />
    </div>
  );
};