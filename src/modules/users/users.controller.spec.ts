import { Test, TestingModule } from '@nestjs/testing';
import { Knex } from 'knex';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUserService = {
    createUser: jest.fn((dto) => {
      return {
        id: Math.floor(1 + Math.random() * 10),

        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    })
      .overrideProvider(UsersService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //create user controller (task 1)
  it('should receive request to create user', async () => {
    const userDto = {
      email: 'ojoro@gmail.com',
      password: '123456',
    };
    expect(controller.createUser(userDto));
  });
});
