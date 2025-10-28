import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { Express } from 'express';
import { ConfigService } from '@nestjs/config';

// Define the expected response type
interface LoginResponse {
  access_token: string;
}

describe('Auth E2E', () => {
  let app: INestApplication;
  let token: string;
  let httpServer: Express;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: (key: string) => {
          switch (key) {
            case 'DB_HOST':
              return 'localhost';
            case 'DB_PORT':
              return '5432';
            case 'DB_USER':
              return process.env.DB_USER || 'postgres';
            case 'DB_PASS':
              return process.env.DB_PASS || 'postgres';
            case 'DB_NAME':
              return 'nestjs_jwt_db';
            case 'JWT_SECRET':
              return 'test-secret';
            default:
              return undefined;
          }
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    httpServer = app.getHttpServer();
  }, 30000); // Increase timeout for database setup

  it('Register -> Login -> Access Protected', async () => {
    const uniqueEmail = `nita_${Date.now()}@test.com`;

    await request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: uniqueEmail, password: '123456', name: 'Nita' })
      .expect(201);

    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'nita@test.com', password: '123456' })
      .expect((res) => {
        expect([200, 201]).toContain(res.status);
      });

    // Type-safe access to response body
    const loginResponse = res.body as LoginResponse;
    token = loginResponse.access_token;

    await request(httpServer)
      .get('/posts')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
