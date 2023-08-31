import React, { useState } from 'react';
import Image from 'next/image';
import Logo from '../../public/images/Logo.png';
import Link from 'next/link';

const NavBar = () => {
  const [HamburgerMenuOpen, setHamburgerMenuOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setHamburgerMenuOpen(!HamburgerMenuOpen);
  };

  return (
    <nav className='relative bg-white border border-solid border-dark'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto 2xl:ml-28 p-4'>
        <Link href='/' className='flex items-center'>
          <Image src={Logo} className='mr-3' alt='Flowbite Logo' width='20' />
          <span className='self-center text-3xl font-bold whitespace-nowrap'>
            Covid 19 Tracker
          </span>
        </Link>

        <div className='items-center justify-between hidden md:block'>
          <nav className='flex space-x-10'>
            <Link href='/' className='select-none'> Home </Link>
            <Link href='/records' className='hover:text-blue-700 select-none'>
              {' '}
              Historical Records{' '}
            </Link>
            <Link href='/states' className='hover:text-blue-700 select-none'>
              {' '}
              States Stadistics{' '}
            </Link>
          </nav>
        </div>

        {/* Hamburger Menu Button */}
        <button
          type='button'
          onClick={toggleHamburgerMenu}
          className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls='navbar-items'
          aria-expanded={HamburgerMenuOpen ? 'true' : 'false'}
        >
          <span className='sr-only'>Open main menu</span>
          <svg
            className='w-5 h-5'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 17 14'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M1 1h15M1 7h15M1 13h15'
            />
          </svg>
        </button>

        {/* Hamburger Menu Items */}
        {HamburgerMenuOpen && (
          <div
            className='absolute items-center justify-between w-full md:w-auto md:order-1 top-full md:relative z-50'
            id='navbar-items'
          >
            <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <Link
                  href='/'
                  onClick={() => setHamburgerMenuOpen(false)} // Close the menu on click
                  className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href='/records'
                  onClick={() => setHamburgerMenuOpen(false)} // Close the menu on click
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Historical Records
                </Link>
              </li>
              <li>
                <Link
                  href='/states'
                  onClick={() => setHamburgerMenuOpen(false)} // Close the menu on click
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  States Statistics
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
