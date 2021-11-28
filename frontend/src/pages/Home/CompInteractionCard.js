import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { BagCheck, Check2Circle, EmojiFrown, ArrowLeft } from 'react-bootstrap-icons';
import CryptoIcon from "react-crypto-icons";
import Text from '../../components/Text';
import BalanceInput from '../../components/BalanceInput';
import Card from '../../components/Card';
import Button from 'react-bootstrap/Button';
import { colors } from '../../theme';
import { ArrowDown } from 'react-bootstrap-icons';
import { useACMEToken } from '../../hooks/useACMEToken';
import { useAppContext } from '../../AppContext';
import Spinner from 'react-bootstrap/Spinner';
import useEth from '../../hooks/useEth';
import useTransaction from '../../hooks/useTransaction';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
  overflow: hidden auto;
  z-index: 1;
`;

const CompInteractionCard = () => {
  const [depositAmount, setDepositAmount] = useState(0);
  const { setWalletConnectModal } = useAppContext();
  const { deposit, acmeTokenBalance, exchangeRate } = useACMEToken();
  const { ethBalance } = useEth();
  const { txnStatus, setTxnStatus } = useTransaction();

  const convertedAmount = useMemo(() => Number(depositAmount * exchangeRate), [depositAmount, exchangeRate]);

  const handleDepositSubmit = () => {
    if (depositAmount > 0) {
      deposit(depositAmount);
    }
  }

  useEffect(() => {
    if (!!depositAmount && !exchangeRate) {
      setWalletConnectModal(true);
    }
  }, [depositAmount])

  if (txnStatus === 'APPROVING') {
    return (
      <Container show>
        <Card style={{ maxWidth: 420, minHeight: 390, paddingTop: 36, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <CryptoIcon name="generic" size={45} />
          </div>
          <Text block center t3 className="mt-4">
            Please approve the transaction in your wallet
          </Text>
          <Spinner animation="grow" role="status" variant="primary" className="m-auto" />
        </Card>
      </Container>
    );
  }

  if (txnStatus === 'CONFIRMING') {
    return (
      <Container show>
        <Card style={{ maxWidth: 420, minHeight: 390, paddingTop: 36, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <CryptoIcon name="generic" size={45} />
          </div>
          <Text block center t3 className="mt-4">
            Confirming the transaction on Ethereum blockchain
          </Text>
          <Spinner animation="border" role="status" variant="primary" className="m-auto" />
        </Card>
      </Container>
    );
  }

  if (txnStatus === 'COMPLETE') {
    return (
      <Container show>
        <Card style={{ maxWidth: 420, minHeight: 390, paddingTop: 36, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <CryptoIcon name="generic" size={45} />
          </div>
          <Text block center t3 className="mt-4">
            Success! Enjoy your ACME tokens
          </Text>
          <div style={{ marginTop: 58, textAlign: 'center' }}>
            <Check2Circle style={{ color: colors.blue }} size={48} />
          </div>
          <Button onClick={() => setTxnStatus('NOT_SUBMITTED')} style={{ marginTop: '4rem' }} size="lg">
            <ArrowLeft style={{ verticalAlign: 'middle' }} /> Go back
          </Button>
        </Card>
      </Container>
    );
  }

  if (txnStatus === 'ERROR') {
    return (
      <Container show>
        <Card style={{ maxWidth: 420, minHeight: 390, paddingTop: 36, marginBottom: 48 }}>
          <div style={{ textAlign: 'center' }}>
            <CryptoIcon name="generic" size={45} />
          </div>
          <Text block center t3 className="mt-4">
            The transaction failed, check your wallet for additional information
          </Text>
          <div style={{ marginTop: 58, textAlign: 'center' }}>
            <EmojiFrown style={{ color: colors.red }} size={48} />
          </div>
          <Button onClick={() => setTxnStatus('NOT_SUBMITTED')} style={{ marginTop: '4rem' }} size="lg">
            <ArrowLeft style={{ verticalAlign: 'middle' }} /> Go back
          </Button>
        </Card>
      </Container>
    );
  }

  return (
    <Container show>
      <Card style={{ maxWidth: 420, minHeight: 390, marginBottom: 48 }}>
        <Text style={{ textAlign: 'center' }} t2 color={colors.dark} className="mb-3">EXCHANGE</Text>
        <BalanceInput balance={ethBalance} value={!depositAmount ? Number(depositAmount).toFixed(4) : depositAmount} setValue={setDepositAmount} currency="eth" />
        <ArrowDown color={colors.dark} size={36} style={{ margin: '0.75rem auto' }} />
        <BalanceInput balance={acmeTokenBalance} value={!convertedAmount ? Number(convertedAmount).toFixed(4) : convertedAmount} currency="acme" />
        <Button style={{ margin: '2.25rem 0.5rem 0 0.5rem' }} variant="primary" size="lg" onClick={handleDepositSubmit}>
          <BagCheck style={{ verticalAlign: 'baseline', paddingTop: '1px' }} /> Confirm
        </Button>
      </Card>
    </Container>
  );
};

export default CompInteractionCard;
