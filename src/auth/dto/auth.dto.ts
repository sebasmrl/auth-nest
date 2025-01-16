import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto{

    @IsString({ message:"Campo 'email' es requerido"})
    @IsEmail({}, { message:"Campo 'email' debe ser un email válido"})
    email:string;

    
    @IsString({ message:"Campo 'password' es requerido"})
    @MinLength(10, { message:"Campo 'password' debe tener minimo 10 caracteres"})
    password:string;

}