import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

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
        const payload = {
            username: user.email,
            sub:{
                name:user.name
            }
        } 

        return {
            user,
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



    async validateUser(dto:LoginDto){
        const user =  await this.userService.findByEmail(dto.email);

        if(user && (compare(dto.password, user.password))){
            const {password, ...result} =  user;
            return result;
        }

        throw new UnauthorizedException("Error al validar usuario");
    }
}
