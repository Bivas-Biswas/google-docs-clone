import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import firebase from 'firebase/compat/app';
import Image from 'next/image';
import { getSession, useSession } from 'next-auth/client';
import { useState } from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import Header from '../components/Header';
import LogIn from '../components/LogIn';
import db from '../utils/firebase';

function Home() {
  const [session] = useSession();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [snapshot] = useCollectionOnce(session ?
    db
      .collection('userDocs')
      .doc(session?.user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc')
    : undefined
  );

  if (!session) {
    return <LogIn />;
  }

  function handleCreateDoucument() {
    if (!input) return;
    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    ;
    setShowModal(false);
    setInput('');
  }

  const modal = (
    <Modal
      size='sm'
      active={showModal}
      toggler={() => setShowModal(false)}
    >
      <ModalBody>
        <input
          type='text'
          value={input}
          className='outline-none w-full'
          placeholder='Enter name of the docment..'
          onChange={(event => setInput(event.target.value))}
          onKeyDown={
            (e) => e.key === 'Enter' && handleCreateDoucument()
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={() => setShowModal(false)}
          ripple='dark'
        >
          Cancel
        </Button>

        <Button
          color='blue'
          onClick={() => handleCreateDoucument()}
          ripple='light'
        >
          Create
        </Button>

      </ModalFooter>
    </Modal>
  );

  return (
    <>
      <Header />
      {modal}
      <section className='bg-[#F8F9FA] pb-10 px-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-6'>
            <h2 className='text-gray-700 text-lg'>Start a new document</h2>
            <Button
              color='gray'
              buttonType='link'
              iconOnly
              ripple='dark'
            >
              <Icon name='more_vert' size='3xl' />
            </Button>
          </div>

          <div>
            <button
              type='button'
              className='relative h-52 w-40 border-2 cursor-pointer
              hover:border-blue-700'
              onClick={() => setShowModal(true)}
            >
              <Image src='/image/add_image.png' layout='fill' />
            </button>
            <p className='ml-2 mt-2 font-semibold text-sm text-gray-700'>Blank</p>
          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-0'>
        <div className='max-w-3xl mx-auto py-8 text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-5'>
            <h2 className='font-medium flex-grow'>My Documents</h2>
            <p className='mr-12'>Date Created</p>
            <Icon name='folder' size='3xl' color='gray' />
          </div>
        </div>
        {snapshot && snapshot?.docs.map(doc => (
          <div key={doc.id}>
            {JSON.stringify(doc.data())}
          </div>
        ))}
      </section>
    </>
  );
}

export default Home;

export async function getServerSideProps() {
  const session = await getSession();
  return {
    props: {
      session
    }
  };
}