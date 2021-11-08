import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Input from '@material-tailwind/react/Input';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import firebase from 'firebase/compat/app';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useRef, useState } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';
import db from '../utils/firebase';
import Loading from './Loading';
import Menu from './Menu';
import MenuItem from './MenuItem';

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  const [session] = useSession();
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [input, setInput] = useState(fileName);
  const [updatefileName, setUpdatefileName] = useState(fileName);
  const [showOptionModal, setShowOptionModal] = useState({
    rename: false,
    remove: false
  });
  useOnClickOutside(ref, () => setIsMenuOpen(false));

  const handleDeleteDoucument = () => {
    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .doc(id)
      .delete();
    setShowOptionModal({ ...showOptionModal, remove: false });
  };

  const handleRenameDoucument = () => {
    if (!input) return;
    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .doc(id)
      .update({
        'fileName': input
      });
    setShowOptionModal({ ...showOptionModal, rename: false });
    setInput(input);
    setUpdatefileName(input);
  };

  const RemoveDocModal = (
    <Modal
      size='sm'
      active={showOptionModal.remove}
      toggler={() => setShowOptionModal({ ...showOptionModal, remove: false })}
    >
      <ModalBody>
        <h1>Are You Sure to delete the file?</h1>
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={() => {
            setShowOptionModal({ ...showOptionModal, remove: false });
            setInput(updatefileName);
          }}
          ripple='dark'
        >
          Cancel
        </Button>

        <Button
          color='blue'
          onClick={() => handleDeleteDoucument()}
          ripple='light'
        >
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  );

  const RenameDocModal = (
    <Modal
      size='sm'
      active={showOptionModal.rename}
      toggler={() => setShowOptionModal({ ...showOptionModal, rename: false })}
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
            (e) => e.key === 'Enter' && handleRenameDoucument()
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={() => {
            setShowOptionModal({ ...showOptionModal, rename: false });
            setInput(updatefileName);
          }}
          ripple='dark'
        >
          Cancel
        </Button>

        <Button
          color='blue'
          onClick={() => handleRenameDoucument()}
          ripple='light'
        >
          Rename
        </Button>
      </ModalFooter>
    </Modal>
  );

  const handleOpenDoc = () => {
    setShowLoader(true);
    router.push(`/docs/${id}`).then(() => setShowLoader(false));
    db.collection('userDocs')
      .doc(session.user.email)
      .collection('docs')
      .doc(id)
      .update({
        openedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  return (
    <>
      {showLoader && <Loading />}
      <div
        className='flex relative items-center justify-between rounded-full select-none
       hover:bg-blue-100 cursor-pointer text-gray-700 px-3 py-1'
      >
        <div
          className='flex items-center w-full'
          onClick={handleOpenDoc}
        >
          <Icon name='article' size='3xl' color='blue' />
          <p className='flex-grow pl-5 w-10 pr-10 truncate text-md font-semibold'>{updatefileName}</p>
          <p className='mr-28 text-sm z-0'>{moment(date?.toDate()).calendar()}</p>
        </div>

        <div ref={ref}>
          <Button
            color='dark'
            buttonType='link'
            iconOnly
            rounded
            ripple='dark'
            className='hover:bg-gray-100'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name='more_vert' size='3xl' />
          </Button>

          {showOptionModal.rename && RenameDocModal}
          {showOptionModal.remove && RemoveDocModal}

          <Menu open={isMenuOpen} onClose={setIsMenuOpen}>
            <MenuItem
              onClick={() => {
                setShowOptionModal({ ...showOptionModal, rename: true });
              }}
            >
                <span className='pr-3'>
                  <Icon name='text_fields' size='2xl' />
                </span>
              <p>Rename</p>
            </MenuItem>

            <MenuItem
              onClick={() => {
                setShowOptionModal({ ...showOptionModal, remove: true });
              }}
            >
                <span className='pr-3'>
                  <Icon name='delete' size='2xl' />
                </span>
              <p>Remove</p>
            </MenuItem>

            <a href={`/docs/${id}`} target='_blank' rel='noreferrer'>
              <div
                className='menu-item'
              >
                <span className='pr-3'>
                  <Icon name='launch' size='2xl' />
                </span>
                <p className='whitespace-nowrap'>Open in new tab</p>
              </div>
            </a>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default DocumentRow;