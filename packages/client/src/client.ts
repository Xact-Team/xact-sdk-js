import {RequestValidation} from './models/request.interface';

import axios from 'axios';
import {io} from 'socket.io-client';
import {PaymentDto} from './models/payment.interface';
import {GenerateQrCodeOpts, RefreshAccountDTO, ScopeEnum, UserAccount} from './models/user.interface';
import Logger from 'js-logger';
import {
    BuyNFTDto,
    CreateNFTDto,
    NFTForSale, RemoveNFTDto,
    SellNFTDto,
    TokenAssociateDto,
    TokenTransferDto,
} from './models/token.interface';
import {ApiCall, listenForEvent} from './helpers/utils';

export const API_URL: string = 'https://api.xact.ac/v1';
export const SOCKET_URL: string = 'https://api.xact.ac';

/* Export Interfaces */
export * from './models/user.interface';
export * from './models/request.interface';
export * from './models/payment.interface';
export * from './models/token.interface';

export interface Options {
    debugLevel?: DebugLevel
}

export enum DebugLevel {
    DEBUG = 'DEBUG',
    WARN = 'WARN',
    ERROR = 'ERROR',
}

Logger.useDefaults();

export class Client {
    private readonly socket;
    private clientId;

    constructor({apiKey, options = {}}: { apiKey: string, options?: Options }) {
        Logger.setLevel(Client.getLogger(options.debugLevel));
        axios.defaults.headers.common = {
            "Authorization": `X-API-KEY: ${apiKey}`,
        };
        this.socket = io(SOCKET_URL, {
            transports: ['websocket']
        });
    }

    private static getLogger(debugLevel: DebugLevel) {
        switch (debugLevel) {
            case 'DEBUG':
                return Logger.DEBUG;
            case 'WARN':
                return Logger.WARN;
            case 'ERROR':
                return Logger.ERROR;
            default:
                return Logger.OFF;
        }
    }

    /**
     *  Init Connexion
     */
    initConnexion(): Promise<void> {
        Logger.info('Initialize connexion...');
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
     * @param opts
     */
    generateQRCode(opts?: GenerateQrCodeOpts): Promise<string> {
        Logger.info('Generating QR Code ::', opts);
        return ApiCall<string>(this.clientId, 'POST', `${API_URL}/xact/getQRCode`, {
            scope: (opts && opts.scope) ? opts.scope : [ScopeEnum.PROFILE],
            socketId: (opts && opts.socketId) ? opts.socketId : null,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees for Payment
     * @param hbarAmount
     * @param supportXact The amount will be round up
     */
    getXactFeesPayment(hbarAmount: number, supportXact: boolean = false): Promise<number> {
        Logger.info('Getting Xact Fees for Payment...');
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/payment?amount=${hbarAmount}&support=${supportXact}`);
    }

    /**
     * Send hbar
     * @param paymentDto
     */
    pay(paymentDto: PaymentDto): Promise<void> {
        Logger.info('Sending Hbar ::', paymentDto);
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/pay`, {
            ...paymentDto,
            clientId: this.clientId
        });
    }

    /**
     * Associate a token
     * @param tokenAssociationDto
     */
    associate(tokenAssociationDto: TokenAssociateDto): Promise<void> {
        Logger.info('Associating token ::', tokenAssociationDto);
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/associate-token`, {
            ...tokenAssociationDto,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees to Transfer a token
     */
    getXactFeesTransfer(): Promise<number> {
        Logger.info('Getting Xact Fees for Transfer');
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/transfer-token`);
    }

    /**
     * Transfer a token
     * @param tokenTransferDto
     */
    transfer({fromAccountId, toAccountId, tokenId, supply = 1, socketId}: TokenTransferDto): Promise<void> {
        Logger.info('Transfering the token...');
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/transfer-token`, {
            fromAccountId, toAccountId, tokenId, supply, socketId,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees to Create NFT
     */
    getXactFeesCreateNFT(): Promise<number> {
        Logger.info('Getting Xact Fees for NFT Creation');
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/create-token`);
    }

    /**
     *  Create a NFT
     * @param createNFTDto
     */
    async createNFT(createNFTDto: CreateNFTDto): Promise<void> {
        Logger.info('Creating the NFT ::', createNFTDto);
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/create-nft`, {
            ...createNFTDto,
            nft: {
                name: createNFTDto.name,
                description: createNFTDto.description,
                creator: createNFTDto.creator,
                supply: createNFTDto.supply,
                category: createNFTDto.category,
            },
            fromAccountId: createNFTDto.fromAccountId,
            socketId: createNFTDto.socketId,
            clientId: this.clientId
        });
    }

    /**
     * Sell a NFT
     * @param sellNFT
     */
    sellNFT(sellNFT: SellNFTDto): Promise<void> {
        Logger.info('Selling the NFT ::', sellNFT);
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/sell-nft`, {
            ...sellNFT,
            clientId: this.clientId
        });
    }

    /**
     * Delete a NFT from sell
     * @param tokenId
     */
    deleteNFTFromSale({tokenId, socketId}: { tokenId: string, socketId?: string }): Promise<void> {
        Logger.info('Deleting the NFT from sale ::', tokenId);
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/delete-sell-nft/${tokenId}`, {
            socketId,
            clientId: this.clientId
        });
    }

    /**
     * Get Xact Fees to Buy a NFT
     * @param hbarAmount
     * @param supportXact
     */
    getXactFeesBuyNFT(hbarAmount: number, supportXact: boolean = false): Promise<number> {
        Logger.info('Getting Xact Fees to Buy a NFT...');
        return ApiCall<number>(this.clientId, 'GET', `${API_URL}/xact/fees/buy-nft?amount=${hbarAmount}&support=${supportXact}`);
    }

    /**
     * Buy a NFT
     */
    buyNFT(buyNFT: BuyNFTDto): Promise<void> {
        Logger.info('Buying the NFT ::', buyNFT);
        return ApiCall<void>(this.clientId, 'POST', `${API_URL}/xact/buy-nft`, {
            ...buyNFT,
            clientId: this.clientId
        });
    }

    /**
     * Refresh the account
     */
    refreshAccount(opts: RefreshAccountDTO): Promise<UserAccount> {
        Logger.info('Refreshing the account ::', opts);
        return ApiCall<UserAccount>(this.clientId, 'POST', `${API_URL}/xact/sdk/refresh`, {
            accountId: opts.accountId,
            scope: (opts && opts.scope) ? opts.scope : [ScopeEnum.PROFILE],
        });
    }

    /* Get NFT For sale by TokenId */
    getNFTForSaleByTokenId({tokenId}: { tokenId: string }): Promise<NFTForSale> {
        return ApiCall<NFTForSale>(this.clientId, 'GET', `${API_URL}/xact/sdk/nft-for-sale?tokenId=${tokenId}`);
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

    /**
     * Waiting for NFT Create Validation
     */
    createNFTValidation() {
        return listenForEvent<RequestValidation<CreateNFTDto>>(this.socket, 'xact.create');
    }

    /**
     * Waiting for NFT Sell Validation
     */
    sellNFTValidation() {
        return listenForEvent<RequestValidation<SellNFTDto>>(this.socket, 'xact.sellNFT');
    }

    /**
     * Waiting for NFT Sell Deletion Validation
     */
    deleteSellNFTValidation() {
        return listenForEvent<RequestValidation<RemoveNFTDto>>(this.socket, 'xact.deleteSellNFT');
    }

    /**
     * Waiting for NFT Buy Validation
     */
    buyNFTValidation() {
        return listenForEvent<RequestValidation<BuyNFTDto>>(this.socket, 'xact.buyNFT');
    }
}
