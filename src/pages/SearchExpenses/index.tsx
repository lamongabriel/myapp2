import { useState } from "react";
import { Header } from "../../components/Header";
import { Container, Transactions } from "./styles";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Alert, FlatList, Text } from "react-native";
import { spendingGetAll } from "../../storage/spending/spendingGetAll";

import { MyAPP2Data } from "../Dashboard";
import { TransactionExpensesWithTax } from "../../components/TransactionExpensesWithTax";

export function SearchExpenses() {
  const [client, setClient] = useState("");

  const [data, setData] = useState<MyAPP2Data[]>([]);

  async function handleSearchSpending() {
    const clientCode = client.trim()

    if(!clientCode) {
      return Alert.alert("Preencha o código do cliente.")
    }

    let storage = await spendingGetAll();

    storage = storage.filter(item => item.code === clientCode)

    setData(storage)
  }

  return (
    <Container>
      <Header title="Pesquisa" />

      {client && (
        <Text>
          Total de Carros do cliente {data.length}
        </Text>
      )}

      <Input
        placeholder="CPF"
        placeholderTextColor="#363F5F"
        value={client}
        onChangeText={(value) => setClient(value)}
      />

      <Button title="Pesquisa" onPress={handleSearchSpending} />

      <Transactions>
        <FlatList
          data={data}
          renderItem={({ item }) => <TransactionExpensesWithTax data={item} />}
        />
      </Transactions>
    </Container>
  );
}
