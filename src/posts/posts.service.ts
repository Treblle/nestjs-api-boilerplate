import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number) {
    const newPost = this.postsRepository.create({
      uuid: uuid(),
      user: { id: userId },
      ...createPostDto,
    });
    return this.postsRepository.save(newPost);
  }

  async findAll() {
    return this.postsRepository.find();
  }

  async findOne(uuid: string) {
    return this.postsRepository.findOneBy({ uuid });
  }

  async findByUserUuid(uuid: string) {
    return this.postsRepository.findBy({ user: { uuid } });
  }

  async update(uuid: string, updatePostDto: UpdatePostDto) {
    await this.postsRepository.update({ uuid }, updatePostDto);
  }

  async remove(uuid: string) {
    await this.postsRepository.delete({ uuid });
  }
}
