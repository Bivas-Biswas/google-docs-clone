import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { useRouter } from 'next/router';

function DocumentRow({ id, fileName, date }) {
  const router = useRouter();
  return (
    <div
      className='flex items-center rounded pl-1
       hover:bg-gray-100 cursor-pointer text-gray-700'
      onClick={() => router.push(`/docs/${id}`)}
    >
      <Icon name='article' size='3xl' color='blue' />
      <p className='flex-grow pl-5 w-10 pr-10 truncate text-base'>{fileName}</p>
      <p className='pr-5 text-sm'>{date?.toDate().toLocaleDateString()}</p>

      <Button
        color='gray'
        buttonType='link'
        iconOnly
        rounded
        ripple='dark'
      >
        <Icon name='more_vert' size='3xl' />
      </Button>
    </div>
  );
}

export default DocumentRow;