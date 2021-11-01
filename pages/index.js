import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Input from '@material-tailwind/react/Input';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import firebase from 'firebase/compat/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import { useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import DocumentRow from '../components/DocumentRow';
import Header from '../components/Header';
import Loading from '../components/Loading';
import LogIn from '../components/LogIn';
import db from '../utils/firebase';

function Home() {
  const [session] = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [snapshot] = useDocument(session ?
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy('timestamp', 'desc') : undefined
  );

  if (!session) {
    return <LogIn />;
  }

  function handleCreateDoucument() {
    if (!input) return;
    setShowLoader(true);
    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .add({
        fileName: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        router.push(`/docs/${docRef.id}`)
          .then(() => setShowLoader(false));
      });
    setShowModal(false);
    setInput('');
  }

  const addDocumentmodal = (
    <Modal
      size='sm'
      active={showModal}
      toggler={() => setShowModal(false)}
    >
      <ModalBody>
        <Input
          type='text'
          value={input}
          color='lightBlue'
          className='outline-none border-2 w-full px-2 py-1 rounded focus:border-gray-500'
          placeholder='Document Name'
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
      {addDocumentmodal}
      <section className='bg-[#F8F9FA] pb-5 px-10'>
        <div className='max-w-3xl mx-auto'>
          <div className='flex items-center justify-between py-4'>
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
              className='relative h-40 w-32 border-2 cursor-pointer
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

          {snapshot ? (
            snapshot.docs.map(doc => (
              <DocumentRow
                key={doc.id}
                id={doc.id}
                fileName={doc.data().fileName}
                date={doc.data().timestamp}
              />
            ))) : <h1>Hell</h1>}
        </div>
        {showLoader && <Loading />}
      </section>

    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  };
}