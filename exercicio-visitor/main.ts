interface Visitor {
  visitReportA(d: ReportA): void;
  visitReportB(c: ReportB): void;
  visitReportC(r: ReportC): void;
  visitReportD(cs: ReportD): void;
}

// Adicionar "date" ou "content" aqui quebra TODAS as classes — esse é o problema do Visitor
interface AppReport {
  content: string;
  date: Date;
  accept(v: Visitor): void;
}

class ReportA implements AppReport {
  constructor(public content: string, public date: Date) {}
  accept(v: Visitor) {
    v.visitReportA(this);
  }
}

class ReportB implements AppReport {
  constructor(public content: string, public date: Date) {}
  accept(v: Visitor) {
    v.visitReportB(this);
  }
}

class ReportC implements AppReport {
  constructor(public content: string, public date: Date) {}
  accept(v: Visitor) {
    v.visitReportC(this);
  }
}

class ReportD implements AppReport {
  constructor(public content: string, public date: Date) {}
  accept(v: Visitor) {
    v.visitReportD(this);
  }
}

class PDFExportVisitor implements Visitor {
  visitReportA(a: ReportA) {
    console.log(`Report A in PDF\n\tdate: ${a.date.toISOString()}\n\tcontent: ${a.content}`);
  }

  visitReportB(b: ReportB) {
    console.log(`Report B in PDF\n\tdate: ${b.date.toISOString()}\n\tcontent: ${b.content}`);
  }

  visitReportC(c: ReportC) {
    console.log(`Report C in PDF\n\tdate: ${c.date.toISOString()}\n\tcontent: ${c.content}`);
  }

  visitReportD(d: ReportD) {
    console.log(`Report D in PDF\n\tdate: ${d.date.toISOString()}\n\tcontent: ${d.content}`);
  }
}


class HTMLExportVisitor implements Visitor {
  visitReportA(a: ReportA) {
    console.log(`Report A in HTML\n\tdate: ${a.date.toISOString()}\n\tcontent: ${a.content}`);
  }

  visitReportB(b: ReportB) {
    console.log(`Report B in HTML\n\tdate: ${b.date.toISOString()}\n\tcontent: ${b.content}`);
  }

  visitReportC(c: ReportC) {
    console.log(`Report C in HTML\n\tdate: ${c.date.toISOString()}\n\tcontent: ${c.content}`);
  }

  visitReportD(d: ReportD) {
    console.log(`Report D in HTML\n\tdate: ${d.date.toISOString()}\n\tcontent: ${d.content}`);
  }
}

const reportA = new ReportA("Conteúdo A", new Date());
const reportB = new ReportB("Conteúdo B", new Date());
const reportC = new ReportC("Conteúdo C", new Date());
const reportD = new ReportD("Conteúdo D", new Date());

const allReports: AppReport[] = [reportA, reportB, reportC, reportD];

const pdfExporter = new PDFExportVisitor();
const htmlExporter = new HTMLExportVisitor();
allReports.forEach((report) => report.accept(pdfExporter));
allReports.forEach((report) => report.accept(htmlExporter));
