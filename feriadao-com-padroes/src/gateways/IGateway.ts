export interface PaymentResult {
  success: boolean;
  transactionId: string;
  amount: number;
  gateway: string;
}

export interface IGateway {
  charge(amount: number, currency: string): PaymentResult;
}
