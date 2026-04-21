import { ConfigService } from "./config/ConfigService";
import { LogDecorator, RetryDecorator } from "./decorators";
import { GatewayFactory } from "./factories";

// Singleton
const config1 = ConfigService.getInstance();
const config2 = ConfigService.getInstance();
console.log("Mesma instância?", config1 === config2);

// Adapters, Factory and Decorators
const pix = new RetryDecorator(new LogDecorator(GatewayFactory.create("pix")));
const pixResult = pix.charge(200, "BRL");
console.log(pixResult);

const stripe = new LogDecorator( new RetryDecorator(GatewayFactory.create("stripe")));
const stripeResult = stripe.charge(300, "USD");
console.log(stripeResult);
