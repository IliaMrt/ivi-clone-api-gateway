import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PersonsService {
  constructor(@Inject('ToPersonsMs') private personsRmqProxy: ClientProxy) {}

  async createPerson(createPersonDto: CreatePersonDto) {
    console.log('API Gateway - Persons Service - createPerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'createPerson' },
      { createPersonDto: createPersonDto },
    );
  }

  async updatePerson(personId: number, updatePersonDto: CreatePersonDto) {
    console.log('API Gateway - Persons Service - updatePerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'updatePerson' },
      { personId: personId, updatePersonDto: updatePersonDto },
    );
  }

  async deletePerson(personId: number) {
    console.log('API Gateway - Persons Service - deletePerson at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'deletePerson' },
      { personId: personId },
    );
  }

  async getPersonById(personId: number) {
    console.log('API Gateway - Persons Service - getPersonById at', new Date());
    return this.personsRmqProxy.send(
      { cmd: 'getPersonById' },
      { personId: personId },
    );
  }

  async getPersons() {
    console.log('API Gateway - Persons Service - getPersons at', new Date());
    return this.personsRmqProxy.send({ cmd: 'getPersons' }, {});
  }
}
