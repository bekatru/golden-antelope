import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Transaction } from "../modules/transaction";
import { Account } from "../modules/account";
import { Category } from "../modules/category";

type Store = {
  timestamp: number;
  hydrate: (store: Store) => void;

  transactions: TransactionsMap;
  accounts: AccountsMap;
  categories: CategoriesMap;
  createTransaction: (data: TransactionDto) => void;
  createAccount: (data: AccountDto) => void;
  createCategory: (data: CategoryDto) => void;
  deleteTransaction: (transaction: ITransaction) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      timestamp: 0,
      hydrate: (store: Store) => set(() => store),

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
      deleteTransaction: (transaction: ITransaction) =>
        set((state) => {
          const transactions = Object.assign({}, state.transactions);
          const accounts = Object.assign({}, state.accounts);

          if (["income", "transfer"].includes(transaction.type)) {
            if (!transaction.toAccount) {
              throw new Error("Account not found");
            }
            transaction.toAccount.balance -=
              transaction.amount * (transaction.conversionRate ?? 1);
            accounts[transaction.toAccount.id] = transaction.toAccount;
          }

          if (["expense", "transfer"].includes(transaction.type)) {
            if (!transaction.fromAccount) {
              throw new Error("Account not found");
            }
            transaction.fromAccount.balance += transaction.amount;
            accounts[transaction.fromAccount.id] = transaction.fromAccount;
          }

          delete transactions[transaction.id];

          return { transactions, accounts, timestamp: Date.now() };
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
