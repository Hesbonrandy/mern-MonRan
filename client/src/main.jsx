import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import App from './App';
import Home from './pages/Home';
import Menu from './pages/Menu';
import MenuItemDetail from './pages/MenuItemDetail';
import CreateMenuItem from './pages/CreateMenuItem';
import Login from './pages/Login';
import Events from './pages/Events';
import Cart from './pages/Cart';
import OrderSuccess from './pages/OrderSuccess';
import AdminOrders from './pages/AdminOrders';
import Visit from './pages/Visit';
import ErrorBoundary from './ErrorBoundary';
import AdminTools from './pages/AdminTools';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <Menu /> },
      { path: 'cart', element: <Cart /> },
      { path: 'order-success', element: <OrderSuccess /> },
      { path: 'orders', element: <AdminOrders /> },
      { path: 'menu/new', element: <CreateMenuItem /> },
      { path: 'menu/edit/:id', element: <CreateMenuItem /> },
      { path: 'menu/:id', element: <MenuItemDetail /> },
      { path: 'events', element: <Events /> },
      { path: 'login', element: <Login /> },
      { path: 'visit', element: <Visit /> },
      { path: 'admin/tools', element: <AdminTools /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
