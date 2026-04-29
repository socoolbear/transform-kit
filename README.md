# @socoolbear/transform-kit

Typed transform utilities and optional Array extensions for TypeScript.

## 설치

```bash
pnpm add @socoolbear/transform-kit
```

## 핵심 API

### `Transformer<T, S>` 인터페이스

```ts
import type { Transformer } from '@socoolbear/transform-kit';

class PlayerTransformer implements Transformer<PlayerEntity, PlayerModel> {
  transform(entity: PlayerEntity, index: number): PlayerModel {
    return { id: entity.id, rank: index + 1 };
  }
}
```

### `transform(item, transformer, index?)`

단일 아이템 변환.

```ts
import { transform } from '@socoolbear/transform-kit';

const playerModel = transform(playerEntity, new PlayerTransformer());
const edge = transform(item, new PlayerEdgeTransformer(), index);
```

### `transformArray(items, transformer)`

배열 변환을 prototype patch 없이 함수로 사용.

```ts
import { transformArray } from '@socoolbear/transform-kit';

const players = transformArray(entities, new PlayerTransformer());
```

## Opt-in: `Array.prototype.transform`

`items.transform(transformer)` 형태로 쓰고 싶다면 별도 서브패스를 명시적으로 import 해야 한다.

```ts
import '@socoolbear/transform-kit/array-extensions';
import type { Transformer } from '@socoolbear/transform-kit';

declare const items: Entity[];
declare const transformer: Transformer<Entity, Model>;

const models = items.transform(transformer);
```

import 한 시점부터 `Array.prototype.transform` 이 전역으로 설치되며, `Array<T>.transform()` 타입도 동시에 인식된다.

## 왜 서브패스로 분리했나?

`Array.prototype` 확장은 강력한 side effect 다. 패키지 루트에서 자동으로 prototype 을 패치하면 라이브러리 소비자가 의도하지 않은 전역 상태 변경을 떠안게 된다.

이 패키지는 다음 원칙을 따른다.

- **루트 entry 는 side-effect-free**: `import { transform } from '@socoolbear/transform-kit'` 만으로는 `Array.prototype` 이 변하지 않는다.
- **Prototype patch 는 explicit opt-in**: `@socoolbear/transform-kit/array-extensions` 를 명시적으로 import 한 코드만 prototype 확장을 받는다.

`package.json` 의 `sideEffects` 필드도 이 정책에 맞춰 서브패스 모듈만 side effect 를 가진다고 선언한다.

## 라이선스

MIT
