import { IsString, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongP@ss123',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'StrongP@ss123',
  })
  @IsString()
  password: string;
}
