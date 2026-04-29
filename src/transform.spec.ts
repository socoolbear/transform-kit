import { transform } from './transform';
import type { Transformer } from './transformer.interface';

class MockTransformer implements Transformer<number, string> {
  transform(data: number, index: number): string {
    return `item-${data}-${index}`;
  }
}

class SimpleTransformer implements Transformer<string, string> {
  transform(data: string, index: number): string {
    return `${data.toUpperCase()}-${index}`;
  }
}

describe('transform utility function', () => {
  it('should transform single item using provided transformer', () => {
    const input = 42;
    const transformer = new MockTransformer();

    const result = transform(input, transformer);

    expect(result).toBe('item-42-0');
  });

  it('should transform item with custom index', () => {
    const input = 10;
    const transformer = new MockTransformer();

    const result = transform(input, transformer, 5);

    expect(result).toBe('item-10-5');
  });

  it('should pass correct index to transformer', () => {
    const input = 'hello';
    const transformer = new SimpleTransformer();

    const result = transform(input, transformer, 3);

    expect(result).toBe('HELLO-3');
  });

  it('should work with different data types', () => {
    const input = 'world';
    const transformer = new SimpleTransformer();

    const result = transform(input, transformer);

    expect(result).toBe('WORLD-0');
  });

  it('should use default index 0 when not provided', () => {
    const input = 'test';
    const transformer = new SimpleTransformer();

    const result = transform(input, transformer);

    expect(result).toBe('TEST-0');
  });

  it('should handle complex objects', () => {
    interface TestEntity {
      id: number;
      name: string;
    }

    interface TestModel {
      entityId: number;
      displayName: string;
      index: number;
    }

    class TestTransformer implements Transformer<TestEntity, TestModel> {
      transform(entity: TestEntity, index: number): TestModel {
        return {
          entityId: entity.id,
          displayName: entity.name.toUpperCase(),
          index,
        };
      }
    }

    const input: TestEntity = { id: 1, name: 'test' };
    const transformer = new TestTransformer();

    const result = transform(input, transformer, 2);

    expect(result).toEqual({
      entityId: 1,
      displayName: 'TEST',
      index: 2,
    });
  });
});
