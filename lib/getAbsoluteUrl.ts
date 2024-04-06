import { headers } from 'next/headers';

export function getAbsoluteUrl() {
  return headers().get('host')
}
