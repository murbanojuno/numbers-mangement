import { Module } from '@nestjs/common';
import { NumbersModule } from './numbers/numbers.module';

@Module({
  imports: [NumbersModule],
})
export class AppModule {}
