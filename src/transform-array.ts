import type { Transformer } from './transformer.interface';

/**
 * 배열을 지정된 Transformer 로 매핑한다. prototype patch 없이 동일한 시맨틱을 함수로 제공한다.
 *
 * @example
 * ```typescript
 * const edges = transformArray(items, new PlayerEdgeTransformer());
 * ```
 */
export function transformArray<T, R>(items: T[], transformer: Transformer<T, R>): R[] {
  return items.map((item, index) => transformer.transform(item, index));
}
