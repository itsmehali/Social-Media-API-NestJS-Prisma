import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [PrismaModule, MulterModule.register({ dest: './profile_pictures' })],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
