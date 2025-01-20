

export interface PayloadForSignToken{
    username:string;
    sub:{
        name:string;
    }
}


export interface PayloadFromVerifyToken extends PayloadForSignToken{
    iat:number,
    exp:number
}
