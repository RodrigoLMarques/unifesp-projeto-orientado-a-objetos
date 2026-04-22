import { IGateway, PaymentResult } from "../gateways/IGateway";

export type AuditEntry =
  | { timestamp: Date; input: { amount: number; currency: string }; output: PaymentResult }
  | { timestamp: Date; input: { amount: number; currency: string }; error: string };

export class AuditProxy implements IGateway {
  private history: AuditEntry[] = [];

  constructor(private readonly gateway: IGateway) {}

  charge(amount: number, currency: string): PaymentResult {
    const timestamp = new Date();
    const input = { amount, currency };
    try {
      const output = this.gateway.charge(amount, currency);
      this.history.push({ timestamp, input, output });
      return output;
    } catch (err) {
      this.history.push({ timestamp, input, error: (err as Error).message });
      throw err;
    }
  }

  getHistory(): readonly AuditEntry[] {
    return [...this.history];
  }
}
