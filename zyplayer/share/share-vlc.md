# VLC Web API

::: info 参考文档
[VLC HTTP requests](https://wiki.videolan.org/VLC_HTTP_requests/)
:::

## 1.设置

> 设置完后重启软件生效

::: info 访问方式
- 地址http://127.0.0.1:8080
- 用户名为空
- 密码为自定义
:::

### 1.1. window设置
> 路径: [工具->偏好设置]

![win-set-1](/share/vlc/win-set-1.png)
![win-set-2](/share/vlc/win-set-2.png)

### 1.2. mac设置
> 路径: [VLC->设置]

![mac-set](/share/vlc/mac-set.png)

### 1.2. linux设置
> 路径: [VLC->设置]

## 2.授权协议

`VLC-web`控制授权采用`WWW-Authenticate`认证, 此header一般和401状态码一起使用。 

### 2.1. Step1
服务端回向浏览器发送头信息`Www-Authenticate: Basic realm="VLC stream"`
![vlc-web-auth-1](/share/vlc/vlc-web-auth-1.png)

### 2.2. Step2
浏览器收到后, 便会弹回登陆框。填写完成确定后, 请求头会包含: `Authorization: Basic "用户名:密码"的base64编码`
![vlc-web-auth-2](/share/vlc/vlc-web-auth-2.png)

## 3.常用接口

### 3.1. 状态获取

> 接口: `http://127.0.0.1:8080/requests/status.xml`

```xml
<root>
    <fullscreen>false</fullscreen>
    <aspectratio>default</aspectratio>
    <seek_sec>10</seek_sec>
    <apiversion>3</apiversion>
    <currentplid>11</currentplid>
    <time>21</time>
    <volume>36</volume>
    <length>90</length>
    <random>false</random>
    <audiofilters>
        <filter_0/>
    </audiofilters>
    <rate>1</rate>
    <videoeffects>
        <hue>0</hue>
        <saturation>1</saturation>
        <contrast>1</contrast>
        <brightness>1</brightness>
        <gamma>1</gamma>
    </videoeffects>
    <state>paused</state>
    <loop>false</loop>
    <version>3.0.21 Vetinari</version>
    <position>0.237632766366</position>
    <audiodelay>0</audiodelay>
    <repeat>false</repeat>
    <subtitledelay>0</subtitledelay>
    <equalizer/>
    <information>
        <category name="meta">
            <info name="encoded_by">Lavf58.12.100</info>
            <info name="filename">xgplayer-demo-360p.mp4</info>
        </category>
        <category name="流 0">
            <info name="语言">英语</info>
            <info name="缓冲分辨率">640x368</info>
            <info name="编解码器">H264 - MPEG-4 AVC (part 10) (avc1)</info>
            <info name="帧率">25</info>
            <info name="类型">视频</info>
            <info name="已解码格式"/>
            <info name="方向">上左</info>
            <info name="色度位置">左</info>
            <info name="视频分辨率">640x360</info>
        </category>
        <category name="流 1">
            <info name="采样率">48000 Hz</info>
            <info name="语言">英语</info>
            <info name="类型">音频</info>
            <info name="声道">立体声</info>
            <info name="编解码器">MPEG AAC Audio (mp4a)</info>
            <info name="位每采样">32</info>
        </category>
    </information>
    <stats>
        <lostabuffers>0</lostabuffers>
        <readpackets>2335</readpackets>
        <lostpictures>0</lostpictures>
        <demuxreadbytes>1252258</demuxreadbytes>
        <demuxbitrate>0.13066865503788</demuxbitrate>
        <playedabuffers>1060</playedabuffers>
        <demuxcorrupted>0</demuxcorrupted>
        <sendbitrate>0</sendbitrate>
        <sentbytes>0</sentbytes>
        <displayedpictures>535</displayedpictures>
        <demuxreadpackets>0</demuxreadpackets>
        <sentpackets>0</sentpackets>
        <inputbitrate>3.5416431427002</inputbitrate>
        <demuxdiscontinuity>2</demuxdiscontinuity>
        <averagedemuxbitrate>0</averagedemuxbitrate>
        <decodedvideo>1082</decodedvideo>
        <averageinputbitrate>0</averageinputbitrate>
        <readbytes>4775536</readbytes>
        <decodedaudio>2121</decodedaudio>
    </stats>
</root>
```

### 3.2. 播放控制

作用              |路径                                                                     |说明
-----------------|------------------------------------------------------------------------|----------
播放&暂停         |`http://127.0.0.1:8080/requests/status.xml?command=pl_pause`             |
停止              |`http://127.0.0.1:8080/requests/status.xml?command=pl_stop`              |
打开播放列表视频    |`http://127.0.0.1:8080/requests/status.xml?command=pl_play&id=3`         |
播放视频          |`http://127.0.0.1:8080/requests/status.xml?command=in_play&input=地址`    |特殊字符encodeURIComponent编码`input=encodeURIComponent(地址)`

> 如遇停止播放后VLC自动退出, 请配置如下参数

![vlc-set-stop&quit](/share/vlc/vlc-set-stop&quit.png)

## 4.封装

```ts:line-numbers
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

// XML转JSON配置 https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/1.GettingStarted.md
const xmlOptions = {
  trimValues: true,
  textNodeName: '$text',
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseAttributeValue: true,
};
const parser = new XMLParser(xmlOptions);

class VlcControl {
  host: string = '127.0.0.1';
  port: number = 8080;
  username: string = '';
  password: string = 'zyfun';

  constructor(options) {
    this.host = options.host;
    this.port = options.port;
    this.password = options.password;
    this.username = options.username;
  }

  async play() {
    await this.vlcWebApiControl('/requests/status.xml', { command: 'pl_play' });
  }

  async pause() {
    const status = await this.vlcWebApiControl('/requests/status.xml');
    if (status.root.state === 'playing') {
      await this.vlcWebApiControl('/requests/status.xml', { command: 'pl_pause' });
    }
  }

  async toggle() {
    await this.vlcWebApiControl('/requests/status.xml', { command: 'pl_pause' });
  }

  async volume(volume: number) {
    this.vlcWebApiControl('/requests/status.xml', { command: 'volume', val: volume * 100 * 3.2 });
  }

  async speed(speed: number) {
    this.vlcWebApiControl('/requests/status.xml', { command: 'rate', val: speed });
  }

  async seek(seek: number | string) {
    this.vlcWebApiControl('/requests/status.xml', { command: 'seek', val: seek });
  }

  async currentTime() {
    const status = await this.vlcWebApiControl('/requests/status.xml');
    return status.root.time || 0;
  }

  async duration() {
    const status = await this.vlcWebApiControl('/requests/status.xml');
    return status.root.length || 0;
  }

  async time() {
    const status = await this.vlcWebApiControl('/requests/status.xml');
    return {
      currentTime: status.root.time || 0,
      duration: status.root.length || 0,
    };
  }

  getControlUrl() {
    return `http://${this.host}:${this.port}`;
  }

  async vlcWebApiControl(path: string = '/requests/status.xml', params: any = {}) {
    try {
      const response = await axios({
        url: `${this.getControlUrl()}${path}`,
        method: 'GET',
        auth: {
          username: this.username,
          password: this.password,
        },
        params: params,
      });
      return parser.parse(response.data);
    } catch (err: any) {
      console.error(`Error sending VLC http command: ${err.message}`);
      throw err;
    }
  }
}

export default VlcControl;
```