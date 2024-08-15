// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Components/Header';

const AppLayout = () => {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <div className="container px-6 py-4 mx-auto">
        <Header /> {/* Self-closing tag for Header */}
        <main>
          <Outlet /> {/* Renders the matched child route */}
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
