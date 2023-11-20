import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Transactions, TextCard } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert, FlatList } from "react-native";
import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { SpendingStorageDTO } from "../../storage/spending/SpendingStorageDTO";
import { TransactionExpenses } from "../../components/TransactionExpenses";

export function SearchExpenses() {
  const [supplier, setSupplier] = useState("");
  const [taxCode, setTaxCode] = useState("");

  const [dataExpenses, setDataExpenses] = useState<SpendingStorageDTO[]>([]);
  const [totalTax, setTotalTax] = useState(0);

  async function handleSearchSpending() {
    if (supplier.trim() === "" || taxCode.trim() === "") {
      return Alert.alert("Por favor preencha os campos.");
    }

    const data = await spendingGetAll();

    const filteredValues = data.filter(item => {      
      return item.codeInvoice === Number(taxCode) && item.supplier === supplier.trim()
    })

    const sum = filteredValues.reduce((prev, cur) => {
      return prev + (cur?.amountInvoice ?? 0)
    }, 0)

    setTotalTax(sum);
    setDataExpenses(filteredValues);
  }

  return (
    <Container>
      <Header title="Pesquisa Gastos" />

      <Input
        placeholder="Fornecedor"
        placeholderTextColor="#363F5F"
        value={supplier}
        onChangeText={(value) => setSupplier(value)}
      />

      <Input
        placeholder="Código do Imposto"
        placeholderTextColor="#363F5F"
        value={supplier}
        onChangeText={(value) => setTaxCode(value)}
      />  

      <Button title="Pesquisa" onPress={handleSearchSpending} />

      {totalTax != 0 && (
        <TextCard>{`Total de Gastos: R$ ${totalTax}`}</TextCard>
      )}

      <Transactions>
        <FlatList
          data={dataExpenses}
          renderItem={({ item }) => <TransactionExpenses data={item} />}
        />
      </Transactions>
    </Container>
  );
}
