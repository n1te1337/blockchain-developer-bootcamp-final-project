import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import { useWeb3React } from '@web3-react/core';
import MMLogo from '../static/metamask-logo.svg';
import Text from './Text';
import { injected } from '../connectors';
import Modal from 'react-bootstrap/Modal';
import useWalletConnectionModal from '../hooks/useWalletConnectionModal';

const MetamaskLogo = styled.img.attrs({
  src: MMLogo,
})`
  height: 40px;
`;

const ConnectWalletModal = () => {
  const { activate } = useWeb3React();
  const { setWalletConnectModal } = useWalletConnectionModal();
  return (
    <Modal show onHide={() => setWalletConnectModal(false)}>
      <Modal.Header style={{ justifyContent: 'start' }} closeButton>
        <MetamaskLogo />
        <Text style={{ marginLeft: '1rem' }} color="dark" t3 lineHeight="40px">
          Connect your Metamask wallet
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Text block className="mb-3">
          In order to use this decentralized application you must connect a web3 enabled wallet
        </Text>
        <Button style={{ float: 'right' }} variant="primary" onClick={() => activate(injected)}>
          Connect
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectWalletModal;
