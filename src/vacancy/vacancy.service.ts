import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class VacancyService {

	constructor(
		private readonly db: PrismaService
	){}

	async getAllVacancy() {
		return await this.db.vacancy.findMany()
	}

	async getVacancyById(id) {
		return await this.db.vacancy.findFirst({where : id})
	}
}
