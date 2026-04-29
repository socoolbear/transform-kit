export interface Transformer<T, S> {
  transform(data: T, index: number): S;
}
