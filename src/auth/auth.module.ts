import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports:[], //no necesito importar todo el modulo si solo sera el UserService
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService, JwtService],
})
export class AuthModule {}
