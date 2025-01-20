import { Controller, Get, Inject, NotFoundException, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt/jwt.guard';

@Controller('users')
export class UserController {

    constructor(
        @Inject()
        private readonly userService:UserService
    ){}
    
    @Get(':id')
    @UseGuards(JwtGuard)
    async getUserProfile(@Param('id', ParseIntPipe) id:number){
        const user =  await this.userService.findById(id);
        if(!user) throw new NotFoundException(`Usuario con id:${id} no encontrado`)
        const { password, ...result}=user;
        return result;
    }
}
