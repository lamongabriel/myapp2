import AsyncStorage from
  "@react-native-async-storage/async-storage";

import { SPENDING_COLLECTION } from "../StorageConfig";
import { spendingGetAll } from "./spendingGetAll";
import { MyAPP2Data } from "../../pages/Dashboard";

export async function spendingCreate(newSpending: MyAPP2Data) {
  try {
    const storageSpending = await spendingGetAll()

    const storage = [...storageSpending, newSpending]

    const data = await AsyncStorage.setItem(SPENDING_COLLECTION,
      JSON.stringify(storage))
    return data
  } catch (error) {
    console.log(error)
    throw error;
  }
}