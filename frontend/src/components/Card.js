import { Card as BootstrapCard } from 'react-bootstrap';
import styled from 'styled-components';
import { colors } from '../theme';

const Card = styled(BootstrapCard)`
  background-color: ${colors.white};
  width: 100%;
  box-shadow: 0 0 0 1px rgb(63 63 68 / 5%), 0 1px 2px 0 rgb(63 63 68 / 15%);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms!important;
  border-radius: 4px;
  border-width: 0;
  padding: 20px;
`;

export default Card;
