import { useState, useEffect } from "react";

import { Header } from "../../components/Header";

import { FlatList } from "react-native";

import { Container, Transactions } from "./styles";

import { TransactionExpenses } from "../../components/TransactionExpenses";

import { spendingGetAll } from "../../storage/spending/spendingGetAll";

import { MyAPP2Data } from "../Dashboard";
import { useIsFocused } from "@react-navigation/native";

export function ListExpenses() {
  const isFocused = useIsFocused();

  const [dataExpenses, setListExpenses] = useState<MyAPP2Data[]>([]);

  async function loadDataSpending() {
    const data = await spendingGetAll();
    setListExpenses(data);
  }

  useEffect(() => {
    if (isFocused) {
      loadDataSpending();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header title="Listagem" />

      <Transactions>
        <FlatList
          data={dataExpenses}
          renderItem={({ item }) => <TransactionExpenses data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
