export interface StripeConfig {
  apiKey: string;
  endpoint: string;
  timeout: number;
}

export interface PixConfig {
  clientId: string;
  clientSecret: string;
  endpoint: string;
}

export interface BoletoConfig {
  token: string;
  endpoint: string;
}

interface Config {
  stripe: StripeConfig;
  pix: PixConfig;
  boleto: BoletoConfig;
}

export class ConfigService {
  private static instance: ConfigService;

  private readonly config: Config = {
    stripe: {
      apiKey: "stripe-api-key-fake",
      endpoint: "https://api.stripe.fake/v1",
      timeout: 5000,
    },
    pix: {
      clientId: "pix-client-id-fake",
      clientSecret: "pix-client-secret-fake",
      endpoint: "https://api.pix.fake/v2",
    },
    boleto: {
      token: "boleto-token-fake",
      endpoint: "https://api.boleto.fake/v1",
    },
  };

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    } 
    return ConfigService.instance;
  }

  getStripeConfig(): StripeConfig {
    return this.config.stripe;
  }

  getPixConfig(): PixConfig {
    return this.config.pix;
  }

  getBoletoConfig(): BoletoConfig {
    return this.config.boleto;
  }
}
