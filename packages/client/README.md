# `@xact-wallet-sdk/client`

> SDK for the xact-wallet application

## Installation

1. Install package from npm and dependencies.

`npm i @xact-wallet-sdk/client`

## Documentation

Find the complete documentation :

`https://xact.gitbook.io/xact/`

## Usage

```
/* Construct an instance of Client */

const client = new Client("API_KEY"));

/* Initialize the connexion */
await client.initConnexion();

/* Generate QR Code in order to process authentication */
const qrCodeMain = await client.generateQRCode();

/* Get new Connexions */
client.connect().subscribe((user: UserAccount) => {
    console.log('new connexion', user);
});

/* Get Xact Fees for sending Hbar */
const hbarToSend = 5;
const xactFees = client.getXactFeesPayment(hbarToSend);

/* send Hbar */
const fromAccountId = ""; /* Sender */
const toAccountId = ""; /* Receiver */
await client.pay({hbarToSend, fromAccountId, toAccountId});

/* Listen for Payment validation */
client.paymentValidation().subscribe((payment: PaymentValidation) => {
    console.log(`the payment ${payment.amount}ħ from ${payment.fromAccountId} to ${payment.toAccountId}`);
});

/* Associate Token */
const tokenId = ""; /* Token to associate */
await client.associate({fromAccountId, tokenId});

/* Listen for Associate Token */
client.associateValidation().subscribe((token: AssociateTokenValidation) => {
     console.log('new associated token', token);
});

```

## Example

Github Example : <https://github.com/schnouz/xact-sdk/tree/master/integration>
