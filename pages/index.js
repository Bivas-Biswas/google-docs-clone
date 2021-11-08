import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Input from '@material-tailwind/react/Input';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import Tooltips from '@material-tailwind/react/Tooltips';
import TooltipsContent from '@material-tailwind/react/TooltipsContent';
import firebase from 'firebase/compat/app';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { getSession, useSession } from 'next-auth/client';
import { useRef, useState } from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';

import DocumentRow from '../components/DocumentRow';
import Header from '../components/Header';
import Loading from '../components/Loading';
import LogIn from '../components/LogIn';
import Menu from '../components/Menu';
import MenuItem from '../components/MenuItem';
import useOnClickOutside from '../hooks/useOnClickOutside';
import db from '../utils/firebase';

function Home() {
  const [session] = useSession();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [selectSortOption, setSelectSortOption] = useState({
    sortingBy: 'createdAt',
    sortingOrder: 'desc',
    name: 'Date Created'
  });
  const sortButtonRef = useRef();
  const [snapshot] = useDocument(session ?
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .orderBy(selectSortOption.sortingBy, selectSortOption.sortingOrder) : undefined
  );

  const buttonsTooltipRef = useRef();
  useOnClickOutside(sortButtonRef, () => setIsSortMenuOpen(false));

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
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        openedAt: firebase.firestore.FieldValue.serverTimestamp(),
        modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
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
      toggler={() => {
        setShowModal(false);
        setInput('');
      }}
    >
      <ModalBody>
        <Input
          type='text'
          value={input}
          color='lightBlue'
          outline={false}
          size='lg'
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
          onClick={() => {
            setShowModal(false);
            setInput('');
          }}
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

  const handleSelectSortOptions = (optionName) => {
    let name = '';
    if (optionName === 'fileName') {
      setSelectSortOption({
        ...selectSortOption, sortingBy: optionName,
        sortingOrder: 'asc', name: 'Last modified'
      });
    } else {
      if (optionName === 'openedAt') {
        name = 'Last opened';
      } else if (optionName === 'modifiedAt') {
        name = 'Last modified';
      }
      setSelectSortOption({ ...selectSortOption, sortingBy: optionName, name });
    }
  };

  return (
    <div className='absolute w-screen min-h-screen'>
      <Header />
      {addDocumentmodal}
      <section className='bg-[#F8F9FA] pb-5 px-10'>
        <div className='max-w-4xl mx-auto'>
          <div className='flex items-center justify-between py-4'>
            <h2 className='text-gray-700 font-semibold'>Start a new document</h2>

            <div className='flex items-center'>
              <button
                type='button'
                className='flex items-center hover:bg-gray-200 focus:outline-none
                px-2 py-1 mr-1.5 font-medium border-r rounded-sm focus:bg-gray-200'
              >
                Template gallery
                <Icon name='unfold_more' size='2xl' />
              </button>

              <Button
                color='dark'
                buttonType='link'
                iconOnly
                rounded
                ripple='dark'
                className='hover:bg-gray-200 focus:bg-gray-200'
              >
                <Icon name='more_vert' size='3xl' />
              </Button>
            </div>
          </div>

          <div>
            <button
              type='button'
              className='relative h-44 w-36 border-2 cursor-pointer
              hover:border-blue-700 rounded-sm'
              onClick={() => setShowModal(true)}
            >
              <Image src='/image/add_image.png' layout='fill' />
            </button>
            <p className='mt-2 font-semibold text-sm text-gray-700'>Blank</p>
          </div>
        </div>
      </section>

      <section className='bg-white px-10 md:px-0 '>
        <div className='max-w-4xl mx-auto py-5 text-sm text-gray-700'>
          <div className='flex items-center justify-between pb-4 px-3 font-semibold relative'>
            <h4 className='flex-grow'>
              Documents by <b>{selectSortOption.sortingBy === 'fileName' ? 'Title' : 'Date'}</b></h4>
            <p className='mr-10'>{selectSortOption.name}</p>

            <span>
              <Button
                color='dark'
                buttonType='link'
                iconOnly
                rounded
                ripple='dark'
                className='hover:bg-gray-100 mr-2 focus:bg-gray-200'
                ref={buttonsTooltipRef}
              >
                <Icon name='view_module' size='2xl' />
              </Button>

              <Tooltips placement='bottom' ref={buttonsTooltipRef}>
                <TooltipsContent>Grid view</TooltipsContent>
              </Tooltips>
            </span>

            <div ref={sortButtonRef}>
              <span>
                <Button
                  color='dark'
                  buttonType='link'
                  iconOnly
                  rounded
                  ripple='dark'
                  className='hover:bg-gray-100 mr-2 focus:bg-gray-200'
                  ref={buttonsTooltipRef}
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                >
                  <Icon name='sort_by_alpha' size='2xl' />
                </Button>

                <Tooltips placement='bottom' ref={buttonsTooltipRef}>
                  <TooltipsContent>Sort options</TooltipsContent>
                </Tooltips>
              </span>
              <Menu open={isSortMenuOpen} onClose={setIsSortMenuOpen}>
                <MenuItem onClick={() => handleSelectSortOptions('openedAt')}>Last opened</MenuItem>
                <MenuItem onClick={() => handleSelectSortOptions('modifiedAt')}>Last modified</MenuItem>
                <MenuItem onClick={() => handleSelectSortOptions('fileName')}>Title</MenuItem>
              </Menu>
            </div>

            <span>
              <Button
                color='dark'
                buttonType='link'
                iconOnly
                rounded
                ripple='dark'
                className='hover:bg-gray-100 focus:bg-gray-200'
                ref={buttonsTooltipRef}
              >
              <Icon name='folder_open' size='2xl' />
              </Button>
              <Tooltips placement='bottom' ref={buttonsTooltipRef}>
                <TooltipsContent>Open file picker</TooltipsContent>
              </Tooltips>
            </span>

          </div>
          <div>
            {snapshot ? (
              snapshot.docs.map(doc => (
                <DocumentRow
                  key={doc.id}
                  id={doc.id}
                  fileName={doc.data().fileName}
                  date={selectSortOption.sortingBy === 'fileName' ? doc.data().modifiedAt : doc.data()[selectSortOption.sortingBy]}
                />
              ))) : <Loading />}

          </div>
        </div>
        {showLoader && <Loading />}
      </section>

    </div>
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