import { Injectable } from '@nestjs/common';

const AUTH_USERNAME = 'dna';
const AUTH_PASSWORD = 'F0nch3rt0';
const PRIV_KEY = 'asdasdasdaaaasdadawsd';

@Injectable()
export class AuthService {
  auth(username: string, password: string): string | null {
    if (!(username === AUTH_USERNAME) || !(password === AUTH_PASSWORD))
      return null;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken');
    const result = jwt.sign(
      { username, password, status: 'Active' },
      PRIV_KEY,
      {
        expiresIn: '1d',
      },
    );

    return result;
  }

  async verify(token): Promise<boolean> {
    return new Promise((resolve) => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const jwt = require('jsonwebtoken');
      jwt.verify(token, PRIV_KEY, (error) => {
        if (error) return resolve(false);
        return resolve(true);
      });
    });
  }
}
