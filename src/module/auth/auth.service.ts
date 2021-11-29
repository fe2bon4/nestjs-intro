import { Injectable } from '@nestjs/common';
import { ERole } from './types';
const PRIV_KEY = 'asdasdasdaaaasdadawsd';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
@Injectable()
export class AuthService {
  store = {
    dna: {
      id: '1',
      role: ERole.ADMIN,
      password: 'F0nch3rt0',
    },
    nobody: {
      id: '0',
      role: ERole.NOBODY,
      password: 'nopassword',
    },
  };
  async auth(username: string, password: string): Promise<string | null> {
    // Fetch User and Role from Database
    const user = this.store[username];
    if (!user) return null;
    if (!(user.password === password)) return null;

    return jwt.sign({ role: user.role, username, id: user.id }, PRIV_KEY, {
      expiresIn: '1d',
    });
  }

  async verify(token): Promise<boolean> {
    return new Promise((resolve) => {
      jwt.verify(token, PRIV_KEY, (error) => {
        if (error) return resolve(false);
        return resolve(true);
      });
    });
  }

  async decode(token): Promise<any | null> {
    return new Promise((resolve) => {
      jwt.verify(token, PRIV_KEY, (err, decoded) => {
        if (err) return resolve(null);
        return resolve(decoded);
      });
    });
  }
}
