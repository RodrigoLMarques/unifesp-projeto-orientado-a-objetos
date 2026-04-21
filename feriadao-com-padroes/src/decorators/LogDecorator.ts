import { PaymentResult } from "../gateways/IGateway";
import { BaseDecorator } from "./BaseDecorator";

export class LogDecorator extends BaseDecorator {
  override charge(amount: number, currency: string): PaymentResult {
    console.log(`[Log] charge(${amount}, ${currency})`);
    const result = this.wrapped.charge(amount, currency);
    console.log(`[Log] resultado: ${result.transactionId}, success: ${result.success}`);
    return result;
  }
}
