// import React, { useState } from 'react';
// import { AuthInput } from './input';
// import { AuthButton } from './button';
// import styles from '../css/AuthForm.module.css';
// import axiosClient from '../axios-client';
// import { useNavigate } from "react-router-dom";

// export const RegisterForm = () => {
//   const [form, setForm] = useState({
//     last_name: '', 
//     first_name: '',
//     middle_name: '',
//     login: '',
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     console.log(`Input changed: ${e.target.name} = ${e.target.value}`);
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Form submission started with data:', form);
    
//     setErrors({});  
    
//     try {
//       const response = await axiosClient.post('/signup', form);
//       console.log('Registration successful, received response:', response);
//       localStorage.setItem('token', response.data.token);
//       alert('Registration successful!');
//       navigate("/main");
//     } catch (error) {
//       console.log('Error during registration:', error);
//       if (error.response?.data?.errors) {
//         setErrors(error.response.data.errors);
//         console.log('Validation errors:', error.response.data.errors);
//       } else {
//         alert('Something went wrong. Please try again.');
//         console.log('General error:', error);
//       }
//     }
//   };

//   return (
//     <form 
//       className={styles.formContainer}
//       onSubmit={handleSubmit}
//       noValidate
//     >
//       <div className={styles.formGrid}>
//         <AuthInput
//           label="Last Name"
//           name="last_name"
//           value={form.last_name}
//           placeholder="Enter your last name"
//           onChange={handleChange}
//           error={errors.last_name} 
//         />
       

//         <AuthInput
//           label="First Name"
//           name="first_name"
//           value={form.first_name}
//           placeholder="Enter your first name"
//           onChange={handleChange}
//           error={errors.first_name}
//         />

//         <AuthInput
//           label="Patronymic"
//           name="middle_name"
//           value={form.middle_name}
//           placeholder="Enter your patronymic"
//           onChange={handleChange}
//           error={errors.middle_name}
//         />
//         <AuthInput
//           label="Login"
//           name="login"
//           value={form.login}
//           placeholder="Create your login"
//           onChange={handleChange}
//           fullWidth
//           error={errors.login}
//         />
//         <AuthInput
//           label="Password"
//           name="password"
//           value={form.password}
//           type="password"
//           placeholder="Create your password"
//           onChange={handleChange}
//           fullWidth
//           error={errors.password}
//         />

//         <AuthInput
//           label="Email"
//           name="email"
//           value={form.email}
//           type="email"
//           placeholder="Enter your email"
//           onChange={handleChange}
//           fullWidth
//           error={errors.email}
//         />
//       </div>
//       <AuthButton
//         text="Зарегистрироваться"
//         type="submit"
//         name="submitRegister"
//       />
//         {errors.last_name && <p className={styles.errorMessage}>{errors.last_name}</p>}
//         {errors.first_name && <p className={styles.errorMessage}>{errors.first_name}</p>}
//         {errors.middle_name && <p className={styles.errorMessage}>{errors.middle_name}</p>}
//         {errors.login && <p className={styles.errorMessage}>{errors.login}</p>}{errors.password && <p className={styles.errorMessage}>{errors.password}</p>}
//         {errors.email && <p className={styles.errorMessage}>{errors.email}</p>}
//     </form>
//   );
// };


import React, { useState } from 'react';
import { AuthInput } from './input';
import { AuthButton } from './button';
import styles from '../css/AuthForm.module.css';
import axiosClient from '../axios-client';
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const [form, setForm] = useState({
    name: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Очищаем ошибки перед новой отправкой

    try {
      const response = await axiosClient.post('/signup', form);
      localStorage.setItem('token', response.data.token);
      alert('Регистрация прошла успешно!');
      navigate('/main');
    } catch (error) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors); // Обновляем ошибки, если есть
      } else {
        alert('Ошибка регистрации. Попробуйте снова.');
      }
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
      <div className={styles.formGrid}>
        <AuthInput
          label="Имя пользователя"
          name="name"
          value={form.name}
          placeholder="Введите имя"
          onChange={handleChange}
          error={errors.name}
        />
        <AuthInput
          label="Пароль"
          name="password"
          value={form.password}
          type="password"
          placeholder="Введите пароль"
          onChange={handleChange}
          error={errors.password}
        />
      </div>
      <AuthButton text="Зарегистрироваться" type="submit" />
      {Object.keys(errors).map((key) => (
        <p key={key} className={styles.errorMessage}>{errors[key]}</p>
      ))}
    </form>
  );
};
