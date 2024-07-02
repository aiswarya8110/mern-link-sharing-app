import React from 'react'
import './App.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import useAuth from './custom-hooks/useAuth';
import ProtectedRoutes from './components/protected-routes/ProtectedRoutes';
import Login from './pages/login/LoginPage';
import DashBoard from './pages/dashboard/DashBoardPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.min.css';

// Lazy Loading
const Register = React.lazy(()=>  import('./pages/register/RegisterPage'));
const Profile = React.lazy(()=> import("./pages/profile/ProfilePage"));
const ProfilePreview = React.lazy(()=> import("./pages/preview/ProfilePreviewPage"));
const PublicProfilePreview=React.lazy(()=> import("./pages/preview/PublicProfilePreviewPage"));

function App() {
  const { loggedIn } = useAuth();
  const router = createBrowserRouter([
    {
      path: '/',
      element: <ProtectedRoutes loggedIn={loggedIn}/>,
      children: [
        {
          index: true,
          element: <DashBoard />
        },
        {
          path: 'profile',
          element: <React.Suspense fallback={<h2>Loading...</h2>}><Profile /></React.Suspense>
        },
        {
          path: 'preview',
          element: <React.Suspense fallback={<h2>Loading..</h2>}><ProfilePreview /></React.Suspense>
        },
        {
          path: 'dashboard',
          element: <DashBoard />
        }
      ]
    },
    {
      path: '/login',
      element: loggedIn ? <Navigate to="/dashboard"/> : <Login /> 
    },
    {
      path: '/register',
      element: loggedIn ? <Navigate to="/dashboard"/> : <React.Suspense fallback={<h3>Loading...</h3>}><Register /></React.Suspense>
    },
    {
      path: '/:profileId',
      element: <React.Suspense fallback={<h2>Loading...</h2>}><PublicProfilePreview /></React.Suspense>
    },
    {
      path: "*",
      element: <Navigate to="/"/>
    }
  ])

  return (
    <>
      <RouterProvider router={router}/>
      <ToastContainer 
      pauseOnHover
      position='bottom-right'
      theme='dark'
      autoClose={2000}
      hideProgressBar
      />
    </>
    
  )
}

export default App
