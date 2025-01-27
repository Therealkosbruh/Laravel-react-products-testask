import {createBrowserRouter} from 'react-router-dom';
import Auth from './Views/Auth';
import Products from './Views/Products/Products';
import Product from './Views/Products//Product'

const router = createBrowserRouter([
    {
        path: '/auth',
        element: <Auth/>
    },

    {
        path: '/products',
        element: <Products/>
    },

    {
        path: '/auth',
        element: <Product/>
    },

    {
        path: '*',
        element: <Products/>
    }
]);

export default router;