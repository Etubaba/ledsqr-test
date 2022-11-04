import {
  Injectable,
  NotFoundException,
  NotAcceptableException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { InjectModel } from 'nest-knexjs';
import { UserDto } from '../users/dto/createUser.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel() private readonly knex: Knex,
    private jwtService: JwtService,
  ) {}

  async login(userDto: UserDto) {
    const { email, password } = userDto;

    const user = await this.knex('users').where('email', email);

    //check if user exist
    if (!user.length) {
      throw new NotFoundException(`User with email: ${email} does not exist`);
    }

    //check if password is correct
    const isPasswordCorrect = await argon2.verify(user[0]?.password, password);

    if (!isPasswordCorrect) {
      throw new NotAcceptableException(`User credentials is incorrect`);
    }

    //generate token
    const payload = { email: user[0].email, id: user[0].id };
    const token = this.jwtService.sign(payload);

    //update user token
    await this.knex('users').where('email', email).update({ token });

    const tokenUpdatedUser = await this.knex('users').where('email', email);

    //delete password for safty
    delete tokenUpdatedUser[0]?.password;
    return { status: true, msg: 'Login successful', user: tokenUpdatedUser[0] };
  }
}
