import { PaymentResult } from "../../gateways/IGateway";
import { IObserver } from "../IObserver";

export class OrderObserver implements IObserver<PaymentResult> {
  update(result: PaymentResult): void {
    console.log(`Order: ${result.transactionId} ${result.success ? "pago" : "falhou"}`);
  }
}
