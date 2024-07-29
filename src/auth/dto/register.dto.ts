import { IsEmail, IsString, MinLength } from 'class-validator'

export class RegisterUserDto {
	@IsEmail()
	email: string

	@IsString()
	full_name: string

	@IsString()
	@MinLength(6, {message: "Длина пароля должна быть больше 6 симоволов"})
	password: string

	@IsString()
	role: string
}