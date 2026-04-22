import { ConfigService } from "./config/ConfigService";
import { LogDecorator, RetryDecorator } from "./decorators";
import { EmailObserver, ObservableGateway, OrderObserver } from "./events";
import { GatewayFactory } from "./factories";
import { PaymentFacade } from "./PaymentFacade";
import { AuditProxy } from "./proxy";

// Singleton
const config1 = ConfigService.getInstance();
const config2 = ConfigService.getInstance();
console.log("Mesma instância?", config1 === config2);

// Adapters, Factory and Decorators
const pix = new RetryDecorator(new LogDecorator(GatewayFactory.create("pix")));
const pixResult = pix.charge(200, "BRL");
console.log(pixResult);

const stripe = new LogDecorator(
  new RetryDecorator(GatewayFactory.create("stripe")),
);
const stripeResult = stripe.charge(300, "USD");
console.log(stripeResult);

// Proxy
const proxy = new AuditProxy(GatewayFactory.create("stripe"));
proxy.charge(100, "BRL");
proxy.charge(250, "USD");
proxy.charge(50, "BRL");
console.log("Histórico:", proxy.getHistory());

// Observer
const gateway = new ObservableGateway(GatewayFactory.create("boleto"));
const emailObserver = new EmailObserver();
const orderObserver = new OrderObserver();
gateway.addObserver(emailObserver);
gateway.addObserver(orderObserver);

gateway.charge(99.9, "BRL");
gateway.removeObserver(emailObserver);
gateway.charge(149.9, "BRL");

// Facade
const facade = new PaymentFacade();

facade.pay(150.0, "BRL", "stripe");
facade.pay(299.9, "BRL", "pix");
facade.pay(89.0, "BRL", "boleto");

console.log(facade.getHistory());
