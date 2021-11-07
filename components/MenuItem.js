import React from 'react';

function MenuItem(props) {
  const { onClick, children } = props;
  return (
    <div onClick={onClick} className='menu-item'>
      {children}
    </div>
  );
}

export default MenuItem;