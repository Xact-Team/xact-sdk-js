import {HederaEnvironment, NFT} from './user.interface';

export class TokenAssociateDto {
    /* AccountId that associate the token */
    fromAccountId: string;
    /* Token to Associate */
    tokenId: string;
    /* Uniq identifier for your socket id */
    socketId?: string;
}

export class TokenTransferDto {
    /* From which account to transfer the token */
    fromAccountId: string;
    /* Account that receive the token */
    toAccountId: string;
    /* Token to Transfer */
    tokenId: string;
    /* Supply */
    supply: number;
    /* Uniq identifier for your socket id */
    socketId?: string;
}

export class SellNFTDto {
    /* Account ID of the seller */
    fromAccountId: string;
    /* Unit Price per NFT in Hbar */
    hbarAmount: number;
    /* Quantity for sale */
    quantity: number;
    /* tokenId of the NFT */
    tokenId: string;
    /* Uniq identifier for your socket id */
    socketId?: string;
}

export class BuyNFTDto {
    /* Account ID of the Buyer */
    fromAccountId: string;
    /* Quantity to Buy */
    quantity: number;
    /* Token ID of the NFT */
    tokenId: string;
    /* Uniq identifier for your socket id */
    socketId?: string;
}

export class RemoveNFTDto {
    /* Account ID of the Seller */
    accountId: string;
    /* Token ID of the NFT */
    tokenId: string;
    /* Uniq identifier for your socket id */
    socketId?: string;
}

export enum CategoryNFT {
    ART = 'Art',
    DIGITAL_ART = 'Digital art',
    MUSIC = "Music",
    COLLECTIBLE = "Collectible",
    DOCUMENT = "Document",
    OTHER = "Other",
}

export interface customRoyaltyFee {
    numerator: number,
    denominator: number,
    fallbackFee: number,
}

export class CreateNFTDto {
    /* Name of the NFT */
    name: string;
    /* Description of the NFT */
    description: string;
    /* Category of the NFT */
    category: CategoryNFT;
    /* Creator of the NFT */
    creator: string;
    /* Media to linked to the NFT - base64 Format */
    media: string;
    /* Quantity of NFT to create */
    supply: number;
    /* Which Account ID issue the NFT's Creation */
    fromAccountId: string;
    /* Add Custom Fee - https://docs.hedera.com/guides/docs/sdks/tokens/custom-token-fees#royalty-fee */
    customRoyaltyFee?: customRoyaltyFee;
    /* Uniq identifier for your socket id */
    socketId?: string;
}

export class NFTForSale {
    /* Environment Used */
    environment: HederaEnvironment;
    /* Account ID of the NFT's Creator */
    accountId: string;
    /* Unit Price per NFT in Hbar */
    hbarAmount: number;
    /* Quantity to Sell */
    quantity: number;
    /* NFT */
    nft: NFT;
    /* QR Code - Scan It with Xact Wallet in order to buy*/
    qrCode: string;
}

