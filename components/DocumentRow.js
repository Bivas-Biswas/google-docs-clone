import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import Input from '@material-tailwind/react/Input';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useRef, useState } from 'react';

import useOnClickOutside from '../hooks/useOnClickOutside';
import db from '../utils/firebase';
import Loading from './Loading';

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  const [session] = useSession();
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [input, setInput] = useState(fileName);
  const [updatefileName, setUpdatefileName] = useState(fileName);
  const [showRenameModal, setShowRenameModal] = useState({
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
    setShowRenameModal({ ...showRenameModal, remove: false });
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
    setShowRenameModal({ ...showRenameModal, rename: false });
    setInput(input);
    setUpdatefileName(input);
  };

  const DeleDocModal = (
    <Modal
      size='sm'
      active={showRenameModal.remove}
      toggler={() => setShowRenameModal({ ...showRenameModal, remove: false })}
    >
      <ModalBody>
        <h1>Are You Sure to delete the file?</h1>
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={() => {
            setShowRenameModal({ ...showRenameModal, remove: false });
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
      active={showRenameModal.rename}
      toggler={() => setShowRenameModal({ ...showRenameModal, rename: false })}
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
            (e) => e.key === 'Enter' && handleRenameDoucument()
          }
        />
      </ModalBody>
      <ModalFooter>
        <Button
          color='blue'
          buttonType='link'
          onClick={() => {
            setShowRenameModal({ ...showRenameModal, rename: false });
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
    setShowLoader(true)
    router.push(`/docs/${id}`).then(() => setShowLoader(false))
  }

  return (
    <>
      {showLoader && <Loading />}
      <div
        className='flex relative items-center justify-between rounded pl-1 select-none
       hover:bg-blue-100 cursor-pointer text-gray-700 p-0'
      >
        <div
          className='flex items-center w-full'
          onClick={handleOpenDoc}
        >
          <Icon name='article' size='3xl' color='blue' />
          <p className='flex-grow pl-5 w-10 pr-10 truncate text-base'>{updatefileName}</p>
          <p className='pr-5 text-sm z-0'>{moment(date?.toDate()).calendar()}</p>
        </div>

        <div ref={ref}>
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

          {RenameDocModal}
          {DeleDocModal}

          {
            isMenuOpen && (
              <div className='menu'>
                <div
                  className='menu-item'
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowRenameModal({ ...showRenameModal, rename: true });
                  }}
                >
                <span className='pr-3'>
                  <Icon name='text_fields' size='2xl' />
                </span>
                  <p>Rename</p>
                </div>

                <div
                  className='menu-item'
                  onClick={() => {
                    setShowRenameModal({ ...showRenameModal, remove: true });
                    setIsMenuOpen(false);
                  }}
                >
                <span className='pr-3'>
                  <Icon name='delete' size='2xl' />
                </span>
                  <p>Remove</p>
                </div>

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
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default DocumentRow;