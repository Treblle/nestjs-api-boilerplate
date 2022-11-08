import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { HashingService } from '../auth/hashing.service';
import { PostgresErrorCode } from '../database/postgress-error-code.enum';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DuplicateUserException } from './exceptions/duplicate-user.exception';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private hashingService: HashingService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await this.hashingService.hashString(
      createUserDto.password,
    );
    const newUser = this.usersRepository.create({
      ...createUserDto,
      uuid: uuid(),
      password: hashedPassword,
    });
    try {
      await this.usersRepository.save(newUser);
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        if ((error as any).code === PostgresErrorCode.UniqueViolation) {
          throw new DuplicateUserException();
        }
      }
    }
    return newUser;
  }

  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(uuid: string) {
    return this.usersRepository.findOneBy({ uuid });
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ uuid }, updateUserDto);
  }

  async remove(uuid: string) {
    await this.usersRepository.delete({ uuid });
  }
}
