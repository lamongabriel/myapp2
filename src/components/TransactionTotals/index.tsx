import { TotalsByCode } from "../../pages/ListTotals";
import {
  Container,
  Description,
  Amount,
  Small,
} from "./styles";

type Props = {
  data: TotalsByCode;
};

export function TransactionTotals({ data }: Props) {
  return (
    <Container>
      <Description>Vendedor: {data.code}</Description>
      <Amount>R${data.totalValue.toFixed(2)}</Amount>
      
      <Small>Veículos: {data.vehicles}</Small>
    </Container>
  );
}
