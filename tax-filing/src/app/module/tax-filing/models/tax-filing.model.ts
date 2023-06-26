export class TaxFilingDocument {
    public filingType?: Standard;
    public vatMonth?: Standard;
    public vatYear?: Standard;
    public saleAmount: Number;
    public taxAmount: Number;
    public surcharge: Number;
    public penalty: Number;
    public totalVat: Number;
    public constructor(data: TaxFilingDocument) {
        this.filingType = data.filingType ? new Standard(data.filingType) : undefined;
        this.vatMonth = data.vatMonth ? new Standard(data.vatMonth) : undefined;
        this.vatYear = data.vatYear ? new Standard(data.vatYear) : undefined;
        this.saleAmount = data.saleAmount || 0;
        this.taxAmount = data.taxAmount || 0;
        this.surcharge = data.surcharge || 0;
        this.penalty = data.penalty || 0;
        this.totalVat = data.totalVat || 0;
    }
}

export class Standard {
    public code: string;
    public name: string;
    public constructor(data: Standard) {
        this.code = data.code || '';
        this.name = data.name || '';
    }
}
