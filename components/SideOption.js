import React, { useRef } from 'react';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';

import useOnClickOutside from '../hooks/useOnClickOutside';

function SideOption({ isSideMenuOpen, setIsSideMenuOpen }) {
  const menuRef = useRef();
  useOnClickOutside(menuRef, () => setIsSideMenuOpen(false));
  return (
    <div ref={menuRef}
         className={`absolute z-20 bg-white shadow-lg border w-72 h-full flex flex-col justify-between transform ${isSideMenuOpen ? '' : '-translate-x-full'} transition duration-300 ease-in-out`}>
      <div>
        <a href='/' className='flex py-5 pl-8 border-b'>
          <img src='/image/googlelogo.svg' alt='google logo' />
          <p className='text-2xl pl-1'>Docs</p>
        </a>

        <div className='side-menu-item-wrapper'>
          <a href='/' className='side-menu-item'>
            <img className='w-5' src='/image/google-docs-icon.svg' alt='google docs icon' />
            <p className='side-menu-item-text'>Docs</p>
          </a>

          <a href='https://sheets.google.com/' className='side-menu-item'>
            <img className='w-5' src='/image/sheets.png' alt='google sheets icon' />
            <p className='side-menu-item-text'>Sheets</p>
          </a>
          <a href='https://slides.google.com/' className='side-menu-item'>
            <img className='w-5' src='/image/slides.png' alt='google slides icon' />
            <p className='side-menu-item-text'>Slides</p>
          </a>
          <a href='https://forms.google.com/' className='side-menu-item'>
            <img className='w-5' src='/image/forms_logo.png' alt='google forms icon' />
            <p className='side-menu-item-text'>Forms</p>
          </a>
        </div>

        <div className='side-menu-item-wrapper'>
          <div className='side-menu-item'>
          <span className='text-gray-700 text-xl'>
            <FiSettings />
          </span>
            <p className='side-menu-item-text'>Settings</p>
          </div>
          <div className='side-menu-item'>
          <span className='text-gray-700 text-xl'>
            <AiOutlineQuestionCircle />
          </span>
            <p className='side-menu-item-text'>Help & Feedback</p>
          </div>
        </div>

        <div className='side-menu-item-wrapper'>
          <div className='side-menu-item'>
          <span className='text-gray-700 text-xl'>
            <img className='w-6' src='/image/drive.png' alt='google drive icon' />
          </span>
            <p className='side-menu-item-text'>Settings</p>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-center text-xs text-gray-500 mb-5'>
        <a href='https://policies.google.com/privacy?hl=en' className='hover:text-black cursor-pointer px-1'>Privacy
          Policy</a>
        <p>.</p>
        <a href='https://policies.google.com/terms?hl=en' className='hover:text-black cursor-pointer px-1'>Terms of
          Service</a>
      </div>
    </div>
  );
}

export default SideOption;