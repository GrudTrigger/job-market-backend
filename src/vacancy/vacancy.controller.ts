import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { ApiTags } from '@nestjs/swagger'

@ApiTags("VACANCY")
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}


  @Get('/')
  async getAllVacancy() {
    return this.vacancyService.getAllVacancy()
  }

  @Get('/:id')
  async getVacancyById(@Param('id', ParseIntPipe) id: number) {
    return this.vacancyService.getVacancyById(id)
  }
}
