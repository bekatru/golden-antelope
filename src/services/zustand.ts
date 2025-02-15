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
  transactions: Record<string, Transaction>;
  accounts: Record<string, Account>;
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

          const accounts = Object.assign({}, state.accounts);
          const transactions = Object.assign({}, state.transactions);

          transactions[transaction.id] = transaction;

          if (["income", "transfer"].includes(transaction.type)) {
            const toAccountId = transaction.toAccount?.id;
            if (!toAccountId) {
              throw new Error("Account not found");
            }
            accounts[toAccountId].balance += transaction.amount;
          }

          if (["expense", "transfer"].includes(transaction.type)) {
            const fromAccountId = transaction.fromAccount?.id;
            if (!fromAccountId) {
              throw new Error("Account not found");
            }
            accounts[fromAccountId].balance -= transaction.amount;
          }

          return { transactions, accounts };
        }),
      createAccount: (data: AccountDto) =>
        set((state) => {
          const accounts = Object.assign({}, state.accounts);
          const newAccount = new Account(data);
          accounts[newAccount.id] = newAccount;
          return { accounts };
        }
        ),
    }),
    {
      name: "golden-antelope-storage",
    }
  )
);
