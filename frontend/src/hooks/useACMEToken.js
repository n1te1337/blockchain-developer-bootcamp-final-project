import { useEffect } from 'react';
import constants from '../constants';
import { useContract } from './useContract';
import useEth from './useEth';
import ACME_VENDOR_ABI from '../static/acmeVendorABI';
import useIsValidNetwork from './useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import { formatUnits, parseEther } from '@ethersproject/units';

export const useACMEToken = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  const { fetchEthBalance } = useEth();
  const {
    setWalletConnectModal,
    setACMETokenSupply,
    setACMETokenBalance,
    setExchangeRate,
    setTxnStatus,
    acmeTokenSupply,
    acmeTokenBalance,
    exchangeRate
  } = useAppContext();

  const acmeTokenContractAddress = constants.ACME_TOKEN_VENDOR_CONTRACT_ADDRESS;
  const acmeTokenContract = useContract(acmeTokenContractAddress, ACME_VENDOR_ABI);

  const fetchACMETokenSupply = async () => {
    const acmeTokenBalance = await acmeTokenContract.balanceOf(constants.ACME_TOKEN_VENDOR_CONTRACT_ADDRESS);
    setACMETokenSupply(formatUnits(acmeTokenBalance, 18));
  };

  const fetchACMETokenBalance = async () => {
    const acmeTokenBalance = await acmeTokenContract.balanceOf(account);
    setACMETokenBalance(formatUnits(acmeTokenBalance, 18));
  };

  const getACMETokenExchangeRate = async () => {
    const currentExchangeRate = await acmeTokenContract.callStatic.getLatestTokensPerEth();
    setExchangeRate(currentExchangeRate);
  };

  const deposit = async (amount) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus('APPROVING');
        const txn = await acmeTokenContract.buyTokens({
          from: account,
          value: parseEther(amount),
        });
        setTxnStatus('CONFIRMING');
        await txn.wait(1);
        await fetchEthBalance();
        await fetchACMETokenBalance();
        await fetchACMETokenSupply();
        setTxnStatus('COMPLETE');
      } catch (error) {
        setTxnStatus('ERROR');
      }
    } else {
      setWalletConnectModal(true);
    }
  };

  useEffect(() => {
    if (account) {
      getACMETokenExchangeRate();
      fetchACMETokenSupply();
    }
  }, [account]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (account) {
        fetchACMETokenSupply();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [account]);

  return {
    acmeTokenSupply,
    acmeTokenBalance,
    exchangeRate,
    getACMETokenExchangeRate,
    fetchACMETokenSupply,
    fetchACMETokenBalance,
    deposit,
  };
};
