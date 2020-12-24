import { CurrencyCode } from '../types';

export interface IAccount {
  name: string;
  number: string;
  currentBalance: number;
  currencyCode: CurrencyCode;
}
