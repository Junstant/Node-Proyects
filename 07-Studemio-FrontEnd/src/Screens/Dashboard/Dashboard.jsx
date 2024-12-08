import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useUserStore from '../../stores/userStore';
import AppHeader from '../../components/layouts/AppHeader.jsx';

const Dashboard = () => {
  const { user } = useUserStore();
  const location = useLocation();

  // ! ---> If user is not logged in, redirect them to the login page
  if (!user) {
    return <Navigate to="/login" state={{ from: location, alertMessage: "You must log in to access the dashboard" }} replace />;
  }

  // ! ---> If career elements are 0, redirect them to the user panel
  if (user.career.length === 0) {
    return <Navigate to="/app/userPanel" state={{ from: location, alertMessage: "You must add a career to access the dashboard" }} replace />;
  }

  return (
    <div className='fatherCon'>
      <AppHeader />
      Dashboard
    </div>
  );
};

export default Dashboard;