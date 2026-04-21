import { IGateway, PaymentResult } from "../gateways/IGateway";

export abstract class BaseDecorator implements IGateway {
  constructor(protected readonly wrapped: IGateway) {}

  charge(amount: number, currency: string): PaymentResult {
    return this.wrapped.charge(amount, currency);
  }
}
