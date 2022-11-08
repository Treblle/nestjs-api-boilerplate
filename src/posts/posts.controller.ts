import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SerializeOptions,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { AuthUser } from '../auth/auth-user.decorator';
import { SetResponseMessage } from '../utils/response-format.interceptor';

@UseGuards(JwtAuthGuard)
@SerializeOptions({ strategy: 'excludeAll' })
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @SetResponseMessage('Create a new post')
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @AuthUser() authUser: AuthUser,
  ) {
    return this.postsService.create(createPostDto, authUser.id);
  }

  @SetResponseMessage('Get all posts')
  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @SetResponseMessage('Get post details')
  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const post = await this.postsService.findOne(uuid);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  @SetResponseMessage('Update post')
  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(uuid, updatePostDto);
  }

  @SetResponseMessage('Delete post')
  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    return this.postsService.remove(uuid);
  }
}
