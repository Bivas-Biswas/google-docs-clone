import React from 'react';

function Menu(props) {
  const { open, onClose, children } = props;

  const handleClick = () => {
    onClose(!open);
  };

  return (
    <div className='menu' onClick={handleClick}>
      {open && children}
    </div>
  );
}

export default Menu;