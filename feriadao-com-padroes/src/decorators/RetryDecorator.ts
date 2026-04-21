import { IGateway, PaymentResult } from "../gateways/IGateway";
import { BaseDecorator } from "./BaseDecorator";

export class RetryDecorator extends BaseDecorator {
  constructor(wrapped: IGateway, private readonly maxAttempts: number = 3) {
    super(wrapped);
  }

  override charge(amount: number, currency: string): PaymentResult {
    let lastError: Error = new Error("unknown");
    for (let attempt = 1; attempt <= this.maxAttempts; attempt++) {
      try {
        return this.wrapped.charge(amount, currency);
      } catch (err) {
        lastError = err as Error;
        console.log(`[Retry] tentativa ${attempt}/${this.maxAttempts} falhou`);
      }
    }
    throw lastError;
  }
}
