# 软件介绍

::: tip 重要提醒
- 仅此站点与Github发布, 请勿上当受骗!
- 请各位公众号、QQ群、博客的管理者不要费力宣传及引流本软件!
- 请务必支持`正版版权`，我们不提倡盗版!
    - 正版特指 `爱奇艺`|`腾讯视频`|`优酷视频`|`芒果TV`|`乐视视频`|`PPTV`等拥有影视版权的平台
- 在开始使用前，请务必详读并同意用户协议，确保遵守相关规定!
- 此软件仅供学习交流使用，请勿用于商业用途，否则后果自负! 请在下载后24小时内删除!
:::

## 1.简介
`zyfun`是一款免费易用且打造的全功能媒体播放器。

由不知名`zy team`团队`[一个人撑起的团队]`倾力开发, 练习时长`未满半年坤`的技术沉淀, `随便糊弄出品`, 你永远可以相信这是一个`随时跑路`的项目。

它基于`electron-Vite`框架, 结合`TDesign`组件库和`vue3`全家桶, 为来自五湖四海的`狐朋狗友`带来熟悉的`头顶一抹绿`的主题配色。同时致力于提供流畅、高效的跨平台娱乐体验。

### 1.1.logo含义

![logo含义](/guide/app/logoExplain.png)

### 1.2.架构

![架构](/guide/app/arch.png)


## 2.预览

::: details 点我查看部分截图
|                            影视(首页)                            |                            影视(搜索)                            |
| :-------------------------------------------------------------: | :------------------------------------------------------------: |
| ![影视-首页](/guide/app/film-home.png)                           | ![影视-搜索](/guide/app/film-search.png)                         |
|                        **影视(播放1)**                           |                        **影视(播放2)**                           |
| ![影视-播放-1](/guide/app/film-play.png)                         | ![影视-播放-2](/guide/app/film-play-2.png)                       |
|                        **电视(首页)**                            |                        **电视(播放)**                            |
| ![电视-首页](/guide/app/iptv-home.png)                           | ![电视-播放](/guide/app/iptv-play.png)                           |
|                        **时刻(历史)**                            |                        **解析(首页)**                            |
| ![时刻-历史](/guide/app/history.png)                             | ![解析-首页](/guide/app/analyze.png)                             |
:::

## 3.安装

### 3.1.兼容性

> 如下为物理机+虚拟机测试(含x86+arm)

> 国产系统涉及 `UOS(deepin)` `Anolis(阿里龙蜥)` `Kylin(中标麒麟)` `openEuler(华为欧拉)` `SuperRed(万里红)`

| 测试平台  | 操作系统(版本)[芯片架构]                                          |
| :------: | :------------------------------------------------------------: |
| windows  | `win10[arm]` `win11[arm｜x86_64]`                              |
| mac      | `Sequoia(15.1)[m1-pro]`                                        |
| linux    | `Ubuntu 20.04 LTS[arm]` `Anolis OS8.9[arm]` `UOS v20(1070)[arm]` `Kali(2022.1)[arm]` `Cinnamon 5.6.8[x86_64]` `Kylin SP1(2403)[arm]` `openEuler-24.03-LTS[arm] + UKUI` `ElementaryOS 8[x86_64]` `Mint 22[x86_64]` `SuperRed 32[x86_64]`|
| chromos  | `FydeOS 19[x86_64]` |

::: details 点我查看部分测试截图
|                Ubuntu 20.04 LTS[arm]                            |                   Anolis OS8.9[arm]                            |
| :-------------------------------------------------------------: | :------------------------------------------------------------: |
| ![Ubuntu](/guide/app/test-linux-ubuntu.png)                     | ![Anolis](/guide/app/test-linux-anolis.png)                    |
|                **UOS v20(1070)[arm]**                           |                            **Kali[arm]**                       |
| ![UOS](/guide/app/test-linux-uos.png)                           | ![Kali](/guide/app/test-linux-kali.png)                        |
|                **Kylin SP1(2403)[arm]**                         |             **openEuler-24.03-LTS[arm]**                       |
| ![Kylin](/guide/app/test-linux-kylin.png)                       | ![openEuler](/guide/app/test-linux-openEuler.png)              |
|                **ElementaryOS 8[x86_64]**                       |        **Mint 22[x86_64]**                                     |
| ![ElementaryOS](/guide/app/test-linux-elementaryos.png)         |          ![Mint](/guide/app/test-linux-mint.png)               |
|                **SuperRed 32[x86_64]**                          |        **FydeOS 19[x86_64]**                                   |
| ![SuperRed](/guide/app/test-linux-superred.png)         |          ![FydeOS](/guide/app/test-fydeos.png)                 |
:::

### 3.2.下载
> **最新发布版下载**: 访问 [GitHub Releases页面](https://github.com/Hiram-Wong/ZyPlayer/releases) 获取

> **最新开发版下载**: 访问 [GitHub Actions页面](https://github.com/Hiram-Wong/ZyPlayer/actions) 获取

- mac
    - Intel选择 `x64.dmg`
    - AppleChip选择 `arm64.dmg`
    - 通用选择 `universal.dmg`
- win`[不再支持win7|win8|win8.1]`
    - x86_64选择`x64.exe`
    - Arm选择`arm64.exe`
    - 通用选择`.exe`
- linux`[含chromos]`
    - x86_64选择`x86_64.AppImage` `x86_64.rpm` `amd64.deb`
    - arm选择`arm64.AppImage` `aarch64.rpm` `arm64.deb`

### 3.3.常见问题
#### 3.3.1.macOS 安装后打开遇到「文件已损坏」的情况
> 因为软件没有签名，所以会被 macOS 的安全检查所拦下。

```shell
> {appname}为软件名, 访问前自行替换
[1] 执行下面命令信任开发者, 会要求输入密码:
    sudo spctl --master-disable
[2] 执行下面命令放行软件 :
    sudo xattr -cr /Applications/{appname}.app

完成上面两个步骤，大多数情况下都能正常打开应用。

ps:
如果提示以下内容：
option -r not recognized

usage: xattr [-slz] file [file ...]
       xattr -p [-slz] attr_name file [file ...]
       xattr -w [-sz] attr_name attr_value file [file ...]
       xattr -d [-s] attr_name file [file ...]
       xattr -c [-s] file [file ...]

The first form lists the names of all xattrs on the given file(s).
The second form (-p) prints the value of the xattr attr_name.
The third form (-w) sets the value of the xattr attr_name to attr_value.
The fourth form (-d) deletes the xattr attr_name.
The fifth form (-c) deletes (clears) all xattrs.

options:
  -h: print this help
  -s: act on symbolic links themselves rather than their targets
  -l: print long format (attr_name: attr_value)
  -z: compress or decompress (if compressed) attribute value in zip format

则执行命令
xattr -c /Applications/{appname}.app/*
如果上述命令依然没有效果，可以尝试下面的命令：
sudo xattr -d com.apple.quarantine /Applications/{appname}.app/
```

#### 3.3.2.Linux Appimage桌面快捷方式设置

```bash
> {appname}为软件名, 访问前自行替换
[1] 选择一张icon图标下载
[2] 在任意位置新建一个名为{appname}.desktop的文件，并写入如下内容
    [Desktop Entry]
    Name={appname}
    Exec=/home/xxx/Downloads/{appname}-3.3.8.AppImage  # AppImage程序路径
    Icon=/home/xxx/Downloads/{appname}.png  # 图标路径
    Type=Application
    StartupNotify=true
[3] 保存{appname}.desktop后右键属性,在权限目录下允许作为程序执行文件上打钩
[4] 将{appname}.desktop文件复制到/usr/share/applications路径下
```

#### 3.3.3.Linux Appimage运行失败

```bash
[1] 报错关键词 Running as root without --no-sandbox is not supported. See https://ccrbug.com/638180.
    ./文件名.AppImage --no-shawbox
[2] 报错关键词 dlopen()：error loading libfuse.so.2
    sudo apt-get install libfuse2
[3] 报错关键词 Exiting GPU process due to errors during initialization
    xhost + 
    ./文件名.AppImage --no-shawbox
```

#### 3.3.4.Linux deb安装失败

```bash
[1] 报错关键词 Package libnss3-1d is not installed
    sudo apt-get install libnss3-1d
[2] 报错关键词 Package libxss1 is not installed
    sudo apt-get install libxss1
```

## 4.路径

> {appname}为软件名, 访问前自行替换

- MacOS:
    - 日志路径: `~/Library/Logs/{appname}/`
    - 数据库路径: `~/Library/Application\ Support/{appname}/database/`
    - 插件路径: `~/Library/Application\ Support/{appname}/plugin/`
- Linux:
    - 日志路径: `~/.config/{appname}/logs/`
    - 数据库路径: `~/.config/{appname}/database/`
    - 插件路径: `~/.config/{appname}/plugin/`
- Windows:
    - 日志路径: `%USERPROFILE%\AppData\Roaming\{appname}\logs\`
    - 数据库路径: `%USERPROFILE%\AppData\Roaming\{appname}\database\`
    - 插件路径: `%USERPROFILE%\AppData\Roaming\{appname}\plugin\`


## 5.历程

- 2.x 版本为`ZY-Player`由`@Hunlongyu`首发
    - 数据源仅支持`xml`
- 3.x 版本为`ZyPlayer`由`@Hiram-Wong`二开
    - Icon图标由`@fourbeauty`设计贡献
    - 数据源支持多种格式
        - `xml` `json`由`@Hiram-Wong`提供技术支持
        - `drpy` `hipy`由`@hjdhnx`提供技术支持
        - `csp_xbpq` `csp_xyq` `csp_appysv2`由`@LoyDgIk` `@α`提供技术支持
        - `catvod[nodejs]`由`开源项目@catvod`提供技术支持
    - 集成多播放器
        - 内置`xgplayer` `nplayer` `dplayer` `artplayer`
        - 支持调用系统播放器
    - **破坏性(重要说明)**
        - `<=3.3.7版本` 所有功能基于前端(含webworker), 数据为json文件 [`兼容性好`]
        - `>=3.3.8版本` 前后端分离(含fork线程), 数据为`pglite数据库` [`符合设计逻辑` `兼容性有所降低`]