import React, { useEffect } from 'react';
import { ListGroup, Badge } from 'react-bootstrap';
import CryptoIcon from "react-crypto-icons";
import Text from './Text';
import Card from './Card';
import { colors } from '../theme';
import { useWeb3React } from '@web3-react/core';
import useEth from '../hooks/useEth';
import { useACMEToken } from '../hooks/useACMEToken';
import isMobile from '../hooks/useIsMobile';
import { useAppContext } from '../AppContext';

const BalanceCard = () => {
  const { account } = useWeb3React();
  const { fetchEthBalance, ethBalance } = useEth();
  const { fetchACMETokenBalance, acmeTokenBalance } = useACMEToken();

  useEffect(() => {
    if (account) {
      fetchEthBalance();
      fetchACMETokenBalance();
    }
  }, [account]);

  return (
    <Card style={{ maxWidth: !isMobile() ? 230 : '100%', padding: 0, marginTop: '15px' }}>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <span style={{ verticalAlign: 'middle' }}><CryptoIcon name="eth" size={25} /></span>
          <Text style={{ paddingLeft: '6px', verticalAlign: 'sub' }} t4 color={colors.black}>{' ETH'}</Text>
          <Text style={{ float: 'right', marginRight: '10px', verticalAlign: 'middle' }} t3 color={colors.black}>
            {ethBalance}
          </Text>
        </ListGroup.Item>
        <ListGroup.Item>
          <span style={{ verticalAlign: 'middle' }}><CryptoIcon name="generic" size={25} /></span>
          <Text style={{ paddingLeft: '6px', verticalAlign: 'sub' }} t4 color={colors.black}>{' ACME'}</Text>
          <Text style={{ float: 'right', marginRight: '10px', verticalAlign: 'middle' }} t3 color={colors.black}>
            {acmeTokenBalance}
          </Text>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default BalanceCard;
