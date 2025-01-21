type Account = {
    name: string;
    currency: "usd" | "kgs";
  };

type Transaction = {
  account: string;
  amount: string;
  note: string;
};