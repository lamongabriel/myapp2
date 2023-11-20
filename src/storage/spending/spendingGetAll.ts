import AsyncStorage from "@react-native-async-storage/async-storage";

import { SPENDING_COLLECTION } from "../StorageConfig";
import { MyAPP2Data } from "../../pages/Dashboard";

export async function spendingGetAll() {
  try {
    const storage = await AsyncStorage.
      getItem(SPENDING_COLLECTION)

    const spending: MyAPP2Data[] = storage
      ? JSON.parse(storage)
      : []
    return spending

  } catch (error) {
    throw error;
  }

}