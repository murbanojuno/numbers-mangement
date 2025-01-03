import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { NumbersService } from './numbers.service';
  import { CreateNumberDto } from './dtos/create-number.dto';
  import { UpdateNumberDto } from './dtos/update-number.dto';
  
  @Controller('numbers')
  export class NumbersController {
    constructor(private readonly numbersService: NumbersService) {}
  
    @Get()
    findAll() {
      return this.numbersService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.numbersService.findOne(id);
    }
  
    @Post()
    create(@Body() createNumberDto: CreateNumberDto) {
      return this.numbersService.create(createNumberDto);
    }
  
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNumberDto: UpdateNumberDto) {
      return this.numbersService.update(id, updateNumberDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.numbersService.remove(id);
    }
  }
  