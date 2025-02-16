import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction, TransactionService } from "../modules/transaction";
import { Account, AccountsService } from "../modules/account";
import { Category, CategoryService } from "../modules/category";

interface StoreActions {
  hydrate: (store: Store) => void;
  createTransaction: (data: TransactionDto) => void;
  createAccount: (data: AccountDto) => void;
  createCategory: (data: CategoryDto) => void;
  deleteTransaction: (transaction: ITransaction) => void;
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
      createTransaction: (data: TransactionDto) =>
        set((state) => {
          return new TransactionService(state)
            .execute(new Transaction(data))
            .getState();
        }),
      deleteTransaction: (transaction: ITransaction) =>
        set((state) => {
          return new TransactionService(state)
            .delete(transaction)
            .getState();
        }),
      createAccount: (data: AccountDto) =>
        set((state) => {
          return new AccountsService(state)
            .save(new Account(data))
            .getState();
        }),
      createCategory: (data: CategoryDto) =>
        set((state) => {
          return new CategoryService(state)
            .save(new Category(data))
            .getState();
        }),
    }),
    {
      name: "golden-antelope-storage",
    }
  )
);
