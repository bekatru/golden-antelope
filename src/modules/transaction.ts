import { Entity } from "./entity";
import { EntityService } from "./entityService";

export class Transaction extends Entity implements ITransaction {
  amount: number;
  createdAt: string;
  type: TransactionType;
  conversionRate: number | null;
  category: ICategory | null;
  note: string | null;
  fromAccount: IAccount | null;
  toAccount: IAccount | null;

  constructor(dto: TransactionDto) {
    super();
    this.createdAt = new Date().toISOString();
    this.amount = dto.amount;
    this.note = dto.note;
    this.type = dto.type;
    this.category = dto.category;
    this.fromAccount = dto.fromAccount;
    this.toAccount = dto.toAccount;
    this.conversionRate = dto.conversionRate;
  }
}

export class TransactionService extends EntityService {

  execute(transaction: ITransaction) {
    if (["income", "transfer"].includes(transaction.type)) {
      if (!transaction.toAccount) {
        throw new Error("Account not found");
      }
      transaction.toAccount.balance +=
        transaction.amount * (transaction.conversionRate ?? 1);
      this.state.accounts[transaction.toAccount.id] = transaction.toAccount;
    }

    if (["expense", "transfer"].includes(transaction.type)) {
      if (!transaction.fromAccount) {
        throw new Error("Account not found");
      }
      transaction.fromAccount.balance -= transaction.amount;
      this.state.accounts[transaction.fromAccount.id] = transaction.fromAccount;
    }

    this.save(transaction);
    
    return this;
  }

  save(transaction: ITransaction) {
    this.state.transactions[transaction.id] = transaction;
    
    return this;
  }

  delete(transaction: ITransaction) {
    if (["income", "transfer"].includes(transaction.type)) {
      if (!transaction.toAccount) {
        throw new Error("Account not found");
      }
      transaction.toAccount.balance -=
        transaction.amount * (transaction.conversionRate ?? 1);
      this.state.accounts[transaction.toAccount.id] = transaction.toAccount;
    }

    if (["expense", "transfer"].includes(transaction.type)) {
      if (!transaction.fromAccount) {
        throw new Error("Account not found");
      }
      transaction.fromAccount.balance += transaction.amount;
      this.state.accounts[transaction.fromAccount.id] = transaction.fromAccount;
    }

    delete this.state.transactions[transaction.id];

    return this;
  }
}
