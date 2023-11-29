import { MyAPP2Data } from "../../pages/Dashboard";
import {
  Container,
  Description,
  Amount,
  Footer,
  Date,
} from "./styles";

interface Props {
  data: MyAPP2Data
}

export function TransactionExpensesWithTax({ data }: Props) {

  const tax = (data.value * 0.02).toFixed(2)

  return (
    <Container>
      <Description>Nome: {data.name}</Description>
      <Description>Cliente: {data.code}</Description>
      <Description>Cor: {data.color}</Description>
      <Amount>R${data.value}</Amount>
      <Footer>
        <Date>Data: {data.date}</Date>
        <Date>Imposto: R${tax}</Date>
      </Footer>
    </Container>
  );
}
