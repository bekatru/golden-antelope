import { Entity } from "./entity";
import { EntityService } from "./entityService";

export class Account extends Entity implements IAccount {
  name: string;
  balance: number;
  currency: string;

  constructor(dto: AccountDto) {
    super();
    this.name = dto.name;
    this.balance = 0;
    this.currency = dto.currency;
  }

  save(accounts: AccountsMap) {
    const accountsCopy = Object.assign({}, accounts);
    accountsCopy[this.id] = this;
    return accountsCopy;
  }
}

export class AccountsService extends EntityService {
  save(account: IAccount) {
    this.state.accounts[account.id] = account;
    return this;
  }
}