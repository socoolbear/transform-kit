import { transformArray } from './transform-array';
import type { Transformer } from './transformer.interface';

class IndexedTransformer implements Transformer<string, string> {
  transform(data: string, index: number): string {
    return `${data}-${index}`;
  }
}

describe('transformArray', () => {
  it('should map each item with the transformer', () => {
    const items = ['a', 'b', 'c'];
    const transformer = new IndexedTransformer();

    const result = transformArray(items, transformer);

    expect(result).toEqual(['a-0', 'b-1', 'c-2']);
  });

  it('should return empty array for empty input', () => {
    const transformer = new IndexedTransformer();

    const result = transformArray([], transformer);

    expect(result).toEqual([]);
  });

  it('should pass sequential indices starting from 0', () => {
    const indices: number[] = [];

    class IndexCapturingTransformer implements Transformer<number, number> {
      transform(data: number, index: number): number {
        indices.push(index);
        return data * index;
      }
    }

    transformArray([10, 20, 30, 40], new IndexCapturingTransformer());

    expect(indices).toEqual([0, 1, 2, 3]);
  });

  it('should not mutate the original array', () => {
    const items = [1, 2, 3];
    const snapshot = [...items];

    class DoubleTransformer implements Transformer<number, number> {
      transform(data: number): number {
        return data * 2;
      }
    }

    transformArray(items, new DoubleTransformer());

    expect(items).toEqual(snapshot);
  });
});
