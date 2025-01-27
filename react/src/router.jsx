// import {createBrowserRouter} from 'react-router-dom';
// import Auth from './Views/Auth';
// import Products from './Views/Products/Products';
// import Product from './Views/Products//Product'

// const router = createBrowserRouter([
//     {
//         path: '/auth',
//         element: <Auth/>
//     },

//     {
//         path: '/products',
//         element: <Products/>
//     },

//     {
//         path: '/auth',
//         element: <Product/>
//     },

//     {
//         path: '*',
//         element: <Products/>
//     }
// ]);

// export default router;

import { createBrowserRouter } from 'react-router-dom';
import Auth from './Views/Auth';
import Products from './Views/Products/Products';
import Product from './Views/Products/Product';
import PrivateRoute from './PrivateRoute';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/products',
    element: (
      <PrivateRoute>
        <Products />
      </PrivateRoute>
    ),
  },
  {
    path: '/product/:id',
    element: (
      <PrivateRoute>
        <Product />
      </PrivateRoute>
    ),
  },
  {
    path: '*',
    element: (
      <PrivateRoute>
        <Products />
      </PrivateRoute>
    ),
  },
]);

export default router;
