import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  SerializeOptions,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { PostsService } from '../posts/posts.service';
import { SetResponseMessage } from '../utils/response-format.interceptor';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(JwtAuthGuard)
@SerializeOptions({ strategy: 'excludeAll' })
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @SetResponseMessage('Create a new user')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @SetResponseMessage('Get all users')
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @SetResponseMessage('Get user details')
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const user = await this.usersService.findOne(uuid);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @SetResponseMessage('Update user')
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.update(uuid, updateUserDto);
    return this.findOne(uuid);
  }

  @SetResponseMessage('Delete user')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }

  @SetResponseMessage('Get all posts from the user')
  @Get(':uuid/posts')
  async findPosts(@Param('uuid') uuid: string) {
    return this.postsService.findByUserUuid(uuid);
  }
}
