import { create } from 'zustand';
import {persist} from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Category {
    id: string;
    name: string;
    parent: Category;
}

interface ITransaction {
    id: string;
    amount: number;
    createdAt: string;
    note: string | null;
    category: Category | null;
}

export type TransactionDto = Omit<ITransaction, 'id' | 'createdAt'>;

class Transaction implements ITransaction {
    id: string;
    amount: number;
    createdAt: string;
    note: string | null;
    category: Category | null;

    constructor(dto: TransactionDto) {
        this.id = uuidv4();
        this.createdAt = new Date().toString();
        this.amount = dto.amount
        this.note = dto.note
        this.category = dto.category
    }
}

interface IAccount {
  id: string;
  name: string;
  balance: number;
  currency: string;
}

type AccountDto = Omit<IAccount, "id">;

class Entity {
  id: string;

  constructor() {
    this.id = uuidv4();
  }
}

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
  transactions: Transaction[]
  accounts: Account[];
  createTransaction: (data: TransactionDto) => void
  createAccount: (data: AccountDto) => void
}

export const useStore = create<Store>()(
  persist(
  (set) => ({
    transactions: [],
    accounts: [],
    createTransaction: (data: TransactionDto) => set((state) => ({ transactions: [...state.transactions, new Transaction(data)] })),
    createAccount: (data: AccountDto) => set((state) => ({accounts: [...state.accounts, new Account(data)]}))
  }),
  {
    name: 'golden-antelope-storage'
  }
  )
)