# 写源工具

写源工具的重要性在于它极大地简化了开发者在开发源的工作流程。`"喂饭式"`工具，可以轻松的调试各个规则，快速完成源的编写流程。

::: tip 注意
- 如果存在`debugId(即站点中key为debug)`, 则首次打开写源工具, 默认会加载debug数据。
- 如果已经打开过写源工具, 删除了debugId的源, 则会报错, 请刷新软件。
:::

::: tip 注意
使用该工具需确保软件版本在3.3.4及以上

该工具深度融合[drpy](https://github.com/hjdhnx/dr_py) | [hipy](https://github.com/hjdhnx/hipy-server)项目

道长QQ群：486722328 | 824179147
:::

## 1. 教程

- [点我前往阿里云盘](https://www.alipan.com/s/1hKBsq3ifDk)

## 2. 功能

### 2.1. 顶栏

#### 2.1.1. 模板

通过内置模板，可修改部分模板规则完成源的调试，适用于快速开发源。

如果模板一模一样甚至只需要更改url即可。
::: info 内置模板
mxpro mxone5 首图 首图2 默认 vfed 海螺3 海螺2 短视 短视2 采集 1
:::
![模板](/editSource/js-edit/template.png)

#### 2.1.2. 文件

- **导入**: 支持文件从外部导入，并将文件内容渲染到编辑器中，适用于调试外部文件。 `特殊目录无法获取权限导入`
- **导出**: 支持将编辑器中的内容导出为文件格式存储到本地磁盘。
- **解码**: 将加密数据按要求进行解码。

#### 2.1.3. 调试
将编辑器的内容及规则提交到后端api接口存储临时缓存并生成接口，将默认站点设置为该用例，跳转至影视页面查看规则完成度和渲染效果，适用于调试用例。

#### 2.1.4. 服务
打开该文件夹拖入文件自动加载，启用简易http服务，便于文件内容读取。

> 不建议超过三层目录

::: info 手动打开该文件夹路径
如文件夹不存在则在以下目录上一级手动创建 file 文件夹

Windows: %USERPROFILE%\AppData\Roaming\zyplayer\file\

Macos: ~/Library/Logs/zyplayer/file/

Linux: ~/.config/zyplayer/file/
:::

- 单文件

访问地址：`http://127.0.0.1:9978/api/v1/file/文件名`

> 如: 文件11.js为11.js; tmp/11.js为/tmp/11.js

![添加](/editSource/js-edit/server-single.png)

- 一键

> 1.访问地址：`http://127.0.0.1:9978/api/v1/file/config`此方法递归读取文件夹下符合规则的文件，不建议超过三层目录。

> 2.访问地址：`http://127.0.0.1:9978/api/v1/file/生成式路径地址`

::: info 何为生成式
即提供的本地包中包含`index.js`文件, 该文件需包含`mian`函数。

生成式路径地址为本地包路径, 无需添加`/index.js`, 添加则代表读取读取`index.js`文件。

访问生成式时会注入`pathLib`对象,调用main函数，并返回结果。

```javascript
// 调用方法示例 `pathLib.join`
pathLib = {
  join: path.join,
  dirname: path.dirname,
  readDir: fs.readdirSync,
  readFile: fs.readFileSync,
  stat: fs.statSync,
}
```
:::

![添加](/editSource/js-edit/server-easyconfig.png)

#### 2.1.4. 文档

将调用默认浏览器打开此文档。

### 2.2. 工作区

#### 2.2.1. 源代码

输入url，通过请求该地址获取源代码，将于源代码中输出，方便查看源代码dom结构，适用于源代码的获取。

::: tip 请求参数说明
点击 ⬛️ 设置

响应编码: 支持`UTF-8|GBK|GB2312|GB18030`, 默认为`UTF-8`

请求头(字典类型): 示例如下

```json
{ "User-Agent": "zyplayer" }
```

请求方法: 除GET方法外生效，支持`application/json|application/x-www-form-urlencoded`

请求体(字典类型): 除GET方法外生效，示例如下

```json
{ "key": "01b97b" }
```
:::

![源代码](/editSource/js-edit/source.png)

#### 2.2.2. 列表

输入pdfa规则，匹配源代码内容，将于规则中输出，方便查看匹配结果，输出结果为列表，适用于pdfa调试。
::: warning 注意
必须先获取源代码，否则不生效
:::
![源代码](/editSource/js-edit/pdfa.png)

#### 2.2.3. 节点

输入pdfh规则，匹配源代码内容，将于规则中输出，方便查看匹配结果，适用于pdfh调试。
::: warning 注意
必须先获取源代码，否则不生效
:::
![源代码](/editSource/js-edit/pdfh.png)

#### 2.2.4. 编辑器

最主要内容，用于编辑源代码。

::: tip 提示
只是想尝试一下？跳到[写源语法](./edit-grammar#模板规则说明)

编辑器支持ctrl+f搜索关键词

拖拽文件可直接展示内容
:::

![编辑器](/editSource/js-edit/edit.png)

#### 2.2.5. 初始化

根据编辑器内容初始化源代码，初始化结果将于调试输出, 同时过程中的日志也会于日志输出, 适用于初始化调试。

::: info 事件说明
1. 点击👋 触发事件: 切换模式[自动 | 手动]

2. 点击除👋外 触发事件: 初始化
:::

::: info 模式说明
1. 当模式为自动时, 编辑器内容最后修改时间＞上次初始化时间, 触发分类、首页、列表、详情、搜索、搜索、代理动作时自动初始化, 无需手动再次初始化。

2. 当模式为手动时, 编辑器内容每次修改后, 触发分类、首页、列表、详情、搜索、搜索、代理动作之前均需再次手动初始化。
:::

::: details 点我查看示例数据返回
```json
{
  version: 'drpy3 3.9.50beta3 202400428',
  rkey: 'drpy_xxx',
  rule: {
    title: 'xxx',
    host: 'https://www.xxx.com',
    hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src = jsp.pdfh(html,".go:eq(0)&&a&&href");print(src);HOST=src',
    url: 'https://www.xxx.com/fyclassfyfilter',
    filterable: 1,
    filter_url: '{{fl.area}}{{fl.year}}{{fl.class}}{{fl.cateId}}/page/fypage',
    filters: {
      '1': [
        {
          key: 'class',
          name: '类型',
          value: [
            {
              n: '全部',
              v: '类型',
            },
            {
              n: '动作片',
              v: '动作片',
            },
            {
              n: '喜剧片',
              v: '喜剧片',
            }
          ],
        },
        {
          key: 'area',
          name: '地区',
          value: [
            {
              n: '全部',
              v: '地区',
            },
            {
              n: '华语',
              v: '华语',
            },
            {
              n: '香港地区',
              v: '香港地区',
            }
          ],
        },
        {
          key: 'year',
          name: '年份',
          value: [
            {
              n: '全部',
              v: '年份',
            },
            {
              n: '2024',
              v: '2024',
            },
            {
              n: '2023',
              v: '2023',
            }
          ],
        },
        {
          key: 'by',
          name: '排序',
          value: [
            {
              n: '热播榜',
              v: '热播榜',
            },
            {
              n: '好评榜',
              v: '好评榜',
            },
            {
              n: '新上线',
              v: '新上线',
            },
          ],
        },
      ],
      '2': [
        {
          key: 'class',
          name: '类型',
          value: [
            {
              n: '全部',
              v: '类型',
            },
            {
              n: '国产剧',
              v: '国产剧',
            },
            {
              n: '港台剧',
              v: '港台剧',
            },
          ],
        },
        {
          key: 'area',
          name: '地区',
          value: [
            {
              n: '全部',
              v: '地区',
            },
            {
              n: '内地',
              v: '内地',
            },
            {
              n: '香港地区',
              v: '香港地区',
            },
            {
              n: '台湾地区',
              v: '台湾地区',
            },
          ],
        },
        {
          key: 'year',
          name: '年份',
          value: [
            {
              n: '全部',
              v: '年份',
            },
            {
              n: '2024',
              v: '2024',
            },
            {
              n: '2023',
              v: '2023',
            }
          ],
        },
        {
          key: 'by',
          name: '排序',
          value: [
            {
              n: '热播榜',
              v: '热播榜',
            },
            {
              n: '好评榜',
              v: '好评榜',
            },
            {
              n: '新上线',
              v: '新上线',
            },
          ],
        },
      ],
      '3': [
        {
          key: 'class',
          name: '类型',
          value: [
            {
              n: '全部',
              v: '类型',
            },
            {
              n: '大陆',
              v: '大陆',
            },
            {
              n: '港台',
              v: '港台',
            }
          ],
        },
        {
          key: 'area',
          name: '地区',
          value: [
            {
              n: '全部',
              v: '地区',
            },
            {
              n: '内地',
              v: '内地',
            },
            {
              n: '港台',
              v: '港台',
            }
          ],
        },
        {
          key: 'year',
          name: '年份',
          value: [
            {
              n: '全部',
              v: '年份',
            },
            {
              n: '2024',
              v: '2024',
            },
            {
              n: '2023',
              v: '2023',
            },
            {
              n: '2022',
              v: '2022',
            }
          ],
        },
        {
          key: 'by',
          name: '排序',
          value: [
            {
              n: '热播榜',
              v: '热播榜',
            },
            {
              n: '新上线',
              v: '新上线',
            },
          ],
        },
      ],
      '4': [
        {
          key: 'class',
          name: '类型',
          value: [
            {
              n: '全部',
              v: '类型',
            },
            {
              n: '国产漫',
              v: '国产漫',
            },
            {
              n: '欧美漫',
              v: '欧美漫',
            }
          ],
        },
        {
          key: 'area',
          name: '地区',
          value: [
            {
              n: '全部',
              v: '地区',
            },
            {
              n: '中国大陆',
              v: '中国大陆',
            },
            {
              n: '日本',
              v: '日本',
            },
            {
              n: '韩国',
              v: '韩国',
            }
          ],
        },
        {
          key: 'year',
          name: '年份',
          value: [
            {
              n: '全部',
              v: '年份',
            },
            {
              n: '2024',
              v: '2024',
            },
            {
              n: '2023',
              v: '2023',
            },
            {
              n: '2022',
              v: '2022',
            }
          ],
        },
        {
          key: 'by',
          name: '排序',
          value: [
            {
              n: '热播榜',
              v: '热播榜',
            },
            {
              n: '新上线',
              v: '新上线',
            },
          ],
        },
        {
          key: 'total',
          name: '状态',
          value: [
            {
              n: '全部',
              v: '状态',
            },
            {
              n: '连载',
              v: '连载',
            },
            {
              n: '完结',
              v: '完结',
            },
          ],
        },
      ],
      '46': [
        {
          key: 'class',
          name: '类型',
          value: [
            {
              n: '全部',
              v: '类型',
            },
            {
              n: '日韩剧',
              v: '日韩剧',
            },
            {
              n: '欧美剧',
              v: '欧美剧',
            },
            {
              n: '海外剧',
              v: '海外剧',
            },
          ],
        },
        {
          key: 'area',
          name: '地区',
          value: [
            {
              n: '全部',
              v: '地区',
            },
            {
              n: '韩国',
              v: '韩国',
            },
            {
              n: '美剧',
              v: '美剧',
            }
          ],
        },
        {
          key: 'year',
          name: '年份',
          value: [
            {
              n: '全部',
              v: '年份',
            },
            {
              n: '2024',
              v: '2024',
            },
            {
              n: '2023',
              v: '2023',
            }
          ],
        },
        {
          key: 'by',
          name: '排序',
          value: [
            {
              n: '热播榜',
              v: '热播榜',
            },
            {
              n: '好评榜',
              v: '好评榜',
            },
            {
              n: '新上线',
              v: '新上线',
            },
          ],
        },
      ],
    },
    searchUrl: 'https://www.xxx.com/page/fypage?s=**',
    searchable: 2,
    quickSearch: 0,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Linux; U; Android 9; zh-CN; MI 9 Build/PKQ1.181121.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.108 UCBrowser/12.5.5.1035 Mobile Safari/537.36',
    },
    class_name: '电影&电视剧&热门电影&高分电影&动漫电影&香港经典电影&国产剧&欧美剧&韩剧&动漫剧&漫威宇宙电影系列&速度与激情电影系列&007系列(25部正传+2部外传)',
    class_url: 'new-movie&tv-drama&hot-month&high-movie&cartoon-movie&hongkong-movie&domestic-drama&american-drama&korean-drama&anime-drama&marvel-movies&fastfurious&zero-zero-seven',
    play_parse: true,
    lazy: "js:\n        pdfh = jsp.pdfh;\n        var html = request(input);\n        var ohtml = pdfh(html, '.videoplay&&Html');\n        var url = pdfh(ohtml, \"body&&iframe&&src\");\n        if (/Cloud/.test(url)) {\n            var ifrwy = request(url);\n            let code = ifrwy.match(/var url = '(.*?)'/)[1].split('').reverse().join('');\n            let temp = '';\n            for (let i = 0x0; i < code.length; i = i + 0x2) {\n                temp += String.fromCharCode(parseInt(code[i] + code[i + 0x1], 0x10))\n            }\n            input = {\n                jx: 0,\n                url: temp.substring(0x0, (temp.length - 0x7) / 0x2) + temp.substring((temp.length - 0x7) / 0x2 + 0x7),\n                parse: 0\n            }\n        } else if (/decrypted/.test(ohtml)) {\n            var phtml = pdfh(ohtml, \"body&&script:not([src])&&Html\");\n            eval(getCryptoJS());\n            var scrpt = phtml.match(/var.*?\\)\\);/g)[0];\n            var data = [];\n            eval(scrpt.replace(/md5/g, 'CryptoJS').replace('eval', 'data = '));\n            input = {\n                jx: 0,\n                url: data.match(/url:.*?[\\'\\\"](.*?)[\\'\\\"]/)[1],\n                parse: 0\n            }\n        } else {\n            input\n        }\n\t",
    limit: 6,
    推荐: '.leibox&&li;*;*;*;*',
    一级: '.mrb&&li;img&&alt;img&&data-original;.jidi&&Text;a&&href',
    二级: {
      title: 'h1&&Text;.moviedteail_list&&li:eq(0)&&Text',
      img: '.dyimg&&img&&src',
      desc: '.moviedteail_list&&li:eq(-1)&&Text;;;.moviedteail_list&&li:eq(7)&&Text;.moviedteail_list&&li:eq(5)&&Text',
      content: '.yp_context&&p&&Text',
      tabs: '.mi_paly_box .ypxingq_t',
      lists: '.paly_list_btn:eq(#id) a',
    },
    搜索: '.search_list&&li;*;*;*;*',
    cate_exclude: '首页|留言|APP|下载|资讯|新闻|动态',
    tab_exclude: '猜你|喜欢|下载|剧情|热播',
    double: false,
    homeUrl: 'https://www.xxx.com',
    detailUrl: '',
    二级访问前: '',
    timeout: 5000,
    encoding: 'utf-8',
    search_encoding: '',
    图片来源: '',
    图片替换: '',
    play_json: [],
    pagecount: {},
    proxy_rule: '',
    sniffer: false,
    isVideo: '',
    tab_remove: [],
    tab_order: [],
    tab_rename: {},
  },
}
```
:::

![初始化](/editSource/js-edit/init.png)

#### 2.2.6. 分类

初始化后按分类规则匹配，结果将于调试输出, 同时过程中的日志也会于日志输出, 适用于分类调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: details 点我查看示例数据返回
class中有几对数组, filters也会有几组数组。数组顺序一一对应
```json
{
  class: [
    {
      type_id: '2',
      type_name: '电视剧',
    },
    {
      type_id: '1',
      type_name: '电影',
    },
    {
      type_id: '4',
      type_name: '动漫',
    },
    {
      type_id: '3',
      type_name: '综艺',
    },
    {
      type_id: '46',
      type_name: '海外精选',
    },
  ],
  filters: {
    '1': [
      {
        key: 'class',
        name: '类型',
        value: [
          {
            n: '全部',
            v: '类型',
          },
          {
            n: '动作片',
            v: '动作片',
          },
          {
            n: '喜剧片',
            v: '喜剧片',
          }
        ],
      },
      {
        key: 'area',
        name: '地区',
        value: [
          {
            n: '全部',
            v: '地区',
          },
          {
            n: '华语',
            v: '华语',
          },
          {
            n: '香港地区',
            v: '香港地区',
          }
        ],
      },
      {
        key: 'year',
        name: '年份',
        value: [
          {
            n: '全部',
            v: '年份',
          },
          {
            n: '2024',
            v: '2024',
          },
          {
            n: '2023',
            v: '2023',
          }
        ],
      },
      {
        key: 'by',
        name: '排序',
        value: [
          {
            n: '热播榜',
            v: '热播榜',
          },
          {
            n: '好评榜',
            v: '好评榜',
          },
          {
            n: '新上线',
            v: '新上线',
          },
        ],
      },
    ],
    '2': [
      {
        key: 'class',
        name: '类型',
        value: [
          {
            n: '全部',
            v: '类型',
          },
          {
            n: '国产剧',
            v: '国产剧',
          },
          {
            n: '港台剧',
            v: '港台剧',
          },
        ],
      },
      {
        key: 'area',
        name: '地区',
        value: [
          {
            n: '全部',
            v: '地区',
          },
          {
            n: '内地',
            v: '内地',
          },
          {
            n: '香港地区',
            v: '香港地区',
          },
          {
            n: '台湾地区',
            v: '台湾地区',
          },
        ],
      },
      {
        key: 'year',
        name: '年份',
        value: [
          {
            n: '全部',
            v: '年份',
          },
          {
            n: '2024',
            v: '2024',
          },
          {
            n: '2023',
            v: '2023',
          }
        ],
      },
      {
        key: 'by',
        name: '排序',
        value: [
          {
            n: '热播榜',
            v: '热播榜',
          },
          {
            n: '好评榜',
            v: '好评榜',
          },
          {
            n: '新上线',
            v: '新上线',
          },
        ],
      },
    ],
    '3': [
      {
        key: 'class',
        name: '类型',
        value: [
          {
            n: '全部',
            v: '类型',
          },
          {
            n: '大陆',
            v: '大陆',
          },
          {
            n: '港台',
            v: '港台',
          }
        ],
      },
      {
        key: 'area',
        name: '地区',
        value: [
          {
            n: '全部',
            v: '地区',
          },
          {
            n: '内地',
            v: '内地',
          },
          {
            n: '港台',
            v: '港台',
          }
        ],
      },
      {
        key: 'year',
        name: '年份',
        value: [
          {
            n: '全部',
            v: '年份',
          },
          {
            n: '2024',
            v: '2024',
          },
          {
            n: '2023',
            v: '2023',
          },
          {
            n: '2022',
            v: '2022',
          }
        ],
      },
      {
        key: 'by',
        name: '排序',
        value: [
          {
            n: '热播榜',
            v: '热播榜',
          },
          {
            n: '新上线',
            v: '新上线',
          },
        ],
      },
    ],
    '4': [
      {
        key: 'class',
        name: '类型',
        value: [
          {
            n: '全部',
            v: '类型',
          },
          {
            n: '国产漫',
            v: '国产漫',
          },
          {
            n: '欧美漫',
            v: '欧美漫',
          }
        ],
      },
      {
        key: 'area',
        name: '地区',
        value: [
          {
            n: '全部',
            v: '地区',
          },
          {
            n: '中国大陆',
            v: '中国大陆',
          },
          {
            n: '日本',
            v: '日本',
          },
          {
            n: '韩国',
            v: '韩国',
          }
        ],
      },
      {
        key: 'year',
        name: '年份',
        value: [
          {
            n: '全部',
            v: '年份',
          },
          {
            n: '2024',
            v: '2024',
          },
          {
            n: '2023',
            v: '2023',
          },
          {
            n: '2022',
            v: '2022',
          }
        ],
      },
      {
        key: 'by',
        name: '排序',
        value: [
          {
            n: '热播榜',
            v: '热播榜',
          },
          {
            n: '新上线',
            v: '新上线',
          },
        ],
      },
      {
        key: 'total',
        name: '状态',
        value: [
          {
            n: '全部',
            v: '状态',
          },
          {
            n: '连载',
            v: '连载',
          },
          {
            n: '完结',
            v: '完结',
          },
        ],
      },
    ],
    '46': [
      {
        key: 'class',
        name: '类型',
        value: [
          {
            n: '全部',
            v: '类型',
          },
          {
            n: '日韩剧',
            v: '日韩剧',
          },
          {
            n: '欧美剧',
            v: '欧美剧',
          },
          {
            n: '海外剧',
            v: '海外剧',
          },
        ],
      },
      {
        key: 'area',
        name: '地区',
        value: [
          {
            n: '全部',
            v: '地区',
          },
          {
            n: '韩国',
            v: '韩国',
          },
          {
            n: '美剧',
            v: '美剧',
          }
        ],
      },
      {
        key: 'year',
        name: '年份',
        value: [
          {
            n: '全部',
            v: '年份',
          },
          {
            n: '2024',
            v: '2024',
          },
          {
            n: '2023',
            v: '2023',
          }
        ],
      },
      {
        key: 'by',
        name: '排序',
        value: [
          {
            n: '热播榜',
            v: '热播榜',
          },
          {
            n: '好评榜',
            v: '好评榜',
          },
          {
            n: '新上线',
            v: '新上线',
          },
        ],
      },
    ],
  },
}
```
::: 

![分类](/editSource/js-edit/home.png)

#### 2.2.7. 首页

初始化后按首页规则匹配，结果将于调试输出, 同时过程中的日志也会于日志输出, 适用于首页调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: details 点我查看示例数据返回
```json
{
  list: [
    {
      vod_name: '泪之女王',
      vod_pic: 'https://www.xxx.com/wp-content/uploads/2024/03/b14488def967f8f156fcfff6fee60b9a-270x380.jpg',
      vod_remarks: '全16集',
      vod_content: '',
      vod_id: 'https://www.xxx.com/movie/54208.html',
    },
    {
      vod_name: '春色寄情人',
      vod_pic: 'https://www.xxx.com/wp-content/uploads/2024/04/a22385c4061946ca621e20021df6e306-270x380.jpg',
      vod_remarks: '更新至14集',
      vod_content: '',
      vod_id: 'https://www.xxx.com/movie/54789.html',
    }
  ]
}
```
::: 

![首页](/editSource/js-edit/homeVod.png)

#### 2.2.8.  列表

初始化后按列表规则匹配，结果将于调试输出, 同时过程中的日志也会于日志输出, 适用于列表调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: info 参数说明
t: 分类标识(根据分类数据class字段的type_id)[必传]

f: 筛选条件(根据分类数据filters字段key和value字段中的n)[可选]

pg: 页数[仅数字类型]
:::

::: details 点我查看示例数据
```
t: 1

f: {class: '国产剧', area: '内地', year: '2024'}

pg: 1
```
::: 

::: details 点我查看示例数据返回
```json
{
  page: 1,
  pagecount: 999,
  limit: 20,
  total: 999,
  list: [
    {
      vod_id: 270287,
      vod_name: '火影',
      vod_remarks: 'HD',
      vod_content: '',
      vod_pic: 'https://img.xxx.com/upload/vod/20240428-1/6f79efd5099813924671b2af221e76ab.jpg',
      type_name: '',
      type_id: '',
      vod_year: '',
      vod_actor: '',
      vod_director: '',
      vod_area: '',
    },
    {
      vod_id: 270286,
      vod_name: '尸咒',
      vod_remarks: 'HD',
      vod_content: '',
      vod_pic: 'https://img.xxx.com/upload/vod/20240428-1/80427c7119767ca2d5a7b7e7e1d9c44b.jpg',
      type_name: '',
      type_id: '',
      vod_year: '',
      vod_actor: '',
      vod_director: '',
      vod_area: '',
    }
  ],
}
```
::: 

![列表](/editSource/js-edit/list.png)

#### 2.2.9. 详情

根据编辑器内容初始化源代码，初始化结果将于调试输出, 同时初始化过程中的日志也会于日志输出, 适用于详情调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: info 参数说明
ids: 详情唯一标识(根据列表|搜索|首页数据vod_id字段)[必传]
:::

::: details 点我查看示例数据
```
ids: 270287
```
:::

::: details 点我查看示例数据返回
```json
{
  list: [
    {
      vod_name: '火影',
      vod_pic: 'https://img.xxx.com/upload/vod/20240428-1/6f79efd5099813924671b2af221e76ab.jpg',
      type_name: '剧情片',
      vod_year: '2023',
      vod_remarks: '更新至: HD / 评分: 0.0',
      vod_content: '<p>日本鬼才導演塚本晉也繼《野火》、《斬、》後，推出戰爭三部曲最終章《火影》。鏡頭轉向二戰砲火下斷垣殘壁的居酒屋，女人、士兵和孤兒宛如一家三口在殘骸裡享受片刻寧靜，直到神祕男子將男孩拐上血與仇恨的不歸路，開啟人間的地獄之門。甫獲日本電影金像獎最佳新人的趣里細膩大膽演出、影帝森山未來魄力十足。火光煙硝雖助燃暴戾，或許也能照亮人間僅存的溫柔。</p>',
      vod_play_from: '空白线路',
      vod_play_url: 'HD中字$http://media.xxx.com/20240428/30653_a4ea8975/index.m3u8',
      vod_id: '270287',
    },
  ],
}
```
::: 

![详情](/editSource/js-edit/detail.png)

#### 2.2.10. 搜索

根据编辑器内容初始化源代码，初始化结果将于调试输出, 同时初始化过程中的日志也会于日志输出, 适用于搜索调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: info 参数说明
wd: 搜索关键词[必传]

pg: 页数[仅数字类型]
:::

::: details 点我查看示例数据
```
wd: 火影

pg: 1
```
:::

::: details 点我查看示例数据返回
```json
{
  page: 1,
  pagecount: 10,
  limit: 20,
  total: 100,
  list: [
    {
      vod_id: 270287,
      vod_name: '火影',
      vod_remarks: 'HD/剧情片|日本|2023',
      vod_content: '日本鬼才導演塚本晉也繼《野火》、《斬、》後，推出戰爭三部曲最終章《火影》。鏡頭轉向二戰砲火下斷垣殘壁的居酒屋，女人、士兵和孤兒宛如一家三口在殘骸裡享受片刻寧靜，直到神祕男子將男孩拐上血與仇恨的不歸',
      vod_pic: 'https://img.xxx.com/upload/vod/20240428-1/6f79efd5099813924671b2af221e76ab.jpg',
      type_name: '',
      type_id: '',
      vod_year: '',
      vod_actor: '',
      vod_director: '',
      vod_area: '',
    },
    {
      vod_id: 269434,
      vod_name: '火影忍者疾风传 日语版',
      vod_remarks: '更新至553集/动漫|日本|2007',
      vod_content: '距离鸣人跟随自来也离开村子外出修行已经过去了两年半。时光流逝，修行归来的鸣人与已经成长了的伙伴们再次重逢，并继续朝着“成为火影”的目标而努力着。与此同时，曾经计划捕获九尾妖狐的忍者组织“晓”，也在长时间的沉默后终于开始行动，将目标指向了拥有“尾兽”的忍者村。鸣人与“晓”，双方之间的冲突一触即发。自《火影忍者疾风传》播出的时点起，已共有8部火影忍者剧场版上映。',
      vod_pic: 'https://puui.xxx.cn/vcover_vt_pic/0/mzc00200nc1cbum1615792624639/260',
      type_name: '',
      type_id: '',
      vod_year: '',
      vod_actor: '',
      vod_director: '',
      vod_area: '',
    }
  ],
}
```
::: 

![搜索](/editSource/js-edit/search.png)

#### 2.2.11. 播放

根据编辑器内容初始化源代码，初始化结果将于调试输出, 同时初始化过程中的日志也会于日志输出, 适用于播放调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: info 参数说明
flag: 线路(根据详情数据vod_play_from字段, 其中多条线路时$分隔)[必传]

play: 选集(根据详情数据vod_play_url字段集数链接, 其中多条线路时$$$分隔，不同集数#分隔前面时集数名称后面是链接)[必传]
:::

::: details 点我查看示例数据
```
flag: 空白线路

play: http://media.xxx.com/20240428/30653_a4ea8975/index.m3u8
```
:::

::: details 点我查看示例数据返回
```json
{
  jx: 0,
  url: 'http://media.xxx.com/20240428/30653_a4ea8975/index.m3u8',
  parse: 0,
}
```
::: 

![播放](/editSource/js-edit/play.png)

#### 2.2.12. 代理

根据编辑器内容初始化源代码，初始化结果将于调试输出, 同时初始化过程中的日志也会于日志输出, 适用于代理调试。

::: warning 注意
必须先初始化，否则不生效
:::

::: info 参数说明
url: 本地代理(必须以 http://127.0.0.1:9978/proxy 开头)[必传]
:::

::: details 点我查看示例数据
```
url: http://127.0.0.1:9978/proxy?do=js&url=http://media.xxx.com/20240428/30653_a4ea8975/index.m3u8
```
:::

::: details 点我查看示例数据返回
```json
[
    200,
    "application/vnd.apple.mpegurl",
    "
    #EXTM3U
    #EXT-X-VERSION:3
    #EXT-X-ALLOW-CACHE:YES
    #EXT-X-MEDIA-SEQUENCE:170471784
    #EXT-X-TARGETDURATION:10
    #EXT-X-PROGRAM-DATE-TIME:2024-01-11T20:43:53+08:00
    #EXTINF:10.000, no desc
    http://gctxyc.liveplay.xxx.com/gc/gllj01_1_md-170471784.ts
    #EXT-X-PROGRAM-DATE-TIME:2024-01-11T20:44:03+08:00
    #EXTINF:10.000, no desc
    http://gctxyc.liveplay.xxx.com/gc/gllj01_1_md-170471785.ts
    #EXT-X-PROGRAM-DATE-TIME:2024-01-11T20:44:13+08:00
    #EXTINF:10.000, no desc
    http://gctxyc.liveplay.xxx.com/gc/gllj01_1_md-170471786.ts
    #EXT-X-PROGRAM-DATE-TIME:2024-01-11T20:44:23+08:00
    #EXTINF:10.000, no desc
    http://gctxyc.liveplay.xxx.com/gc/gllj01_1_md-170471787.ts
    "
]
```
::: 

![代理](/editSource/js-edit/proxy.png)

### 2.3 调试控制台

::: info 说明
调试: 初始化 | 分类 | 首页 | 列表 | 详情 | 搜索 | 播放| 代理 结果输出面板, 高亮显示

源代码: 执行源代码结果 输出面板, 高亮显示

规则: 列表[pdfa] | 节点[pdfh] 结果输出面板, 高亮显示

日志: 调试过程中的日志输出
:::

::: tip 提示
支持ctrl+f搜索关键词
:::

#### 2.3.1. 源码

当触发为源码动作时，将提供额外源代码格式化。

##### 2.3.1.1. 格式化

以更规整的方式展示

::: warning 注意
源文可能缺失tag闭合, 格式化会自行补全并闭合, 可能与源文不对应
:::

![日志F12](/editSource/js-edit/source-format.png)

##### 2.3.1.2. 重置

获取源码长什么样就什么样

![日志清理](/editSource/js-edit/source-reset.png)

#### 2.3.2. 代理

当触发为代理动作时，将提供额外调试。

> 手动调试
::: info 参数说明
位置0: 返回状态码

位置1: 返回Content-Type

位置2: 返回Response
:::

##### 2.3.2.1. 上传
将编辑完的内容通过后端api接口存储临时缓存并生成接口，便于本地代理调试。
![代理上传](/editSource/js-edit/proxy-upload.png)

##### 2.3.1.2. 复制
将调用系统层复制代理输入框的链接，便于在第三方应用调试。
![代理复制](/editSource/js-edit/proxy-copy.png)

#### 2.3.3. 日志

##### 2.3.3.1. F12：通过f12查看日志
![日志F12](/editSource/js-edit/console-f12.png)

##### 2.3.3.2. 清理日志：清理f12日志和日志中的内容
![日志清理](/editSource/js-edit/console-clear.png)