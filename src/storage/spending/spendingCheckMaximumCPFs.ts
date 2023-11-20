import { spendingGetAll } from "./spendingGetAll"

export async function spendingCheckMaximumCPFs(cpf: string) {
  try {
    const storageSpending = await spendingGetAll()

    const allDifferentCPFs = [...new Set(storageSpending.map(item => item.sellerCPF))]

    if(allDifferentCPFs.length <= 2) {
      return true
    }

    return allDifferentCPFs.includes(cpf)
  } catch (error) {
    console.log(error)
    throw error;
  }
}