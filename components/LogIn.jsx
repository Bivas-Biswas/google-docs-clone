import Button from '@material-tailwind/react/Button';
import { signIn } from 'next-auth/client';
import React from 'react';

function LogIn() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <div className='flex items-center flex-col'>
        <img src='/image/google-docs-icon.svg' alt='google-docs-icon' width='100' />
        <p className='text-4xl text-gray-600 mt-2'><b>Google</b> Docs</p>
      </div>

      <Button
        className='w-36 mt-16 rounded-md'
        color='blue'
        buttonType='filled'
        ripple='light'
        onClick={() => signIn('google')}
      >
        Login
      </Button>
    </div>
  );
}

export default LogIn;