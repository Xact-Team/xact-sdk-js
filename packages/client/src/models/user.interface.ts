export class UserAccount {
    /* AccountId of the user */
    accountId: string;
    /* Balance of the user in hbar */
    balance: string;
    /* Profile Link to the user */
    profile?: ProfileAccount
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
