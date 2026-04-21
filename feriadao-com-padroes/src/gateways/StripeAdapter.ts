import { ConfigService } from "../config/ConfigService";
import { IGateway, PaymentResult } from "./IGateway";

class StripeSDK {
  createCharge(
    amount: number,
    currency: string,
  ): { id: string; status: "succeeded" | "failed" } {
    return { id: `ch_${crypto.randomUUID()}`, status: "succeeded" };
  }
}

export class StripeAdapter implements IGateway {
  private sdk = new StripeSDK();
  private config = ConfigService.getInstance().getStripeConfig();

  charge(amount: number, currency: string): PaymentResult {
    console.log(
      `Stripe: createCharge(${amount}, ${currency}) [endpoint: ${this.config.endpoint}]`,
    );
    const response = this.sdk.createCharge(amount, currency);
    return {
      success: response.status === "succeeded",
      transactionId: response.id,
      amount,
      gateway: "stripe",
    };
  }
}
