import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, FlatList } from "react-native";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Container } from "./styles";
import { InputAmount } from "../../components/InputAmount";
import { InputDate } from "../../components/InputDate";
import { spendingCreate } from "../../storage/spending/spendingCreate";
import { spendingGetAll } from "../../storage/spending/spendingGetAll";
import { formatAmount } from "../../utils/formatAmount";
export function Dashboard() {
  const [invoice, setInvoice] = useState("");
  const [product, setProduct] = useState("");
  const [amountInvoice, setamountInvoice] = useState("");
  const [codeInvoice, setcodeInvoice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [dateInvoice, setdateInvoice] = useState("");

  async function handleAddNewSpending() {
    // limpa o AsyncStorage no ios
    // AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove)
    // alert('O programa sera finalizado')
    // return

    // limpa o AsyncStorage no android
    // await AsyncStorage.clear();
    // alert("O programa sera finalizado");
    // return;

    const data = {
      invoice,
      product,
      amountInvoice: formatAmount(amountInvoice),
      codeInvoice: parseFloat(codeInvoice),
      supplier,
      dateInvoice,
    };
    await spendingCreate(data);
    if (
      codeInvoice === "1708" ||
      codeInvoice === "3770" ||
      codeInvoice === "3746" ||
      supplier == "totvs" ||
      supplier == "tot"
    ) {
      setInvoice("");
      setamountInvoice("");
      setcodeInvoice("");
      setSupplier("");
      setdateInvoice("");
      setProduct("");
      const result = await spendingGetAll();
      console.log(result);
    } else {
      Alert.alert(
        "Código Inválido ou fornecedor.",
        "O código ou fornecedor não está cadastrado."
      );
    }
  }

  return (
    <Container>
      <Header title="Cadastro" />

      <Input
        placeholder="Nota Fiscal"
        placeholderTextColor="#363F5F"
        value={invoice}
        onChangeText={(value) => setInvoice(value)}
      />
      <Input
        placeholder="Produto"
        placeholderTextColor="#363F5F"
        value={product}
        onChangeText={(value) => setProduct(value)}
      />

      <Input
        placeholder="Código do Imposto"
        placeholderTextColor="#363F5F"
        value={codeInvoice}
        onChangeText={(value) => setcodeInvoice(value)}
      />

      <InputAmount
        placeholder="Valor do Imposto"
        placeholderTextColor="#363F5F"
        value={amountInvoice}
        onChangeText={(value) => setamountInvoice(value)}
      />

      <Input
        placeholder="Fornecedor"
        placeholderTextColor="#363F5F"
        value={supplier}
        onChangeText={(value) => setSupplier(value)}
      />

      <InputDate
        placeholder="Data da Nota Fiscal"
        placeholderTextColor="#363F5F"
        value={dateInvoice}
        onChangeText={(value) => setdateInvoice(value)}
      />

      <Button title="Adicionar" onPress={handleAddNewSpending} />
    </Container>
  );
}
