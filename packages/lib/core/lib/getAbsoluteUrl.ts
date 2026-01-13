import { headers } from 'next/headers';

export async function getAbsoluteUrl() {
  return (await headers()).get('host')
}
