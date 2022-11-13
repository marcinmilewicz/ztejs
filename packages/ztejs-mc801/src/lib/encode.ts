import { createHash } from 'crypto';

export const encodeLoginHash = (password: string, LD: string): string =>
  createSHAHash(createSHAHash(password) + LD);

export const encodeAD = (version: string, RD: string): string =>
  createMD5Hash(createMD5Hash(version) + RD);

const createMD5Hash = (input: string): string =>
  createHash('md5').update(input).digest('hex');

const createSHAHash = (input: string): string =>
  createHash('sha256').update(input).digest('hex').toUpperCase();
