import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Login from './Login';
import Header from './components/Header';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import AuthGuard from './components/AuthGuard';
import UpdateForm from './components/UpdateForm';


const root = ReactDOM.createRoot(document.getElementById('root'));


const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/start",
    element:<AuthGuard> <Header/></AuthGuard>,
    children:[
      {
          path: "/start",
          element: <AuthGuard><Body/></AuthGuard>
      },
      
  ],
  },
  {
    path:"/update-form",
    element:<UpdateForm/>
  }

])

root.render(
  
  <Provider store={appStore}>
    <RouterProvider router={appRouter}>
      
    </RouterProvider>
  </Provider>
  
);

