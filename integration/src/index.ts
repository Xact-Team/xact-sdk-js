import {Client, PaymentValidation, UserAccount} from '../../packages/client/src/client';

(async () => {
    /* Construct an instance of Client */
    const client = new Client({apiKey: "API_KEY"});

    /* Initialize the connexion */
    await client.initConnexion();

    /* Generate QR Code in order to process authentication */
    const qrCodeMain = await client.generateQRCode();

    /* Subscribe to new Connexions */
    client.connect().subscribe(user => {
        console.log('new connexion', user);
    });

    /* Getting Xact Pay Fees */
    const hbarToSend = 5;
    const xactFees = client.getXactFeesPayment(hbarToSend);

    /* send Hbar */
    const fromAccountId = ""; /* Sender */
    const toAccountId = ""; /* Receiver */
    await client.pay({hbarToSend, fromAccountId, toAccountId});

    /* Subscribe to new Payments */
    client.paymentValidation().subscribe(payment => {
        console.log(`the payment ${payment.amount}ħ from ${payment.fromAccountId} to ${payment.toAccountId}`);
    });

    /* Associate Token */
    const tokenId = ""; /* Token to associate */
    await client.associate({fromAccountId, tokenId});

    /* Subscribe to new Token Association */
    client.associateValidation().subscribe(token => {
         console.log('new associated token', token);
    });

    /* Transfer Token */
    const tokenToTransfer = '';

    await client.transfer({fromAccountId, toAccountId, tokenId: tokenToTransfer});

    /* Subscribe to new Token Transfer */
    client.transferValidation().subscribe(token => {
        console.log('Transfer Token', token);
    });


    /* Create NFT */
    const name = 'NFT Test';
    const description = 'Description of my NFT';
    const category = CategoryNFT.ART;
    const creator = 'Johny.B';
    const media = ''; /* base64 format */
    const supply = 1; /* Nb of NFT available */
    await client.createNFT({fromAccountId, name, description, category, creator, media, supply});

    /* Subscribe to new Create NFT Validation */
    client.createNFTValidation().subscribe(nft => {
        console.log('NFT Created', nft);
    });

})()
