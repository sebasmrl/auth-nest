import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { PayloadFromVerifyToken } from "src/auth/interfaces/jwt.interface";


@Injectable()
export class JwtGuard implements CanActivate{

    constructor(
        @Inject()
        private readonly jwtService:JwtService
    ){}
    

    async canActivate(context: ExecutionContext):  Promise<boolean> {
        const req:Request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        if(!token) throw new UnauthorizedException("Tooken no existe en la peticion");

        try{
            const payload = await this.jwtService.verifyAsync<PayloadFromVerifyToken>(token, {
                secret: process.env.JWT_SECRET_KEY
            });
            req['user'] = payload; 
            this.jwtService.decode
            

        }catch(e){
            throw new UnauthorizedException('Token Invalido ')
        }
        
        return true;
        
    }

    private extractTokenFromHeader(req:Request): string | undefined{
        const authorization:string  = req.headers["authorization"] ?? '';
        const [type, token] = authorization.split(' ') ;

        return (type === 'Bearer') ? token : undefined 
    }

}