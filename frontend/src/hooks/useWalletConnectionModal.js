import { useEffect } from 'react';
import useIsValidNetwork from './useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';

function useWalletConnectionModal() {
  const { isValidNetwork } = useIsValidNetwork();
  const { active } = useWeb3React();

  const { setWalletConnectModal, isWalletConnectModalOpen } = useAppContext();

  useEffect(() => {
    if (active && isValidNetwork) {
      setWalletConnectModal(false);
    }
  }, [active, isValidNetwork]);

  return {
    isWalletConnectModalOpen,
    setWalletConnectModal,
  };
}

export default useWalletConnectionModal;
