import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Validar credenciales del usuario
   */
  async validateUser(email: string, password: string): Promise<User> {
    try {
      // 🔹 Aquí deberías buscar el usuario en la BD
      const user: User = {
        id: '1dd2b74b-0fb3-43fa-a7af-e5b58bc1e53b',
        email: 'test@edu.com',
        password: await bcrypt.hash('123456', 10), // simulado
        role: 'student',
      };

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Credenciales inválidas');
      }

      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Error desconocido en la validación');
    }
  }

  /**
   * Generar JWT para el usuario validado
   */
  async login(user: User) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
