import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        background: '#6ac045',
        textAlign: 'center',
        position: 'fixed',
        bottom: '0',
        width: '100%',
      }}
    >
      <p className="text-dark py-1 mb-0">
        © {new Date().getFullYear()} <strong>Yuppy</strong> | All Rights
        Reserved
      </p>
    </footer>
  );
};

export default Footer;
