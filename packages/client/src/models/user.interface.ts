import {CategoryNFT} from './token.interface';

export class UserAccount {
    /* AccountId of the user */
    accountId: string;
    /* Balance of the user in hbar */
    balance: string;
    /* Profile Link to the user - Add SCOPE.PROFILE to scope*/
    profile: ProfileAccount | null;
    /* NFT Link to the user - Add SCOPE.NFT to scope */
    nft: NFT[] | null;
    /* Environment Used */
    environment: HederaEnvironment;
}

export interface NFT {
    /* Name of the NFT */
    name: string;
    /* Description of the NFT */
    description: string;
    /* Category of the NFT */
    category: CategoryNFT;
    /* Creator of the NFT */
    creator: string;
    /* Url of the NFT */
    url?: string;
    /* Nb of Supply of the NFT */
    supply: number;
    /* NFT is in Sell ? */
    inSell: boolean;
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
