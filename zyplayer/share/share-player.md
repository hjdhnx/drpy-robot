# 播放器技术文档

## 1. 系统概述

本项目对市面上主流视频播放器技术的基础整合, 旨在成为视频播放领域的`“瑞士军刀”`, 打造既统一又灵活的播放解决方案，满足多样化的业务场景。

## 2. 技术选型

- **[VidstackPlayer](https://github.com/vidstack/player)(频繁维护 Stars:1.8k)**: 构建并发布可用于生产的视频或音频播放器！功能强大、可定制、易于访问。作为备受推崇的Plyr3.X和Vime5.X的继承者。
- **[Plyr](https://github.com/sampotts/plyr)(现合入Vidstack Stars:25.5k)**: 一个简单、轻量级、可访问和可定制的支持现代浏览器的 HTML5、YouTube和Vimeo媒体播放器。
- **[Vime](https://github.com/vime-js/vime)(现合入Vidstack Starts:2.7k)**: 可定制、可扩展、可访问和框架无关的媒体播放器。
- **[DPlayer](https://dplayer.diygod.dev/zh)(停更 Stars:15.1k)**：一个简洁、易用的 HTML5 视频播放器，支持弹幕功能，常用于视频网站和在线教育平台。
- **[XgPlayer](https://h5player.bytedance.com/)(频繁维护 Stars:7.9k)**：字节开源的一款带解析器、能节省流量的HTML5视频播放器。
- **[ArtPlayer](https://artplayer.org/document)(频繁维护 Stars:2.3k)**：现代和功能齐全的HTML5视频播放器。
- **[NPlayer](https://nplayer.js.org/docs/)(停更 Stars:1.2k)**：可定制、插件化、响应式（支持移动、平板等多种设备）的弹幕视频播放器。
- **[MuiPlayer](https://github.com/muiplayer/hello-muiplayer)(看心情更新 Stars:489)**：一款优秀的 HTML5 视频播放器组件。

> 本项目仅集成DPlayer、XgPlayer、ArtPlayer、NPlayer

> 为何不集成[TcPlayer(维护)](https://cloud.tencent.com/document/product/266/58772)、[AliPlayer(维护)](https://help.aliyun.com/zh/vod/developer-reference/integration)、[VePlayer(维护)](https://demo.volcvideo.com/common/veplayer/basic/example?tab=function-display)播放器, 这些均为商业播放器, 会上报云端数据, 因此不做集成。

## 3. 兼容性

> 仅代表自己使用后的感受, 没有数据支撑。

- **H266**：AliPlayer(需开授权)
- **H265**：VePlayer > XgPlayer > AliPlayer(需开授权) > (DPlayer|NPlayer|ArtPlayer) 该部分不准,现在基本都支持(只要浏览器和硬件支持)
- **其他**：VePlayer > TcPlayer > (DPlayer|NPlayer|ArtPlayer) > AliPlayer
- DPlayer 和 NPlayer 和 ArtPlayer 都需基于[hls.js](https://github.com/video-dev/hls.js)|[flv.js](https://github.com/Bilibili/flv.js)|[webtorrent](https://github.com/webtorrent/webtorrent)|[dash](https://github.com/Dash-Industry-Forum/dash.js)扩展，因此兼容性一致。
- TcPlayer 5.0版本后需要注册账号后才能使用
- VePlayer 必须配置日志上传id才能使用(可使用官方demo的ID: 348293)
- XgPlayer `xgplayer-flv.js`和`flv.js`一致，`xgplayer-hls.js`和`hls.js`一致; `xgplayer-hls.js`和`xgplayer-flv.js`在h264上会比自研库`xgplayer-hls`和`xgplayer-flv`兼容性好一些
- VePlayer和XgPlayer均支持软解和硬解，虽然是同一底层但VePlayer软解明显比XgPlayer好用
- VidstackPlayer|Plyr|Vime不支持flv.js和webtorrent
- MuiPlayer弹幕功能需购买专业版本🆒
- [Chrome启用HEVC硬解码说明](https://github.com/StaZhu/enable-chromium-hevc-hardware-decoding/blob/main/README.zh_CN.md)
- [HEVC测试地址](https://lf3-cdn-tos.bytegoofy.com/obj/tcs-client/resources/video_demo_hevc.html)
- [Chrome渲染引擎导致黑屏](https://zhuanlan.zhihu.com/p/666477298)

## 4. 架构设计

### 4.1. 核心模块

- **播放器抽象层**：设计一个统一的播放器接口，该接口封装了各播放器库的公共方法和属性，如 play(), pause(), seek() 等，确保上层应用无需关心底层使用的是哪个播放器。
- **适配器层**：针对每个播放器（XGPlayer、DPlayer、NPlayer、ArtPlayer）开发适配器模块，将它们的功能映射到统一接口上，实现对特定播放器特性的调用和配置。
- **配置管理器**：提供一个中心化的配置管理系统，允许通过简单dom操作定制播放器皮肤、图标等。
- **资源加载器**：实现动态加载不同播放器库的逻辑，根据目标平台或用户需求自动选择最适合的播放器实现。

### 4.2. 关键技术点

- **动态脚本加载**：利用动态脚本加载技术，根据客户端条件按需加载相应的播放器库，减少不必要的资源请求。
- **API 转换**：在适配器层，通过精细设计的转换逻辑，确保各播放器的特有功能能被正确映射到统一接口，隐藏底层实现细节。

### 4.4. 遇到小坑

- **Dplayer弹幕不动**：css配置
  ```css
  .dplayer-danmaku .dplayer-danmaku-right.dplayer-danmaku-move {
    will-change: transform;
    -webkit-animation-name: 'danmaku'; /* 兼容性问题，需要加上-webkit- */
    animation-name: 'danmaku';
    -webkit-animation-timing-function: linear;
    animation-timing-function: linear;
    -webkit-animation-play-state: paused;
    animation-play-state: paused;
  }
  ```
- **Dplayer方法及功能缺失**: `off取消监听`扩展详见`CustomDPlayer`，画中画扩展详见`handlePipClick`
- **Dplayer弹幕问题**: 
  - 在大量弹幕数据下, 请勿开启海量弹幕[炮火模式], 应设置`unlimited: false`, 否则会造成主进程阻塞, 个人测试1w条数据毕现
  - 开启海量弹幕再使用`seek`方法, 会导致`seek`前的弹幕重叠显示, 而不是直接跳过`seek`前弹幕内容
- **Dplayer播放下集获取不到真实地址**: `dp.video.currentSrc`获取的不是真实地址, 需使用`dp.options.video.url`获取, 但是切换地址后该值不会变需要在`dp.seitchVideo`后手动赋值
- **取消时间变动监听进度条不动**: 如果`off`事件全局取消`timeupdate`会将组件内部事件也清空, 导致`Nplayer`和`DPlayer`在使用切换下集时画面正常, 进度条渲染不变
- **暂停事件**: 触发暂停事件后, 时间变动监听不会立即暂停，实测会多出一次数据返回，且数据和最后一次返回一致
- **ArtPlayer发送弹幕显示两条**: `art.on('artplayerPluginDanmuku:emit', () => {art.plugins.artplayerPluginDanmuku.emit({})})`, 不用在监听发送事件在发送一次
- **ArtPlayer实例**: 
  - 初始化两个实例挂载在同一个DOM上会导致报错, 多次创建要么先做判断，要么不挂在同一DOM元素上
  - `不要用vue中的ref响应式代理实例`否则会发现不生效, 应该用`shallowRef`或`let一个变量`


### 4.3. 遗留问题

- **弹幕清洗卡死**: 如使用`bad-words`清洗弹幕数据会阻塞主进程。（得上`webworker`）

## 5. 示例代码

仅仅展示js代码，css部分就看个人喜好了(NPlayer的dom的clss设计是真的烂)

### 5.1. 公共模块

::: details 点我查看`utils/components/utils.ts`代码
```typescript:line-numbers
const publicBarrageSend = (url: string, options: any) => {
  const okd = new FormData();
  okd.append('player', options.id);
  okd.append('text', options.text);
  okd.append('time', options.time);
  okd.append('color', options.color);
  okd.append('type', options.type);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.send(okd);
};

class publicStorage {
  name: string;
  settings: {};
  constructor(name) {
    this.name = name;
    this.settings = {};
  }

  get(key) {
    try {
      const storage = JSON.parse(localStorage.getItem(this.name) || '{}');
      return key ? storage[key] : storage;
    } catch (error) {
      return key ? this.settings[key] : this.settings;
    }
  }

  set(key, value) {
    try {
      const storage = Object.assign({}, this.get(''), {
        [key]: value,
      });
      localStorage.setItem(this.name, JSON.stringify(storage));
    } catch (error) {
      this.settings[key] = value;
    }
  }

  del(key) {
    try {
      const storage = this.get('');
      delete storage[key];
      localStorage.setItem(this.name, JSON.stringify(storage));
    } catch (error) {
      delete this.settings[key];
    }
  }

  clear() {
    try {
      localStorage.removeItem(this.name);
    } catch (error) {
      this.settings = {};
    }
  }
}

const playerStorage = new publicStorage('player_settings');

export { publicBarrageSend, publicStorage, playerStorage };
```
:::

::: details 点我查看`utils/components/static.ts`代码
```typescript:line-numbers
const publicIcons = {
  danmu: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="2 2 17 17" fill="none" class="xgplayer-danmu-open-svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 4.106h-13a.3.3 0 00-.3.3v11.186a.3.3 0 00.3.3h7.111v1.7H3.5a2 2 0 01-2-2V4.406a2 2 0 012-2h13a2 2 0 012 2V10h-1.7V4.406a.3.3 0 00-.3-.3zM6 7.722c0-.42.34-.76.76-.76h6.58a.76.76 0 110 1.52H6.76a.76.76 0 01-.76-.76zm0 3.037c0-.42.34-.759.76-.759h3.543a.76.76 0 110 1.519H6.76a.76.76 0 01-.76-.76z" fill="#fff"></path><circle cx="15.1" cy="14.201" r="3.4" fill="#3370FF"></circle><path fill-rule="evenodd" clip-rule="evenodd" d="M13.185 13.756a.5.5 0 01.707 0l.866.866 1.78-1.78a.5.5 0 11.707.707l-2.133 2.134a.5.5 0 01-.707 0l-1.22-1.22a.5.5 0 010-.707z" fill="#fff"></path></svg>`,
  play: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-icon-play"><path d="M14.121 8.299a2 2 0 010 3.402l-7.94 4.91c-1.332.825-3.051-.133-3.051-1.7V5.09c0-1.567 1.72-2.525 3.052-1.701l7.939 4.911z" fill="#fff"></path></svg>`,
  pause: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-icon-pause"><rect x="5.313" y="3.75" width="3.125" height="12.5" rx=".625" fill="#fff"></rect><rect x="11.563" y="3.75" width="3.125" height="12.5" rx=".625" fill="#fff"></rect></svg>`,
  playNext: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-play-next"><path d="M11.626 6.457L3.452 1.334C1.937.384.042 1.571.042 3.471v11.057c0 1.9 1.894 3.087 3.41 2.137l8.174-5.123c1.875-1.174 1.875-3.91 0-5.085zM16.5 1c-.825 0-1.5.675-1.5 1.5v13c0 .825.675 1.5 1.5 1.5s1.5-.675 1.5-1.5v-13c0-.825-.675-1.5-1.5-1.5z"></path></svg>`,
  fullscreen: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-get-fullscreen"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.778 2h4.444v1.778H3.778v4.444H2V3.778C2 2.796 2.796 2 3.778 2zM2 11.778v4.444C2 17.204 2.796 18 3.778 18h4.444v-1.778H4.823l2.313-2.313a.9.9 0 00-1.272-1.273l-2.086 2.086v-2.944H2zm14.222 0v4.444h-4.444V18h4.444c.982 0 1.778-.796 1.778-1.778v-4.444h-1.778zM18 8.222V3.778C18 2.796 17.204 2 16.222 2h-4.444v1.778h2.945l-2.587 2.586a.9.9 0 101.273 1.273l2.813-2.813v3.398H18z" fill="#fff"></path></svg>`,
  exitFullscreen: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-exit-fullscreen"><path fill-rule="evenodd" clip-rule="evenodd" d="M3.892 2h4.445v1.778H3.892v4.444H2.114V3.778C2.114 2.796 2.91 2 3.892 2zm4.445 16v-4.444c0-.982-.796-1.778-1.778-1.778H2.114v1.778h2.944L2.264 16.35a.9.9 0 001.272 1.273l2.988-2.987a.918.918 0 00.035-.037V18h1.778zm8-6.222v4.444h-4.445V18h4.445c.981 0 1.777-.796 1.777-1.778v-4.444h-1.777zM11.892 2v4.445c0 .981.796 1.777 1.778 1.777h4.444V6.445H15.17l2.568-2.568a.9.9 0 10-1.273-1.273L13.67 5.4V2h-1.778z" fill="#fff"></path></svg>`,
  volumeSmall: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-volume-small"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.867 2.5h.55c.44 0 .799.34.83.771l.003.062v13.334c0 .44-.34.799-.771.83l-.062.003h-.55a.833.833 0 01-.444-.128l-.064-.045-4.867-3.744a.831.831 0 01-.322-.59l-.003-.07V7.077c0-.235.099-.458.271-.615l.054-.045L9.36 2.673a.832.832 0 01.43-.17l.078-.003h.55-.55zM2.5 6.667c.23 0 .417.186.417.416v5.834c0 .23-.187.416-.417.416h-.833a.417.417 0 01-.417-.416V7.083c0-.23.187-.416.417-.416H2.5zm11.768.46A4.153 4.153 0 0115.417 10c0 1.12-.442 2.137-1.162 2.886a.388.388 0 01-.555-.007l-.577-.578c-.176-.176-.156-.467.009-.655A2.49 2.49 0 0013.75 10a2.49 2.49 0 00-.61-1.636c-.163-.188-.182-.477-.006-.653l.578-.578a.388.388 0 01.556-.006z" fill="#fff"></path></svg>`,
  volumeLarge: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-volume"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.867 2.5h.55c.44 0 .799.34.83.771l.003.062v13.334c0 .44-.34.799-.771.83l-.062.003h-.55a.833.833 0 01-.444-.128l-.064-.045-4.867-3.744a.831.831 0 01-.322-.59l-.003-.07V7.077c0-.235.099-.458.271-.615l.054-.045L9.36 2.673a.832.832 0 01.43-.17l.078-.003h.55-.55zm6.767 2.278A7.474 7.474 0 0118.75 10a7.477 7.477 0 01-2.128 5.234.4.4 0 01-.57-.004l-.587-.586a.442.442 0 01.005-.617A5.812 5.812 0 0017.083 10c0-1.557-.61-2.97-1.603-4.017a.442.442 0 01-.003-.615l.586-.586a.4.4 0 01.57-.004zM2.5 6.667c.23 0 .417.186.417.416v5.834c0 .23-.187.416-.417.416h-.833a.417.417 0 01-.417-.416V7.083c0-.23.187-.416.417-.416H2.5zm11.768.46A4.153 4.153 0 0115.417 10c0 1.12-.442 2.137-1.162 2.886a.388.388 0 01-.555-.007l-.577-.578c-.176-.176-.156-.467.009-.655A2.49 2.49 0 0013.75 10a2.49 2.49 0 00-.61-1.636c-.163-.188-.182-.477-.006-.653l.578-.578a.388.388 0 01.556-.006z" fill="#fff"></path></svg>`,
  volumeMuted: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-volume-mute"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.045 2.5h.55c.44 0 .8.34.831.771l.003.062v13.334c0 .44-.34.799-.771.83l-.063.003h-.55a.833.833 0 01-.443-.128l-.065-.045-4.866-3.744a.831.831 0 01-.323-.59l-.003-.07V7.077c0-.235.1-.458.272-.615l.054-.045 4.866-3.744a.832.832 0 01.43-.17l.078-.003h.55-.55zM2.68 6.667c.23 0 .416.186.416.416v5.834c0 .23-.186.416-.416.416h-.834a.417.417 0 01-.416-.416V7.083c0-.23.186-.416.416-.416h.834zm10.467.294a.417.417 0 01.59 0l1.767 1.768L17.27 6.96a.417.417 0 01.589 0l.59.59a.417.417 0 010 .589L16.68 9.908l1.768 1.767c.15.15.162.387.035.55l-.035.04-.589.589a.417.417 0 01-.59 0l-1.767-1.768-1.768 1.768a.417.417 0 01-.59 0l-.588-.59a.417.417 0 010-.589l1.767-1.768-1.767-1.767a.417.417 0 01-.035-.55l.035-.04.589-.589z" fill="#fff"></path></svg>`,
  pipIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-get-pip">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 4.3H3.5C3.38954 4.3 3.3 4.38954 3.3 4.5V15.5C3.3 15.6105 3.38954 15.7 3.5 15.7H8.50005L8.50006 17.5H3.5C2.39543 17.5 1.5 16.6046 1.5 15.5V4.5C1.5 3.39543 2.39543 2.5 3.5 2.5H16.5C17.6046 2.5 18.5 3.39543 18.5 4.5V8.5H16.7V4.5C16.7 4.38954 16.6105 4.3 16.5 4.3ZM12 11.5C11.4477 11.5 11 11.9477 11 12.5L11 16.5C11 17.0523 11.4478 17.5 12 17.5H17.5C18.0523 17.5 18.5 17.0523 18.5 16.5L18.5 12.5C18.5 11.9477 18.0523 11.5 17.5 11.5H12Z" fill="white"></path>
    </svg>`,
  pipIconExit: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-exit-pip">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M16.5 4.3H3.5C3.38954 4.3 3.3 4.38954 3.3 4.5V15.5C3.3 15.6105 3.38954 15.7 3.5 15.7H8.50005L8.50006 17.5H3.5C2.39543 17.5 1.5 16.6046 1.5 15.5V4.5C1.5 3.39543 2.39543 2.5 3.5 2.5H16.5C17.6046 2.5 18.5 3.39543 18.5 4.5V8.5H16.7V4.5C16.7 4.38954 16.6105 4.3 16.5 4.3ZM12 11.5C11.4477 11.5 11 11.9477 11 12.5L11 16.5C11 17.0523 11.4478 17.5 12 17.5H17.5C18.0523 17.5 18.5 17.0523 18.5 16.5L18.5 12.5C18.5 11.9477 18.0523 11.5 17.5 11.5H12Z" fill="white"></path>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M9.4998 7.7C9.77595 7.7 9.9998 7.47614 9.9998 7.2V6.5C9.9998 6.22386 9.77595 6 9.4998 6H5.5402L5.52754 6.00016H5.5C5.22386 6.00016 5 6.22401 5 6.50016V10.4598C5 10.7359 5.22386 10.9598 5.5 10.9598H6.2C6.47614 10.9598 6.7 10.7359 6.7 10.4598V8.83005L8.76983 10.9386C8.96327 11.1357 9.27984 11.1386 9.47691 10.9451L9.97645 10.4548C10.1735 10.2613 10.1764 9.94476 9.983 9.7477L7.97289 7.7H9.4998Z" fill="white"></path>
    </svg>`,
  openDanmu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 1024" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-danmu-open"><path fill="#fff" d="M311.467 661.333c0 4.267-4.267 8.534-8.534 12.8 0 4.267 0 4.267-4.266 8.534h-12.8c-4.267 0-8.534-4.267-17.067-8.534-8.533-8.533-17.067-8.533-25.6-8.533-8.533 0-12.8 4.267-17.067 12.8-4.266 12.8-8.533 21.333-4.266 29.867 4.266 8.533 12.8 17.066 25.6 21.333 17.066 8.533 34.133 17.067 46.933 17.067 12.8 0 21.333-4.267 34.133-8.534 8.534-4.266 17.067-17.066 25.6-29.866 8.534-12.8 12.8-34.134 17.067-55.467 4.267-21.333 4.267-51.2 4.267-85.333 0-12.8 0-21.334-4.267-29.867 0-8.533-4.267-12.8-8.533-17.067-4.267-4.266-8.534-8.533-12.8-8.533-4.267 0-12.8-4.267-21.334-4.267h-55.466s-4.267-4.266 0-8.533l4.266-38.4c0-4.267 0-8.533 4.267-8.533h46.933c17.067 0 25.6-4.267 34.134-12.8 8.533-8.534 12.8-21.334 12.8-42.667v-72.533c0-17.067-4.267-34.134-8.534-42.667-12.8-12.8-25.6-17.067-42.666-17.067H243.2c-8.533 0-17.067 0-21.333 4.267-4.267 8.533-4.267 12.8-4.267 25.6 0 8.533 0 17.067 4.267 21.333 4.266 4.267 12.8 8.534 21.333 8.534h64c4.267 0 8.533 0 8.533 4.266v34.134c0 8.533 0 12.8-4.266 12.8 0 0-4.267 4.266-8.534 4.266H268.8c-8.533 0-12.8 0-21.333 4.267-4.267 0-8.534 4.267-8.534 4.267-4.266 4.266-8.533 12.8-8.533 17.066 0 8.534-4.267 17.067-4.267 25.6l-8.533 72.534v29.866c0 8.534 4.267 12.8 8.533 17.067 4.267 4.267 8.534 4.267 17.067 8.533h68.267c4.266 0 8.533 0 8.533 4.267s4.267 8.533 4.267 17.067c0 21.333 0 42.666-4.267 55.466 0 8.534-4.267 21.334-8.533 25.6zM896 486.4c-93.867 0-174.933 51.2-217.6 123.733H571.733V576H640c21.333 0 34.133-4.267 42.667-12.8 8.533-8.533 12.8-21.333 12.8-42.667V358.4c0-21.333-4.267-34.133-12.8-42.667-8.534-8.533-21.334-12.8-42.667-12.8 0-4.266 4.267-4.266 4.267-8.533-4.267 0-4.267-4.267-4.267-4.267 4.267-12.8 8.533-21.333 4.267-25.6 0-8.533-4.267-12.8-12.8-21.333-8.534-4.267-17.067-4.267-21.334-4.267-8.533 4.267-12.8 8.534-21.333 21.334-4.267 8.533-8.533 12.8-12.8 21.333-4.267 8.533-8.533 12.8-12.8 21.333H512c-4.267-8.533-8.533-17.066-8.533-21.333-4.267-8.533-8.534-12.8-12.8-21.333-4.267-12.8-12.8-17.067-21.334-17.067s-17.066 0-25.6 8.533c-8.533 8.534-12.8 12.8-12.8 21.334s0 17.066 8.534 25.6l4.266 4.266L448 307.2c-17.067 0-29.867 4.267-38.4 12.8-8.533 4.267-12.8 21.333-12.8 38.4v157.867c0 21.333 4.267 34.133 12.8 42.666 8.533 8.534 21.333 12.8 42.667 12.8H512v34.134h-98.133c-12.8 0-21.334 0-25.6 4.266-4.267 4.267-8.534 8.534-8.534 21.334v17.066c0 4.267 4.267 8.534 4.267 8.534 4.267 0 4.267 4.266 8.533 4.266H512V716.8c0 12.8 4.267 21.333 8.533 25.6 4.267 4.267 12.8 8.533 21.334 8.533 12.8 0 21.333-4.266 25.6-8.533 4.266-4.267 4.266-12.8 4.266-25.6v-55.467H652.8c-8.533 25.6-12.8 51.2-12.8 76.8 0 140.8 115.2 256 256 256s256-115.2 256-256S1036.8 486.4 896 486.4zm-328.533-128h55.466c4.267 0 4.267 0 4.267 4.267V409.6h-59.733v-51.2zm0 102.4H627.2V512h-55.467v-51.2zM512 516.267h-55.467v-51.2H512v51.2zm0-102.4h-59.733V362.667H512v51.2zm384 499.2c-93.867 0-170.667-76.8-170.667-170.667S802.133 571.733 896 571.733s170.667 76.8 170.667 170.667S989.867 913.067 896 913.067z"></path><path fill="#fff" d="M951.467 669.867 878.933 742.4l-29.866-25.6C832 699.733 806.4 704 789.333 721.067c-17.066 17.066-12.8 42.666 4.267 59.733l59.733 51.2c8.534 8.533 17.067 8.533 29.867 8.533s21.333-4.266 29.867-12.8l102.4-102.4c17.066-17.066 17.066-42.666 0-59.733-21.334-12.8-46.934-12.8-64 4.267zm-371.2 209.066H213.333c-72.533 0-128-55.466-128-119.466V230.4c0-64 55.467-119.467 128-119.467h512c72.534 0 128 55.467 128 119.467v140.8c0 25.6 17.067 42.667 42.667 42.667s42.667-17.067 42.667-42.667V230.4c0-115.2-93.867-204.8-213.334-204.8h-512C93.867 25.6 0 119.467 0 230.4v529.067c0 115.2 93.867 204.8 213.333 204.8h366.934c25.6 0 42.666-17.067 42.666-42.667s-21.333-42.667-42.666-42.667z"></path></svg>`,
  closeDanmu: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1152 1024" width="20" height="20" viewBox="0 0 20 20" fill="none" class="xg-danmu-close"><path fill="#fff" d="M311.296 661.504c0 4.096-4.096 8.704-8.704 12.8 0 4.096 0 4.096-4.096 8.704h-12.8c-4.096 0-8.704-4.096-16.896-8.704-8.704-8.704-16.896-8.704-25.6-8.704s-12.8 4.096-16.896 12.8c-4.096 12.8-8.704 21.504-4.096 29.696 4.096 8.704 12.8 16.896 25.6 21.504 16.896 8.704 34.304 16.896 47.104 16.896 12.8 0 21.504-4.096 34.304-8.704 8.704-4.096 16.896-16.896 25.6-29.696s12.8-34.304 16.896-55.296c4.096-21.504 4.096-51.2 4.096-85.504 0-12.8 0-21.504-4.096-29.696 0-8.704-4.096-12.8-8.704-16.896-4.096-4.096-8.704-8.704-12.8-8.704s-12.8-4.096-21.504-4.096h-55.808s-4.096-4.096 0-8.704l4.096-38.4c0-4.096 0-8.704 4.096-8.704h47.104c16.896 0 25.6-4.096 34.304-12.8s12.8-21.504 12.8-42.496v-72.704c0-16.896-4.096-34.304-8.704-42.496-12.8-12.8-25.6-16.896-42.496-16.896H243.2c-8.704 0-16.896 0-21.504 4.096-4.096 8.704-4.096 12.8-4.096 25.6 0 8.704 0 16.896 4.096 21.504 4.096 4.096 12.8 8.704 21.504 8.704h64c4.096 0 8.704 0 8.704 4.096v34.304c0 8.704 0 12.8-4.096 12.8 0 0-4.096 4.096-8.704 4.096H268.8c-8.704 0-12.8 0-21.504 4.096-4.096 0-8.704 4.096-8.704 4.096-4.096 4.096-8.704 12.8-8.704 16.896 0 8.704-4.096 16.896-4.096 25.6l-8.704 72.704v29.696c0 8.704 4.096 12.8 8.704 16.896s8.704 4.096 16.896 8.704h68.096c4.096 0 8.704 0 8.704 4.096s4.096 8.704 4.096 16.896c0 21.504 0 42.496-4.096 55.296.512 9.216-3.584 22.016-8.192 26.624zM896 486.4c-93.696 0-175.104 51.2-217.6 123.904H571.904V576H640c21.504 0 34.304-4.096 42.496-12.8 8.704-8.704 12.8-21.504 12.8-42.496V358.4c0-21.504-4.096-34.304-12.8-42.496-8.704-8.704-21.504-12.8-42.496-12.8 0-4.096 4.096-4.096 4.096-8.704-4.096 0-4.096-4.096-4.096-4.096 4.096-12.8 8.704-21.504 4.096-25.6 0-8.704-4.096-12.8-12.8-21.504-8.704-4.096-16.896-4.096-21.504-4.096-8.704 4.096-12.8 8.704-21.504 21.504-4.096 8.704-8.704 12.8-12.8 21.504s-8.704 12.8-12.8 21.504h-51.2c-4.096-8.704-8.704-16.896-8.704-21.504-4.096-8.704-8.704-12.8-12.8-21.504-4.096-12.8-12.8-16.896-21.504-16.896s-16.896 0-25.6 8.704-12.8 12.8-12.8 21.504 0 16.896 8.704 25.6l4.096 4.096 4.096 4.096c-16.896 0-29.696 4.096-38.4 12.8-8.704 4.096-12.8 21.504-12.8 38.4v157.696c0 21.504 4.096 34.304 12.8 42.496 8.704 8.704 21.504 12.8 42.496 12.8H512v34.304h-98.304c-12.8 0-21.504 0-25.6 4.096s-8.704 8.704-8.704 21.504v16.896c0 4.096 4.096 8.704 4.096 8.704 4.096 0 4.096 4.096 8.704 4.096H512V716.8c0 12.8 4.096 21.504 8.704 25.6 4.096 4.096 12.8 8.704 21.504 8.704 12.8 0 21.504-4.096 25.6-8.704 4.096-4.096 4.096-12.8 4.096-25.6v-55.296H652.8c-8.704 25.6-12.8 51.2-12.8 76.8 0 140.8 115.2 256 256 256s256-115.2 256-256S1036.8 486.4 896 486.4zm-328.704-128h55.296c4.096 0 4.096 0 4.096 4.096V409.6h-59.904v-51.2zm0 102.4H627.2V512h-55.296v-51.2h-4.608zM512 516.096h-55.296v-51.2H512v51.2zm0-102.4h-59.904v-51.2H512v51.2zm384 499.2c-93.696 0-170.496-76.8-170.496-170.496S802.304 571.904 896 571.904s170.496 76.8 170.496 170.496S989.696 912.896 896 912.896z"></path><path fill="#fff" d="M580.096 879.104H213.504c-72.704 0-128-55.296-128-119.296V230.4c0-64 55.296-119.296 128-119.296h512c72.704 0 128 55.296 128 119.296v140.8c0 25.6 16.896 42.496 42.496 42.496s42.496-16.896 42.496-42.496V230.4c0-115.2-93.696-204.8-213.504-204.8h-512C93.696 25.6 0 119.296 0 230.4v528.896c0 115.2 93.696 204.8 213.504 204.8h367.104c25.6 0 42.496-16.896 42.496-42.496s-21.504-42.496-43.008-42.496zm171.52 10.752c-15.36-15.36-15.36-40.96 0-56.32l237.568-237.568c15.36-15.36 40.96-15.36 56.32 0s15.36 40.96 0 56.32L807.936 889.856c-15.36 15.36-40.448 15.36-56.32 0z"></path></svg>`,
  setting: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 -1 20 20" fill="none" class="xg-icon-setting"><path d="M11.485 18h-4.97a2.978 2.978 0 0 1-2.121-.879L.879 13.606A2.976 2.976 0 0 1 0 11.485v-4.97c0-.802.312-1.555.879-2.121L4.394.879A2.976 2.976 0 0 1 6.515 0h4.971c.801 0 1.555.312 2.121.879l3.515 3.515A2.98 2.98 0 0 1 18 6.515v4.971c0 .801-.312 1.555-.879 2.121l-3.515 3.515a2.98 2.98 0 0 1-2.121.878zM6.515 2c-.264 0-.521.107-.707.293L2.293 5.808A1.006 1.006 0 0 0 2 6.515v4.971c0 .263.107.521.293.707l3.515 3.515c.186.185.443.292.707.292h4.971c.263 0 .521-.107.707-.293l3.515-3.515a1.01 1.01 0 0 0 .292-.707v-4.97c0-.263-.107-.521-.293-.707l-3.515-3.515A1.006 1.006 0 0 0 11.485 2h-4.97z"></path><path d="M10.243 13H7.757a.997.997 0 0 1-.707-.293L5.293 10.95A1 1 0 0 1 5 10.243V7.757c0-.265.105-.52.293-.707L7.05 5.293A1 1 0 0 1 7.757 5h2.485c.265 0 .52.105.707.293l1.757 1.757a.996.996 0 0 1 .294.707v2.485c0 .265-.105.52-.293.707l-1.757 1.757a.996.996 0 0 1-.707.294zm-2.072-2h1.657L11 9.829V8.171L9.829 7H8.171L7 8.171v1.657L8.171 11z"></path></svg>`,
};

const publicColor = {
  theme: '#00e038',
};

export { publicIcons, publicColor };

```
:::

::: details 点我查看`utils/components/depend.ts`代码
**注意: 前端只有hls可以添加请求头, 其他库实际都不生效, 且ua等字段请求头都会被认为是不安全请求头无法发送, 请配合底层拦截实现**

```typescript:line-numbers
// import dashjs from 'dashjs';
import MpegTs from 'mpegts.js';
import flvjs from 'flv.js';
import Hls from 'hls.js';
import WebTorrent from './webtorrent.js';  // 下载链接 https://cdn.jsdelivr.net/webtorrent/latest/webtorrent.min.js
// @ts-ignore
import shaka from 'shaka-player/dist/shaka-player.compiled';

const publicOptions = {
  hls: {},
  flv: {
    mediaDataSource: {
      type: 'flv',
      isLive: false,
    },
    optionalConfig: {
      enableWorker: false, // 启用分离线程
      enableStashBuffer: false, //关闭IO隐藏缓冲区
      autoCleanupSourceBuffer: true, //自动清除缓存
      reuseRedirectedURL: true, //允许重定向请求
      fixAudioTimestampGap: false, // 音视频同步
      deferLoadAfterSourceOpen: false, // 允许延迟加载
      // referrerPolicy: 'no-referrer',
      headers: {},
    },
  },
  webtorrent: {},
  dash: {},
  shaka: {},
};

const publicStream = {
  create: {
    customHls: (video: HTMLVideoElement, url: string, headers: { [key: string]: string } = {}): Hls | null => {
      if (Hls.isSupported()) {
        const options: any = Object.assign({}, { ...publicOptions.hls });
        if (Object.keys(headers).length > 0) {
          options.xhrSetup = function (xhr, _url) {
            xhr.withCredentials = true; // do send cookies
            for (const key in headers) {
              xhr.setRequestHeader(key, headers[key]);
            }
          };
        }
        const hls = new Hls(options);
        hls.loadSource(url);
        hls.attachMedia(video);
        return hls;
      } else {
        console.log('Hls is not supported.');
        return null;
      }
    },
    customFlv: (video: HTMLVideoElement, url: string, headers: { [key: string]: string } = {}): any => {
      if (flvjs.isSupported()) {
        const flvPlayer = flvjs.createPlayer(
          Object.assign({}, { ...publicOptions.flv.mediaDataSource }, { url: url }),
          Object.assign({}, { ...publicOptions.flv.optionalConfig }, headers),
        );
        flvPlayer.attachMediaElement(video);
        flvPlayer.load();
        return flvPlayer;
      } else {
        console.log('flvjs is not supported.');
        return null;
      }
    },
    customTorrent: (video: HTMLVideoElement, url: string, headers: { [key: string]: string } = {}) => {
      if (WebTorrent.WEBRTC_SUPPORT) {
        const options = publicOptions.webtorrent;
        const client = new WebTorrent(options);
        const torrentId = url;
        video.src = '';
        video.preload = 'metadata';
        client.add(torrentId, (torrent) => {
          const file = torrent.files.find((file) => file.name.endsWith('.mp4') || file.name.endsWith('.mkv'));
          file.renderTo(video, {
            autoplay: true,
            controls: false,
          });
        });
        return client;
      } else {
        console.log('Webtorrent is not supported.');
        return null;
      }
    },
    customDash: (video: HTMLVideoElement, url: string, headers: { [key: string]: string } = {}) => {
      if (shaka.Player.isBrowserSupported()) {
        const playerShaka = new shaka.Player(video);
        playerShaka.getNetworkingEngine().registerRequestFilter(function (type, request) {
          if (type != shaka.net.NetworkingEngine.RequestType.MANIFEST) {
            return;
          }
          for (const header in headers) {
            request.headers[header] = headers[header];
          }
        });
        playerShaka.load(url);
        const options = publicOptions.dash;
        playerShaka.configure(options);
        return playerShaka;
      } else {
        console.log('shaka is not supported.');
        return null;
      }
    },
    customMpegts: (video: HTMLVideoElement, url: string, headers: { [key: string]: string } = {}): any => {
      if (MpegTs.isSupported()) {
        const playerMpegts = MpegTs.createPlayer(
          {
            type: 'mp4', // could also be mpegts, m2ts, flv
            isLive: false,
            url,
            withCredentials: true,
          },
          { referrerPolicy: 'no-referrer', headers },
        );
        playerMpegts.attachMediaElement(video);
        playerMpegts.load();
        playerMpegts.play();
        return playerMpegts;
      } else {
        console.log('mpegts is not supported.');
        return null;
      }
    },
  },
  switch: {
    customHls: (video: HTMLVideoElement, hls: any, url: string): Hls => {
      hls.stopLoad();
      hls.detachMedia();

      // 重新加载新的M3U8 URL
      hls.loadSource(url);
      hls.attachMedia(video);

      // 等待新流解析完成并开始播放
      hls.once(Hls.Events.MANIFEST_PARSED, () => {
        video.play();
      });
      return hls;
    },
    customFlv: (video: HTMLVideoElement, flv: any, url: string) => {
      flv.pause();
      flv.unload();
      flv.detachMediaElement();
      flv.destroy();
      flv = flvjs.createPlayer(
        Object.assign({}, publicOptions.flv.mediaDataSource || {}, {
          url: url,
        }),
        publicOptions.flv.optionalConfig || {},
      );
      flv.attachMediaElement(video);
      flv.load();
      return flv;
    },
    customDash: (video: HTMLVideoElement, dash: any, url: string) => {
      dash.destroy();
      const playerShaka = new shaka.Player(video);
      playerShaka.load(url);
      const options = publicOptions.dash;
      playerShaka.configure(options);
      return playerShaka;
    },
    customTorrent: (video: HTMLVideoElement, client: any, url: string) => {
      // 如果之前有正在加载或播放的任务，先停止并移除
      if (client.torrents.length > 0) {
        client.removeAllListeners();
        client.destroy();
        client = new WebTorrent();
      }

      // 使用新的磁力链接或.torrent文件URL加载种子
      client.add(url, (torrent) => {
        const file = torrent.files.find((file) => file.name.endsWith('.mp4') || file.name.endsWith('.mkv'));

        file.renderTo(video, {
          autoplay: true,
        });
      });
      return client;
    },
    customMpegts: (video: HTMLVideoElement, mpegts: any, url: string) => {
      mpegts.destroy();
      const playerMpegts = MpegTs.createPlayer({
        type: 'mse', // could also be mpegts, m2ts, flv
        isLive: false,
        url,
      });
      playerMpegts.attachMediaElement(video);
      playerMpegts.load();
      playerMpegts.play();
      return playerMpegts;
    },
  },
  destroy: {
    customHls: (player: any) => {
      player.hls.destroy();
      delete player.hls;
    },
    customFlv: (player: any) => {
      player.flv.pause();
      player.flv.unload();
      player.flv.detachMediaElement();
      player.flv.destroy();
      delete player.flv;
    },
    customDash: (player: any) => {
      player.mpd.destroy();
      delete player.mpd;
    },
    customTorrent: (player: any) => {
      // player.torrent.remove(player.video.src);
      player.torrent.destroy();
      delete player.torrent;
    },
    customMpegts: (player: any) => {
      player.mpegts.destroy();
      delete player.mpegts;
    },
  },
};

export { publicStream };
```
:::

::: details 点我查看`utils/components/index.ts`代码
```typescript:line-numbers
import { publicIcons, publicColor } from './static';
import { publicStream } from './depend';
import { publicBarrageSend, publicStorage, playerStorage } from './utils';

export { publicBarrageSend, publicIcons, publicColor, publicStream, publicStorage, playerStorage };
```
:::

::: details 点我查看`utils/tool.ts`代码
```typescript:line-numbers
import axios from 'axios';

const supportedFormats: string[] = [
  'mp4',
  'mkv',
  'flv',
  'm3u8',
  'avi',
  'magnet',
  'mpd',
  'mpd',
  'mp3',
  'm4a',
  'wav',
  'flac',
  'aac',
  'ogg',
  'wma',
];

// 判断媒体类型
const checkMediaType = async (url: string): Promise<string> => {
  if (url && (url.startsWith('http') || url.startsWith('magnet'))) {
    const fileType: any = supportedFormats.find((format) => url.includes(format));
    if (fileType) {
      return fileType;
    } else {
      const getMediaType: any = await getMeadiaType(url);
      return getMediaType;
    }
  } else {
    return ''; // 如果 URL 不以 http 开头，返回 null
  }
};

const getMeadiaType = async (url: string): Promise<string> => {
  let mediaType: string = 'unknown';
  try {
    const response = await axios({
      url,
      method: 'HEAD',
    });
    if (response.status === 200) {
      const contentType = response.headers['Content-Type'];
      const supportedFormats: Record<string, string> = {
        'video/mp4': 'mp4',
        'video/x-flv': 'flv',
        'video/ogg': 'ogx',
        'application/vnd.apple.mpegurl': 'm3u8',
        'application/x-mpegURL': 'm3u8',
        'application/octet-stream': 'm3u8',
        'video/avi': 'avi',
        'video/x-msvideo': 'avi',
        'video/x-matroska': 'mkv',
        'video/quicktime': 'mov',
        'video/x-ms-wmv': 'wmv',
        'video/3gpp': '3gp',
        'audio/mpeg': 'mp3',
        'audio/wav': 'mav',
        'audio/aac': 'aac',
        'audio/ogg': 'oga',
      };

      for (const format in supportedFormats) {
        if (contentType.includes(format)) {
          mediaType = supportedFormats[format];
        }
      }
    } else {
      mediaType = 'error';
    }
  } catch (err) {
    mediaType = 'error';
    throw err;
  } finally {
    console.log(`媒体播放类型：${mediaType}`);
    return mediaType;
  }
};

const checkLiveM3U8 = async (url: string): Promise<boolean> => {
  try {
    const response = await axios({
      url,
      method: 'GET',
    });

    const isLiveStream = !(
      response.data.indexOf('#EXT-X-ENDLIST') !== -1 ||
      (response.data.indexOf('#EXT-X-PLAYLIST-TYPE') !== -1 &&
        response.data.match(/#EXT-X-PLAYLIST-TYPE:(.*)/)[1].toUpperCase() === 'VOD') ||
      (response.data.indexOf('#EXT-X-MEDIA-SEQUENCE') !== -1 &&
        parseInt(response.match(/#EXT-X-MEDIA-SEQUENCE:(\d+)/)[1]) === 0)
    );

    return isLiveStream;
  } catch (err) {
    return false;
  }
};


const singleton = <T extends new (...args: any[]) => any>(className: T): T => {
  let instance: InstanceType<T> | null = null;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!instance) {
        instance = Reflect.construct(target, args);
      }
      return instance as InstanceType<T>;
    },
  });
  proxy.prototype.construct = proxy;
  return proxy;
};
const mapVideoTypeToPlayerType = (videoType: string): string | undefined => {
  const audioTypes = ['mp3', 'm4a', 'wav', 'flac', 'aac', 'ogg', 'wma'];
  if (audioTypes.includes(videoType)) return 'customMpegts';

  switch (videoType) {
    case 'mp4':
      return 'customMp4';
    case 'flv':
      return 'customFlv';
    case 'm3u8':
      return 'customHls';
    case 'mpd':
      return 'customDash';
    case 'magnet':
      return 'customWebTorrent';
    default:
      return 'customHls';
  }
};

export {
  mapVideoTypeToPlayerType,
  singleton,
  supportedFormats,
  getMeadiaType,
  checkMediaType,
  checkLiveM3U8,
};
```
:::

### 5.2. 播放器模块

::: details 点我查看`xgplayer.ts`代码
```typescript:line-numbers
import XgPlayer, { Events, SimplePlayer } from 'xgplayer';
import Danmu from 'xgplayer/es/plugins/danmu';
import LivePreset from 'xgplayer/es/presets/live';
// import FlvPlugin from 'xgplayer-flv';
import FlvPlugin from 'xgplayer-flv.js';
// import HlsPlugin from 'xgplayer-hls';
import HlsPlugin from 'xgplayer-hls.js';
import Mp4Plugin from 'xgplayer-mp4';
import ShakaPlugin from 'xgplayer-shaka';
// import DashPlugin from 'xgplayer-dash';

import { publicColor, publicIcons, playerStorage } from './components';

class XgPlayerAdapter {
  player: XgPlayer | null = null;
  options: { [key: string]: any } = {
    url: '',
    autoplay: true,
    pip: true,
    cssFullscreen: false,
    startTime: 0,
    playbackRate: {
      list: [2, 1.5, 1.25, { rate: 1, iconText: { zh: '倍速' } }, 0.75, 0.5],
      index: 3,
    },
    time: { index: 0 },
    icons: {
      play: publicIcons.play,
      pause: publicIcons.pause,
      playNext: publicIcons.playNext,
      fullscreen: publicIcons.fullscreen,
      exitFullscreen: publicIcons.exitFullscreen,
      volumeSmall: publicIcons.volumeSmall,
      volumeLarge: publicIcons.volumeLarge,
      volumeMuted: publicIcons.volumeMuted,
      pipIcon: publicIcons.pipIcon,
      pipIconExit: publicIcons.pipIconExit,
      openDanmu: publicIcons.openDanmu,
      closeDanmu: publicIcons.closeDanmu,
    },
    commonStyle: {
      playedColor: publicColor.theme, // 播放完成部分进度条底色
      volumeColor: publicColor.theme, // 音量颜色
    },
    width: 'auto',
    height: '100%',
    type: '',
    id: 'xgplayer',
    enableContextmenu: true,
    danmu: {
      panel: false,
      comments: [],
      area: { start: 0, end: 0.3 },
      defaultOff: true, //开启此项后弹幕不会初始化，默认初始化弹幕
    },
    plugins: [],
  };
  publicListener: { [key: string]: any } = {
    timeUpdate: () => {},
    sendDanmu: () => {},
    playrateUpdate: () => {},
    volumeUpdate: () => {},
    mutedUpdate: () => {},
  };

  barrage = (comments: any, _url: string, _id: string) => {
    if (!this.player) return;
    comments = comments.map((item, index) => ({
      duration: 5000,
      id: String(index + 1),
      txt: item.text,
      start: item.time * 1000,
      mode: ['left', 'right'].includes(item.mode) ? 'scroll' : item.mode,
      color: true,
      style: { color: item.color },
    }));
    this.player.plugins.danmu.updateComments(comments, true);
    // this.player.getPlugin('danmu').updateComments(comments, true); // 效果一样
    // this.player.plugins.danmu.sendComment({
    //   duration: 5000, //弹幕持续显示时间,毫秒(最低为5000毫秒)
    //   id: nanoid(), //弹幕id，需唯一
    //   start: player.currentTime * 1000, //弹幕出现时间，毫秒
    //   color: true, //该条弹幕为彩色弹幕，默认false
    //   txt: '', //弹幕文字内容
    //   style: {
    //     //弹幕自定义样式
    //     color: '#FFFFFF',
    //   },
    // }); // 应插件内实现
  };

  create = (options: any): XgPlayer => {
    options = { ...this.options, ...options };
    const plugins = options.plugins;
    options.id = options.container;
    delete options.container;
    options.startTime = options?.startTime || 0;

    const headers = options?.headers || {};
    switch (options.type) {
      case 'customMp4':
        options.plugins = [...plugins, Mp4Plugin];
        if (Object.keys(headers).length > 0)
          options.mp4plugin = {
            reqOptions: {
              headers,
            },
          };
        break;
      case 'customFlv':
        options.plugins = [...plugins, FlvPlugin];
        if (Object.keys(headers).length > 0) options.flvJsPlugin = {};
        break;
      case 'customHls':
        options.plugins = [...plugins, HlsPlugin];
        if (Object.keys(headers).length > 0)
          options.hlsJsPlugin = {
            xhrSetup: function (xhr, _url) {
              xhr.withCredentials = true; // do send cookies
              for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);
              }
            },
          };
        break;
      case 'customDash':
        options.plugins = [...plugins, ShakaPlugin];
        if (Object.keys(headers).length > 0) options.shakaPlugin = {};
      case 'customWebTorrent':
        break;
      default:
        break;
    }
    delete options.type;
    delete options.headers;
    let player;
    options.volume =
      playerStorage.get('volume') === null || playerStorage.get('volume') === undefined
        ? 1
        : playerStorage.get('volume');
    if (playerStorage.get('muted') || false) {
      options.autoplayMuted = true;
    }
    if (options.isLive) {
      delete options.startTime;
      SimplePlayer.defaultPreset = LivePreset;
      player = new SimplePlayer({ ...options });
    } else {
      options.plugins = [...options.plugins, Danmu];
      player = new XgPlayer({ ...options });
    }
    player.storage = playerStorage;

    player.once(Events.READY, () => {
      if (!options.isLive) player.playbackRate = player.storage.get('playrate') || 1;
    });

    this.publicListener.playrateUpdate = () => {
      player.storage.set('playrate', player.playbackRate);
    };
    player.on(Events.RATE_CHANGE, this.publicListener.playrateUpdate);

    this.publicListener.volumeUpdate = () => {
      player.storage.set('muted', player.muted);
      player.storage.set('volume', player.volume);
    };
    player.on(Events.VOLUME_CHANGE, this.publicListener.volumeUpdate);
    this.player = player;
    return player;
  };

  currentTime = (): number => {
    if (!this.player) return 0;
    return this.player.currentTime || 0;
  };

  destroy = () => {
    if (!this.player) return;
    this.player.destroy();
  };

  duration = (): number => {
    if (!this.player) return 0;
    return this.player.duration || 0;
  };

  pause = () => {
    if (!this.player) return;
    this.player.pause();
  };

  play = () => {
    if (!this.player) return;
    this.player.play();
  };

  playNext = (options: any) => {
    if (!this.player) return;
    switch (options.type) {
      case 'customMp4':
        options.plugins = [Danmu, Mp4Plugin];
        break;
      case 'customFlv':
        options.plugins = [Danmu, FlvPlugin];
        break;
      case 'customHls':
        options.plugins = [Danmu, HlsPlugin];
        break;
      case 'customWebTorrent':
        break;
      default:
        break;
    }
    this.player.playNext({ url: options.url });
    if (this.player.plugins?.danmu) this.player.plugins.danmu.clear();
  };

  seek = (time: number) => {
    if (!this.player) return;
    this.player.once(Events.LOADED_DATA, () => {
      this.player!.seek(time);
    });
  };

  speed = (speed: number) => {
    if (!this.player) return;
    this.player.once(Events.LOADED_DATA, () => {
      this.player!.playbackRate = speed;
    });
  };

  time = (): { currentTime: number; duration: number } => {
    if (!this.player)
      return {
        currentTime: 0,
        duration: 0,
      };
    return {
      currentTime: this.player.currentTime || 0,
      duration: this.player.duration || 0,
    };
  };

  offBarrage = (_player: XgPlayer) => {
    if (!this.player) return;
    // player.offAll();
    // 无该事件
  };

  onTimeUpdate = (callback: any) => {
    if (!this.player) return;
    this.publicListener.timeUpdate = ({ currentTime, duration }) => callback({ currentTime, duration });
    this.player.on(Events.TIME_UPDATE, this.publicListener.timeUpdate);
  };

  offTimeUpdate = () => {
    if (!this.player) return;
    this.player.off(Events.TIME_UPDATE, this.publicListener.timeUpdate);
  };

  toggle = () => {
    if (!this.player) return;
    if (this.player.paused) this.player.play();
    else this.player.pause();
  };

  volume = (volume: number) => {
    if (!this.player) return;
    this.player.volume = volume;
  };
}

export default XgPlayerAdapter;
```
:::


::: details 点我查看`nplayer.ts`代码
```typescript:line-numbers
import NPlayer, { EVENT as NPlayerEvent, Icon as NPlayerIcon } from 'nplayer';
import nplayerDanmaku from '@nplayer/danmaku';
import { publicIcons, publicBarrageSend, publicStream, playerStorage } from './components';

const elementDeal = {
  createIcon: (html: string, noCls = false) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    if (!noCls) div.classList.add('nplayer_icon');
    return (cls?: string) => {
      if (cls) {
        div.classList.add(cls);
      }
      return div;
    };
  },
  replace: (el: string, newEle: string) => {
    const controlSetting = document.querySelector(el);
    const prevElement = controlSetting?.previousElementSibling;
    const svgToReplace: SVGSVGElement | null | undefined = prevElement?.querySelector('svg');
    if (svgToReplace)
      svgToReplace.parentNode?.replaceChild(
        // @ts-ignore
        document.createRange().createContextualFragment(newEle).firstChild,
        svgToReplace,
      );
  },
};

const pipControl = {
  el: document.createElement('div'),
  id: 'pip',
  pipIcon: publicIcons.pipIcon,
  tooltip: '画中画' as any,
  handlePip() {},
  init(player: NPlayer, _: any, tooltip: string) {
    this.el.id = 'pip';
    const pipDom = document.createElement('div');
    pipDom.className = 'nplayer_icon';
    pipDom.innerHTML = `${this.pipIcon}`;

    this.tooltip = tooltip;
    this.tooltip.html = '画中画';
    this.el.append(pipDom);

    this.handlePip = () => {
      if (!player.loaded) return;
      if ((document as any).pictureInPictureElement !== player.video) {
        (player.video as any).requestPictureInPicture();
      } else {
        (document as any).exitPictureInPicture();
      }
    };

    this.el.addEventListener('click', this.handlePip);
  },
  dispose() {
    this.el.removeEventListener('click', this.handlePip);
    this.el?.remove();
  },
};

class NPlayerAdapter {
  player: NPlayer | null = null;
  options: { [key: string]: any } = {
    container: '#nplayer',
    src: '',
    live: false,
    videoProps: { autoplay: 'true' },
    volumeVertical: true,
    bpControls: {},
    controls: [
      ['play', 'volume', 'time', 'spacer', 'danmaku-settings', 'settings', pipControl, 'fullscreen'],
      ['progress'],
    ],
    plugins: [new nplayerDanmaku({ autoInsert: false })],
  };
  publicListener: { [key: string]: any } = {
    timeUpdate: () => {},
    sendDanmu: () => {},
    playrateUpdate: () => {},
    volumeUpdate: () => {},
  };

  barrage = (comments: any, url: string, id: string) => {
    if (!this.player) return;
    comments = comments.map((item) => ({
      color: item.color,
      text: item.text,
      time: item.time,
      type: item.mode === 'top' || item.mode === 'bottom' ? item.mode : 'scroll',
      isMe: false,
      force: true,
    }));
    this.player.danmaku.resetItems(comments);
    this.publicListener.sendDanmu = (danmu: any) => {
      const options = {
        player: id,
        text: danmu.text,
        time: danmu.time,
        color: danmu.color,
        type: danmu.type,
      };
      publicBarrageSend(url, options);
    };
    this.player.on('DanmakuSend', this.publicListener.sendDanmu);
  };

  create = (options: any): NPlayer => {
    NPlayerIcon.register('play', elementDeal.createIcon(publicIcons.play));
    NPlayerIcon.register('pause', elementDeal.createIcon(publicIcons.pause));
    NPlayerIcon.register('volume', elementDeal.createIcon(publicIcons.volumeLarge));
    NPlayerIcon.register('muted', elementDeal.createIcon(publicIcons.volumeMuted));
    NPlayerIcon.register('cog', elementDeal.createIcon(publicIcons.setting));
    NPlayerIcon.register('enterFullscreen', elementDeal.createIcon(publicIcons.fullscreen));
    NPlayerIcon.register('exitFullscreen', elementDeal.createIcon(publicIcons.exitFullscreen));

    options = { ...this.options, ...options };
    options.container = `#${options.container}`;
    options.src = options.url;
    delete options.url;
    const startTime = options?.startTime || 0;
    delete options.startTime;

    if (options.isLive) {
      options.live = options.isLive;
      options.controls = [['play', 'volume', 'time', 'spacer', 'settings', 'fullscreen'], []];
      delete options?.plugins;
      delete options.isLive;
    }

    let player;
    player = new NPlayer(options);
    player.storage = playerStorage;

    const headers = options.headers || {};
    switch (options.type) {
      case 'customMp4':
        break;
      case 'customHls':
        if (player.hls) publicStream.destroy.customHls(player);
        const hls = publicStream.create.customHls(player.video, options.src, headers);
        player.hls = hls;
        player.on('destroy', () => publicStream.destroy.customHls(player));
        break;
      case 'customFlv':
        if (player.flv) publicStream.destroy.customFlv(player);
        const flv = publicStream.create.customFlv(player.video, options.src, headers);
        player.flv = flv;
        player.on('destroy', () => publicStream.destroy.customFlv(player));
        break;
      case 'customDash':
        if (player.mpd) publicStream.destroy.customDash(player);
        const mpd = publicStream.create.customDash(player.video, options.src, headers);
        player.mpd = mpd;
        player.on('destroy', () => publicStream.destroy.customDash(player));
        break;
      case 'customWebTorrent':
        if (player.torrent) publicStream.destroy.customTorrent(player);
        const torrent = publicStream.create.customTorrent(player.video, options.src, headers);
        player.torrent = torrent;
        player.on('destroy', publicStream.destroy.customTorrent(player));
        break;
      default:
        break;
    }
    player.mount(options.container); // bug container参数不生效只能使用 mount 挂载

    // 元素替换，原生太丑
    elementDeal.replace('.nplayer_control_setting', `<div class="nplayer_icon">${publicIcons.danmu}</div>`);

    player.once(NPlayerEvent.CANPLAY, () => {
      player.settingNamedMap.speed.options = [
        {
          value: 0.5,
          html: '0.5',
        },
        {
          value: 0.75,
          html: '0.75',
        },
        {
          value: 1,
          html: '正常',
        },
        {
          value: 1.25,
          html: '1.25',
        },
        {
          value: 1.5,
          html: '1.5',
        },
        {
          value: 2,
          html: '2',
        },
      ];
      if (!options.live) {
        const speed = player.storage.get('playrate') || 1;
        player.playbackRate = speed;
        player.settingNamedMap.speed.value = speed;
      }
      player.volume =
        player.storage.get('volume') === null || player.storage.get('volume') === undefined
          ? 1
          : player.storage.get('volume');
      if (!options.live && startTime && startTime > 0) {
        player.seek(startTime);
      }
    });

    this.publicListener.playrateUpdate = () => {
      player.storage.set('playrate', player.playbackRate);
    };
    player.on(NPlayerEvent.RATE_CHANGE, this.publicListener.playrateUpdate);

    this.publicListener.volumeUpdate = () => {
      player.storage.set('volume', player.volume);
      player.storage.set('muted', player.volume === 0 ? true : false);
    };
    player.on(NPlayerEvent.VOLUME_CHANGE, this.publicListener.volumeUpdate);
    this.player = player;
    return player;
  };

  currentTime = (): number => {
    if (!this.player) return 0;
    return this.player.currentTime || 0;
  };

  destroy = () => {
    if (!this.player) return;
    this.player.dispose();
  };

  duration = (): number => {
    if (!this.player) return 0;
    return this.player.duration || 0;
  };

  pause = () => {
    if (!this.player) return;
    this.player.pause();
  };

  play = () => {
    if (!this.player) return;
    this.player.play();
  };

  playNext = (options: any) => {
    if (this.player?.hls) publicStream.destroy.customHls(this.player);
    if (this.player?.flv) publicStream.destroy.customFlv(this.player);
    if (this.player?.mpd) publicStream.destroy.customDash(this.player);
    if (this.player?.torrent) publicStream.destroy.customTorrent(this.player);

    switch (options.type) {
      case 'customMp4':
        this.player!.video.src = options.url;
        break;
      case 'customHls':
        this.player.hls = publicStream.create.customHls(this.player!.video, options.url);
        break;
      case 'customFlv':
        this.player.flv = publicStream.create.customFlv(this.player!.video, options.url);
        break;
      case 'customDash':
        this.player.mpd = publicStream.create.customDash(this.player!.video, options.url);
        break;
      case 'customWebTorrent':
        this.player.torrent = publicStream.create.customTorrent(this.player!.video, options.url);
        break;
      default:
        break;
    }
    if (this.player?.danmaku) this.player.danmaku.clearScreen();
  };
  seek = (time: number) => {
    if (!this.player) return;
    this.player.once(NPlayerEvent.CANPLAY, () => {
      this.player?.seek(time);
    });
  };

  speed = (speed: number) => {
    if (!this.player) return;
    this.player.playbackRate = speed;
    // @ts-ignore
    this.player.settingNamedMap.speed.value = speed;
  };

  time = (): { currentTime: number; duration: number } => {
    if (!this.player)
      return {
        currentTime: 0,
        duration: 0,
      };
    return {
      currentTime: this.player.currentTime || 0,
      duration: this.player.duration || 0,
    };
  };

  onTimeUpdate = (callback: any) => {
    if (!this.player) return;
    this.publicListener.timeUpdate = () => {
      callback({
        currentTime: this.player?.currentTime || 0,
        duration: this.player?.duration || 0,
      });
    };
    this.player.on(NPlayerEvent.TIME_UPDATE, this.publicListener.timeUpdate);
  };

  offBarrage = () => {
    if (!this.player) return;
    this.player.off('DanmakuSend', this.publicListener.sendDanmu!);
  };
  offTimeUpdate = () => {
    if (!this.player) return;
    this.player.off(NPlayerEvent.TIME_UPDATE, this.publicListener.timeUpdate!);
  };

  toggle = () => {
    if (!this.player) return;
    this.player.toggle();
  };

  volume = (volume: number) => {
    if (!this.player) return;
    this.player.volume = volume;
  };
}

export default NPlayerAdapter;
```
:::

::: details 点我查看`artplayer.ts`代码
```typescript:line-numbers
import Artplayer from 'artplayer';
import artplayerPluginDanmuku from 'artplayer-plugin-danmuku';
import { publicBarrageSend, publicColor, publicIcons, publicStream, playerStorage } from './components';

class ArtPlayerAdapter {
  player: Artplayer | null = null;
  options: { [key: string]: any } = {
    container: document.getElementById('artplayer'),
    url: '',
    type: '',
    theme: publicColor.theme,
    autoplay: true,
    playbackRate: true,
    fullscreen: true,
    pip: true,
    setting: true,
    flip: true,
    hotkey: true,
    isLive: false,
    aspectRatio: true,
    plugins: [
      artplayerPluginDanmuku({
        speed: 5,
        danmuku: [],
        // useWorker: true, // 5.0.1 版本参数
        synchronousPlayback: true, // 5.1.0 版本参数
        emitter: false, // 5.1.0 版本参数
      }),
    ],
    icons: {
      play: publicIcons.play,
      pause: publicIcons.pause,
      volume: publicIcons.volumeLarge,
      volumeClose: publicIcons.volumeMuted,
      pip: publicIcons.pipIcon,
      fullscreenOn: publicIcons.fullscreen,
      fullscreenOff: publicIcons.exitFullscreen,
      setting: publicIcons.setting,
    },
    cssVar: {
      '--art-control-height': '40px',
      '--art-control-icon-size': '20px',
      '--art-control-icon-scale': '1',
    },
    customType: {
      customHls: (video: HTMLVideoElement, url: string, art: Artplayer) => {
        art.loading.show = true;
        if (art.hls) publicStream.destroy.customHls(art);
        // @ts-ignore
        const headers = art.option.headers || {};
        const hls = publicStream.create.customHls(video, url, headers);
        art.hls = hls;
        art.on('destroy', () => {
          publicStream.destroy.customHls(art);
        });
        art.loading.show = false;
      },
      customFlv: (video: HTMLVideoElement, url: string, art: Artplayer) => {
        art.loading.show = true;
        if (art.flv) publicStream.destroy.customFlv(art);
        // @ts-ignore
        const headers = art.option.headers || {};
        const flv = publicStream.create.customFlv(video, url, headers);
        art.flv = flv;
        art.on('destroy', () => {
          publicStream.destroy.customFlv(art);
        });
        art.loading.show = false;
      },
      customDash: (video: HTMLVideoElement, url: string, art: Artplayer) => {
        art.loading.show = true;
        if (art.mpd) publicStream.destroy.customDash(art);
        // @ts-ignore
        const headers = art.option.headers || {};
        const mpd = publicStream.create.customDash(video, url, headers);
        art.mpd = mpd;
        art.on('destroy', () => {
          publicStream.destroy.customDash(art);
        });
        art.loading.show = false;
      },
      customWebTorrent: (video: HTMLVideoElement, url: string, art: Artplayer) => {
        art.loading.show = true;
        if (art.torrent) publicStream.destroy.customTorrent(art);
        // @ts-ignore
        const headers = art.option.headers || {};
        const torrent = publicStream.create.customTorrent(video, url, headers);
        art.torrent = torrent;
        art.on('destroy', () => {
          publicStream.destroy.customTorrent(art);
        });
        art.loading.show = false;
      },
    },
  };
  publicListener: { [key: string]: any } = {
    timeUpdate: () => {},
    sendDanmu: () => {},
    playrateUpdate: () => {},
    volumeUpdate: () => {},
    mutedUpdate: () => {},
  };

  barrage = (comments: any, url: string, id: string) => {
    if (!this.player) return;
    comments = comments.map((item) => ({
      color: item.color,
      text: item.text,
      time: item.time,
      mode: item.mode === 'scroll' ? 1 : 0,
      border: false,
    }));
    this.player.plugins.artplayerPluginDanmuku.config({
      danmuku: comments,
    });
    this.player.plugins.artplayerPluginDanmuku.load();
    this.publicListener.sendDanmu = (danmu: any) => {
      const options = {
        player: id,
        text: danmu.text,
        time: danmu.time,
        color: danmu.color,
        type: danmu.mode == 1 ? '5' : '0',
      };
      publicBarrageSend(url, options);
    };
    // @ts-ignore
    this.player.on('artplayerPluginDanmuku:emit', this.publicListener.sendDanmu);
  };

  create = (options: any): Artplayer => {
    options = { ...this.options, ...options };
    options.container = `#${options.container}`;
    if (options.isLive) delete options?.plugins;
    const startTime = options?.startTime || 0;
    delete options.startTime;

    let player;
    options.volume =
      playerStorage.get('volume') === null || playerStorage.get('volume') === undefined
        ? 1
        : playerStorage.get('volume');
    options.muted = playerStorage.get('muted') || false;
    Artplayer.PLAYBACK_RATE = [0.5, 0.75, 1, 1.25, 1.5, 2];
    player = new Artplayer({ ...options });
    player.storage = playerStorage;

    player.once('ready', () => {
      if (!options.isLive) player.playbackRate = player.storage.get('playrate') || 1;
      if (!options.isLive && startTime && startTime > 0) player.seek = startTime;
    });

    this.publicListener.playrateUpdate = () => {
      player.storage.set('playrate', player.playbackRate);
    };
    player.on('video:ratechange', this.publicListener.playrateUpdate);

    this.publicListener.volumeUpdate = () => {
      player.storage.set('volume', player.volume);
    };
    player.on('video:volumechange', this.publicListener.volumeUpdate);
    this.publicListener.mutedUpdate = (state) => {
      player.storage.set('muted', state);
    };
    player.on('muted', this.publicListener.mutedUpdate);
    this.player = player;
    return player;
  };

  currentTime = (): number => {
    if (!this.player) return 0;
    return this.player.video.currentTime || 0;
  };

  destroy = () => {
    if (!this.player) return;
    this.player.destroy();
  };

  duration = (): number => {
    if (!this.player) return 0;
    return this.player.video.duration || 0;
  };

  pause = () => {
    if (!this.player) return;
    this.player.pause();
  };

  play = () => {
    if (!this.player) return;
    this.player.play();
  };

  playNext = (player: Artplayer, options: any) => {
    // player.switch = options.url;
    player.switchUrl(options.url);
    if (player.plugins?.artplayerPluginDanmuku) {
      player.plugins.artplayerPluginDanmuku.config({
        danmuku: [],
      });
      player.plugins.artplayerPluginDanmuku.load();
    }
  };

  seek = (time: number) => {
    if (!this.player) return;
    this.player.once('ready', () => {
      this.player!.seek = time;
    });
  };

  time = (): { currentTime: number; duration: number } => {
    if (!this.player)
      return {
        currentTime: 0,
        duration: 0,
      };
    return {
      currentTime: this.player.video.currentTime || 0,
      duration: this.player.video.duration || 0,
    };
  };

  onTimeUpdate = (callback: any) => {
    if (!this.player) return;
    this.publicListener.timeUpdate = () => {
      callback({
        currentTime: this.player?.video.currentTime || 0,
        duration: this.player?.video.duration || 0,
      });
    };
    this.player.on('video:timeupdate', this.publicListener.timeUpdate);
  };

  offBarrage = () => {
    if (!this.player) return;
    // @ts-ignore
    this.player.off('artplayerPluginDanmuku:emit', this.publicListener.sendDanmu);
  };

  offTimeUpdate = () => {
    if (!this.player) return;
    this.player.off('video:timeupdate', this.publicListener.timeUpdate);
  };

  speed = (speed: number) => {
    if (!this.player) return;
    this.player.once('ready', () => {
      this.player!.playbackRate = speed;
    });
  };

  toggle = () => {
    if (!this.player) return;
    this.player.toggle();
  };

  volume = (volume: number) => {
    if (!this.player) return;
    this.player.volume = volume;
  };
}

export default ArtPlayerAdapter;
```
:::

::: details 点我查看`dplayer.ts`代码
```typescript:line-numbers
import DPlayer from 'dplayer';
import { publicIcons, publicStream, playerStorage } from './components';

const elementDeal = {
  replace: (el: string, newEle: string) => {
    const controlSetting = document.querySelector(el);
    const svgToReplace: any = controlSetting?.querySelector('svg');
    if (svgToReplace)
      svgToReplace.parentNode.replaceChild(
        document.createRange().createContextualFragment(newEle).firstChild,
        svgToReplace,
      );
  },
  add: (el: string, newEle: string) => {
    const controlSetting = document.querySelector(el);
    controlSetting!.insertAdjacentHTML('afterend', newEle);
  },
};

class CustomDPlayer extends DPlayer {
  instances: any[] = [];
  constructor(options) {
    super(options); // 调用DPlayer构造函数初始化实例
    this.instances.push(this);
  }

  destroy() {
    const self: any = this;
    this.instances.splice(this.instances.indexOf(self), 1);
    self.pause();
    document.removeEventListener('click', self.docClickFun, true);
    self.container.removeEventListener('click', self.containerClickFun, true);
    self.fullScreen.destroy();
    self.hotkey.destroy();
    self.contextmenu.destroy();
    self.controller.destroy();
    self.timer.destroy();
    // self.video.src = ''; // 此行代码会引起始终触发倍速为1
    self.container.innerHTML = '';
    self.events.trigger('destroy');
  }

  /**
   * 扩展的off方法，用于移除事件监听器。
   * 如果没有提供回调函数，则清空该事件类型的所有监听器；
   * 如果提供了回调函数，则仅移除与之匹配的监听器。
   *
   * @param {string} name - 事件名称。
   * @param {Function} [callback] - 要移除的事件处理函数。
   * @returns {CustomDPlayer} 返回当前实例，支持链式调用。
   */
  off(name: string, callback?: Function) {
    // @ts-ignore 获取或初始化events.events对象, 用于存储事件监听器
    const e = this.events.events || (this.events.events = {});
    // 获取特定事件名称下的所有监听器
    const evts = e[name];
    // 创建一个新数组，用于存放那些不符合移除条件的监听器
    const liveEvents: any = [];

    // 如果存在事件监听器且指定了回调函数
    if (evts && callback) {
      // 遍历当前事件名称下的所有监听器
      for (let i = 0, len = evts.length; i < len; i += 1) {
        // 如果当前监听器的函数与要移除的函数不匹配[考虑直接引用和_.once包裹的情况]
        if (evts[i] !== callback) {
          liveEvents.push(evts[i]); // 保留该监听器
        }
      }
    }

    // 如果有监听器存活下来，更新events.events[name]
    if (liveEvents.length) {
      e[name] = liveEvents;
    } else {
      // 否则，没有匹配的监听器，直接删除该事件类型
      delete e[name];
    }

    // 返回当前实例，便于链式调用
    return this;
  }

  /**
   * 扩展的once方法，用于监听单次事件监听器。
   *
   * @param {string} name - 事件名称。
   * @param {Function} [callback] - 要监听单次的事件处理函数。
   * @returns {CustomDPlayer} 返回当前实例，支持链式调用。
   */
  once(name: string, callback?: Function) {
    const self: any = this;
    function listener(...args) {
      setTimeout(() => {
        self.off(name, listener);
      }, 0); // 必须上定时器，不然报错
      if (callback) callback.apply(self, args);
    }

    self.events.on(name, listener);
    return this;
  }

  /**
   * 扩展的静音方法。
   * @param status true为静音，false为取消静音
   * @returns
   */
  muted(status: boolean) {
    const self: any = this;
    if (typeof status === 'boolean') {
      self.video.muted = status;
      if (status) {
        self.template.volumeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 21 32">
    <path d="M13.728 6.272v19.456q0 0.448-0.352 0.8t-0.8 0.32-0.8-0.32l-5.952-5.952h-4.672q-0.48 0-0.8-0.352t-0.352-0.8v-6.848q0-0.48 0.352-0.8t0.8-0.352h4.672l5.952-5.952q0.32-0.32 0.8-0.32t0.8 0.32 0.352 0.8z"></path>
</svg>`;
        self.bar.set('volume', 0, 'width');
      } else {
        self.switchVolumeIcon();
        self.bar.set('volume', self.volume(), 'width');
      }
    }
    return self.video.muted;
  }
}

class DPlayerAdapter {
  player: CustomDPlayer | DPlayer | null = null;
  options: { [key: string]: any } = {
    container: document.getElementById('dplayer'),
    autoplay: true,
    screenshot: false,
    live: false,
    video: {
      url: '',
      type: '',
      customType: {
        customHls: (video: HTMLVideoElement, dp: DPlayer) => {
          if (dp.hls) publicStream.destroy.customHls(dp);
          const headers = dp.options.headers || {};
          const hls = publicStream.create.customHls(video, video.src, headers);
          dp.hls = hls;
          dp.on('destroy', () => {
            publicStream.destroy.customHls(dp);
          });
        },
        customFlv: (video: HTMLVideoElement, dp: DPlayer) => {
          if (dp.flv) publicStream.destroy.customFlv(dp);
          const headers = dp.options.headers || {};
          const flv = publicStream.create.customFlv(video, video.src, headers);
          dp.flv = flv;
          dp.on('destroy', () => {
            publicStream.destroy.customFlv(dp);
          });
        },
        customDash: (video: HTMLVideoElement, dp: DPlayer) => {
          if (dp.mpd) publicStream.destroy.customDash(dp);
          const headers = dp.options.headers || {};
          const mpd = publicStream.create.customDash(video, video.src, headers);
          dp.mpd = mpd;
          dp.on('destroy', () => {
            publicStream.destroy.customDash(dp);
          });
        },
        customWebTorrent: (video: HTMLVideoElement, dp: DPlayer) => {
          if (dp.torrent) publicStream.destroy.customTorrent(dp);
          const headers = dp.options.headers || {};
          const torrent = publicStream.create.customTorrent(video, video.src, headers);
          dp.torrent = torrent;
          dp.on('destroy', () => {
            publicStream.destroy.customTorrent(dp);
          });
        },
      },
    },
    danmaku: {
      id: '', //必填，视频id, 用于下面api请求时使用
      api: 'http://127.0.0.1:9978/api/v1/barrage/', //必填,后台提供
      addition: [], //可选，额外的弹幕
      user: 'zyfun', //弹幕作者
      bottom: '15%',
      unlimited: false,
    },
  };
  publicListener: { [key: string]: any } = {
    timeUpdate: () => {},
    sendDanmu: () => {},
    playrateUpdate: () => {},
    volumeUpdate: () => {},
  };

  barrage = (_comments: any, _url: string, id: string) => {
    if (!this.player) return;
    const video = this.player.options.video;
    let danmaku = this.player.options.danmaku;
    danmaku.id = id;
    const { currentTime, playbackRate } = this.player.video;
    this.player.switchVideo({ ...video }, { ...danmaku });
    if (currentTime) this.player.seek(currentTime);
    if (playbackRate !== 1) this.player.speed(playbackRate);
  };

  create = (options: any): any => {
    options = { ...this.options, ...options };
    options.container = document.getElementById(options.container);
    options.video.url = options.url;
    delete options.url;
    options.video.type = options.type;
    delete options.type;
    if (options.isLive) {
      options.live = options.isLive;
      delete options?.danmaku;
      delete options.isLive;
    }
    const startTime = options?.startTime || 0;
    delete options.startTime;

    let player;
    options.volume =
      playerStorage.get('volume') === null || playerStorage.get('volume') === undefined
        ? 1
        : playerStorage.get('volume');
    const muted = playerStorage.get('muted') || false;
    player = new CustomDPlayer({ ...options });
    player.storage = playerStorage;

    // 元素替换，原生太丑
    elementDeal.replace('.dplayer-comment-icon', publicIcons.danmu);
    elementDeal.replace('.dplayer-setting-icon', publicIcons.setting);
    elementDeal.replace('.dplayer-full-icon', publicIcons.fullscreen);
    elementDeal.add(
      '.dplayer-setting',
      `
      <button
        class="dplayer-icon dplayer-pip-icon"
        data-balloon="画中画"
        data-balloon-pos="up"
        style="padding: 7px 8px"
      >
        ${publicIcons.pipIcon}
      </button>
    `,
    );
    if (!options.live) {
      elementDeal.add(
        '.dplayer-setting',
        `
      <div class="dplayer-subtitle-btn">
        <button class="dplayer-icon dplayer-subtitle-icon" data-balloon="${player.template.showDanmakuToggle.checked ? '显示弹幕' : '关闭弹幕'}" data-balloon-pos="up">
          <span class="dplayer-icon-content" style="">
            ${player.template.showDanmakuToggle.checked ? publicIcons.openDanmu : publicIcons.closeDanmu}
          </span>
        </button>
      </div>
    `,
      );
    }

    // 弹幕事件处理
    const handleDanmuClick = () => {
      let showDanmaku: any = document.querySelector('.dplayer-setting-showdan');
      (player.template.showDanmakuToggle.checked = !player.template.showDanmakuToggle.checked),
        player.template.showDanmakuToggle.checked
          ? ((showDanmaku = !0),
            player.danmaku.show(),
            elementDeal.replace('.dplayer-subtitle-icon', publicIcons.openDanmu))
          : ((showDanmaku = !1),
            player.danmaku.hide(),
            elementDeal.replace('.dplayer-subtitle-icon', publicIcons.closeDanmu)),
        player.user.set('danmaku', showDanmaku ? 1 : 0);
    };

    const handlePipClick = () => {
      const videoElement: HTMLVideoElement | null = document.querySelector('.dplayer-video');
      try {
        videoElement !== document.pictureInPictureElement
          ? videoElement!.requestPictureInPicture()
          : document.exitPictureInPicture();
      } catch (error) {
        console.error(error);
      }
    };

    const pipButton = document.querySelector('.dplayer-pip-icon');
    if (pipButton) pipButton.addEventListener('click', handlePipClick);
    const danmuButton = document.querySelector('.dplayer-subtitle-icon');
    if (danmuButton) danmuButton.addEventListener('click', handleDanmuClick);

    player.once('canplay', () => {
      if (!options.live) player.speed(player.storage.get('playrate') || 1);
      player.muted(muted);
      if (!options.live && startTime && startTime > 0) player.seek(startTime);
    });

    this.publicListener.playrateUpdate = () => {
      player.storage.set('playrate', player.video.playbackRate);
    };
    player.on('ratechange', this.publicListener.playrateUpdate);

    this.publicListener.volumeUpdate = () => {
      player.storage.set('volume', player.video.volume);
      player.storage.set('muted', player.video.muted);
    };
    player.on('volumechange', this.publicListener.volumeUpdate);
    this.player = player;
    return player;
  };

  currentTime = (): number => {
    if (!this.player) return 0;
    return this.player.video.currentTime || 0;
  };

  destroy = () => {
    if (!this.player) return;
    this.player.destroy();
  };

  duration = (): number => {
    if (!this.player) return 0;
    return this.player.video.duration || 0;
  };

  pause = () => {
    if (!this.player) return;
    this.player.pause();
  };

  play = () => {
    if (!this.player) return;
    this.player.play();
  };

  playNext = (options: any) => {
    if (!this.player) return;
    const { playbackRate } = this.player.video;
    if (options.type === 'customFlv') {
      publicStream.destroy.customFlv(this.player);
    } // 重要
    this.player.switchVideo({ ...options });
    this.player.options.video.url = options.url;
    if (this.player?.danmaku) this.player.danmaku.clear();
    if (playbackRate !== 1) this.player.speed(playbackRate);
    this.player.play();
  };

  seek = (time: number) => {
    if (!this.player) return;
    this.player.seek(time);
  };
  speed = (time: number) => {
    if (!this.player) return;
    this.player.speed(time);
  };

  time = (): { currentTime: number; duration: number } => {
    if (!this.player)
      return {
        currentTime: 0,
        duration: 0,
      };
    return {
      currentTime: this.player.video.currentTime || 0,
      duration: this.player.video.duration || 0,
    };
  };

  onTimeUpdate = (callback: any) => {
    if (!this.player) return;
    this.publicListener.timeUpdate = () => {
      if (this.player?.video) {
        callback({
          currentTime: this.player.video.currentTime || 0,
          duration: this.player.video.duration || 0,
        });
      } else callback({ currentTime: null, duration: null });
    };
    this.player.on('timeupdate', this.publicListener.timeUpdate);
  };

  offBarrage = (_player: any) => {
    // 弹幕组件会直接提交后端
  };

  offTimeUpdate = () => {
    if (!this.player) return;
    this.player.off('timeupdate', this.publicListener.timeUpdate);
  };

  toggle = () => {
    if (!this.player) return;
    this.player.toggle();
  };

  volume = (volume: number) => {
    if (!this.player) return;
    this.player.volume(volume, true, false);
  };
}

export default DPlayerAdapter;
```
:::

::: details 点我查看`player.vue`代码
```vue:line-numbers
<template>
  <div class="comm-player">
    <div ref="mseRef" id="comm-mse" class="comm-player-mse"></div>
  </div>
</template>

<script setup lang="ts">
import '@/style/player/index.less';

import { computed, shallowRef, useTemplateRef } from 'vue';
import { ArtPlayerAdapter, DPlayerAdapter, NPlayerAdapter, XgPlayerAdapter } from '@/utils/common/player/playerModule'
import { checkMediaType, singleton, mapVideoTypeToPlayerType } from '@/utils/tool';
import { usePlayStore } from '@/store';

const emits = defineEmits(['updateTime']);
const store = usePlayStore();
const adapter = shallowRef();
const mseRef = useTemplateRef('mseRef');
const playerMode = computed(() => store.setting.playerMode); // 存储播放器类型
const adapterRelation = {
  artplayer: ArtPlayerAdapter,
  dplayer: DPlayerAdapter,
  nplayer: NPlayerAdapter,
  xgplayer: XgPlayerAdapter,
};

const formatUrlHeaders = (url: string, headers: { [key: string]: string }) => {
  if (headers) {
    for (const key in headers) {
      url += `@${key}=${headers[key]}`;
    }
  }
  return url;
};

const init = async () => {
  await destroy();
  const singleAdapter = singleton(adapterRelation?.[playerMode.value.type]);
  adapter.value = await new singleAdapter();
};

const create = async (doc: { [key: string]: any }) => {
  if (!adapter.value || !doc.url) return;
  if (mseRef.value) mseRef.value.id = doc.container;
  if (!doc.type) {
    const checkType = await checkMediaType(doc.url);
    if (checkType === 'unknown' && !checkType) return;
    doc.type = checkType;
  };
  doc.url = formatUrlHeaders(doc.url, doc.headers);  // 用于底层拦截调用headers
  doc.type = mapVideoTypeToPlayerType(doc.type);
  await adapter.value.create(doc);
};

const destroy = async () => {
  if (!adapter.value) return;
  await adapter.value.destroy();
  adapter.value = null;
};

const play = async () => {
  if (!adapter.value) return;
  await adapter.value.play();
};

const pause = async () => {
  if (!adapter.value) return;
  await adapter.value.pause();
};

const barrage = async (comments, url, id) => {
  if (!adapter.value) return;
  await adapter.value.barrage(comments, url, id);
};

const onTimeUpdate = async () => {
  if (!adapter.value) return;
  await adapter.value.onTimeUpdate(({ currentTime, duration }) => {
    emits('updateTime', { currentTime, duration });
  });
};

defineExpose({
  init,
  barrage,
  create,
  destroy,
  play,
  pause,
  onTimeUpdate
});
</script>

<style lang="less" scoped>
.comm-player {
  position: relative;
  width: 100%;
  height: 100%;

  .comm-player-mse {
    width: 100%;
    height: 100%;
  };
}
</style>
```
:::

### 5.3. electron底层拦截实现请求头

::: details 点我查看`index.ts`代码
```typescript:line-numbers
import { app, BrowserWindow, session } from 'electron';

let reqIdMethod = {}; // 请求id与headers列表

const isLocalhostRef = (url: string) => `${url}`.includes('//localhost') || `${url}`.includes('//127.0.0.1');
const parseCustomUrl = (url: string) => {
  const [redirectURL, ...headerParts] = url.split('@');

  const headers = headerParts.reduce((acc, part) => {
    const [key, value] = part.split('=');
    acc[key] = value;
    return acc;
  }, {});

  return { redirectURL, headers };
};


app.whenReady().then(() => {
  const defaultSession = session.defaultSession;

  defaultSession.webRequest.onBeforeRequest({ urls: ['*://*/*'] }, (details, callback) => {
    let { url, id } = details;

    // 不处理本地地址
    if (isLocalhostRef(url)) {
      callback({});
      return;
    }

    // http://xxx.com/xxx.mp4@Referer=www.xxx.com@User-Agent=xxx-version353
    const { redirectURL, headers } = parseCustomUrl(url);

    if (headers && Object.keys(headers).length > 0) {
      reqIdMethod[`${id}`] = headers;
      callback({ cancel: false, redirectURL });
    } else {
      callback({});
    }
  });

  defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
      let { requestHeaders, url, id } = details;
      const headers = reqIdMethod[details.id] || {};

      // 不处理本地地址
      if (isLocalhostRef(url)) {
        callback({ requestHeaders });
        return;
      }

      // 处理Origin
      const origin = headers?.['Origin'] || requestHeaders['Origin'];
      if (origin && !isLocalhostRef(origin)) {
        if (requestHeaders['Origin'] === new URL(url).origin) {
          delete requestHeaders['Origin'];
        } else requestHeaders['Origin'] = origin;
      } else {
        delete requestHeaders['Origin'];
      }

      // 处理 User-Agent
      requestHeaders['User-Agent'] =
        headers?.['User-Agent'] || requestHeaders?.['User-Agent'];
      // 处理 Host
      requestHeaders['Host'] = headers?.['Host'] || requestHeaders?.['Host'] || new URL(url).host;
      // 处理 Cookie
      requestHeaders['Cookie'] = headers?.['Cookie'] || requestHeaders?.['Cookie'];
      // 处理 Referer
      const referer = headers?.['Referer'] || requestHeaders['Referer'];
      if (referer && !isLocalhostRef(referer)) {
        requestHeaders['Referer'] = referer;
      } else {
        delete requestHeaders['Referer'];
      }
      // 清理不再需要的记录
      delete reqIdMethod[`${id}`];
      callback({ requestHeaders });
    });
});
```
:::

## 6. 结语

集成多播放器是一个吃力的事情, 主打的就是文档方法搬运工, 写法上不太优雅但是能用, 其实如果只是一个页面上调用多播放器可以堆屎山`if else`。