export class NotImplementedError extends Error {}

export function NotImplemented() {
  throw new NotImplementedError('Not Implemented');
}
