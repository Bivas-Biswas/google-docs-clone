import { useSession } from 'next-auth/client';
import React from 'react';

import { appdata2, appsdata1 } from '../data/appsdata';

function AllApps() {
  const [session] = useSession();
  return (
    <div
      className='absolute bg-white h-[26rem] max-h-[26rem] w-[20rem] -right-12 mt-2 rounded shadow-md border text-sm overflow-y-auto'>

      <div className='grid grid-cols-3 gap-2 border-b p-4 mr-1'>
        <a href='https://myaccount.google.com/'
           className='app-item'>
          <div className='w-10 rounded-full overflow-hidden'>
            <img src={`${session.user.image}`} alt='profile_pic' />
          </div>
          <p className='mt-1.5 text-center'>Account</p>
        </a>

        {
          appsdata1.map((app) => (
            <a key={app.name} href={app.link}
               className='app-item'>
              <div className='w-10 overflow-hidden'>
                <img src={app.image} alt={app.name} />
              </div>
              <p className='mt-1.5 text-center'>{app.name}</p>
            </a>
          ))
        }
      </div>
      <div className='grid grid-cols-3 gap-2 border-b p-4 mr-1'>
        {
          appdata2.map((app) => (
            <a key={app.name} href={app.link}
               className='app-item'>
              <div className='w-12 overflow-hidden'>
                <img src={app.image} alt={app.name} />
              </div>
              <p className='mt-1.5 text-center'>{app.name}</p>
            </a>
          ))
        }
      </div>
      <div>
        <a href='https://workspace.google.com/marketplace'
           className='inline-block mx-4 mt-4 mb-8 border-gray-200 text-base text-blue-400 hover:border-blue-200 border px-8 py-2 text-center cursor-pointer rounded-md hover:bg-blue-50'>
          More from Google Workspace Marketplace</a>
      </div>
    </div>
  );
}

export default AllApps;