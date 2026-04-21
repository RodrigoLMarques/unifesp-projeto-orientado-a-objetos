import { PaymentResult } from "../../gateways/IGateway";
import { IObserver } from "../IObserver";

export class EmailObserver implements IObserver<PaymentResult> {
  update(result: PaymentResult): void {
    console.log(`Email: ${result.transactionId} ${result.success ? "sucesso" : "falha"}`);
  }
}
