import {
  Container,
  Description,
  Amount,
  Local,
  Footer,
  Category,
  Date,
} from "./styles";

import { SpendingStorageDTO } from "../../storage/spending/SpendingStorageDTO";

type Props = {
  data: SpendingStorageDTO;
};

export function TransactionExpenses({ data }: Props) {
  return (
    <Container>
      <Description>{data.invoice}</Description>
      <Description>{data.product}</Description>
      <Amount>{data.amountInvoice}</Amount>
      <Local>{data.codeInvoice}</Local>
      <Footer>
        <Category>{data.supplier}</Category>
        <Date>{data.dateInvoice}</Date>
      </Footer>
    </Container>
  );
}
