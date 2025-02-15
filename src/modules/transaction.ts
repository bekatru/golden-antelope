import { AccountsMap, IAccount, ITransaction, TransactionDto, TransactionType, TransactionsMap } from "../services/zustand";
import { Entity } from "./entity";

export class Transaction extends Entity implements ITransaction {
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
  
    execute(accounts: AccountsMap) {
      const accountsCopy = Object.assign({}, accounts);
      if (["income", "transfer"].includes(this.type)) {
        if (!this.toAccount) {
          throw new Error("Account not found");
        }
        this.toAccount.balance += this.amount;
        accountsCopy[this.toAccount.id] = this.toAccount;
      }
  
      if (["expense", "transfer"].includes(this.type)) {
        if (!this.fromAccount) {
          throw new Error("Account not found");
        }
        this.fromAccount.balance -= this.amount;
        accountsCopy[this.fromAccount.id] = this.fromAccount;
      }
  
      return accountsCopy;
    }
  
    save(transactions: TransactionsMap) {
      const transactionsCopy = Object.assign({}, transactions);
      transactionsCopy[this.id] = this;
      return transactionsCopy;
    }
  }