import { useContract } from './useContract';
import C_TOKEN_ABI from '../static/cEthABI';
import VENDOR_ABI from '../static/vendorABI';
import useIsValidNetwork from '../hooks/useIsValidNetwork';
import { useWeb3React } from '@web3-react/core';
import { useAppContext } from '../AppContext';
import { formatUnits, parseEther } from '@ethersproject/units';
import { useEffect } from 'react';

export const useCToken = () => {
  const { account } = useWeb3React();
  const { isValidNetwork } = useIsValidNetwork();
  //const cTokenContractAddress = '0xd6801a1dffcd0a410336ef88def4320d6df1883e'; // rinkeby
  const cTokenContractAddress = '0xBc3F9EE5e88B3A13779CA25fb4F11cE2F453568C';
  //const cTokenContract = useContract(cTokenContractAddress, C_TOKEN_ABI);
  const cTokenContract = useContract(cTokenContractAddress, VENDOR_ABI);
  const { setCTokenBalance, setExchangeRate, setTxnStatus, cTokenBalance, exchangeRate } = useAppContext();

  const fetchCTokenBalance = async () => {
    const cTokenBalance = await cTokenContract.balanceOf(account);
    // setCTokenBalance(formatUnits(cTokenBalance, 8));
    setCTokenBalance(formatUnits(cTokenBalance, 18));
  };

  const getCTokenExchangeRate = async () => {
    let exchangeRateCurrent = await cTokenContract.callStatic.getLatestTokensPerEth();
    console.log(exchangeRateCurrent.toString());
    // exchangeRateCurrent = exchangeRateCurrent.toNumber() / 10000;
    setExchangeRate(exchangeRateCurrent);
    return;

    try {
      let exchangeRateCurrent = await cTokenContract.callStatic.exchangeRateCurrent();
      exchangeRateCurrent = exchangeRateCurrent / Math.pow(10, 18 + 18 - 8);
      setExchangeRate(exchangeRateCurrent);
    } catch (error) {
      console.log(error);
    }
  };

  const deposit = async (amount) => {
    if (account && isValidNetwork) {
      try {
        setTxnStatus('LOADING');
        const txn = await cTokenContract.buyTokens({
          from: account,
          value: parseEther(amount),
        });
        await txn.wait(1);
        await fetchCTokenBalance();
        setTxnStatus('COMPLETE');
      } catch (error) {
        setTxnStatus('ERROR');
      }
      return;


      try {
        setTxnStatus('LOADING');
        const txn = await cTokenContract.mint({
          from: account,
          value: parseEther(amount),
        });
        await txn.wait(1);
        await fetchCTokenBalance();
        setTxnStatus('COMPLETE');
      } catch (error) {
        setTxnStatus('ERROR');
      }
    }
  };

  useEffect(() => {
    if (account) {
      getCTokenExchangeRate();
    }
  }, [account]);

  return {
    cTokenBalance,
    exchangeRate,
    getCTokenExchangeRate,
    fetchCTokenBalance,
    deposit,
  };
};
