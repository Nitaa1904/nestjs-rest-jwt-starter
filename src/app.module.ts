import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from './users/user.entity';
import { Post } from './posts/post.entity';

@Module({
  imports: [
    // Load .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Database connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: parseInt(config.get('DB_PORT') ?? '5432', 10),
        username: config.get('DB_USER') ?? undefined,
        password: config.get('DB_PASS') ?? undefined,
        database: config.get('DB_NAME') ?? undefined,
        entities: [User, Post],
        synchronize: true, // ⚠️ hanya untuk development
        autoLoadEntities: true,
      }),
    }),

    AuthModule,
    UsersModule,
    PostsModule,
  ],
})
export class AppModule {}
