import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import App from './App.jsx'
import ErrorPage from './pages/ErrorPage';
import Shop from './pages/Shop.jsx';
import Home from './pages/Home.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import NewProduct from './pages/NewProduct.jsx';
import Cart from './pages/Cart.jsx';
import ProtectedRouter from './pages/ProtectedRouter.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/shop/:category", element: <Shop /> },
      { path: "/shop/detail/:productId", element: <ProductDetail /> },
      { path: "/shop/new", 
        element: 
          <ProtectedRouter requireAdmin>
            <NewProduct />
          </ProtectedRouter> 
      },
      { path: "/order/cart", element: <Cart /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
