import {CategoryNFT} from './token.interface';

export class UserAccount {
    /* AccountId of the user */
    accountId: string;
    /* Balance of the user in hbar */
    balance: number;
    /* Profile Link to the user - Add SCOPE.PROFILE to scope*/
    profile: ProfileAccount | null;
    /* NFT Link to the user - Add SCOPE.NFT to scope */
    nft: NFT[] | null;
    /* Environment Used */
    environment: HederaEnvironment;
}

export interface NFT {
    /* Token Id of the NFT */
    tokenId: string;
    /* Name of the NFT */
    name: string;
    /* Description of the NFT */
    description: string | {description: string, type: string};
    /* Category of the NFT */
    category: CategoryNFT;
    /* Creator of the NFT */
    creator: string;
    /* Url of the NFT */
    url: string;
    /* cid of the NFT - When Store on IPFS */
    cid: string;
    /* Nb of Supply of the NFT */
    supply: number;
    /* NFT for sale */
    nftIdsForSale: Array<SaleNFT> | null;
    /* NFT Ids */
    nftIds?: Array<string>
}

export interface SaleNFT {
    /* Token ID of the NFT */
    tokenId: string;
    /* nft ID of the NFT */
    nftId: string;
    /* Account ID of the owner */
    accountId: string;
    /* Unit Price of the NFT */
    hbarAmount: number;
    /* Quantity of the NFT for Sale */
    quantity: number;
    /* Name of the NFT */
    name: string
}

export enum HederaEnvironment {
    MAINNET = 'mainnet',
    TESTNET = 'testnet'
}

export class ProfileAccount {
    country: string;
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

export type Scope = ScopeEnum[];

export enum ScopeEnum {
    PROFILE = 'profile',
    NFT = 'nft',
}

export interface GenerateQrCodeOpts {
    socketId?: string;
    scope?: ScopeEnum[];
}

export interface RefreshAccountDTO {
    accountId: string,
    scope?: ScopeEnum[]
}
