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
  const [supplier, setsupplier] = useState("");
  const [dataExpenses, setDataExpenses] = useState<SpendingStorageDTO[]>([]);
  const [addSupplier, setAddSupplier] = useState(0);

  async function handleSearchSpending() {
    if (supplier.trim() === "") {
      return Alert.alert("Pesquisa de Gastos");
    }
    const data = await spendingGetAll();
    const newDatda = data.filter(
      (item) =>
        item.codeInvoice === parseFloat(supplier) ||
        item.supplier == supplier.trim()
    );
    console.log(newDatda);

    function Calculate(total: number, item: SpendingStorageDTO) {
      return total + item.amountInvoice;
    }

    const soma = newDatda
      .filter((item) => item.amountInvoice)
      .reduce(Calculate, 0);

    setAddSupplier(soma);
    setDataExpenses(newDatda);
  }

  return (
    <Container>
      <Header title="Pesquisa Gastos" />

      <Input
        placeholder="Código ou Forncedor"
        placeholderTextColor="#363F5F"
        value={supplier}
        onChangeText={(value) => setsupplier(value)}
      />

      <Button title="Pesquisa" onPress={handleSearchSpending} />

      {addSupplier != 0 && (
        <TextCard>{`Total de Gastos: R$ ${addSupplier}`}</TextCard>
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
