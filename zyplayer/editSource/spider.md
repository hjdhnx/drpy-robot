# 数据爬虫

::: danger 警告
爬虫需谨慎, 请勿用于非法用途
:::

## 1.打开工具
- 方法①: 按f12打开开发者工具
- 方法②: 通过点击触发
    ![open-dev-tool](/editSource/spider/spider-openDevTool.png)

## 2.面板介绍
![info-1](/editSource/spider/spider-info-1.png)
![info-2](/editSource/spider/spider-info-2.png)
![info-3](/editSource/spider/spider-info-3.png)
![info-4](/editSource/spider/spider-info-4.png)
![info-5](/editSource/spider/spider-info-5.png)

## 3.请求详情

请求详情字段包含：`​标头（Headers）` `载荷（Payload）` `响应（Response）` `预览（Preview）` `启动器（Initiator）` `时间（Timing）` `Cookie`

### 3.1.标头[Headers]: 请求常规信息、响应头、请求头
![info-req-1](/editSource/spider/spider-reqinfo-1.png)

### 3.2.载荷[Payload]: 请求体。会自动编排格式后显示，可以查看源代码，如果是url参数，还可以查看url编码格式的数据
![info-req-2](/editSource/spider/spider-reqinfo-2.png)
![info-req-3](/editSource/spider/spider-reqinfo-3.png)

### 3.3.响应[Response]: 服务器返回内容
![info-req-4](/editSource/spider/spider-reqinfo-4.png)

### 3.4.预览[Preview]: 响应解析后的内容

> 如: 返回内容是html标签，预览则解析为html网页进行显示；返回内容是资源类，可能两者一样如css、js文件都显示文件内容。

![info-req-5](/editSource/spider/spider-reqinfo-5.png)


### 3.7.启动器[Initiator]: 触发请求的源头。显示是通过哪个页面或者脚本发起了该请求。用于调试和追踪请求的起源

> 一般用于反爬虫代码加密参数调试

![info-req-6](/editSource/spider/spider-reqinfo-6.png)

### 3.6.时间[Timing]: 完成请求消耗的时间。包含请求开始时间、DNS 解析时间、连接时间、服务器响应时间、内容下载时间等。可以用来分析、优化请求性能

> 一般不关心

![info-req-7](/editSource/spider/spider-reqinfo-7.png)

### 3.7.Cookie：请求和响应的Cookie

![info-req-8](/editSource/spider/spider-reqinfo-8.png)

## 4.常见反爬

- 请求头反爬
    - 1. 添加User-Agent
    - 2. 添加Referer
    - 3. 添加Cookie
    - 4. 自定义请求头
- ip拦截
    - 1. 使用代理池
- 防水墙
    - 1. 5s盾 - `异常参数`
    - 2. 验证码 - `可用ocr识别`
    - 3. 滑动
    - 4. 机器人验证 - `浏览器指纹`
    - 5. 点击验证 - `自动化技术`


## 5.无限 debugger 解决方法

对网页查看页面网络请求的时候发现页面进入debugger模式, 继续往下执行, 循环进入该断点调试
![info-debug](/editSource/spider/spider-debug-info.png)

### 5.1.禁用所有断点

先禁用断点(`点击变蓝色`)->继续下一步(`点击变成⏸`)
![info-debug-1](/editSource/spider/spider-debug-1.png)

### 5.2.禁用局部断点

在断点代码最前面数字右键选择`一律不在此处暂停`或者`添加条件短点(高级用法)`, `变成?符号`
![info-debug-2](/editSource/spider/spider-debug-2.png)

### 5.3.文件替换

找到原始文件, 找到对应代码, `删除debugger相关逻辑后替换文件`(此处删除setInterval定时器中内容即可)
![info-debug-3](/editSource/spider/spider-debug-3.png)

### 5.4.函数制空

> 一定要在 debugger 进入之前操作(`小技巧可以将网络请求设置为低速4g或者3g | 或者在加载第一个js文件中加入代码`)

```js:line-numbers
// 这里是业务代码和setInterval无关，所以直接置空即可
setInterval = function(){}
```

![info-debug-4](/editSource/spider/spider-debug-4.png)

### 5.5.Hook大法

> 一定要在 debugger 进入之前操作(`小技巧可以将网络请求设置为低速4g或者3g | 或者在加载第一个js文件中加入代码`)

```js:line-numbers
const _setInterval = setInterval;  // 保存了原始的 setInterval 函数
setInterval = function (a,b) {
    if (a.toString().indexOf('debugger') == -1) {
        return function() {}; // 如果不包含 'debugger'，则返回一个空函数，这意味着不会执行任何操作。
    } else {
        _setInterval(a,b);  // 如果包含 'debugger'，则使用原始的 _setInterval 函数来设置定时器。
    }
}

// 重写的方法会返回一个字符串
Function.prototype.toString = function () {
    return `function ${this.name}() { [native code] }`
}
```

### 5.6.屏蔽加载

- 利用某些代理工具可以屏蔽比如文件名developer_tools的脚本请求
- electron 就是一个 chrome, 利用 electron 接口能力屏蔽
    ![info-debug-electron](/editSource/spider/spider-debug-electron.png)


## 6.善用工具

常见工具：`postman` `apifox` `httpie`

借助工具可以快速送请求, 方便调试, 验证数据参数是否正确

![httpid](/editSource/spider/spider-httpie.png)



## 7.实战分享

> `秋秋`大佬分享(**已授权**), 如下内容只为记录和学习爬虫知识, 禁止商用或贩卖

### 7.1.禁用了控制台和F12

- 地址: https://gaze.run/play/7c0fbeb7980215909a80fc4aab6d4dcf
- 解决方法: 替换源代码, 修改false为true, 保存后刷新页面即可
    ```js:line-numbers
    document.onkeydown = function () {
        var e = window.event || arguments[0];
        if (e.keyCode == 123) {
            return false; // [!code --]
            return true; // [!code ++]
        }
    }
    ```

### 7.2.控制台检测和页面重定向

- 地址: https://gaze.run/play/7c0fbeb7980215909a80fc4aab6d4dcf
- 关键代码:
    ```js:line-numbers
    devtoolsDetector.addListener(function(isOpen) {
        if(isOpen&&!Rain){
            self.location.href="https://baidu.com";
        }
    });
    ```
- 解决方法: 使用hook脚本, 本地替换源代码, 删除对应检测代码
    ```js:line-numbers
    window.onbeforeunload = function () {
        debugger
    }
    ```

### 7.3.无限debugger

#### 7.3.1.eval执行
- 关键代码
    ```js
    eval(atob("ZGVidWdnZXI="))
    ```
- 解决方法: hook脚本-`替换debugger关键字`
    ```js:line-numbers{3-6}
    (function() {
        var _eval = window.eval;
        window.eval = function(x) {
            _eval(x.replace("debugger;","  ; "));
        }; //过debuger
        window.eval.toString = _eval.toString; //防debuger检测
    })();
    ```

#### 7.3.2.构造函数生成无限debugger

- 解决方法: hook脚本-`重写debugger函数`
    ```js:line-numbers
    AAA = Function.prototype.constructor;
    Function.prototype.constructor = function (a) {
        if (a == "debugger") {
            return function () {};
        }
        return AAA(a);
    }
    ```

#### 7.3.3.禁用断点或者禁用js脚本加载

- 关键截图
    ![setp1](/editSource/spider/debugger-disableDebug-1.png)
    ![step2](/editSource/spider/debugger-disableDebug-2.png)

#### 7.3.4.右键选择一律不在此处停留

> 部分站点可能存在多个断点需要多次操作

- 地址: https://antispider8.scrape.center/
- 关键截图
    ![step3](/editSource/spider/debugger-disableDebug-3.png)

#### 7.3.5.debugger位于计时器中


- 关键代码:
    ```js:line-numbers{1}
    setInterval((function() {
        debugger ;console.log("debugger")
    }), 1e3)
    ```
- 解决方法: hook脚本-`识别到debugger重置函数, 其他正常响应定时器`
    ```js:line-numbers{3-6}
    let _setInterval = setInterval
    setInterval = function(a, b) {
        if (a.toString().indexOf('debugger')== -1) {
            return null;
        }
        _setInterval(a, b)
    }
    ```

### 7.4.编码gbk乱码问题

- 地址: https://www.qyy158.com/
- 解决方法:
    ```js:line-numbers{4,6}
    import iconv from 'iconv';
    import axios from 'axios';
    const resp = await axios.get(url, {
        responseType: 'arraybuffer',
    });
    return iconv.decode(resp.data, 'gb2312');
    ```

### 7.5.禁用证书校验

- 地址: https://www.moedm.net/index.php/api/vod
- 解决方法：
    ```js:line-numbers{8}
    import axios from 'axios';
    const config = {
        method: 'POST',
        url: 'https://www.moedm.net/index.php/api/vod',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
        },
        rejectUnauthorized:false, //关闭证书校验
        data: data
    };
    const resp = await axios(...config)
    ```

