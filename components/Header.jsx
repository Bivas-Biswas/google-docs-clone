import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { useSession } from 'next-auth/client';

const Header = () => {
  const [session] = useSession();

  return (
    <div className='flex sticky top-0 z-50 items-center justify-between px-4 py-2 shadow-md bg-white'>
      <Button
        color='grey'
        buttonType='link'
        rounded
        iconOnly
        ripple='dark'
      >
        <Icon name='menu' size='3xl' />
      </Button>
      <Icon name='description' size='5xl' color='blue' />
      <h1 className='ml-2 text-gray-700 text-2xl'>Docs</h1>

      <div
        className='flex flex-grow items-center shadow-none justify-end
      sm:justify-start md:mx-16 lg:mx-40 xl:mx-60
      2xl:w-xl sm:px-2 sm:py-1 md:px-5 md:py-2 bg-none sm:bg-gray-100
      rounded-lg sm:focus-within:text-gray-600
      sm:focus-within:shadow-md'
      >
        <Button
          buttonType='link'
          size='regular'
          color='grey'
          rounded
          block={false}
          iconOnly
          ripple='dark'
        >
          <Icon
            name='search'
            size='3xl'
            color='darkgray'
          />
        </Button>
        <input
          type='text'
          placeholder='Seach..'
          className='hidden sm:block flex-grow px-3 text-base
        bg-transparent outline-none text-md lg:text-lg'
        />
      </div>

      <Button
        color='grey'
        buttonType='link'
        rounded
        iconOnly
        ripple='dark'
        clasname='h-20 w-20'
      >
        <Icon name='apps' size='3xl' />
      </Button>

      <button type='submit'
              className='overflow-hidden focus:outline-none cursor-pointer h-12 w-12 rounded-full ml-2 md:ml-5'>
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
