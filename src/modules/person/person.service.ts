import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Person } from '../../common/entities/person.entity';
import { CreatePersonDto } from '../../common/dto/create-person.dto';

@Injectable()
export class PersonService {

    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>,
    ) { }

    async createPerson( createPersonDto: CreatePersonDto) {
        const person = this.personRepository.create(createPersonDto);
        return this.personRepository.save(person);
    }

    async getPeople(): Promise<Person[]> {
        return this.personRepository.find();
    }

    async getPerson(id: number): Promise<Person> {
        const person = await this.personRepository.findOne({ where: { id } });
        if (!person) {
            throw new Error(`Person with id ${id} not found`);
        }
        return person;
    }

    async getPersonByIdentification(identification: string) {
        return await this.personRepository.findOne({ where: { identification } });
    }

}
