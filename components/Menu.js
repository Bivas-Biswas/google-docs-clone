import React from 'react';

function Menu(props) {
  const { open, setIsMenuOpen, children } = props;

  const handleClick = () => {
    setIsMenuOpen(!open);
  };

  return (
    <div className='menu' onClick={handleClick}>
      {open && children}
    </div>
  );
}

export default Menu;