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

type Store = {
  transactions: Transaction[]
  createTransaction: (data: TransactionDto) => void
}

export const useStore = create<Store>()(
  persist(
  (set) => ({
    transactions: [],
    createTransaction: (data: TransactionDto) => set((state) => ({ transactions: [...state.transactions, new Transaction(data)] })),
  }),
  {
    name: 'golden-antelope-storage'
  }
  )
)