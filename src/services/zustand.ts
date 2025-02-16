import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TransactionService } from "../modules/transaction";
import { AccountsService } from "../modules/account";
import { CategoryService } from "../modules/category";

interface StoreActions {
  hydrate: (store: Store) => void;
  createTransaction: (transaction: TTransaction) => void;
  createAccount: (account: IAccount) => void;
  createCategory: (category: ICategory) => void;
  deleteTransaction: (transaction: TTransaction) => void;
}

type Store = State & StoreActions;

const initialState: State = {
  timestamp: 0,
  transactions: {},
  accounts: {},
  categories: {},
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      ...initialState,
      hydrate: (store: Store) => set(() => store),
      createTransaction: (transaction: TTransaction) =>
        set((state) => {
          return new TransactionService(state)
            .execute(transaction)
            .getState();
        }),
      deleteTransaction: (transaction: TTransaction) =>
        set((state) => {
          return new TransactionService(state)
            .delete(transaction)
            .getState();
        }),
      createAccount: (account: IAccount) =>
        set((state) => {
          return new AccountsService(state)
            .save(account)
            .getState();
        }),
      createCategory: (category: ICategory) =>
        set((state) => {
          return new CategoryService(state)
            .save(category)
            .getState();
        }),
    }),
    {
      name: "golden-antelope-storage",
    }
  )
);
