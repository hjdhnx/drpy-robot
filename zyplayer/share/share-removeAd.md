# 去广告技术文档

## 1. 系统概述

本项目设计为M3U8播放地址处理工具，核心功能在于自动检测并移除嵌入在M3U8播放列表内的广告片段，同时兼容处理嵌套的M3U8链接。利用`axios`进行网络通信以检索M3U8文件，提供无广告的纯净播放体验。

`去除网络插播广告虽满足部分用户需求，但需谨慎行事，考虑到可能引发的法律、技术及道德后果。用户在寻求改善在线体验的同时，应选择合法、安全的方式，并尊重内容创作者和平台的权益`

## 2. 关键模块说明

### 2.1. Array.prototype.toReversed Polyfill

- **目标**: 确保在所有环境下均可使用数组的倒序功能。
- **价值**: 提高代码的跨环境兼容性。

### 2.2. URL解析与拼接 (`resolve`, `urljoin`)

- **功能**: 实现URL的正确解析与片段的拼接，特别是在处理M3U8内相对路径时。
- **重要性**: 确保资源引用的准确无误。

### 2.3. 广告检测与过滤核心逻辑 (`fixAdM3u8Ai`)

- **职责**:
  - **智能识别广告**: 通过比对播放片段特征识别广告内容。
  - **嵌套处理**: 处理M3U8列表中嵌套的其他M3U8链接。
  - **URL修正**: 转换所有播放片段URL为绝对路径。
- **技术亮点**:
  - 异步数据获取。
  - 精准的广告识别算法。
  - 详细的日志记录。
- **工作流程**:
  - 1. **输入**: 接收用户提供的M3U8播放地址。
  - 2. **获取M3U8内容**: 使用`axios`执行网络请求。
  - 3. **基础处理**: 清理文本，转换URL为绝对形式。
  - 4. **广告识别与剔除**:
    - 4.1. 分析首尾播放片段，计算相似度。
    - 4.2. 依据阈值移除疑似广告URL。
  - 5. **递归处理嵌套M3U8**（如存在）。
  - 6. **输出**: 返回处理后的纯净M3U8列表。
  - 7. **日志记录**: 全程记录关键步骤和性能指标。

### 2.4.  遗留问题

- **匹配精度**
- **同域名广告识别**


## 3. 示例代码

> 主要算法由`@hpindigo`提供

::: details 点我查看示例代码
```ts:line-numbers
import axios from 'axios';

if (typeof Array.prototype.toReversed !== 'function') {
  Object.defineProperty(Array.prototype, 'toReversed', {
    value: function () {
      const clonedList = this.slice();
      // 倒序新数组
      const reversedList = clonedList.reverse();
      return reversedList;
    },
    enumerable: false,
  });
}

const resolve = (from, to) => {
  const resolvedUrl = new URL(to, new URL(from, 'resolve://'));
  if (resolvedUrl.protocol === 'resolve:') {
    const { pathname, search, hash } = resolvedUrl;
    return pathname + search + hash;
  }
  return resolvedUrl.href;
};

/**
 *  url拼接
 * @param fromPath 初始当前页面url
 * @param nowPath 相对当前页面url
 * @returns {*}
 */
const urljoin = (fromPath, nowPath) => {
  fromPath = fromPath || '';
  nowPath = nowPath || '';
  return resolve(fromPath, nowPath);
};

/**
 * 智能对比去除广告。支持嵌套m3u8。只需要传入播放地址
 * @param m3u8_url m3u8播放地址
 * @param headers 自定义访问m3u8的请求头,可以不传
 * @returns {string}
 */
const fixAdM3u8Ai = async (m3u8_url: string, headers: object = {}) => {
  const startTime = Date.now();
  const options = { method: 'get', ...headers };

  console.log(`处理地址: ${m3u8_url}`);

  // 获取字符串公共前缀长度
  const compareSameLen = (s1: string, s2: string): number => {
    let length = 0;
    while (length < s1.length && s1[length] === s2[length]) {
      length++;
    }
    return length;
  };

  // 反转字符串
  const reverseString = (str: string): string => str.split('').reverse().join('');

  // 拉取 m3u8 内容
  const fetchM3u8 = async (url: string): Promise<string> => {
    const response = await axios({ url, ...options });
    return response.trim();
  };

  // 补全 URL 地址
  const resolveUrls = (lines: string[], baseUrl: string): string[] =>
    lines.map((line) => !line.startsWith('#') && !/^(http:\/\/|https:\/\/)/.test(line) ? urljoin(baseUrl, line) : line);

  // 压缩多余的空行
  const compressEmptyLines = (lines: string[]): string[] => {
    const result: string[] = [];
    let lastLineWasEmpty = false;
  
    for (const line of lines) {
      const isEmpty = !!(typeof line === 'string' ? line.trim() : '');
      if (isEmpty || lastLineWasEmpty) result.push(line);
      lastLineWasEmpty = isEmpty;
    }
  
    return result;
  };

  // 解析 m3u8 内容为数组
  const parseM3u82Array = async (url: string): Promise<string[]> => {
    let content = await fetchM3u8(url);
    let lines = resolveUrls(content.split('\n'), m3u8_url);
    lines = compressEmptyLines(lines);
    return lines;
  }

  let lines = await parseM3u82Array(m3u8_url);

  // 处理嵌套 m3u8
  let last_url = lines.slice(-1)[0];
  if (last_url.length < 5) last_url = lines.slice(-2)[0];
  if (last_url.includes('.m3u8') && last_url !== m3u8_url) {
    m3u8_url = last_url;
    if (!/^(http:\/\/|https:\/\/)/.test(last_url)) m3u8_url = urljoin(m3u8_url, last_url);
    console.log(`嵌套地址: ${m3u8_url}`);
    lines = await parseM3u82Array(m3u8_url);
  }

  // 疑似广告段处理
  const findAdSegments = (segments: string[], m3u8_url: string) => {
    const cleanSegments = [...segments];
    let firstStr = "";
    let secondStr = "";
    let maxSimilarity = 0;
    let primaryCount = 1;
    let secondaryCount = 0;
  
    // 第一轮遍历：确定 `firstStr`
    for (let i = 0; i < cleanSegments.length; i++) {
      const segment = cleanSegments[i];
      if (!segment.startsWith("#")) {
        if (!firstStr) firstStr = segment;
        else {
          const similarity = compareSameLen(firstStr, segment);
          if (maxSimilarity > similarity + 1) {
            if (secondStr.length < 5) secondStr = segment;
            secondaryCount++;
          } else {
            maxSimilarity = similarity;
            primaryCount++;
          }
        }
        if (secondaryCount + primaryCount >= 30) break;
      }
    }
    if (secondaryCount > primaryCount) firstStr = secondStr;
  
    const firstStrLen = firstStr.length;
    const maxIterations = Math.min(cleanSegments.length, 10);
    const halfLength = Math.round(cleanSegments.length / 2).toString().length;
  
    // 第二轮遍历：找到 `lastStr`
    let maxc = 0;
    const lastStr = cleanSegments
      .slice()
      .reverse()
      .find((x) => {
        if (!x.startsWith("#")) {
          const reversedFirststr = reverseString(firstStr);
          const reversedX = reverseString(x);
          const similarity = compareSameLen(reversedFirststr, reversedX);
          maxSimilarity = compareSameLen(firstStr, x);
          maxc++;
          return (
            firstStrLen - maxSimilarity <= halfLength + similarity || maxc > 10
          );
        }
        return false;
      });
  
    console.log("最后切片: " + lastStr);
  
    const adSegments: string[] = [];
  
    // 第三轮遍历：处理 `ss`
    for (let i = 0; i < cleanSegments.length; i++) {
      const segment = cleanSegments[i];
      if (!segment.startsWith("#")) {
        if (compareSameLen(firstStr, segment) < maxSimilarity) {
          adSegments.push(segment);
          cleanSegments.splice(i - 1, 2); // 删除两个元素
          i -= 2; // 更新索引
        } else {
          cleanSegments[i] = urljoin(m3u8_url, segment);
        }
      } else if (segment.includes("URI")) {
        const match = segment.match(/URI=\"(.*)\"/);
        if (match) {
          const updatedUri = urljoin(m3u8_url, match[1]);
          cleanSegments[i] = segment.replace(/URI=\"(.*)\"/, `URI="${updatedUri}"`);
        }
      }
    }
  
    return { adSegments, cleanSegments };
  }
  
  const { cleanSegments, adSegments } = findAdSegments(lines, m3u8_url);

  console.log('广告分片', adSegments);
  console.log(`处理耗时: ${Date.now() - startTime} ms`);
  return cleanSegments.join('\n');
};

export default fixAdM3u8Ai;
```
:::

## 4. 结论

算法核心十分重要，微小的逻辑错误，可能引发连锁反应，导致误删非广告部分正常内容的关键数据。因此，在面临模棱两可的决策时，应更加谨慎细致，力求在保留数据的完整性与准确性的同时，实现体验的升级。