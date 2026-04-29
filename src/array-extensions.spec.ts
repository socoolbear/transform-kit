import './array-extensions';
import type { Transformer } from './transformer.interface';

class IndexedTransformer implements Transformer<string, string> {
  transform(data: string, index: number): string {
    return `${data}-${index}`;
  }
}

describe('Array.prototype.transform (opt-in extension)', () => {
  it('should be installed on Array.prototype after import', () => {
    expect(typeof Array.prototype.transform).toBe('function');
  });

  it('should map each item with the transformer', () => {
    const items = ['a', 'b', 'c'];
    const transformer = new IndexedTransformer();

    const result = items.transform(transformer);

    expect(result).toEqual(['a-0', 'b-1', 'c-2']);
  });

  it('should return empty array when called on empty array', () => {
    const result: string[] = [].transform(new IndexedTransformer());

    expect(result).toEqual([]);
  });

  it('should pass sequential indices starting from 0', () => {
    const indices: number[] = [];

    class IndexCapturingTransformer implements Transformer<number, number> {
      transform(data: number, index: number): number {
        indices.push(index);
        return data;
      }
    }

    [10, 20, 30, 40].transform(new IndexCapturingTransformer());

    expect(indices).toEqual([0, 1, 2, 3]);
  });

  it('should not mutate the source array', () => {
    const items = [1, 2, 3];
    const snapshot = [...items];

    class DoubleTransformer implements Transformer<number, number> {
      transform(data: number): number {
        return data * 2;
      }
    }

    items.transform(new DoubleTransformer());

    expect(items).toEqual(snapshot);
  });

  it('should be safe to import multiple times (idempotent)', () => {
    const before = Array.prototype.transform;

    require('./array-extensions');

    expect(Array.prototype.transform).toBe(before);
  });
});
