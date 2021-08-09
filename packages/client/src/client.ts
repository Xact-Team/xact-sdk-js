import {RequestValidation} from './models/request.interface';

import axios from 'axios';

export const API_URL: string = 'https://api.xact.ac/v1';
export const SOCKET_URL: string = 'https://api.xact.ac';

import {io} from 'socket.io-client';
import {PaymentDto} from './models/payment.interface';
import {Scope, ScopeEnum, UserAccount} from './models/user.interface';
import {
    CreateNFTDto,
    TokenAssociateDto,
    TokenTransferDto,
} from './models/token.interface';
import {ApiCall, listenForEvent} from './helpers/utils';

/* Export Interfaces */
export * from './models/user.interface';
export * from './models/request.interface';
export * from './models/payment.interface';
export * from './models/token.interface';

export class Client {
    socket;
    clientId;

    constructor({apiKey, options = {}}) {
        axios.defaults.headers.common = {
            "Authorization": `X-API-KEY: ${apiKey}`,
        };
        this.socket = io(SOCKET_URL, {
            transports: ['websocket']
        });
    }

    /**
     *  Init Connexion
     */
    initConnexion(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.socket.on('xact.connexion', (clientId: string) => {
                this.clientId = clientId;
                resolve();
            });
        })
    }

    /***********************************************************/
    /************************* ACTIONS *************************/

    /***********************************************************/

    /**
     *  Generate a QR Code
     * @param scope
     */
    generateQRCode(scope = [ScopeEnum.PROFILE] as Scope): Promise<string> {
        return ApiCall<string>(this.clientId, 'POST', `${API_URL}/xact/getQRCode`, {
            scope: scope,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees for Payment
     * @param hbarAmount
     * @param supportXact The amount will be round up
     */
    getXactFeesPayment(hbarAmount: number, supportXact: boolean = false): Promise<number> {
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/payment?amount=${hbarAmount}&support=${supportXact}`);
    }

    /**
     * Send hbar
     * @param paymentDto
     */
    pay(paymentDto: PaymentDto): Promise<number> {
        return ApiCall<number>(this.clientId, 'POST', `${API_URL}/xact/pay`, {
            ...paymentDto,
            clientId: this.clientId
        });
    }

    /**
     * Associate a token
     * @param tokenAssociationDto
     */
    associate(tokenAssociationDto: TokenAssociateDto): Promise<string> {
        return ApiCall<string>(this.clientId, 'POST', `${API_URL}/xact/associate-token`, {
            ...tokenAssociationDto,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees to Transfer a token
     */
    getXactFeesTransfer(): Promise<number> {
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/transfer-token`);
    }

    /**
     * Transfer a token
     * @param tokenTransferDto
     */
    transfer({fromAccountId, toAccountId, tokenId, supply = 1}: TokenTransferDto): Promise<string> {
        return ApiCall<string>(this.clientId, 'POST', `${API_URL}/xact/transfer-token`, {
            fromAccountId, toAccountId, tokenId, supply,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees to Mint NFT
     */
    getXactFeesCreateNFT(): Promise<number> {
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/create-token`);
    }

    /**
     *  Create a NFT
     * @param createNFTDto
     */
    createNFT(createNFTDto: CreateNFTDto): Promise<string> {
        return ApiCall<string>(this.clientId, 'POST', `${API_URL}/xact/create-nft`, {
            ...createNFTDto,
            clientId: this.clientId
        });
    }


    /*************************************************************/
    /************************* LISTENERS *************************/

    /*************************************************************/

    /**
     * Receive connexion from users
     */
    connect() {
        return listenForEvent<RequestValidation<UserAccount>>(this.socket, 'xact.auth');
    }

    /**
     * Waiting for Payment Validation
     */
    paymentValidation() {
        return listenForEvent<RequestValidation<PaymentDto>>(this.socket, 'xact.pay');
    }

    /**
     * Waiting for Token Association Validation
     */
    associateValidation() {
        return listenForEvent<RequestValidation<TokenAssociateDto>>(this.socket, 'xact.associate');
    }

    /**
     * Waiting for Token Transfer Validation
     */
    transferValidation() {
        return listenForEvent<RequestValidation<TokenTransferDto>>(this.socket, 'xact.transfer');
    }
}
