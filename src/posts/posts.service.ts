import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private repo: Repository<Post>) {}

  create(dto: any, user: User) {
    const post = this.repo.create({ ...dto, user });
    return this.repo.save(post);
  }

  findAll() {
    return this.repo.find({ relations: ['user'] });
  }
}
