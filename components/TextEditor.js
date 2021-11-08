import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import firebase from 'firebase/compat/app';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { useEffect, useState } from 'react';

import db from '../utils/firebase';

const Editor = dynamic(
  () => import('react-draft-wysiwyg')
    .then((module) => module.Editor), {
    ssr: false
  }
);

function TextEditor({ editorData }) {

  const [session] = useSession();
  const router = useRouter();
  const { docId } = router.query;

  const [editorState, setEditorstate] = useState(EditorState.createEmpty());

  useEffect(() => {
    if (editorData) {
      setEditorstate(EditorState.createWithContent(convertFromRaw(editorData)));
    }
  }, []);

  const handleEditorStateChange = (currState) => {
    setEditorstate(currState);
    db
      .collection('userDocs')
      .doc(session.user.email)
      .collection('docs').doc(docId).update({
      editorState: convertToRaw(editorState?.getCurrentContent()),
      modifiedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  };

  return (
    <div className='bg-[#F8F9FA] min-h-screen pb-6'>
      <Editor
        toolbarClassName='!flex !sticky !top-0 !z-50 !justify-center mx-auto'
        editorClassName='mt-6 p-10 bg-white shadow-lg max-w-3xl mx-auto min-h-screen'
        editorState={editorState}
        onEditorStateChange={handleEditorStateChange}
      />
    </div>
  );
}

export default TextEditor;
