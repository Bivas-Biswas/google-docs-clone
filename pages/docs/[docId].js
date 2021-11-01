import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import React from 'react';
import { useDocumentOnce } from 'react-firebase-hooks/firestore';

import LogIn from '../../components/LogIn';
import TextEditor from '../../components/TextEditor';
import db from '../../utils/firebase';

const DocId = () => {
  const [session] = useSession();
  const router = useRouter();
  const { docId } = router.query;
  const [snapshot, loadingSnapshot] = useDocumentOnce(
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .doc(docId)
  );

  if (!session) return <LogIn />;

  if (!loadingSnapshot && !snapshot?.data()) {
    router.replace('/');
    return <h1>Loading..</h1>;
  }

  return (
    <div>
      <Head>
        <title>{snapshot?.data().fileName} - Google Docs</title>
      </Head>

      {snapshot?.data() && (<>
        <header className='flex justify-between items-center p-3'>
          <a href='/' className='cursor-pointer'>
            <Icon name='description' size='5xl' color='blue' />
          </a>

          <div className='flex-grow px-2'>
            <h2 className='text-xl font-semibold'>
              {snapshot?.data().fileName}
            </h2>

            <div
              className='flex items-center text-sm space-x-1
             -ml-1 h-8 text-gray-600'>
              <p className='option-p'>File</p>
              <p className='option-p'>Edit</p>
              <p className='option-p'>View</p>
              <p className='option-p'>Insert</p>
              <p className='option-p'>Format</p>
              <p className='option-p'>Tools</p>
            </div>
          </div>

          <Button
            color='lightBlue'
            buttonType='filled'
            size='regular'
            rounded={false}
            block={false}
            iconOnly={false}
            ripple='light'
            className='hidden md:inline-flex h-10 rounded-sm'
          >
            <Icon name='people' size='md' /> Share
          </Button>

          <img
            className='rounded-full cursor-pointer w-10 h-10 ml-2'
            src={session.user.image}
            alt='user profile'
          />
        </header>
        <TextEditor editorData={snapshot?.data().editorState} />
      </>)}
    </div>
  );
};

export default DocId;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  };
}