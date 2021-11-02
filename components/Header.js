import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/client';

const Header = () => {
  const [session] = useSession();

  return (
    <div className='flex sticky top-0 z-50 items-center justify-between px-4 py-2 shadow-sm bg-white'>
      <Button
        color='dark'
        buttonType='link'
        rounded
        iconOnly
        ripple='dark'
        className='focus:bg-gray-200 hover:bg-gray-200'
      >
        <Icon name='menu' size='2xl' />
      </Button>
      <Link href='/' passHref>
        <a href='replace' className='cursor-pointer inline-block flex flex-row items-center'>
          <Icon name='description' size='5xl' color='blue' />
          <h1 className='ml-2 text-gray-700 text-2xl'>Docs</h1>
        </a>
      </Link>

      <div className='flex flex-grow items-center justify-center'>
        <div
          className='flex flex-grow items-center shadow-none justify-end
        sm:justify-start md:mx-16 lg:mx-40 xl:mx-32
        max-w-3xl sm:px-2 sm:py-1 md:px-5 md:py-1 bg-none sm:bg-gray-100
        rounded-lg sm:focus-within:text-gray-600 focus-within:bg-white
        sm:focus-within:shadow'
        >
          <Button
            buttonType='link'
            size='regular'
            color='dark'
            rounded
            block={false}
            iconOnly
            ripple='dark'
            className='focus:bg-gray-200 hover:bg-gray-200'
          >
            <Icon
              name='search'
              size='3xl'
              color='darkgray'
            />
          </Button>
          <input
            type='text'
            placeholder='Search'
            className='hidden sm:block flex-grow px-3 text-base
            bg-transparent outline-none text-md lg:text-lg'
          />
        </div>
      </div>

      <Button
        color='dark'
        buttonType='link'
        rounded
        block={false}
        iconOnly
        ripple='dark'
        className='focus:bg-gray-200 hover:bg-gray-200'
      >
        <Icon name='apps' size='3xl' />
      </Button>

      <button
        type='submit'
        onClick={signOut}
        className='overflow-hidden focus:outline-none cursor-pointer
        h-12 w-12 rounded-full ml-2 md:ml-5 focus:shadow-lg hover:shadow-lg'
      >
        <img
          loading='lazy'
          src={session?.user?.image}
          alt='profile'
        />
      </button>

    </div>
  );
};
export default Header;
