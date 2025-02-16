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
}

interface IExpense extends ITransaction {
  fromAccount: IAccount;
}

interface IIncome extends ITransaction {
  toAccount: IAccount;
}

interface ITransfer extends ITransaction {
  toAccount: IAccount;
  fromAccount: IAccount;
  conversionRate: number;
}

type TTransaction = IExpense | IIncome | ITransfer;

interface IAccount extends IEntity {
  name: string;
  balance: number;
  currency: string;
}

type TransactionDto = Omit<TTransaction, "id" | "createdAt">;

type IncomeDto = Omit<IIncome, "id" | "createdAt">;
type ExpenseDto = Omit<IExpense, "id" | "createdAt">;
type TransferDto = Omit<ITransfer, "id" | "createdAt">;

type AccountDto = Omit<IAccount, "id" | "balance">;
type CategoryDto = Omit<ICategory, "id">;

type TransactionsMap = Record<string, TTransaction>;
type AccountsMap = Record<string, IAccount>;
type CategoriesMap = Record<string, ICategory>;

interface State {
  timestamp: number;
  transactions: TransactionsMap;
  accounts: AccountsMap;
  categories: CategoriesMap;
}
