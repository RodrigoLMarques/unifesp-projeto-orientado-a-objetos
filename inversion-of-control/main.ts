interface RiverData {
  temperature: number;
  atmosphericPressure: number;
  ph: number;
  humidity: number;
}

interface Observer {
  update(data: RiverData, sourceName: string): void;
}

abstract class Subject {
  private observers: Observer[] = [];

  addObserver(observer: Observer): void {
    this.observers.push(observer);
  }

  removeObserver(observer: Observer): void {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  // O Subject empurra os dados obtidos para cada Observer
  // Com o método PUSH, o Observer não precisa chamar o Subject de volta para obter as informações
  protected notifyObservers(data: RiverData, sourceName: string): void {
    this.observers.forEach((observer) => {
      // O Subject chama o callback do Observer (inversão de controle)
      // O Observer não controla quando isso acontece, ele só espera ser chamado (Princípio de Hollywood)
      observer.update(data, sourceName);
    });
  }
}

class PCD extends Subject {
  private data: RiverData;

  constructor(private readonly name: string) {
    super();
    this.data = {
      temperature: 0,
      atmosphericPressure: 0,
      ph: 7,
      humidity: 0,
    };
  }

  getName(): string {
    return this.name;
  }

  updateData(newData: Partial<RiverData>): void {
    this.data = { ...this.data, ...newData };
    this.notifyObservers(this.data, this.name);
  }
}

class University implements Observer {
  private data: Record<string, RiverData> = {};

  constructor(public readonly name: string) {}

  monitorPCD(pcd: PCD): void {
    pcd.addObserver(this);
  }

  stopMonitoring(pcd: PCD): void {
    pcd.removeObserver(this);
  }

  // Implementação do callback do observer, com uma condição de leitura pela temperatura
  // É chamado pelo Subject (inversão de controle), a University nunca chama isso diretamente
  update(newData: RiverData, riverName: string): void {
    const riverData = this.data[riverName];
    if (
      !riverData ||
      Math.abs(riverData.temperature - newData.temperature) >= 1
    ) {
      this.data[riverName] = newData;
      this.printData(riverName);
    }
  }

  printData(riverName: string): void {
    const data = this.data[riverName];
    console.log(`\n${this.name} - Atualização de ${riverName}`);
    console.log(`Temperatura: ${data.temperature}`);
    console.log(`Pressão atmosférica: ${data.atmosphericPressure} hPa`);
    console.log(`pH: ${data.ph}`);
    console.log(`Umidade: ${data.humidity}%`);
  }
}

class Laboratory implements Observer {
  private data: Record<string, RiverData> = {};

  constructor(public readonly name: string) {}

  monitorPCD(pcd: PCD): void {
    pcd.addObserver(this);
  }

  stopMonitoring(pcd: PCD): void {
    pcd.removeObserver(this);
  }

  // Implementação do callback do observer
  // É chamado pelo Subject (inversão de controle), o Laboratory nunca chama isso diretamente
  update(newData: RiverData, riverName: string): void {
    this.data[riverName] = newData;
    this.printData(riverName);
  }

  printData(riverName: string): void {
    const data = this.data[riverName];
    console.log(`\n${this.name} - Atualização de ${riverName}`);
    console.log(`Temperatura: ${data.temperature}`);
    console.log(`Pressão atmosférica: ${data.atmosphericPressure} hPa`);
    console.log(`pH: ${data.ph}`);
    console.log(`Umidade: ${data.humidity}%`);
  }
}

// Test
const paraiba = new PCD("Rio Paraíba do Sul");
const jaguari = new PCD("Rio Jaguari");
const tiete = new PCD("Rio Tietê");

const unifesp = new University("UNIFESP");
const usp = new University("USP");
const labHidro = new Laboratory("Lab Hidrologia");

unifesp.monitorPCD(paraiba);
unifesp.monitorPCD(jaguari);

usp.monitorPCD(tiete);

labHidro.monitorPCD(paraiba);
labHidro.monitorPCD(jaguari);
labHidro.monitorPCD(tiete);

console.log("Leituras iniciais");
paraiba.updateData({
  temperature: 22.0,
  atmosphericPressure: 1010,
  ph: 6.8,
  humidity: 80,
});
jaguari.updateData({
  temperature: 24.0,
  atmosphericPressure: 1012,
  ph: 7.0,
  humidity: 70,
});
tiete.updateData({
  temperature: 26.0,
  atmosphericPressure: 1008,
  ph: 6.5,
  humidity: 65,
});

console.log(
  "\nVariação pequena no Paraíba (< 1), University ignora, Lab registra",
);
paraiba.updateData({ temperature: 22.4 });

console.log("\nVariação significativa no Paraíba (>= 1), todos notificados");
paraiba.updateData({ temperature: 25.0, ph: 7.2 });

console.log("\nUSP para de monitorar o Tietê");
usp.stopMonitoring(tiete);

console.log("\nAtualização no Tietê, só Lab recebe");
tiete.updateData({ temperature: 29.0, ph: 6.1 });
