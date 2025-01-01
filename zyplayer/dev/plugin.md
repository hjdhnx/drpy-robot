# 插件中心(实验性)

插件中心用于扩展软件的不足性，为用户提供更多功能。

该功能在软件中集成了`npm`包管理工具, 并指定了淘宝源镜像源，方便用户使用。

## 1. 插件分类

插件分类目前分为 `系统插件` 和 `视图插件`, 下面分别介绍这插件的区别和作用。

1. 系统插件: 可能无UI界面, 安装完成后, 插件会启动自己后端服务, 并提供端口供用户使用。
2. 视图插件: 都会有UI界面, 用于和用户交互, 不具备启动服务能力。

## 2. 开发系统插件

### 2.1. 目录结构

基础插件的目录应为如下结构:

```
system-plugin-demo
├─ package.json
├─ index.js
├─ README.md
```

### 2.2. 文件说明

#### 2.2.1. package.json

插件最基础的配置

```json:line-numbers
{
  "name": "system-plugin-demo",
  "pluginName": "系统插件demo",
  "version": "0.0.0",
  "description": "这是一个系统插件demo",
  "main": "index.js",
  "logo": "https://xxxx/upload/xxxb13xxx.png",
  "pluginType": "system",
  "author": "我是作者"
}
```

| 字段         | 说明                                      | 备注   |
| ----------- | ----------------------------------------- | ------ |
| name        | 插件npm包名称                              |`必填`|
| pluginName  | 插件显示名称, 用于展示给使用者                |`必填`|
| description | 插件描述, 描述这个插件的作用                  |不填则为空     |
| author      | 插件作者                                   |不填则为空     |
| logo        | 插件logo, 用于展示给使用者, 仅在线地址         |不填则为空     |
| main        | 入口文件, 一般为 index.js                   |`必填`|
| version     | 插件的版本                                  |不填则为`0.0.0`|
| pluginType  | 插件类型, 枚举: `system`, `ui`              |此处应为`system`, 不填则为`system`|

#### 2.2.2. index.js

插件的入口文件
- 开发代码必须在入口文件中提供`start`和`stop`方法, 分别对应插件的启动和停止
- 不得提供`5173`端口[主程序开发端口] | `9978`[主程序后端接口] | `5432`[主程序数据库端口]

::: code-group

```js:line-numbers [esm]
··· 自定义code

export { start, stop }
```

```js:line-numbers [commonjs]
··· 自定义code

module.exports { start, stop }
```
:::

#### 2.2.3. README.md

项目一些描述

```md
# 系统插件demo
## 这是一个史无前例的系统插件
## 启动后将提供 5777 端口提供服务
...
```

### 2.3. 设计架构

> 插件启动和停止设计如下

```js:line-numbers
import workerpool from 'workerpool';
import { resolve } from 'path';

const runModule = async (modulePath: string, method: 'stop' | 'start') => {
  try {
    const entry = await import(modulePath);
    const res = await entry?.[method]();
    return { code: 0, msg: 'ok', data: res };
  } catch (err: any) {
    throw err;
  }
};

// 创建进程
const pool = workerpool.pool();

// 获取插件入口文件
let entryModule = pluginInfo.main;

// 启动
await pool.exec(runModule, [entryModule, 'start']);

// 停止
await pool.exec(runModule, [entryModule, 'stop']);
pool.terminate();
```

### 3.3. 使用说明
#### 3.3.1. 安装

注册相关插件信息, 并使用内置 `npm` 进入插进目录并执行`npm install`命令

![plugin-install](/dev/plugin/plugin-install.png)

#### 3.3.2. 管理

- ①卸载: 删除 `node_modules` 和 `package.lock.json` 文件; 并注销插件相关信息
- ②控制: 服务控制
  - 启动: 执行 `start` 命令
  - 停止: 执行 `stop` 命令

![plugin-system](/dev/plugin/plugin-system.png)

## 3. 开发视图插件

### 3.1. 目录结构

基础插件的目录应为如下结构:

```
ui-plugin-demo
├─ package.json
├─ index.html
```

### 3.2. 文件说明

#### 3.2.1. package.json

插件最基础的配置

```json:line-numbers
{
  "name": "ui-plugin-demo",
  "pluginName": "视图插件demo",
  "version": "0.0.0",
  "description": "这是一个视图插件demo",
  "main": "index.html",
  "logo": "https://xxxx/upload/xxxb13xxx.png",
  "pluginType": "ui",
  "author": "我是作者"
}
```

| 字段         | 说明                                      | 备注   |
| ----------- | ----------------------------------------- | ------ |
| name        | 插件npm包名称                              |`必填`|
| pluginName  | 插件显示名称, 用于展示给使用者                |`必填`|
| description | 插件描述, 描述这个插件的作用                  |不填则为空     |
| author      | 插件作者                                   |不填则为空     |
| logo        | 插件logo, 用于展示给使用者, 仅在线地址         |不填则为空     |
| main        | 入口文件, 一般为 index.html                 |不填则为`about:blank`|
| version     | 插件的版本                                  |不填则为`0.0.0`|
| pluginType  | 插件类型, 枚举: `system`, `ui`               |此处应为`ui`, 不填则为`system`|

#### 3.2.2. index.html

插件的入口文件

- 运行环境为纯浏览器(`浏览器该有的限制都有`)
- 需要后端请求发送请求头可走接口`http://127.0.0.1:9978/api/v1/system/config`
- `无跨域限制`, 底层已篡改
- 尽量使用本地静态资源, 走网络请求页面显示可能会比较慢, 本地静态资源用`相对路径`
- 如使用工程化开发, 请使用`编译后结果 + package.json`

**纯html开发**
::: code-group

```html:line-numbers [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./xxx.css">
    <title>Html App</title>
  </head>
  <body>
    <div id="app">
      ...
    </div>
    <script src="./main.js"></script>
  </body>
</html>
```

```js:line-numbers [main.js]
...

console.log('程序主逻辑');
```
:::


**工程化开发案例**

1. 创建项目目录

```bash
mkdir ui-demo-project
cd ui-demo-project
```

2. 初始化项目
```bash
npm init -y
```

3. 安装Vite
```bash
npm install --save-dev vite
```

4. 配置vite

> 配置`vite.config.js`文件

```js:line-numbers
import { defineConfig } from 'vite';
import path from 'path';
  
export default defineConfig({
  base: './', // 设置基础路径为当前目录, 重要[否则加载路径不对]
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/assets') // 自己设置别名[可选]
    }
  }
});
```

5. 配置启动脚本

> 配置`package.json`文件

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

6. 设置项目结构
```bash
touch index.html
mkdir src
touch src/main.js
```

7. 写代码

::: code-group
```html:line-numbers [index.html]
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vite App</title>
  </head>
  <body>
    <div id="app">
      ...
    </div>
    <script type="module" src="./src/main.js"></script>
  </body>
</html>
```

```js:line-numbers [main.js]
import './xxxx/xxx.css';
import './xxxx/xxx.js';
import 'xxx' from 'xxx';

...

console.log('程序主逻辑');
```
:::

8. 编译
```bash
npm run build
```

9. 整理文件

`dist`目录下新建一个`package.json`文件, 需配置相关插件信息

`dist`目录即为插件的结果

### 3.3. 设计架构

#### 3.3.1. 选型

> 基于`electron`的`webview`提供视图设计

Electron 提供了 `webview` | `iframe` | `BrowserView` 三种方式来加载第三方资源
- `webview`: 基于 Chromium 的 webview, 允许加载第三方资源, 但存在问题较多, 比如:
  - [App freeze when iframe is deleted from a webview](https://github.com/electron/electron/issues/17890)
  - [Reload nested iframe in webview causes memory leak in electron](https://github.com/electron/electron/issues/18019)
  - [webview not rendering content after reload or redirect](https://github.com/electron/electron/issues/18177)
  - `官方解释` Electron的 `webview` 标签基于 [Chromium webview](https://developer.chrome.com/docs/extensions/reference/webviewTag/) ，后者正在经历巨大的架构变化。 这将影响 `webview` 的稳定性，包括呈现、导航和事件路由。 We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, a [WebContentsView](https://www.electronjs.org/zh/docs/latest/api/web-contents-view), or an architecture that avoids embedded content altogether.
- `iframe`: 浏览器 DOM 标准, 它也无法脱离渲染进程而单独存在, `隔离能力较差`; 但可以借助微隔离框架增强隔离能力, 较重
- `BrowserView`: 类似Chrome管理其标签页的方式, 是`webview`替代品, 较为稳定; 频繁切换时性能下降

#### 3.3.2. webview启用方法

> vue使用

```js:line-numbers
<webview
  src="file:///xxxx"
  disablewebsecurity
  allowpopups
  nodeIntegration
/>
```

> 主程序配置


```js:line-numbers
new BrowserWindow({
  ...
  webPreferences: {
    ...
    webviewTag: true
  },
});
```

> vite.config.js配置

```js:line-numbers
plugins: [
  vue({
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'webview'
      },
    },
  })
]
```

### 3.3. 使用说明
#### 3.3.1. 安装

注册相关插件信息

![plugin-install](/dev/plugin/plugin-install.png)

#### 3.3.2. 管理

- ①卸载: 删除 `package.lock.json` 文件; 并注销插件相关信息
- ②控制: 服务控制
  - 开发者工具: 开发者调试用-打开 `webview` `f12`
    - 和主程序`f12` `不通用`
    - 刷新页面需重新打开该工具, 之前打开的失效

![plugin-ui](/dev/plugin/plugin-ui.png)