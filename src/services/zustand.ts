import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "../modules/transaction";
import { Account } from "../modules/account";
import { Category } from "../modules/category";

type Store = {
  timestamp: number;
  transactions: TransactionsMap;
  accounts: AccountsMap;
  categories: CategoriesMap;
  createTransaction: (data: TransactionDto) => void;
  createAccount: (data: AccountDto) => void;
  createCategory: (data: CategoryDto) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      timestamp: 0,
      transactions: {},
      accounts: {},
      categories: {},
      createTransaction: (data: TransactionDto) =>
        set((state) => {
          const transaction = new Transaction(data);
          const accounts = transaction.execute(state.accounts);
          const transactions = transaction.save(state.transactions);
          return { 
            transactions,
            accounts,
            timestamp: Date.now(),
          };
        }),
      createAccount: (data: AccountDto) =>
        set((state) => {
          const account = new Account(data);
          const accounts = account.save(state.accounts);
          return { 
            accounts,
            timestamp: Date.now(),
          };
        }),
      createCategory: (data: CategoryDto) =>
        set((state) => {
          const category = new Category(data);
          const categories = category.save(state.categories);
          return { categories };
        }),
    }),
    {
      name: "golden-antelope-storage",
    }
  )
);
