import { Controller, Post, Body } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from 'src/modules/person/dto/create-person.dto';

@Controller('person')
export class PersonController {
    constructor(private PersonService: PersonService) {}

    @Post()
    async createPerson(@Body() createPersonDto: CreatePersonDto) {
        return this.PersonService.createPerson(createPersonDto);
    }

}
