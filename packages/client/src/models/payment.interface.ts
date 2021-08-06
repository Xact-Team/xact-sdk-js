export enum MiddleManFeesType {
    HBAR = 'hbar',
    PERCENT = 'percent'
}

export class MiddleManPayment {
    /* AccountId that collect fees */
    middleManAccountId: string;
    /* Type of fees */
    middleManTypeOfFees: MiddleManFeesType;
    /* Fees */
    middleManFees: number;
}

export class PaymentDto {
    /* Hbar to transfer */
    hbarAmount: number;
    /* AccountId that send the Hbar */
    fromAccountId: string;
    /* AccountId that received the Hbar */
    toAccountId: string;
    /* add a memo */
    memo?: string;
    /* add a middle men in order to collect fees */
    middleMen?: MiddleManPayment[];
    /* Support the Xact Team - round up fees */
    supportXact?: boolean;
}
