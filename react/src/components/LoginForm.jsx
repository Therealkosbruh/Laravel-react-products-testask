import React, { useState } from 'react';
import { AuthInput } from './input';
import { AuthButton } from './button';
import styles from '../css/AuthForm.module.css';
import axiosClient from '../axios-client';
import { useNavigate } from "react-router-dom";
import { useUser } from '../UserContext'; 

export const LoginForm = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { setUser } = useUser(); 

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.password) {
      setError('All fields are required!');
      return;
    }

    try {
      const response = await axiosClient.post('/login', form);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);

      console.log('Role:', user.role); 

      alert('Login successful!');
      navigate('/products');
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form
      className={styles.formContainer}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.formGrid}>
        <AuthInput
          label="Имя пользователя"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          fullWidth
        />
        <AuthInput
          label="Пароль"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          fullWidth
        />
      </div>
      <AuthButton
        text="Login"
        type="submit"
        name="submitLogin"
      />
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};
