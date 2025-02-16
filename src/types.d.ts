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
  conversionRate: number | null;
}

interface IAccount extends IEntity {
  name: string;
  balance: number;
  currency: string;
}

type TransactionDto = Omit<ITransaction, "id" | "createdAt">;
type AccountDto = Omit<IAccount, "id" | "balance">;
type CategoryDto = Omit<ICategory, "id">;

type TransactionsMap = Record<string, ITransaction>;
type AccountsMap = Record<string, IAccount>;
type CategoriesMap = Record<string, ICategory>;

interface State {
  timestamp: number;
  transactions: TransactionsMap;
  accounts: AccountsMap;
  categories: CategoriesMap;
}