import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'
import * as bcrypt from 'bcrypt'


@Injectable()
export class UsersService {
	constructor(private db: PrismaService){}

	async createUser(email: string, full_name: string, password: string, role: string) {
		
		const existUser = await this.findUserByEmail(email)

		if(existUser) {
			throw new BadRequestException("Пользователь с таким email уже зарегистрирован")
		}

		const hashPassword = await bcrypt.hash(password, 10)
		await this.db.user.create({
			data: {
				email,
				full_name,
				role,
				password: hashPassword
			}
		})
	}


	async findUserByEmail(email: string) {
		return await this.db.user.findFirst({
			where: {
				email
			}
		})
	}
}
