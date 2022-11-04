import { Injectable, NotAcceptableException } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UserDto } from './dto/createUser.dto';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  //service to register new user (task 1)
  async createUser(user: UserDto) {
    const { email, password } = user;

    //check if email already exisit
    const userExists = await this.knex('users').where({ email }).first();

    if (userExists) {
      throw new NotAcceptableException('User already exists');
    }

    //hash password
    const hashedPassword = await argon2.hash(password);
    //create user
    await this.knex('users').insert({ email, password: hashedPassword });

    return { status: true, msg: 'User created successfully' };
  }

  //get all user
  async getAllUsers() {
    const user = await this.knex('users').select();
    return {
      status: true,
      data: user,
    };
  }
}
