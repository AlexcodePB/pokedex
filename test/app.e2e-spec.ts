import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('User endpoints', () => {
    it('/user (GET) - should return all users', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(200)
        .expect('This action returns all user');
    });

    it('/user (POST) - should create a new user', () => {
      return request(app.getHttpServer())
        .post('/user')
        .send({})
        .expect(201)
        .expect('This action adds a new user');
    });

    it('/user/:id (GET) - should return a specific user', () => {
      return request(app.getHttpServer())
        .get('/user/1')
        .expect(200)
        .expect('This action returns a #1 user');
    });

    it('/user/:id (PATCH) - should update a specific user', () => {
      return request(app.getHttpServer())
        .patch('/user/1')
        .send({})
        .expect(200)
        .expect('This action updates a #1 user');
    });

    it('/user/:id (DELETE) - should remove a specific user', () => {
      return request(app.getHttpServer())
        .delete('/user/1')
        .expect(200)
        .expect('This action removes a #1 user');
    });
  });
});
