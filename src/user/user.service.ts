import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {

    constructor(
        @Inject()
        private readonly prismaService:PrismaService
    ){}


    async create(createUserDto:CreateUserDto){
        const user = await this.prismaService.user.findUnique({
            where:{
                email: createUserDto.email,
            }
        })

        if(user) throw new ConflictException("email ya se encuentra registrado");

        const newUser = await this.prismaService.user.create({
            data: {
                ...createUserDto,
                
            }
        })
    }
}
