import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { PayloadForSignToken, PayloadFromVerifyToken } from './interfaces/jwt.interface';



@Injectable()
export class AuthService {
    constructor(
        @Inject()
        private readonly userService:UserService,
        @Inject()
        private readonly jwtService:JwtService
    ){}


    async login(dto:LoginDto){
        const user = await this.validateUser(dto);
        const payload: PayloadForSignToken= {
            username: user.email,
            sub:{
                name:user.name
            }
        }

        return {
            user,
            backendToken:{
                accessToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '10s',
                    secret: process.env.JWT_SECRET_KEY
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '10s',
                    secret: process.env.JWT_REFRESH_TOKEN_KEY
                }),  
            }
        }
    }



    async validateUser(dto:LoginDto){
        const user =  await this.userService.findByEmail(dto.email);
        if(!user) throw new UnauthorizedException("Correo electronico no registrado")

        if(user && (await compare(dto.password, user.password))){
            const {password, ...result} =  user;
            return result;
        }

        throw new UnauthorizedException("Contraseña incorrecta");
    }



    async refreshToken(user:PayloadFromVerifyToken){
        if(user === null || user === undefined || Object.keys(user).length ==0) return undefined;

        const payload = { 
            username:user.username,
            sub: user.sub
         }


        return {
            backendToken:{
                accessToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '1h',
                    secret: process.env.JWT_SECRET_KEY
                }),
                refreshToken: await this.jwtService.signAsync(payload,{
                    expiresIn: '1h',
                    secret: process.env.JWT_REFRESH_TOKEN_KEY
                }),
            }
        }
    }


}
