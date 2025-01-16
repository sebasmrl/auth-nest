import { IsEmail, IsString } from "class-validator";

export class CreateUserDto{

    @IsString()
    name:string;

    @IsString()
    @IsEmail({}, { message:"El campo email es requerido"})
    email:string;

    @IsString()
    password:string;

    mascota:number;
}