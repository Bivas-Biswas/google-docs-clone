import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useOnClickOutside(ref, () => setIsMenuOpen(false));
  return (
    <div
      className='flex items-center justify-between rounded pl-1 select-none
       hover:bg-blue-100 cursor-pointer text-gray-700 p-0'
    >
      <div
        className='flex items-center w-full '
        onClick={() => router.push(`/docs/${id}`)}
      >
        <Icon name='article' size='3xl' color='blue' />
        <p className='flex-grow pl-5 w-10 pr-10 truncate text-base'>{fileName}</p>
        <p className='pr-5 text-sm'>{moment(date?.toDate().toLocaleDateString()).calendar()}</p>
      </div>

      <div ref={ref} className='relative'>
        <Button
          color='gray'
          buttonType='link'
          iconOnly
          rounded
          ripple='dark'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name='more_vert' size='3xl' />
        </Button>

        {
          isMenuOpen && (
            <div className='menu '>
              <div className='menu-item'>
                <span className='pr-3'>
                  <Icon name='text_fields' size='2xl' />
                </span>
                <p>Rename</p>
              </div>

              <div className='menu-item'>
                <span className='pr-3'>
                  <Icon name='delete' size='2xl' />
                </span>
                <p>Remove</p>
              </div>
              <div className='menu-item'>
                <span className='pr-3'>
                  <Icon name='launch' size='2xl' />
                </span>
                <p className='whitespace-nowrap'>Open in new tab</p>
              </div>
            </div>
          )
        }
      </div>

    </div>
  );
}

export default DocumentRow;