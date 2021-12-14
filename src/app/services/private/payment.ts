export interface Payment {
    id?: number;
    cardOwnerName: string;
    cardNumber: string;
    securityCode: string;
    expirationDate: Date;
}
