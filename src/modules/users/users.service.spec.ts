import { Test, TestingModule } from '@nestjs/testing';
import { Knex } from 'knex';
import { KnexModule, getConnectionToken } from 'nest-knexjs';
import { UsersService } from './users.service';

describe('UsersService', () => {
  const knex = jest.mock('knex');
  let service: UsersService;
  const mockUserRepository = {
    createUser: jest.fn((dto) => {
      return {
        id: Math.floor(1 + Math.random() * 10),

        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,

        {
          provide: getConnectionToken(),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // create user service (task 1)
  it('should create a user', async () => {
    const userDto = {
      email: 'badbelle@gmail.com',
      password: '123456',
    };
    expect(service.createUser(userDto));
  });
});
