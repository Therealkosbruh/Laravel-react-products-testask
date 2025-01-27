// import React, { useState, useEffect } from 'react';
// import styles from '../css/popup.module.css';
// import { AuthInput } from './input';
// import { AuthButton } from './button';
// import axiosClient from '../axios-client';

// export default function ProductEditPopup({ onClose, productData }) {
//   const [formData, setFormData] = useState({
//     name: '',
//     article: '',
//     color: '',
//     size: '',
//     ...productData, // Подставляем данные продукта, если они есть
//   });

//   useEffect(() => {
//     // Обновляем состояние, если productData меняется
//     if (productData) {
//       setFormData((prev) => ({
//         ...prev,
//         ...productData,
//       }));
//     }
//   }, [productData]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleUpdate = async () => {
//     try {
//       // Логируем данные перед отправкой
//       console.log('Form data before update:', formData);

//       // Отправляем запрос на обновление продукта
//       const response = await axiosClient.put(`/products/${formData.id}`, formData);
      
//       console.log('Продукт обновлен:', response.data); // Логируем успешный ответ
//       onClose();
//     } catch (error) {
//       // Логируем ошибку более подробно
//       console.error('Ошибка при обновлении продукта:', error.response?.data || error.message);

//       // Если есть подробная ошибка от сервера
//       if (error.response) {
//         alert(`Ошибка: ${error.response?.data?.message || 'При обновлении продукта возникла ошибка'}`);
//       } else {
//         alert('Ошибка при обновлении продукта!');
//       }
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axiosClient.delete(`/products/${formData.id}`);
//       console.log('Продукт удален:', formData.id);
//       onClose();
//     } catch (error) {
//       console.error('Ошибка при удалении продукта:', error.response?.data || error.message);
//       alert('Ошибка при удалении продукта!');
//     }
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.popup}>
//         <div className={styles.closeIcon} onClick={onClose}>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="24"
//             height="24"
//             viewBox="0 0 24 24"
//             style={{ fill: 'rgba(0, 0, 0, 1)', transform: 'rotate(45deg)' }}
//           >
//             <path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path>
//           </svg>
//         </div>
//         <h2>Редактирование продукта</h2>
//         <AuthInput
//           label="Название"
//           placeholder="Введите название"
//           name="name"
//           value={formData.name || ''}
//           onChange={handleChange}
//         />
//         <AuthInput
//           label="Артикул"
//           placeholder="Введите артикул"
//           name="article"
//           value={formData.article || ''}
//           onChange={handleChange}
//         />
//         <AuthInput
//           label="Цвет"
//           placeholder="Введите цвет"
//           name="color"
//           value={formData.color || ''}
//           onChange={handleChange}
//         />
//         <AuthInput
//           label="Размер"
//           placeholder="Введите размер"
//           name="size"
//           value={formData.size || ''}
//           onChange={handleChange}
//         />
//         <div className={styles.buttonGroup}>
//           <AuthButton text="Сохранить" onClick={handleUpdate} />
//           <AuthButton text="Удалить" onClick={handleDelete} />
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import styles from '../css/popup.module.css';
import { AuthInput } from './input';
import { AuthButton } from './button';
import axiosClient from '../axios-client';

export default function ProductEditPopup({ onClose, productData, userRole }) {
  const [formData, setFormData] = useState({
    name: '',
    article: '',
    color: '',
    size: '',
    ...productData, // Подставляем данные продукта, если они есть
  });

  useEffect(() => {
    // Обновляем состояние, если productData меняется
    if (productData) {
      setFormData((prev) => ({
        ...prev,
        ...productData,
      }));
    }
  }, [productData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Логируем данные перед отправкой
      console.log('Form data before update:', formData);
  
      // Если роль пользователя "user", не отправляем артикул
      let updatedFormData = { ...formData }; // Создаем новый объект
      if (userRole === 'user') {
        const { article, ...formDataWithoutArticle } = updatedFormData;
        updatedFormData = formDataWithoutArticle; // Заменяем объект без артикула
      }
  
      // Отправляем запрос на обновление продукта
      const response = await axiosClient.put(`/products/${updatedFormData.id}`, updatedFormData);
  
      console.log('Продукт обновлен:', response.data); // Логируем успешный ответ
      onClose();
    } catch (error) {
      // Логируем ошибку более подробно
      console.error('Ошибка при обновлении продукта:', error.response?.data || error.message);
  
      // Если есть подробная ошибка от сервера
      if (error.response) {
        alert(`Ошибка: ${error.response?.data?.message || 'При обновлении продукта возникла ошибка'}`);
      } else {
        alert('Ошибка при обновлении продукта!');
      }
    }
  };
  
  const handleDelete = async () => {
    try {
      await axiosClient.delete(`/products/${formData.id}`);
      console.log('Продукт удален:', formData.id);
      onClose();
    } catch (error) {
      console.error('Ошибка при удалении продукта:', error.response?.data || error.message);
      alert('Ошибка при удалении продукта!');
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
        <h2>Редактирование продукта</h2>
        <AuthInput
          label="Название"
          placeholder="Введите название"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
        />
        {userRole === 'admin' && (
          <AuthInput
            label="Артикул"
            placeholder="Введите артикул"
            name="article"
            value={formData.article || ''}
            onChange={handleChange}
          />
        )}
        <AuthInput
          label="Цвет"
          placeholder="Введите цвет"
          name="color"
          value={formData.color || ''}
          onChange={handleChange}
        />
        <AuthInput
          label="Размер"
          placeholder="Введите размер"
          name="size"
          value={formData.size || ''}
          onChange={handleChange}
        />
        <div className={styles.buttonGroup}>
          <AuthButton text="Сохранить" onClick={handleUpdate} />
          <AuthButton text="Удалить" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
}
