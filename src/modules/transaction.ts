import { Entity } from "./entity";

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
  
    execute(accounts: AccountsMap) {
      const accountsCopy = Object.assign({}, accounts);
      if (["income", "transfer"].includes(this.type)) {
        if (!this.toAccount) {
          throw new Error("Account not found");
        }
        this.toAccount.balance += this.amount * (this.conversionRate ?? 1);
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