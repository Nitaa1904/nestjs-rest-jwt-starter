import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

interface LoginDto {
  email: string;
  password: string;
}

interface RegisterDto extends LoginDto {
  name: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }
}
