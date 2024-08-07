import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { User } from '../core/entities/user.entity';
import { createApiResponse } from '../utility/utility.core';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string) {
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await argon2.hash(password);
    const user = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    await this.userRepository.save(user);
    return createApiResponse('User registered successfully');
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const token = this.jwtService.sign(payload);
    return createApiResponse('User logged in successfully', { access_token: token });
  }

  async activateAccount(userId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    user.isActive = true;
    await this.userRepository.save(user);

    return createApiResponse('Account activated successfully');
  }
}

