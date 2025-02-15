interface IEntity {
  id: string;
}

interface ICategory extends IEntity {
  name: string;
  parent: ICategory | null;
}

type TransactionType = "income" | "expense" | "transfer";

interface ITransaction extends IEntity {
  amount: number;
  createdAt: string;
  type: TransactionType;
  category: ICategory | null;
  note: string | null;
  toAccount: IAccount | null;
  fromAccount: IAccount | null;
  save: (transactions: TransactionsMap) => TransactionsMap;
  execute: (accounts: AccountsMap) => AccountsMap;
}

interface IAccount extends IEntity {
  name: string;
  balance: number;
  currency: string;
  save: (accounts: AccountsMap) => AccountsMap;
}

type TransactionDto = Omit<ITransaction, "id" | "createdAt" | "save" | "execute">;
type AccountDto = Omit<IAccount, "id" | "balance" | "save">;
type CategoryDto = Omit<ICategory, "id">;

type TransactionsMap = Record<string, ITransaction>;
type AccountsMap = Record<string, IAccount>;
type CategoriesMap = Record<string, ICategory>;