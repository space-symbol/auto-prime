import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import { privateConfig } from '@shared/config/private';
import { compact } from 'lodash-es';

export const authConfig = {
  providers: compact([
    privateConfig.GOOGLE_CLIENT_ID &&
      privateConfig.GOOGLE_CLIENT_SECRET &&
      Google({
        clientId: privateConfig.GOOGLE_CLIENT_ID,
        clientSecret: privateConfig.GOOGLE_CLIENT_SECRET,
        authorization: {
          params: { prompt: 'consent' },
        },
      }),
  ]),
} satisfies NextAuthConfig;
