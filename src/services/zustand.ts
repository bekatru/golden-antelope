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

interface ITransaction extends IEntity {
  amount: number;
  createdAt: string;
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

  constructor(dto: TransactionDto) {
    super();
    this.createdAt = new Date().toString();
    this.amount = dto.amount;
    this.note = dto.note;
  }
}

interface IAccount extends IEntity {
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
        set((state) => ({
          transactions: [...state.transactions, new Transaction(data)],
        })),
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
