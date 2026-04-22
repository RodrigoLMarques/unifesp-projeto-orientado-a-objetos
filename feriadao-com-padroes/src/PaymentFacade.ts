import { ConfigService } from "./config/ConfigService";
import { LogDecorator } from "./decorators/LogDecorator";
import { RetryDecorator } from "./decorators/RetryDecorator";
import { ObservableGateway } from "./events/ObservableGateway";
import { EmailObserver } from "./events/observers/EmailObserver";
import { OrderObserver } from "./events/observers/OrderObserver";
import { GatewayFactory, PaymentMethod } from "./factories/GatewayFactory";
import { PaymentResult } from "./gateways/IGateway";
import { AuditEntry, AuditProxy } from "./proxy/AuditProxy";

export class PaymentFacade {
  private proxies: AuditProxy[] = [];

  constructor() {
    ConfigService.getInstance();
  }

  pay(amount: number, currency: string, method: PaymentMethod): PaymentResult {
    const base = GatewayFactory.create(method);
    const proxy = new AuditProxy(new RetryDecorator(new LogDecorator(base)));
    const observable = new ObservableGateway(proxy);
    observable.addObserver(new EmailObserver());
    observable.addObserver(new OrderObserver());

    this.proxies.push(proxy);
    return observable.charge(amount, currency);
  }

  getHistory(): readonly AuditEntry[] {
    return this.proxies.flatMap((p) => [...p.getHistory()]);
  }
}
