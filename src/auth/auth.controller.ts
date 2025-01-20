import { UserService } from './../user/user.service';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/auth.dto';
import { RefreshGuard } from './guards/refresh/refresh.guard';
import { PayloadFromVerifyToken } from './interfaces/jwt.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService:UserService
  ) {}

  @Post('/register')
  async registerUser( @Body() dto:CreateUserDto, ){ //@Res() res:Response
    return await this.userService.create(dto);
  }


  @Post('/login')
  async login(@Body() dto:LoginDto){
    return this.authService.login(dto);
  }

  @Post('/refresh')
  @UseGuards(RefreshGuard)
  async refreshToken(@Request() req:Request){
     return await this.authService.refreshToken(req['user'] as PayloadFromVerifyToken);
  }
}
