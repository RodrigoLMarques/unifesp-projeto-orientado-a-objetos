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

  charge(amount: number, currency: string): PaymentResult {
    console.log(`Stripe: createCharge(${amount}, ${currency})`);
    const response = this.sdk.createCharge(amount, currency);
    return {
      success: response.status === "succeeded",
      transactionId: response.id,
      amount,
      gateway: "stripe",
    };
  }
}
