import React, { useState } from 'react';
import styles from '../css/popup.module.css';
import { AuthInput } from './input';
import { AuthButton } from './button';
import axiosClient from '../axios-client';

export default function Popup({ onClose }) {
  const [formData, setFormData] = useState({
    article: '',
    name: '',
    status: 'available',
    color: '',
    size: '',
    img: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axiosClient.post('/products', formData);
      console.log('Продукт добавлен:', response.data);
      onClose(); // 
    } catch (error) {
        alert("Ошибка при создании продукта! Введенные вами данные не соответствуют правилам");
        console.error('Ошибка при добавлении продукта:', error);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.popup}>
        <div className={styles.closeIcon} onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: 'rgba(0, 0, 0, 1)', transform: 'rotate(45deg)' }}
          >
            <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
          </svg>
        </div>
        <h2>Добавление продукта</h2>
        <AuthInput
          label="Артикул"
          placeholder="Введите артикул"
          name="article"
          value={formData.article}
          onChange={handleChange}
        />
        <AuthInput
          label="Название продукта"
          placeholder="Введите название"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <AuthInput
          label="Статус"
          placeholder="Например, available"
          name="status"
          value={formData.status}
          onChange={handleChange}
        />
        <AuthInput
          label="Цвет"
          placeholder="Введите цвет"
          name="color"
          value={formData.color}
          onChange={handleChange}
        />
        <AuthInput
          label="Размер"
          placeholder="Введите размер"
          name="size"
          value={formData.size}
          onChange={handleChange}
        />
        <AuthInput
          label="Ссылка на изображение"
          placeholder="Введите URL изображения"
          name="img"
          value={formData.img}
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <AuthButton text="Добавить" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
