# 二次开发

主程序功能依赖nodejs。如果你需要开发主程序，那么你需要确认以下环境：

1. 本地已经有 node 环境：`node版本 > v18`
2. 本地已安装 `yarn` 依赖管理工具

## 1. 开源协议

```
MIT License

Copyright (c) 2023 Hiram-Wong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 2. 开发及打包

```shell
[1] 安装 node.js version18 以上 + yarn 包安装管理工具
[2] 克隆项目
    git clone https://github.com/Hiram-Wong/ZyPlayer.git
[3] 进入项目
    cd ZyPlayer/
[4] 打开项目<此处使用命令行快捷打开vscode>
    code .
[5] 修改代码
[6] 安装依赖包
    yarn
[7] 全局安装electron-vite框架
    yarn add electron-vite -D
[8] 打包编译发布
    yarn build:win[mac/linux]
```

## 3. 架构说明

- MacOS(dmg)：arm64[Applechip]、x64[Intel]、universal[通用-不区分架构]
- Windows(exe)：arm64[骁龙]、x64[Intel、amd]、ia32(32位操作系统)、win-版本号.exe(通用-不区分架构)
- Linux(image、deb、rpm)：arm64[鲲鹏、飞腾]、x64[兆兴]

## 4. 依赖说明
- 同步库说明
    - sync-fetch: 
        - 渲染进程 + webworker线程运行
        - 主进程 + fork线程运行
    - sync-request: 主进程 + fork线程运行
        - tree-kill结束(普通结束可能结束不干净, 导致游离进程过多)
        - sync-rpc子进程启动报错(参考[issue](https://github.com/ForbesLindesay/sync-rpc/issues/3))
- 兼容win7说明
    - Electron 23 将包含 Chromium 110, 不再支持Windows(7/8/8.1)[点我查看](https://www.electronjs.org/zh/blog/windows-7-to-8-1-deprecation-notice)
    - Electron 23 起不再支持 Win 7/8/8.1, 推荐`"electron": "~22.3.27"`
    - Electron 23 以下不支持升级fastif及相关插件, 最高版本为`4.x`
    - Electron 23 以下不支持升级cheerio, 最高版本为`1.0.0-rc.12`
    - Electron 23 以下puppeteer存在兼容性问题, 推荐`"puppeteer-core": "~21.3.8", "puppeteer-in-electron": "^3.0.5"`
- 启用HEVC硬解码说明 [点我查看](https://github.com/StaZhu/enable-chromium-hevc-hardware-decoding/blob/main/README.zh_CN.md)

## 5. PR说明
```text
[1] 创建有关功能的问题，如新组件。
[2] 将 repo 分支到自己的账户。
[3] 克隆你的分叉。
[4] 在 main 基础上创建一个新分支，如果要添加新组件，分支名称格式应为 component-[组件名称]。(例如 component-steps），而提交信息的格式应为 [组件名称]：关于提交的信息。
[5] 确保运行 yarn build:win[mac/linux] 会输出正确的文件。
[6] 在创建 PR 之前进行重置，以保持提交历史清晰。(合并请求至分支 main)
[7] 提供一些关于 PR 的说明。
```