import { Entity } from "./entity";
import { EntityService } from "./entityService";

export class Transaction extends Entity implements ITransaction {
  amount: number;
  createdAt: string;
  type: TransactionType;
  category: ICategory | null;
  note: string | null;

  constructor(dto: TransactionDto) {
    super();
    this.createdAt = new Date().toISOString();
    this.amount = dto.amount;
    this.note = dto.note;
    this.type = dto.type;
    this.category = dto.category;
  }
}

export class Income extends Transaction implements IIncome {
  toAccount: IAccount;

  constructor(dto: IncomeDto) {
    const { toAccount, ...transactionDto } = dto;
    super(transactionDto);
    this.toAccount = dto.toAccount;
  }
}

export class Expense extends Transaction implements IExpense {
  fromAccount: IAccount;

  constructor(dto: ExpenseDto) {
    const { fromAccount, ...transactionDto } = dto;
    super(transactionDto);
    this.fromAccount = dto.fromAccount;
  }
}

export class Transfer extends Transaction implements ITransfer {
  toAccount: IAccount;
  fromAccount: IAccount;
  conversionRate: number;

  constructor(dto: TransferDto) {
    const { toAccount, fromAccount, conversionRate, ...transactionDto } = dto;
    super(transactionDto);
    this.fromAccount = dto.fromAccount;
    this.toAccount = dto.toAccount;
    this.conversionRate = dto.conversionRate;
  }
}

export class TransactionService extends EntityService {
  execute(transaction: TTransaction) {
    if (["income", "transfer"].includes(transaction.type)) {
      if (!("toAccount" in transaction) || !transaction.toAccount) {
        throw new Error("Target account is not found");
      }

      transaction.toAccount.balance +=
        transaction.amount *
        ("conversionRate" in transaction ? transaction.conversionRate : 1);
      this.state.accounts[transaction.toAccount.id] = transaction.toAccount;
    }

    if (["expense", "transfer"].includes(transaction.type)) {
      if (!("fromAccount" in transaction) || !transaction.fromAccount) {
        throw new Error("Source account not found");
      }

      transaction.fromAccount.balance -= transaction.amount;
      this.state.accounts[transaction.fromAccount.id] = transaction.fromAccount;
    }

    this.save(transaction);

    return this;
  }

  save(transaction: TTransaction) {
    this.state.transactions[transaction.id] = transaction;

    return this;
  }

  delete(transaction: TTransaction) {
    if (["income", "transfer"].includes(transaction.type)) {
      if (!("toAccount" in transaction) || !transaction.toAccount) {
        throw new Error("Target account is not found");
      }

      transaction.toAccount.balance -=
        transaction.amount *
        ("conversionRate" in transaction ? transaction.conversionRate : 1);
      this.state.accounts[transaction.toAccount.id] = transaction.toAccount;
    }

    if (["expense", "transfer"].includes(transaction.type)) {
      if (!("fromAccount" in transaction) || !transaction.fromAccount) {
        throw new Error("Source account not found");
      }

      transaction.fromAccount.balance += transaction.amount;
      this.state.accounts[transaction.fromAccount.id] = transaction.fromAccount;
    }

    delete this.state.transactions[transaction.id];

    return this;
  }
}
