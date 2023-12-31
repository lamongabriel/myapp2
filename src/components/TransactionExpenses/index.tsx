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
      <Description>Nome: {data.name}</Description>
      <Description>Cliente: {data.code}</Description>
      <Description>Cor: {data.color}</Description>
      <Amount>R${data.value}</Amount>
      <Footer>
        <Date>Data: {data.date}</Date>
      </Footer>
    </Container>
  );
}
