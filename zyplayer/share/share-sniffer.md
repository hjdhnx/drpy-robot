# 嗅探器技术文档

## 1. 系统概述

本项目通过集成 [Puppeteer](https://github.com/puppeteer/puppeteer) 库到 [Electron](https://www.electronjs.org/) 应用程序中，创造了一个强大且灵活的网页资源嗅探解决方案，特别聚焦于自动检测与提取网络视频资源（如 `.m3u8`, `.mp4`, 等）。借助 Electron 的桌面应用开发能力与 Puppeteer 的浏览器操控技术，此系统设计实现了对特定类型网络资源的智能抓取与分析，为多媒体内容分析、数据采集等领域提供了有力工具。

`合法使用嗅探技术，必须遵循严格的法律框架和道德规范，确保所有行为都得到充分授权，以正当目的进行。`

## 2. 关键技术组件

### 2.1. Electron

- **功能**：作为主框架，允许使用Web技术（JavaScript, HTML, CSS）开发跨平台的桌面应用。
- **作用**：提供基础运行环境，整合Puppeteer执行环境与系统级功能。

### 2.2. Puppeteer

- **功能**：Node.js库，通过DevTools协议控制Chromium或Chrome浏览器。
- **用途**：页面自动化控制、截图、网络请求拦截、页面分析等。

### 2.3. Puppeteer-In-Electron (pie)

- **功能**：作为桥梁，确保Puppeteer能在Electron应用内顺畅运作。
- **特点**：简化集成过程，提升Puppeteer在Electron环境下的兼容性和稳定性。

### 2.4. nanoid

- **功能**：生成唯一、随机字符串，用于标识不同的页面实例。
- **好处**：增强多页面管理的追踪与区分能力。

### 2.5. 正则表达式匹配

- **目的**：精准筛选视频URL，包括但不限于`.m3u8`, `.mp4`, 等格式。
- **实施**：结合自定义正则表达式，排除CSS、HTML文件及特定查询参数的URL。

## 3. 核心功能模块

### 3.1. 初始化与配置

- **初始化**：使用 `pie.initialize(app)` 完成Puppeteer-in-Electron的初始化。
- **日志系统**：通过`logger`模块记录关键操作及异常信息，便于调试与监控。

### 3.2. 网络请求管理

- **请求拦截**：开启请求拦截功能，根据规则判断是否继续加载资源。
- **资源过滤**：自动中止无关资源（如字体、HEAD请求）加载，提升效率。
- **超时处理**：为每个页面请求设定超时限制，超时后自动清理资源并报告错误。

### 3.3. 视频URL嗅探

- **逻辑**：通过`isVideoUrl`函数，结合正则表达式和排除逻辑，识别有效视频链接。
- **响应处理**：一旦发现匹配的视频资源请求，立即中止请求并返回资源URL及请求头信息。

### 3.4. 自定义脚本执行

- **支持**：允许用户注入JavaScript脚本至页面中执行，拓展功能灵活性。
- **机制**：通过`evaluateOnNewDocument`和`evaluate`方法执行脚本，支持页面动态分析或数据提取。

### 3.5. 资源与页面管理

- **唯一标识**：为每个新页面分配`nanoid`生成的唯一ID，便于跟踪和管理。
- **资源回收**：页面操作结束后，自动清理相关资源，包括关闭页面、断开浏览器连接等。

## 4. 应用场景

- **性能分析**：模拟用户行为，评估页面加载性能。
- **自动化测试**：网页元素和功能的自动化验证。

## 5. 示例代码

> 请勿用于商业用途。

- 推荐版本搭配(亲测没问题)
  - `"puppeteer-core": "~21.3.8"` + `"puppeteer-in-electron": "^3.0.5"` + `"electron": "~22.3.27"`  支持hevc 兼容win8及以上
  - `"puppeteer-core": "^22.10.0"` + `"puppeteer-in-electron": "^3.0.5"` + `"electron": "^19.1.9"`  不支持hevc 兼容win7及以上

- 参数说明
  - **url**：请求链接
  - **init_script**：嗅探前设置初始化变量, 常用于规避浏览器特性, 如`Object.defineProperties(navigator, {platform: {get: () => 'iPhone'}});`。
  - **run_script**：嗅探是进行的操作, 常用于某些元素的点击, 如`document.querySelector(".line").click();`。
  - **customRegex**：辅助匹配规则，如`obj/tos-alisg-ve`。
  - **ua**：请求头，如`Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.167 Electron/19.1.9 Safari/537.36`。

::: details 点我查看示例代码
```ts:line-numbers
import { app, BrowserWindow } from 'electron';
import { nanoid } from 'nanoid';
import puppeteer from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import logger from '../core/logger';

interface PieResponse {
  code: number;
  message: 'success' | 'fail';
  data: any;
}

pie.initialize(app);
let snifferWindow: BrowserWindow;

const urlRegex: RegExp = new RegExp(
  'http((?!http).){12,}?\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3|tos)\\?.*|http((?!http).){12,}\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)|http((?!http).)*?video/tos*',
);
const pageStore: object = {};

const handleResponse = (code: number, message: 'success' | 'fail', data: object | Error): PieResponse => {
  let dataString: any;
  if (typeof data === 'object') {
    dataString = JSON.stringify(data);
  } else {
    dataString = data;
  }
  logger.info(`[sniffer] code: ${code} - message: ${message} - data: ${dataString}`);
  return { code, message, data };
};

// 排除url
const isExcludedUrl = (reqUrl: string): boolean => {
  return /\.(css|html)$/.test(reqUrl) || /(url=http|v=http)/i.test(reqUrl);
};

// 视频url
const isVideoUrl = (reqUrl) => {
  return reqUrl.match(urlRegex) && !isExcludedUrl(reqUrl);
};

const puppeteerInElectron = async (
  url: string,
  run_script: string = '',
  init_script: string = '',
  customRegex: string,
  ua: string | null = null,
): Promise<PieResponse> => {
  logger.info(`[sniffer] sniffer url: ${url}`);
  logger.info(`[sniffer] sniffer ua: ${ua}`);
  logger.info(`[sniffer] sniffer init_script: ${init_script}`);
  // logger.info(`[sniffer] sniffer run_script: ${run_script}`);

  const pageId = nanoid(); // 生成page页面id

  try {
    const browser = await pie.connect(app, puppeteer as any); // 连接puppeteer
    snifferWindow = new BrowserWindow({ show: false }); // 创建无界面窗口
    snifferWindow.webContents.setAudioMuted(true); // 设置窗口静音
    snifferWindow.webContents.setWindowOpenHandler(() => {
      return { action: 'deny' };
    }); // 禁止新窗口打开

    const page = await pie.getPage(browser, snifferWindow); // 获取页面
    const pageRecord = { page, browser, timestamp: Date.now() / 1000, timerId: null };
    pageStore[pageId] = pageRecord; // 存储页面

    if (ua) await page.setUserAgent(ua); // 设置ua
    if (init_script && init_script.trim()) {
      try {
        await page.evaluateOnNewDocument(init_script);
      } catch (e) {
        logger.info(`[pie]执行初始化页面脚本发生错误:${e.message}`);
      }
    }
    await page.setRequestInterception(true); // 开启请求拦截

    return new Promise(async (resolve, reject) => {
      const cleanup = async (pageId: string) => {
        if (pageId) {
          if (pageStore[pageId]) {
            if (pageStore[pageId]?.timerId) await clearTimeout(pageStore[pageId].timerId);
            if (pageStore[pageId]?.page) await pageStore[pageId].page.close().catch((err) => logger.error(err));
            if (pageStore[pageId]?.browser) await pageStore[pageId].browser.disconnect();
            delete pageStore[pageId];
          }
        }
      };

      page.on('request', async (req) => {
        if (req.isInterceptResolutionHandled()) return; // 已处理过的请求不再处理

        const reqUrl = req.url(); // 请求url
        const reqHeaders = req.headers(); // 请求头
        const { referer, 'user-agent': userAgent } = reqHeaders;
        const headers = {};
        if (referer) headers['referer'] = referer;
        if (userAgent) headers['user-agent'] = userAgent;

        if (customRegex && reqUrl.match(new RegExp(customRegex, 'gi'))) {
          logger.info(`[pie]正则匹配:${reqUrl}`);
          await cleanup(pageId);
          req.abort().catch((e) => logger.error(e));
          resolve(handleResponse(200, 'success', { url: reqUrl, header: headers }));
        }

        if (isVideoUrl(reqUrl)) {
          logger.info(`[pie]后缀名匹配:${reqUrl}`);
          await cleanup(pageId);
          req.abort().catch((e) => logger.error(e));
          resolve(handleResponse(200, 'success', { url: reqUrl, header: headers }));
        }

        if (req.method().toLowerCase() === 'head') {
          req.abort().catch((err) => logger.error(err));
        }

        if (['font'].includes(req.resourceType())) {
          req.abort().catch((err) => logger.error(err));
        }

        req.continue().catch((err) => logger.error(err));
      });

      // 设置超时
      if (!pageStore[pageId].timerId) {
        logger.info('--------!timerId---------');
        pageStore[pageId].timerId = setTimeout(async () => {
          await cleanup(pageId);
          logger.info(`[pie]id: ${pageId} sniffer timeout`);
          reject(handleResponse(500, 'fail', new Error('sniffer timeout')));
        }, 15000);
      } else {
        logger.info('--------has timerId------');
      }

      await page.goto(url, { waitUntil: 'domcontentloaded' }).catch((err) => logger.error(err));

      if (run_script.trim()) {
        try {
          logger.info(`[sniffer] sniffer run_script in js_code: ${run_script}`);
          const js_code = `
            (function() {
              var scriptTimer;
              var scriptCounter = 0;
              scriptTimer = setInterval(function() {
                if (location.href !== 'about:blank') {
                  scriptCounter += 1;
                  console.log('---第' + scriptCounter + '次执行script[' + location.href + ']---');
                  ${run_script}
                  clearInterval(scriptTimer);
                  scriptCounter = 0;
                  console.log('---执行script成功---');
                }
              }, 200);
            })();
          `;
          await page.evaluateOnNewDocument(js_code);
          await page.evaluate(js_code);
        } catch (err) {
          logger.info(`[pie][error]run script: ${err}`);
        }
      }
    });
  } catch (err) {
    return handleResponse(500, 'fail', err as Error);
  }
};

export default puppeteerInElectron;
```
:::

## 6. 结语

Puppeteer-In-Electron Sniffer 结合了Puppeteer的强大功能与Electron的跨平台优势，为开发者提供了一个高度自定义、高效能的网页资源嗅探方案。无论是内容分析、数据抓取还是性能测试，该系统均能提供坚实的技术支撑，促进多样化的应用开发需求。