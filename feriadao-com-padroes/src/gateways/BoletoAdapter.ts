import { ConfigService } from "../config/ConfigService";
import { IGateway, PaymentResult } from "./IGateway";

class BoletoSDK {
  issue(amount: number, currency: string): { id: string; issued: boolean } {
    return { id: `bol_${crypto.randomUUID()}`, issued: true };
  }
}

export class BoletoAdapter implements IGateway {
  private sdk = new BoletoSDK();
  private config = ConfigService.getInstance().getBoletoConfig();

  charge(amount: number, currency: string): PaymentResult {
    console.log(
      `Boleto: issue(${amount}, ${currency}) [endpoint: ${this.config.endpoint}]`,
    );
    const response = this.sdk.issue(amount, currency);
    return {
      success: response.issued,
      transactionId: response.id,
      amount,
      gateway: "boleto",
    };
  }
}
