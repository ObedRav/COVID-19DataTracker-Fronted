import React from 'react';

const Layout = ({ children, className = '' }) => {
  return (
    <div
      className={`w-full h-full inline-block z-0 bg-light px-16 py-4 ${className} md:px-32`}
    >
      {children}
    </div>
  );
};

export default Layout;
