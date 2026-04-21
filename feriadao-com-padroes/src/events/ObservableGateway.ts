import { IGateway, PaymentResult } from "../gateways/IGateway";
import { Subject } from "./Subject";

export class ObservableGateway extends Subject<PaymentResult> implements IGateway {
  constructor(private readonly gateway: IGateway) {
    super();
  }

  charge(amount: number, currency: string): PaymentResult {
    const result = this.gateway.charge(amount, currency);
    this.notifyObservers(result);
    return result;
  }
}
