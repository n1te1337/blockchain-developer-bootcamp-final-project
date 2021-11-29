import React from 'react';
import isMobile from '../hooks/useIsMobile';

const Footer = () => {
  const footerStyles = {
    position: !isMobile() ? 'absolute' : 'static',
    bottom: 0,
    width: '100%',
    lineHeight: '60px',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  return (
    <footer style={footerStyles} className="footer">
      <div className="container">
        <span className="text-muted">Copyright &copy; {new Date().getFullYear()} ACME Corporation. {!isMobile() && 'All Rights Reserved'}</span>
      </div>
    </footer>
  );
};

export default Footer;
