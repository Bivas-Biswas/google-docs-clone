import React from 'react';

function Menu(props) {
  const { open, onClose, children } = props;

  const handleClick = () => {
    onClose(!open);
  };

  return (
    <>
      {
        open && (
          <div className='menu' onClick={handleClick}>
            {children}
          </div>
        )
      }
    </>
  );
}

export default Menu;