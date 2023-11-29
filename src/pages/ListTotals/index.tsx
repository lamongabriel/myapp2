import { useState, useEffect } from "react";

import { Header } from "../../components/Header";

import { FlatList } from "react-native";

import { Container, Transactions } from "./styles";

import { spendingGetAll } from "../../storage/spending/spendingGetAll";

import { useIsFocused } from "@react-navigation/native";
import { TransactionTotals } from "../../components/TransactionTotals";

export interface TotalsByCode {
  code: string
  vehicles: number
  totalValue: number
}

export function ListTotals() {
  const isFocused = useIsFocused();

  const [totals, setTotals] = useState<TotalsByCode[]>([]);

  async function loadData() {
    const data = await spendingGetAll();

    const totalsByCode: { [code: string]: TotalsByCode } = {};

    // Calculates totalSale
    data.forEach(sale => {
      const { code, value } = sale

      if(!totalsByCode[code]) {
        totalsByCode[code] = {
          totalValue: value * 1.02,
          vehicles: 1,
          code
        };

        return
      }

      totalsByCode[code].vehicles ++
      totalsByCode[code].totalValue += (value * 1.02) 
    })

    setTotals(Object.values(totalsByCode));
  }

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);

  return (
    <Container>
      <Header title="Totais" />

      <Transactions>
        <FlatList
          data={totals}
          renderItem={({ item }) => <TransactionTotals data={item} />}
          showsVerticalScrollIndicator={false}
        />
      </Transactions>
    </Container>
  );
}
