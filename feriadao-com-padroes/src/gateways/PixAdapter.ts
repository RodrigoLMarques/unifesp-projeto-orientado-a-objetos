import { IGateway, PaymentResult } from "./IGateway";

class PixSDK {
  gerarCobranca(
    amount: number,
    currency: string,
  ): { txid: string; status: "ATIVA" | "CANCELADA" } {
    return { txid: `pix_${crypto.randomUUID()}`, status: "ATIVA" };
  }
}

export class PixAdapter implements IGateway {
  private sdk = new PixSDK();

  charge(amount: number, currency: string): PaymentResult {
    console.log(`Pix: gerarCobranca(${amount}, ${currency})`);
    const response = this.sdk.gerarCobranca(amount, currency);
    return {
      success: response.status === "ATIVA",
      transactionId: response.txid,
      amount,
      gateway: "pix",
    };
  }
}
