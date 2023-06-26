export class TaxFilingDocument {
    public filingType?: Standard;
    public vatMonth?: Standard;
    public vatYear?: Standard;
    public type?: Standard;
    public saleAmount?: Number;
    public taxAmount?: Number;
    public surcharge?: Number;
    public penalty?: Number;
    public totalVat?: Number;
    public constructor(data: TaxFilingDocument) {
        this.filingType = data.filingType ? new Standard(data.filingType) : undefined;
        this.vatMonth = data.vatMonth ? new Standard(data.vatMonth) : undefined;
        this.vatYear = data.vatYear ? new Standard(data.vatYear) : undefined;
        this.type = data.type ? new Standard(data.type) : undefined;
        this.saleAmount = data.saleAmount || 0;
        this.taxAmount = data.taxAmount || 0;
        this.surcharge = data.surcharge || 0;
        this.penalty = data.penalty || 0;
        this.totalVat = data.totalVat || 0;
    }
}

export class TaxComputationDocument {
    public saleAmount: Number;
    public taxAmount: Number;
    public taxAddLateAmount: TaxAddLateDocument;
    public constructor(data: TaxComputationDocument) {
        this.saleAmount = data.saleAmount || 0;
        this.taxAmount = data.taxAmount || 0;
        this.taxAddLateAmount = data.taxAddLateAmount ? new TaxAddLateDocument(data.taxAddLateAmount): new TaxAddLateDocument({surcharge: 0, penalty: 0, totalVat:0});
    }
}

export class TaxAddLateDocument {
    public surcharge: Number;
    public penalty: Number;
    public totalVat: Number;
    public constructor(data: TaxAddLateDocument) {
        this.surcharge = data.surcharge || 0;
        this.penalty = data.penalty || 0;
        this.totalVat = data.totalVat || 0;
    }
}

export class Standard {
    public code?: string;
    public name?: string;
    public constructor(data: Standard) {
        this.code = data.code || '';
        this.name = data.name || '';
    }
}

export class VatMonthYearDocument {
    public vatMonth?: Standard;
    public vatYear?: Standard;
    public type?: Standard;
    public constructor(data: VatMonthYearDocument) {
        this.vatMonth = data.vatMonth ? new Standard(data.vatMonth) : undefined;
        this.vatYear = data.vatYear ? new Standard(data.vatYear) : undefined;
        this.type = data.type ? new Standard(data.type) : undefined;
    }
}
