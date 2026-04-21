import { IGateway } from "../gateways/IGateway";
import { StripeAdapter } from "../gateways/StripeAdapter";
import { PixAdapter } from "../gateways/PixAdapter";
import { BoletoAdapter } from "../gateways/BoletoAdapter";

export type PaymentMethod = "stripe" | "pix" | "boleto";

export class GatewayFactory {
  static create(method: PaymentMethod): IGateway {
    switch (method) {
      case "stripe":
        return new StripeAdapter();
      case "pix":
        return new PixAdapter();
      case "boleto":
        return new BoletoAdapter();
      default:
        throw new Error(`GatewayFactory: método de pagamento desconhecido "${method}"`);
    }
  }
}
