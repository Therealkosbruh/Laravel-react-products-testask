// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import { RouterProvider } from 'react-router-dom'
// import router from './router.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <RouterProvider router = {router}/>
//   </StrictMode>,
// )


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { UserProvider } from './UserContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider> 
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);
