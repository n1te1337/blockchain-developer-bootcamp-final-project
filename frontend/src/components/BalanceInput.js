import React from 'react';
import styled from 'styled-components';
import CryptoIcon from "react-crypto-icons";
import Text from './Text';
import { colors } from '../theme';

const InputContainer = styled.div`
  padding: 10px;
  input {
    width: 100%;
    padding: 5px;
  }
`;

const IconWrapper = styled.div`
  align-items: center;
`;

const IconMapping = {
  eth: (
    <IconWrapper style={{ alignItems: 'center', minWidth: '90px' }} className="d-flex">
      <span style={{ verticalAlign: 'bottom' }}><CryptoIcon name="eth" size={25} /></span>
      <Text style={{ paddingLeft: '6px', verticalAlign: 'sub' }} color={colors.dark}>ETH</Text>
    </IconWrapper>
  ),
  acme: (
    <IconWrapper style={{ alignItems: 'center', minWidth: '90px' }} className="d-flex">
      <span style={{ verticalAlign: 'bottom', minWidth: '30px' }}><CryptoIcon name="generic" size={25} /></span>
      <Text style={{ paddingLeft: '6px', verticalAlign: 'sub' }} color={colors.dark}>ACME</Text>
    </IconWrapper>
  ),
};

const BalanceInput = ({ balance, value, setValue, currency, disabled = false }) => {
  return (
    <InputContainer>
      <div className="input-group input-group-lg">
        <span style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 0 }} className="input-group-text">
          {IconMapping[currency.toLowerCase()]}
        </span>
        <input
          type="number"
          className="form-control"
          style={{ paddingLeft: '1.5rem' }}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            if (setValue && e.target.value >= 0) {
              setValue(e.target.value);
            }
          }}
        />
      </div>
    </InputContainer>
  );
};

export default BalanceInput;
