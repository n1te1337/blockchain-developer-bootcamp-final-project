import React from 'react';
import isMobile from '../hooks/useIsMobile';

const Footer = () => {
  const footerStyles = {
    position: !isMobile() ? 'absolute' : 'static',
    bottom: 0,
    width: '100%',
    lineHeight: !isMobile() ? '60px' : '48px',
    backgroundColor: '#fff',
    textAlign: 'center',
  };

  return (
    <footer style={footerStyles} className="footer">
      <div className="container">
        <span className="text-muted">Copyright &copy; {new Date().getFullYear()} ACME Corporation{isMobile() ? <br /> : '. '}All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
