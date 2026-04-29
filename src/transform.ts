import type { Transformer } from './transformer.interface';

/**
 * 단일 아이템을 지정된 Transformer 를 사용하여 변환한다.
 *
 * @example
 * ```typescript
 * const playerModel = transform(playerEntity, new PlayerTransformer());
 * const edge = transform(item, new PlayerEdgeTransformer(), index);
 * ```
 */
export function transform<T, R>(item: T, transformer: Transformer<T, R>, index: number = 0): R {
  return transformer.transform(item, index);
}
