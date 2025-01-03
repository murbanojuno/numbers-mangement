import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { NumberEntity } from './types/number.entity';
import { CreateNumberDto } from './dtos/create-number.dto';
import { UpdateNumberDto } from './dtos/update-number.dto';
import { numbersMock } from '../mock/numbers.mock';

@Injectable()
export class NumbersService {
  private numbers: NumberEntity[] = numbersMock;

  findAll(): NumberEntity[] {
    return this.numbers;
  }

  findOne(id: string): NumberEntity {
    const number = this.numbers.find((n) => n.id === id);
    if (!number) {
      throw new NotFoundException(`Number with id ${id} not found`);
    }
    return number;
  }

  create(createNumberDto: CreateNumberDto): NumberEntity {
    const newNumber: NumberEntity = {
      id: uuidv4(),
      ...createNumberDto,
    };
    this.numbers.push(newNumber);
    return newNumber;
  }

  update(id: string, updateNumberDto: UpdateNumberDto): NumberEntity {
    const existingNumber = this.findOne(id);
    const updatedNumber = { ...existingNumber, ...updateNumberDto };
    this.numbers = this.numbers.map((number) =>
      number.id === id ? updatedNumber : number,
    );
    return updatedNumber;
  }

  remove(id: string): void {
    const existingNumber = this.findOne(id);
    this.numbers = this.numbers.filter((number) => number.id !== existingNumber.id);
  }
}
