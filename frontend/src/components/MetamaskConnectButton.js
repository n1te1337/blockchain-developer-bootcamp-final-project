import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import MMLogo from '../static/metamask-logo.svg';
import Text from './Text';
import Card from './Card';
import { injected } from '../connectors';
import { shortenAddress } from '../utils/shortenAddress';
import isMobile from '../hooks/useIsMobile';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const ConnectBtn = styled(Button).attrs({ variant: 'primary' })``;

const MetamaskConnectButton = () => {
  const { activate, active, account, deactivate } = useWeb3React();
  const { logout } = useAppContext();

  const disconnect = () => {
    deactivate();
    logout();
  }

  if (active) {
    return (
      <Card style={{ marginTop: '15px', width: !isMobile() ? 370 : '100%' }} className="d-flex flex-row justify-content-between">
        <MetamaskLogo />
        <Text color="dark" t3 lineHeight="40px" className="mx-4">
          {shortenAddress(account).toLocaleLowerCase()}
        </Text>
        <ConnectBtn onClick={disconnect}>Disconnect</ConnectBtn>
      </Card>
    );
  }

  return (
    <Card style={{ marginTop: '15px', width: !isMobile() ? 192 : '100%' }} className="d-flex flex-row justify-content-between">
      <MetamaskLogo />
      <ConnectBtn onClick={() => activate(injected)}>
        Connect
      </ConnectBtn>
    </Card>
  );
};

export default MetamaskConnectButton;
