import { useState } from "react";
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

export interface MyAPP2Data {
  date: string
  name: string
  code: string
  color: string
  value: number
}

const ALLOWED_CODES = ["001394", "007788", "001020", "003040"]

export function Dashboard() {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState("");
  const [value, setValue] = useState("");
  
  function resetInputs() {
    setDate("");
    setName("");
    setCode("");
    setColor("");
    setValue("")
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

    if(!date || !name || !code || !color || !value) {
      return Alert.alert('Preencha todos os campos!')
    }

    if(!ALLOWED_CODES.includes(code)) {
      return Alert.alert("Código inválido!")
    }

    const data: MyAPP2Data = {
      code,
      color,
      date,
      name,
      value: formatAmount(value)
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

        <InputDate
          placeholder="Data da entrada do veículo"
          placeholderTextColor="#363F5F"
          value={date}
          onChangeText={(value) => setDate(value)}
        />

        <Input
          placeholder="Nome do veículo"
          placeholderTextColor="#363F5F"
          value={name}
          onChangeText={(value) => setName(value)}
        />

        <Input
          placeholder="Código do cliente"
          placeholderTextColor="#363F5F"
          value={code}
          onChangeText={(value) => setCode(value)}
        />

        <Input
          placeholder="Cor do veículo"
          placeholderTextColor="#363F5F"
          value={color}
          onChangeText={(value) => setColor(value)}
        />  

        <InputAmount
          placeholder="Valor do veículo"
          placeholderTextColor="#363F5F"
          value={value}
          onChangeText={(value) => setValue(value)}
        />

        <Button title="Adicionar" onPress={handleAddNewSpending} />
      </Container>
    </TouchableWithoutFeedback>
  );
}
