import { Expose } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToMany,
} from 'typeorm';

import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Expose()
  @Index()
  @Column({ type: 'uuid' })
  uuid!: string;

  @Expose()
  @Column()
  name!: string;

  @Expose()
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Expose()
  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt!: Date;
}
