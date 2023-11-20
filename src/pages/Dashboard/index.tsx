import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { InputAmount } from "../../components/InputAmount";
import { InputDate } from "../../components/InputDate";
import { spendingCreate } from "../../storage/spending/spendingCreate";
import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { formatAmount } from "../../utils/formatAmount";
import { spendingCheckMaximumCPFs } from "../../storage/spending/spendingCheckMaximumCPFs";

export interface MyAPP2Data {
  sellerCPF: string
  product: string
  amount: number
  soldDate: string
}

export function Dashboard() {
  const [sellerCPF, setSellerCPF] = useState("");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [soldDate, setSoldDate] = useState("");

  function resetInputs() {
    setSellerCPF("");
    setProduct("");
    setAmount("");
    setSoldDate("");
  }

  async function handleAddNewSpending() {
    // limpa o AsyncStorage no ios
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // alert('O programa sera finalizado')
    // return

    // limpa o AsyncStorage no android
    // await AsyncStorage.clear();
    // alert("O programa sera finalizado");
    // return;

    if(!sellerCPF || !product || !amount || !soldDate) {
      return Alert.alert('Preencha todos os campos!')
    }

    const canCreateAnotherCPF = await spendingCheckMaximumCPFs(sellerCPF)

    if(!canCreateAnotherCPF) {
      return Alert.alert('Número máximo de CPFs atingidos')
    }

    const data: MyAPP2Data = {
      amount: formatAmount(amount),
      product,
      sellerCPF,
      soldDate
    };

    await spendingCreate(data);

    await spendingGetAll();
    Alert.alert('Criado com sucesso!')

    resetInputs()
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Container>
        <Header title="Cadastro" />

        <Input
          placeholder="CPF do Vendedor"
          placeholderTextColor="#363F5F"
          value={sellerCPF}
          onChangeText={(value) => setSellerCPF(value)}
        />

        <Input
          placeholder="Produto"
          placeholderTextColor="#363F5F"
          value={product}
          onChangeText={(value) => setProduct(value)}
        />

        <InputAmount
          placeholder="Valor da Venda"
          placeholderTextColor="#363F5F"
          value={amount}
          onChangeText={(value) => setAmount(value)}
        />

        <InputDate
          placeholder="Data da Nota Fiscal"
          placeholderTextColor="#363F5F"
          value={soldDate}
          onChangeText={(value) => setSoldDate(value)}
        />

        <Button title="Adicionar" onPress={handleAddNewSpending} />
      </Container>
    </TouchableWithoutFeedback>
  );
}
