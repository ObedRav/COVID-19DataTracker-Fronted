import React from 'react';
import Layout from './Layout';

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark font-medium text-lg sm:text-base'>
      <Layout className='flex items-center justify-between'>
        <span>{new Date().getFullYear()} &copy; Rights Reserve. </span>
      </Layout>
    </footer>
  );
};

export default Footer;
