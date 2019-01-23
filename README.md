# sloth-ts-injection

[![Build Status](https://travis-ci.org/ImOverlord/sloth-ts-injection.svg?branch=master)](https://travis-ci.org/ImOverlord/sloth-ts-injection)
[![Coverage Status](https://coveralls.io/repos/github/ImOverlord/sloth-ts-injection/badge.svg?branch=master)](https://coveralls.io/github/ImOverlord/sloth-ts-injection?branch=master)


Sloth Dependency Injection For Typescript

## Installation

You can get the latest release and the type definitions using npm:

```
$ npm install sloth-ts-injection reflect-metadata --save
```

> /!\\ sloth-ts-injection requires TypeScript >= 2.0, your tsconfig should look similar to the one below (experimentalDecorators, emitDecoratorMetadata are important)
```js
{
    "compilerOptions": {
        "target": "es5",
        "lib": ["es6"],
        "types": ["reflect-metadata"],
        "module": "commonjs",
        "moduleResolution": "node",
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true
    }
}
```

## Getting Started

You can declare dependencies with @slothInject() decorator.

```ts
import { slothInject } from 'sloth-ts-injection';

@slothInject()
export class DependencyA {
    public data: number = 0;
}
```

You can then require this dependency.

```ts
import { slothInject } from 'sloth-ts-injection';
import { DependencyA } from "./dependencyA";

@slothInject()
export class DependencyD {

    constructor(public a: DependencyA   ) { }

    public update() {
        this.a.data++;
    }
}
```

sloth-ts-injection will resolve the dependencies needed for you

```ts
import { Injector } from 'sloth-ts-injection';

const injector = new Injector();
const dep: DependencyD = injector.inject(DependencyD);

dep.update();
```
