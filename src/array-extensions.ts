import type { Transformer } from './transformer.interface';

declare global {
  interface Array<T> {
    transform<R>(transformer: Transformer<T, R>): R[];
  }
}

Array.prototype.transform = function <T, R>(this: T[], transformer: Transformer<T, R>): R[] {
  return this.map((item, index) => transformer.transform(item, index));
};

export {};
