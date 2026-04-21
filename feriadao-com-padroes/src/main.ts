import { ConfigService } from "./config/ConfigService";
import { GatewayFactory } from "./factories";

// Singleton
const config1 = ConfigService.getInstance();
const config2 = ConfigService.getInstance();
console.log("Mesma instância?", config1 === config2);

// Adapters and Factory
const boleto = GatewayFactory.create("boleto");
const result = boleto.charge(100, "BRL");
console.log(result);

const pix = GatewayFactory.create("pix");
const pixResult = pix.charge(200, "BRL");
console.log(pixResult);

const stripe = GatewayFactory.create("stripe");
const stripeResult = stripe.charge(300, "USD");
console.log(stripeResult);
