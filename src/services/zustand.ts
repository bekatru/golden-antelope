import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface Category {
  id: string;
  name: string;
  parent: Category;
}

interface IEntity {
  id: string;
}

export type TransactionType = "income" | "expense" | "transfer";

interface ITransaction extends IEntity {
  amount: number;
  createdAt: string;
  type: TransactionType;
  fromAccount: IAccount | null;
  toAccount: IAccount | null;
  note: string | null;
}

export type TransactionDto = Omit<ITransaction, "id" | "createdAt">;

class Entity implements IEntity {
  id: string;

  constructor() {
    this.id = uuidv4();
  }
}

class Transaction extends Entity implements ITransaction {
  amount: number;
  createdAt: string;
  note: string | null;
  type: TransactionType;
  fromAccount: IAccount | null;
  toAccount: IAccount | null;

  constructor(dto: TransactionDto) {
    super();
    this.createdAt = new Date().toString();
    this.amount = dto.amount;
    this.note = dto.note;
    this.type = dto.type;
    this.fromAccount = dto.fromAccount;
    this.toAccount = dto.toAccount;
  }
}

export interface IAccount extends IEntity {
  name: string;
  balance: number;
  currency: string;
}

export type AccountDto = Omit<IAccount, "id" | "balance">;

class Account extends Entity implements IAccount {
  name: string;
  balance: number;
  currency: string;

  constructor(dto: AccountDto) {
    super();
    this.name = dto.name;
    this.balance = 0;
    this.currency = dto.currency;
  }
}

type Store = {
  transactions: Transaction[];
  accounts: Account[];
  createTransaction: (data: TransactionDto) => void;
  createAccount: (data: AccountDto) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      transactions: [],
      accounts: [],
      createTransaction: (data: TransactionDto) =>
        set((state) => {
          const transaction = new Transaction(data);

          const accountsCopy = state.accounts.slice();

          if (["income", "transfer"].includes(transaction.type)) {
            const toAccountIndex = accountsCopy.findIndex(({ id }) => {
              if (!transaction.toAccount) {
                throw new Error(
                  "Transaction with 'income' type should have 'toAccount' property"
                );
              }
              return id === transaction.toAccount.id;
            });

            if (toAccountIndex === -1) {
              throw new Error("Account not found");
            }

            accountsCopy[toAccountIndex].balance += transaction.amount;
          }

          if (["expense", "transfer"].includes(transaction.type)) {
            const fromAccountIndex = accountsCopy.findIndex(({ id }) => {
              if (!transaction.fromAccount) {
                throw new Error(
                  "Transaction with 'income' type should have 'toAccount' property"
                );
              }
              return id === transaction.fromAccount.id;
            });

            if (fromAccountIndex === -1) {
              throw new Error("Account not found");
            }

            accountsCopy[fromAccountIndex].balance -= transaction.amount;
          }

          return {
            transactions: [...state.transactions, new Transaction(data)],
            accounts: accountsCopy,
          };
        }),
      createAccount: (data: AccountDto) =>
        set((state) => ({
          accounts: [...state.accounts, new Account(data)],
        })),
    }),
    {
      name: "golden-antelope-storage",
    }
  )
);
