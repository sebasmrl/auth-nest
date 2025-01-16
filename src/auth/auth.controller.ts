import { UserService } from './../user/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/user.dto';
import { LoginDto } from './dto/auth.dto';

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
}
