import { BoletoAdapter } from "./gateways/BoletoAdapter";
import { PixAdapter } from "./gateways/PixAdapter";
import { StripeAdapter } from "./gateways/StripeAdapter";

console.log("Hello World!");

const boleto = new BoletoAdapter();
const result = boleto.charge(100, "BRL");
console.log(result);

const pix = new PixAdapter();
const pixResult = pix.charge(200, "BRL");
console.log(pixResult);

const stripe = new StripeAdapter();
const stripeResult = stripe.charge(300, "USD");
console.log(stripeResult);
