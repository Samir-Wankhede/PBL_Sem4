import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { useHistory } from "react-router-dom";
import App from './App';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import RegistrationPage from './components/RegistrationPage';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import Student from './components/Student';
const router = createBrowserRouter([
  {
    path: "login",
    element: <LoginPage/>,
    
  },
  {
    path:"register",
    element:<RegistrationPage/>
  },
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/student",
    element:<Student/>
  }


]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);


