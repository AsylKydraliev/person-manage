export interface User {
  id?: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  image: string,
  bank: Bank;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
}
