import React from 'react';

const footerStyles = {
  position: 'absolute',
  bottom: 0,
  width: '100%',
  height: '60px',
  lineHeight: '60px',
  backgroundColor: '#fff',
  textAlign: 'center',
};

const Footer = () => {
  return (
    <footer style={footerStyles} className="footer">
      <div className="container">
        <span className="text-muted">Copyright &copy; {new Date().getFullYear()} ACME Corporation. All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
