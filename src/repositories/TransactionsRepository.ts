import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeArr: number[] = [];
    const outcomeArr: number[] = [];

    this.transactions.forEach(transaction => {
      const value = transaction.value;

      transaction.type === 'income'
        ? incomeArr.push(value)
        : outcomeArr.push(value);
    });

    const income = incomeArr.length
      ? incomeArr.reduce((acc, val) => (acc += val))
      : 0;
    const outcome = outcomeArr.length
      ? outcomeArr.reduce((acc, val) => (acc += val))
      : 0;

    const balance: Balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
