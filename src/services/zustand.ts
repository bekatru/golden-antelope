import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "../modules/transaction";
import { Account } from "../modules/account";

export interface IEntity {
  id: string;
}

export type TransactionType = "income" | "expense" | "transfer";

export interface ITransaction extends IEntity {
  amount: number;
  createdAt: string;
  type: TransactionType;
  note: string | null;
  save: (transactions: TransactionsMap) => TransactionsMap;
  execute: (accounts: AccountsMap) => AccountsMap;
}

export interface IAccount extends IEntity {
  name: string;
  balance: number;
  currency: string;
  save: (accounts: AccountsMap) => AccountsMap;
}

export type TransactionDto = Omit<ITransaction, "id" | "createdAt">;
export type AccountDto = Omit<IAccount, "id" | "balance">;

export type TransactionsMap = Record<string, ITransaction>;
export type AccountsMap = Record<string, IAccount>;

type Store = {
  transactions: TransactionsMap;
  accounts: AccountsMap;
  createTransaction: (data: TransactionDto) => void;
  createAccount: (data: AccountDto) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      transactions: {},
      accounts: {},
      createTransaction: (data: TransactionDto) =>
        set((state) => {
          const transaction = new Transaction(data);
          const accounts = transaction.execute(state.accounts);
          const transactions = transaction.save(state.transactions);
          return { transactions, accounts };
        }),
      createAccount: (data: AccountDto) =>
        set((state) => {
          const account = new Account(data);
          const accounts = account.save(state.accounts);
          return { accounts };
        }
        ),
    }),
    {
      name: "golden-antelope-storage",
    }
  )
);
