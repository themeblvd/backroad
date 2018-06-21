import React from 'react';
import Header from '../components/layout/Header';
import UserMenu from '../components/layout/UserMenu';
import Sidebar from '../components/layout/Sidebar';
import View from './View';

const Admin = () => {
  return (
    <div className="admin-page">
      <Header />
      <UserMenu />
      <Sidebar />
      <View />
    </div>
  );
};

export default Admin;
