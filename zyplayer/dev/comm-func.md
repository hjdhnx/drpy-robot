# 封装函数

参考[海阔视界开发者手册](https://docs.189.tyrantg.com/docs/hikerview/help_js.html)
> 注意: 只能在`main进程`中使用, `renderer进程`无法使用

## 1.1.网络请求

> 同步请求, 请在 worker 进程中使用

```js
import { fetch, request, fetchCookie, post, fetchPC, postPC, convertBase64Image, batchFetch, bf } from '@main/utils/hiker/request';

[1] fetch(url, options)
    options带onlyHeaders: 获取返回的headers-返回内容{'Set-Cookie':['a=b','b=c']};
    options带withHeaders: 获取返回的header-返回内容"{body:'字符串内容',headers:{}}"
    options带withStatusCode: 获取返回的状态码-返回内容"{body:'字符串内容',headers:{},statusCode:200}"
    options带toHex: 响应体返回hex数据-返回内容"{body:'hex内容',headers:{},statusCode:200}"
[2] request(url, options) 同fetch
[3] fetchCookie(url, options) 单独获取cookie-返回结果"['a=b','b=c']"
[4] post(url, options) 默认options.method为POST
[5] fetchPC(url, options) 默认options.method为GET, 模拟PC端UA
[6] postPC(url, options) 默认options.method为POST, 模拟PC端UA
[7] convertBase64Image(url) 传入url获取base64图片-返回内容"data:image/jpeg;base64,xxxxxx"
[8] batchFetch(urls, options) 批量请求-返回结果[同fetch结果1, 同fetch结果2, ...]
[9] bf(url, options) 同batchFetch
```

## 1.2.数据加密

```js
import { base64Encode, base64Decode, aesEncode, aesDecode, decodeStr, encodeStr, rsaEncrypt, rsaDecrypt, md5, base64java, _base64, hexToBytes, hexToBase64, window0, rc4, } from '@main/utils/hiker/crypto';

[1] base64Encode(val) base64加密
[2] base64Decode(val) base64解密
[3] aesEncode(key, val) aes加密
[4] aesDecode(key, val) aes解密
[5] encodeStr(val, encoding: 'utf8' | 'gbk' | 'gb2312') 字符串加密
[6] decodeStr(val, encoding: 'utf8' | 'gbk' | 'gb2312') 字符串解密
[7] rsaEncrypt(key, val) rsa加密
[8] rsaDecrypt(key, val) rsa解密
[9] md5(val) md5加密
[10] _base64{decodeToString,encodeToString,encode,decode} 复刻android.util.Base64
[11] base64java 同_base64
[12] hexToBytes(val) 十六进制转byte数组
[13] hexToBase64(val) 十六进制转base64
[14] window0{atob,btoa} window0.atob 解密 window0.btoa 加密
[15] rc4{encode,decode} rc4.encode加密 rc4.decode解密
```

## 1.3.文件操作

```js
import { APP_STORE_PATH, fileExist, fileState, deleteFile, readFile, saveFile, readDir, deleteDir, relative2absolute, absolute2relative } from '@main/utils/hiker/file';

[1] APP_STORE_PATH 返回当前应用存储路径
[2] fileExist(path) 判断文件是否存在, 返回boolean
[3] fileState(path) 获取文件状态, 返回dir｜file
[4] deleteFile(path) 删除文件
[5] readFile(path, crypto(0:不加密, 1:gzip加密)) 读取文件
[6] saveFile(path, content, crypto(0:不加密, 1:gzip加密)) 保存文件
[7] readDir(path) 读取目录
[8] deleteDir(path) 删除目录
[9] relative2absolute(path) 相对路径转绝对路径, 相对路径为zy://开头
[10] absolute2relative(path) 绝对路径转相对路径, 相对路径为zy://开头
```

## 1.4.用户代理

```js
import { MOBILE_UA, PC_UA, UA, UC_UA, IOS_UA } from '@main/utils/hiker/ua';
```