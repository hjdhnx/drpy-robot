# 系统投屏
> 利用系统能力投屏到投影仪(电视), 以此获取`更加观影体验`

![view](/guide/cast-screen/view.png)


## 1.系统能力
> 系统能力需要`同一网络`(同一wifi), 接收端(投影仪或电视)和发送端(电脑)都需`支持相关协议`。

### 1.1.Window(Miracast)
> [参考微软官方文档](https://learn.microsoft.com/zh-cn/windows-hardware/design/device-experiences/wireless-projection-implementing-over-miracast)
1. 网络统一: 将电脑和电视连接到同一个Wi-Fi网络中
2. 电视设置: 进入电视`设置`或`应用`菜单, 找到`投屏`或`无线显示`选项, 并开启该功能
3. 开始投屏: 按下`Windows+P`快捷键, 选择`连接到无线显示器`选项, 搜索并选择对应电视的名称进行连接

![Miracast](/guide/cast-screen/win-miracast.png)

### 1.2.MacOS(AirPlay)
> [参考苹果官方文档](https://support.apple.com/zh-cn/guide/macbook-air/apdf1417128d/2024/mac/15)
1. 网络统一: 将电脑和电视连接到同一个Wi-Fi网络中
2. 电视设置: 进入电视`设置`或`应用`菜单, 找到`投屏`或`无线显示`选项, 并开启该功能
3. 开始投屏: 点击Mac菜单栏上的`隔空播放`或`镜像投屏`, 在弹出的列表中选择你的电视设备

![Airplay](/guide/cast-screen/mac-airplay.png)

### 1.3.Linux
> 系统未内置相关协议, 无法直接使用系统能力, 推荐使用第三方投屏软件。

### 1.4.ChromOS(Chromecast)

> [参考谷歌官方文档](https://support.google.com/chromebook/answer/3289520?hl=en#zippy=)
1. 网络统一: 将电脑和电视连接到同一个Wi-Fi网络中
2. 电视设置: 进入电视`设置`或`应用`菜单, 找到`投屏`或`无线显示`选项, 并开启该功能
3. 开始投屏: 点击右下角系统托盘, 选择`投放屏幕`, 在弹出的列表中选择你的电视设备

![Chromecast](/guide/cast-screen/fydeos-chromecast.png)


## 2.第三方投屏软件
1. 下载安装: 在电脑和电视上分别下载并安装投屏软件, 如`乐播投屏` `快投屏`或`当贝投屏`
2. 网络统一: 确保电脑和电视连接在同一Wi-Fi网络
3. 软件操作: 打开电脑上的投屏软件, 选择`扫码投屏`或`投屏码投屏`
4. 电视配合: 在电视上打开相应的投屏软件, 根据电脑的提示进行扫码或输入投屏码, 即可完成连接