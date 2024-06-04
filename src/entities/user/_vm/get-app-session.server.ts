'use server';
import { auth } from '@/entities/user/auth/auth';

export const getAppSessionServer = async () => await auth();
