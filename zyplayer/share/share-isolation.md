# 数据隔离

- 环境: nonde.js
- 模块: 代码需要同步执行
- 需求: 最少破坏原有语法(如原有方法`a = 1`; 数据隔离后不能为`newObj.a = 1`)

## 1. 调研
### 1.1. Proxy方法
1. Proxy 是 ES6 新增的 API，它允许你创建一个对象的代理，从而可以拦截和自定义对象的基本操作（如属性查找、赋值、枚举、函数调用等）。使用 Proxy 可以实现数据隔离。
2. Proxy `需要重新定义对象`的所有属性和方法，这可能会导致原有数据模型被破坏。

::: details 点我查看示例代码
```js
// 原始数据对象
const originalData = {
  user: {
    name: 'John Doe',
    admin: false
  }
};

// 创建一个代理来隔离数据
const dataProxy = new Proxy(originalData, {
  get(target, property) {
    if (property === 'user') {
      return { ...target[property] }; // 返回用户对象的浅拷贝
    }
    return target[property];
  },
  set(target, property, value) {
    if (property === 'user') {
      console.log('Attempt to modify user data is blocked.');
      return false; // 阻止修改用户数据
    }
    target[property] = value;
    return true;
  }
});

// 尝试访问数据
console.log(dataProxy.user.name); // 输出 'John Doe'

// 尝试修改数据
dataProxy.user.name = 'Jane Doe'; // 控制台输出 'Attempt to modify user data is blocked.'
console.log(originalData.user.name); // 输出 'John Doe'，原始数据未被修改
```
:::

### 1.2. vm模块
1. 它允许执行代码字符串，并且可以创建一个与当前上下文隔离的上下文。这意味着你可以在一个沙箱环境中执行代码，而不会影响到主环境。但vm模块并`不能完全避免安全逃逸`的风险。
2. 使用 vm 模块需要对现有逻辑进行`较大的修改`，创建沙箱环境并将数据注入进去，然后修改原有逻辑以添加执行方法
3. vm2 是一个高级的 Node.js 虚拟机和沙箱环境，它提供了安全地运行不受信任代码的能力。然而，根据最新的信息，vm2 项目已被宣布停止维护。作者建议迁移到其他库，如 isolated-vm，以获取持续的技术支持和新特性。作者同时表示 `vm 代码已经越来越难维护`。

::: details 点我查看示例代码
```js
const vm = require('vm');

// 原始数据对象
const originalData = {
  user: {
    name: 'John Doe',
    admin: false
  }
};

// 创建沙箱环境
const sandbox = {};

// 创建一个上下文，用于代码执行
const context = new vm.createContext(sandbox);

// 要执行的代码，尝试修改用户数据
const code = `
  user.name = 'Jane Doe'; // 尝试修改用户名称
  console.log(user.name); // 输出修改后的名称
`;

// 在沙箱环境中执行代码
vm.runInContext(code, context, { timeout: 1000, displayErrors: true });

// 检查原始数据是否被修改
console.log(originalData.user.name); // 输出 'John Doe'，原始数据未被修改
```
:::

### 1.3. 子线程(隔离数据)+globalThis(共享数据)
1. globalThis 是一个全局对象，它代表了 JavaScript 运行时的全局执行上下文。无论在浏览器环境还是 Node.js 环境中，globalThis 都指向全局作用域。
2. var 声明的变量`会提升`到它们所在函数或全局作用域的顶部，但会`保持原来作用域`。
    - 变量作用域提升:var 声明的变量会被提升到它们所在函数或全局作用域的顶部，但它们的赋值不会提升。这意味着在变量声明之前访问变量会得到 undefined，而不是报错。
    - 模块作用域隔离:ES6 模块系统中，每个模块都有自己的作用域。在模块内部声明的变量和函数默认是私有的，不会影响到其他模块。
3. Object.defineProperty 用于在对象上定义一个新的属性或修改现有属性，并且能够精确控制该属性的行为。
4. 子线程通过IPC通讯会序列化, 所以不支持传递函数(可以使用额外文件作为共享中间件实现), 此处不做展示

::: details 点我查看`变量作用域提升`示例代码
```js
var a = 'John Doe'; // 会自动变量提升到globalThis
console.log(globalThis.a) // 输出 'John Doe'
globalThis.a = 'hiram'
console.log(globalThis.a) // 输出 'hiram'
var a = 'Jack';
console.log(globalThis.a) // 输出 'Jack'
```
:::

::: details 点我查看`保持原来作用域`示例代码
为什么 a 无法获取到, 因为 a 是隐式提升到globalThis, 作用域在当前文件。

```js
// a.js 文件
var a = 'John Doe'; // 会自动变量提升到globalThis
globalThis.b = 'Jack';
const setA = (val) => {a = val;}
const setB = (val) => {globalThis.b = val;}
export { setA, setB };

// b.js 文件
import { setA, setB } from './a.js';
console.log(globalThis.a) // 输出 undefined
console.log(globalThis.b) // 输出 'Jack'
setA('hiram');
setB('hiram');
console.log(globalThis.a) // 输出 undefined
console.log(globalThis.b) // 输出 'hiram'
```
:::

::: details 点我查看`保持原来作用域(解决隐式提升问题)`示例代码
```js
// a.js 文件
var a = 'John Doe'; // 会自动变量提升到globalThis
Object.defineProperty(globalThis, 'a', {
  get() {
    return a;
  },
  set(value) {
    a = value;
  },
});
const setA = (val) => {a = val;}
export { setA };

// b.js 文件
import { setA } from './a.js';
console.log(globalThis.a) // 输出 'John Doe'
setA('hiram');
console.log(globalThis.a) // 输出 'hiram'
```
:::

## 2. 示例代码

> 采用: 子进程+globalThis

子进程可以完全隔离环境, 但会造成额外的性能开销(`都2024年了, 计算机性能开销通常可以忽略`)

::: details 点我查看`main.ts`代码
```ts:line-numbers
import { fork, ChildProcess } from 'child_process';
import { resolve } from 'path';
import { v4 as uuidv4 } from 'uuid';
import treeKill from 'tree-kill';
import logger from '@main/core/logger';

class T3Adapter {
  isolatedContext: any; // 存储数据隔离上下文
  child: ChildProcess | null = null;

  constructor(source) {
    this.isolatedContext = {
      MY_URL: null,
      HOST: null,
      rule: null,
      rule_fetch_params: null,
      fetch_params: null,
      oheaders: null,
    };
  }

  // 子进程操作
  private doWork = (
    child: ChildProcess | null,
    data: { [key: string]: string | object | null },
  ): Promise<{ [key: string]: any }> => {
    return new Promise((resolve, reject) => {
      child!.once('message', (message: { [key: string]: any }) => {
        resolve(message);
      });

      child!.once('close', (code) => {
        logger.error(`[t3][worker][exit] code ${code}`);
        reject(new Error('Worker closed unexpectedly'));
      });

      child!.once('error', (err) => {
        logger.error(`[t3][worker][error] ${err.message}`);
        reject(err);
      });

      child!.send(data);
    });
  };

  // 执行上下文
  private async execCtx(options: { [key: string]: any }): Promise<any> {
    this.child = fork(resolve(__dirname, 'worker.js'), [`T3Fork-execCtx-${uuidv4()}`]);
    const res = await this.doWork(this.child!, { ...options, ctx: { ...this.isolatedContext } });
    this.isolatedContext = res.ctx;
    this.child.removeAllListeners();
    treeKill(this.child.pid!, 'SIGTERM');
    this.child = null;
    return res.data;
  }

  async init() {
    const res = await this.execCtx({ type: 'init', data: this.ext });
    return res;
  }

  // ......
}
```
:::

::: details 点我查看`worker.ts`代码
```ts:line-numbers
import { init } from './logic';

const drpyWork = (parms) => {
  const { type, data, ctx } = parms;
  let res = { type, data };

  // 初始化上下文参数
  if (Object.keys(ctx).length > 0) {
    for (const key in ctx) {
      globalThis[key] = ctx[key];
    }
  }

  switch (type) {
    case 'init':
      res.data = init(data);
      break;
    // ......
    default:
      break;
  }
  return res;
};

process.on('message', (message: { [key: string]: any }) => {
  let res;
  try {
    res = drpyWork(message);
  } catch (err: any) {
    res = {
      type: message.type,
      data: null,
    };
    console.log(`[t3][worker][child][error]${err.message}`);
  }
  // 仅上传指定变量
  const globalParmKeys = ['MY_URL', 'HOST', 'rule', 'rule_fetch_params', 'fetch_params', 'oheaders'];
  const cloneCtx = {};
  for (const key of globalParmKeys) {
    cloneCtx[key] = globalThis[key];
  }
  res.ctx = cloneCtx;
  process.send!(res);
});
```
:::

::: details 点我查看`logic.ts`代码
```ts:line-numbers
let rule: any = {};
Object.defineProperty(globalThis, 'rule', {
  get() {
    return rule;
  },
  set(value) {
    rule = value;
  },
}); // 显示绑定到globalThis

const init = () => {
    rule = { a: 1, b:2 }
}
```
:::