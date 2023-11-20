import { MyAPP2Data } from "../../pages/Dashboard";
import {
  Container,
  Description,
  Amount,
  Footer,
  Date,
} from "./styles";

type Props = {
  data: MyAPP2Data;
};

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>Vendedor: {data.sellerCPF}</Description>
      <Description>Produto: {data.product}</Description>
      <Amount>R${data.amount}</Amount>
      <Footer>
        <Date>Data: {data.soldDate}</Date>
      </Footer>
    </Container>
  );
}
