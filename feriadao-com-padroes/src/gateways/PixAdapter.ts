import { ConfigService } from "../config/ConfigService";
import { IGateway, PaymentResult } from "./IGateway";

class PixSDK {
  generateCharge(amount: number, currency: string): { txid: string; status: "ACTIVE" | "CANCELED" } {
    return { txid: `pix_${crypto.randomUUID()}`, status: "ACTIVE" };
  }
}

export class PixAdapter implements IGateway {
  private sdk = new PixSDK();
  private config = ConfigService.getInstance().getPixConfig();

  charge(amount: number, currency: string): PaymentResult {
    console.log(
      `Pix: generateCharge(${amount}, ${currency}) [endpoint: ${this.config.endpoint}]`,
    );
    const response = this.sdk.generateCharge(amount, currency);
    return {
      success: response.status === "ACTIVE",
      transactionId: response.txid,
      amount,
      gateway: "pix",
    };
  }
}
