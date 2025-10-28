import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { User } from '../users/user.entity';

// req.user will be a User (without password) as returned by JwtStrategy.validate

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: any, @Request() req: ExpressRequest & { user?: User }) {
    // req.user will be a User (sans password) as returned by JwtStrategy.validate
    if (!req.user) {
      throw new Error('Unauthorized');
    }

    return this.postsService.create(dto, req.user);
  }
}
