import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { IUser } from 'src/types/types'
import { RegisterUserDto } from './dto/register.dto'


@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private jwtService: JwtService
		){}
  

  async register(dto: RegisterUserDto) {
    await this.userService.createUser(dto.email,dto.full_name,dto.password, dto.role)
    return 'Регистрация прошла успешно'
  }

	async validateUser(email: string, password: string){
    const user = await this.userService.findUserByEmail(email);
		const passwordMatch = await bcrypt.compare(password, user.password)
    if (user && passwordMatch) {
      return user
    }
    throw new UnauthorizedException("Email или пароль не корректны")
  }

	async login(user: IUser) {
    const {id, email} = user
    return {
      id, email, token: this.jwtService.sign({id: user.id, email: user.email})
    };
  }
}
