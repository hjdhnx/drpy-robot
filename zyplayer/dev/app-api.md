# 后端接口

只要开启程序, 就可以调用软件接口了, 接口无限制

## 1. 接口定义

- code: 状态码 `0:标识成功` `-1标识失败`
- msg: 状态信息 `ok:标识成功` `其他标识报错信息`
- data: 数据 `可能是数组` `可能是对象` `可能是null`

## 2. 接口说明

接口地址:`http://127.0.0.1:9978/`

### 2.1 系统接口

名称               |路径                     |方法      |参数                            |说明
------------------|------------------------|----------|-------------------------------|----------
获取服务运行状态     |/api/v1/system/status   |GET       |                               |
获取公网ip         |/api/v1/system/ip        |GET       |                               |优先返回ipv6
网络请求获取数据     |/api/v1/system/config   |POST      |`body体`:axios请求格式           |
网络请求获取html    |/api/v1/system/html     |POST      |`body体`:axios请求格式           |body体中encode标识解码格式

### 2.2 收藏接口

名称       |路径                 |方法   |参数                                  |说明
----------|--------------------|-------|------------------------------------|----------
增加       |api/v1/star         |POST   |`body体`:请求数据                     |f12查看实际请求
删除       |api/v1/star         |DELETE |`ids`: [唯一标识id1, 唯一标识id1]      |ids为空则清空所有
修改       |api/v1/star         |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据 |
列表       |api/v1/star/page    |GET    |`page`: 页码<br>`pageSize`: 每页数量  |
查找       |api/v1/star/find    |POST   |`relateId`: 关联id<br>`videoId`: 视频id  |
详情       |api/v1/star/:id     |GET    |`:id`: 唯一标识id                      |

### 2.3 配置接口

名称        |路径                   |方法    |参数                           |说明
-----------|-----------------------|-------|-------------------------------|----------
修改所有数据 |api/v1/setting/source  |PUT    |`body体`:请求数据                |f12查看实际请求
修改        |api/v1/setting         |PUT    |`key`: 标识key<br>`doc`: 修改数据  |
获取所有数据 |api/v1/setting/list    |GET    |                               |
获取启动数据 |api/v1/setting/setup   |GET    |                               |
详情       |api/v1/setting/detail   |GET    |`key`: 标识key                 |

### 2.4 历史接口

名称       |路径                    |方法   |参数                                                                                         |说明
----------|------------------------|------|---------------------------------------------------------------------------------------------|----------
增加       |api/v1/history         |POST   |`body体`:请求数据                                                                              |f12查看实际请求
删除       |api/v1/history         |DELETE |`ids`: [唯一标识id1, 唯一标识id2]                                                               |ids为空则清空所有
修改       |api/v1/history         |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据                                                          |
列表       |api/v1/history/page    |GET    |`page`: 页码<br>`pageSize`: 每页数量<br>`type`: 类型(search:搜索历史, analyze:解析历史, film:影视历史)  |
查找       |api/v1/history/find    |POST   |`relateId`: 关联id<br>`videoId`: 视频id                                                        |当查询到多个结果只返回第一个
详情       |api/v1/history/:id     |GET    |`:id`: 唯一标识id                                                                              |

### 2.5 文件接口

名称           |路径                    |方法      |参数           |说明
--------------|------------------------|----------|-------------|----------
删除文件       |api/v1/file/*           |DELETE    |`*`:文件路径   |
本地包生成接口  |api/v1/file/*           |GET       |`*`:本地包路径 |
文件生成接口    |api/v1/file/config      |GET       |             |仅生成最多三级文件

### 2.6 dplayer弹幕接口

名称         |路径                    |方法  |参数                                           |说明
------------|------------------------|-----|----------------------------------------------|----------
提交弹幕数据  |api/v1/barrage/:version |POST |`:version`:dp版本号<br>`body体`:请求数据         |f12查看实际请求
获取弹幕数据  |api/v1/barrage/:version |GET  |`:version`:dp版本号<br>`id`:弹幕唯一标识          |

### 2.7 数据库接口

名称             |路径                           |方法    |参数                                                                          |说明
----------------|------------------------------|--------|-----------------------------------------------------------------------------|----------
清理数据         |api/v1/db/clear               |DELETE  |`body体`: [site, analyze, drive, iptv, channel, history, star, setting, cache, reset]   |reset标识出厂设置
数据导出         |api/v1/db/export              |POST    |`body体`: [site, analyze, drive, iptv, channel, history, star, setting]               |
数据导入         |api/v1/db/init                |POST    |`url`:数据链接<br>`importType`:导入类型[easy:一键导入, app:软件数据导入]<br>`importMode`:[additional:追加, override:覆盖]<br>`remoteType`:类型[easy-drpy,tvbox，app-local:本地,app-remote:远端]  |
远端数据覆盖本地  |api/v1/db/webdev/remote2local  |GET    |                                                                              |
本地数据上传云端  |api/v1/db/webdev/local2remote  |GET    |                                                                              |


### 2.8 网盘接口

名称       |路径                         |方法    |参数                                                 |说明
----------|-----------------------------|-------|----------------------------------------------------|----------
增加       |api/v1/drive                 |POST   |`body体`:请求数据                                    |f12查看实际请求
删除       |api/v1/drive                 |DELETE |`ids`: [唯一标识id1, 唯一标识id2]                       |ids为空则清空所有
修改       |api/v1/drive                 |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据                  |
获取所有数据 |api/v1/drive/page            |GET   |`page`: 页码<br>`pageSize`: 每页数量<br>`kw`: 数据源关键字  |
获取激活数据 |api/v1/drive/active          |GET   |                                                      |
设置默认    |api/v1/drive/default/:id     |PUT   |`:id`: 唯一标识id                                       |
详情       |api/v1/drive/:id             |GET    |`:id`: 唯一标识id                                      |
初始化     |api/v1/alist/init             |GET    |`sourceId`: 唯一标识id                                |
目录数据    |api/v1/alist/dir             |GET    |`sourceId`: 唯一标识id<br>`path`: 路径<br>`pg`: 页码      |
文件数据    |api/v1/alist/file            |GET    |`sourceId`: 唯一标识id<br>`path`: 路径                  |

### 2.9 电视接口

名称                |路径                        |方法    |参数                                                                  |说明
-------------------|----------------------------|-------|----------------------------------------------------------------------|----------
iptv增加            |api/v1/iptv                 |POST   |`body体`:请求数据                                                      |f12查看实际请求
iptv删除            |api/v1/iptv                 |DELETE |`ids`: [唯一标识id1, 唯一标识id2]                                       |ids为空则清空所有
iptv修改            |api/v1/iptv                 |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据                                  |
iptv获取所有数据      |api/v1/iptv/page            |GET   |`page`: 页码<br>`pageSize`: 每页数量<br>`kw`: 数据源关键字                |
iptv获取激活数据      |api/v1/iptv/active          |GET   |                                                                      |
iptv设置默认         |api/v1/iptv/default/:id     |PUT   |`:id`: 唯一标识id                                                       |
iptv详情            |api/v1/iptv/:id             |GET    |`:id`: 唯一标识id                                                      |
channel增加         |api/v1/channel              |POST   |`body体`:请求数据                                                       |f12查看实际请求
channel删除         |api/v1/channel              |DELETE |`ids`: [唯一标识id1, 唯一标识id2]                                        |ids为空则清空所有
channel修改         |api/v1/channel              |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据                                     |
channel获取所有数据   |api/v1/channel/page        |GET    |`page`: 页码<br>`pageSize`: 每页数量<br>`kw`: 数据源关键字<br>`group`: 分组名称   |
channel详情         |api/v1/channel/:id          |GET    |`:id`: 唯一标识id                                                       |
channel节目单数据    |api/v1/channel/epg          |GET    |`name`: 节目名<br>`date`: 日期                                            |

### 2.10 解析接口

名称       |路径                            |方法   |参数                                                |说明
----------|--------------------------------|------|---------------------------------------------------|----------
增加       |api/v1/analyze                 |POST   |`body体`:请求数据                                    |f12查看实际请求
删除       |api/v1/analyze                 |DELETE |`ids`: [唯一标识id1, 唯一标识id2]                       |ids为空则清空所有
修改       |api/v1/analyze                 |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据                  |
获取所有数据 |api/v1/analyze/page            |GET   |`page`: 页码<br>`pageSize`: 每页数量<br>`kw`: 数据源关键字  |
获取激活数据 |api/v1/analyze/active          |GET   |                                                     |
设置默认    |api/v1/analyze/default/:id     |PUT   |`:id`: 唯一标识id                                     |
详情       |api/v1/drive/:id               |GET    |`:id`: 唯一标识id                                     |
获取链接标题 |api/v1/alist/title             |GET    |`url`: 请求链接                                      |

### 2.11 影视接口

名称            |路径                       |方法    |参数                                                                          |说明
----------------|--------------------------|-------|----------------------------------------------------------------------------|----------
增加             |api/v1/site               |POST   |`body体`:请求数据                                                             |f12查看实际请求
删除             |api/v1/site               |DELETE |`ids`: [唯一标识id1, 唯一标识id2]                                                |ids为空则清空所有
修改             |api/v1/site               |PUT    |`ids`: [唯一标识id]<br>`doc`: 修改数据                                           |
获取所有数据      |api/v1/site/page          |GET    |`page`: 页码<br>`pageSize`: 每页数量<br>`kw`: 数据源关键字                            |
获取激活数据      |api/v1/site/active        |GET    |                                                                              |
设置默认         |api/v1/site/default/:id   |PUT    |`:id`: 唯一标识id                                                               |
详情             |api/v1/site/:id           |GET    |`:id`: 唯一标识id                                                             |
豆瓣推荐数据      |api/v1/recommend/douban   |GET    |`name`: 名称, `year`; 年份, `id`: 豆瓣id, `type`: 类型(tv|movie)                 |
获取热搜数据      |api/v1/hot/page           |GET    |kylive: [`date`: 日期, `type`: 2, `plat`: 平台]<br>enlightent: [`date`: 日期, `sort`: 'allHot', `channelType`: 分类, `day`: 最近天数]<br>douban: [`type`: 分类, `limit`: 数量, `start`: 开始位置]<br>komect: [`type`: 分类, `limit`: 数量, `start`: 开始位置]                                                  |f12查看实际请求
cms初始化        |api/v1/cms/init           |GET    |`sourceId`: 唯一标识id                                                         |
cms分类数据      |api/v1/cms/home           |GET    |`sourceId`: 唯一标识id                                                          |
cms首页数据      |api/v1/cms/homeVod        |GET    |`sourceId`: 唯一标识id                                                          |
cms列表数据      |api/v1/cms/category       |GET    |`sourceId`: 唯一标识id<br>`tid`: 分类标识<br>`page`: 页码<br>`f`: 过滤条件                |
cms详情数据      |api/v1/cms/detail         |GET    |`sourceId`: 唯一标识id<br>`id`: 视频标识                                            |
cms搜索数据      |api/v1/cms/search         |GET    |`sourceId`: 唯一标识id<br>`wd`: 搜索关键字<br>`page`: 页码<br>`quick`: 快速搜索(布尔类型)   |
cms播放数据      |api/v1/cms/play           |GET    |`sourceId`: 唯一标识id<br>`flag`: 线路标识<br>`input`: 集数标识                         |
cms运行函数数据   |api/v1/cms/runMain        |POST   |`sourceId`: 唯一标识id<br>`func`: 函数<br>`arg`: 参数                                 |


### 2.12 实验室接口

名称                |路径                               |方法   |参数                                                                                       |说明
-------------------|----------------------------------|------|--------------------------------------------------------------------------------------------|----------
去广                |api/v1/lab/ad                     |GET    |`url`: 播放链接<br>`type`: m3u8<br>`headers`: 请求头                                         |
ai回答              |api/v1/lab/ai                     |POST   |`type`: [filter: 筛选, cssSelector: css 选择器, qa]<br>`codeSnippet`: 代码片段<br>`demand`: 指令  |type为qa, codeSnippet可不传
写源工具执行pdfa     |api/v1/lab/js-edit/pdfa            |POST  |`html`: 代码<br>`rule`: pdfa 规则                                                            |
写源工具执行pdfh     |api/v1/lab/js-edit/pdfh            |POST  |`html`: 代码<br>`rule`: pdfh 规则<br>`baseUrl`: 请求地址                                      |baseUrl可不传
写源工具获取模板      |api/v1/lab/js-edit/muban          |POST   |                                                                                           |
写源工具获取debug数据 |api/v1/lab/js-edit/debug          |GET    |                                                                                           |
静态筛选             |api/v1/lab/static-filter/filter   |POST   |`html`, `ci`, `f`, `f1`, `matchs`, `exclude_keys`                                          |f12查看实际请求
静态筛选             |api/v1/lab/static-filter/category |POST   |`contentHtml`, `class_parse`, `cate_exclude`, `reurl`, `url`                               |f12查看实际请求

### 2.13 代理接口

名称              |路径     |方法   |参数                                   |说明
-----------------|--------|-------|--------------------------------------|----------
获取代理数据       |proxy   |GET    |`do`: js<br>`url`: 地址                |
设置代理数据       |proxy   |POST   |[响应码,响应类型,响应体]三元数组  |

### 2.14 插件接口

名称          |路径     |方法   |参数                                   |说明
-------------|--------|-------|--------------------------------------|----------
获取已安装列表  |api/v1/plugin/list       |GET    |                |
安装插件       |api/v1/plugin/install    |POST   |[插件目录名1,插件目录名2,..]                |
卸载插件       |api/v1/plugin/uninstall  |POST   |[插件名1,插件名2,..]  |
更新插件       |api/v1/plugin/update     |POST   |[插件名1,插件名2,..]  |
启动插件       |api/v1/plugin/start      |POST   |[插件名1,插件名2,..]  |
停止插件       |api/v1/plugin/stop       |POST   |[插件名1,插件名2,..]  |
