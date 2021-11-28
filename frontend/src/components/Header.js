import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { useMediaQuery } from 'react-responsive'
import MetamaskConnectButton from './MetamaskConnectButton';
import BalancesCard from './BalancesCard';

const Header = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 640px)' })

  if (isMobile) {
    return (
      <Navbar style={{ flexDirection: 'column-reverse' }}>
        <BalancesCard />
        <MetamaskConnectButton />
      </Navbar>
    );
  }

  return (
    <Navbar style={{ alignItems: 'start' }} className="justify-content-between">
      <BalancesCard />
      <MetamaskConnectButton />
    </Navbar>
  );
};

export default Header;
