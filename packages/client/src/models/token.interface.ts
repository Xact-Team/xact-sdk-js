
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


export class CreateNFTDto {
    /* Name of the Token */
    name: string;
    /* Description of the Token */
    description: string;
    /* Category of the Token */
    category: string;
    /* Creator of the Token */
    creator: string;
    /* Media to linked to the NFT - Must be in base64 */
    media: string; /* base 64*/
    /* NFT's Quantity */
    supply: string;
    /* Which Account ID issue the NFT's Creation */
    fromAccountId: string;
}

