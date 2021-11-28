import React from 'react';
import { Container } from 'react-bootstrap';
import CompInteractionCard from './CompInteractionCard';
import ConnectWalletModal from '../../components/ConnectWalletModal';
import useWalletConnectionModal from '../../hooks/useWalletConnectionModal';
import isMobile from '../../hooks/useIsMobile';

const Home = () => {
  const { isWalletConnectModalOpen } = useWalletConnectionModal();

  const interactionCardStyles = {
    paddingTop: !isMobile ? '100px' : 0,
  }

  return (
    <Container className="mt-5">
      {isWalletConnectModalOpen && <ConnectWalletModal />}
      <div style={interactionCardStyles}>
        <CompInteractionCard />
      </div>
    </Container>
  );
};

export default Home;
