import { IGateway, PaymentResult } from "./IGateway";

class BoletoSDK {
  emitirBoleto(
    amount: number,
    currency: string,
  ): { id: string; issued: boolean } {
    return { id: `bol_${crypto.randomUUID()}`, issued: true };
  }
}

export class BoletoAdapter implements IGateway {
  private sdk = new BoletoSDK();

  charge(amount: number, currency: string): PaymentResult {
    console.log(`Boleto: emitirBoleto(${amount}, ${currency})`);
    const response = this.sdk.emitirBoleto(amount, currency);
    return {
      success: response.issued,
      transactionId: response.id,
      amount,
      gateway: "boleto",
    };
  }
}
