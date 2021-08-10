export class TokenAssociateDto {
    /* AccountId that associate the token */
    fromAccountId: string;
    /* Token to Associate */
    tokenId: string;
}

export class TokenTransferDto {
    /* From which account to transfer the token */
    fromAccountId: string;
    /* Account that receive the token */
    toAccountId: string;
    /* Token to Transfer */
    tokenId: string;
    /* Supply */
    supply: number
}

export enum CategoryNFT {
    ART = 'Art',
    DIGITAL_ART = 'Digital art',
    MUSIC = "Music",
    COLLECTIBLE = "Collectible",
    DOCUMENT = "Document",
    OTHER = "Other",
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
}

