# cms接口

了解对接接口便于开发。

## 1. cms

>  常见路径

1. 标准cms /api.php/provide/vod/
2. 采集站 /cjapi/mc10/vod/json.html
3. 采集站 /inc/api_mac10.php

| 类型    |      路径     |  方法 | 参数                                            | 说明           |
| :----: | ------------- | :--: | ---------------------------------------------- | ------------- |
| 分类    |               | GET | `ac`: class                                      |              |
| 列表    |               | GET | `ac`: videolist<br>`t`: 分类id<br>`pg`: 页数      |               |
| 搜索    |               | GET | `ac`: list<br>`wd`: 搜索关键词                     |               |
| 详情    |               | GET | `ac`: detail<br>`id`: 唯一标识                    |                |

## 2. drpy[js0]

| 类型    |      路径     |  方法 | 参数                                            | 说明           |
| :----: | ------------- | :--: | ---------------------------------------------- | ------------- |
| 分类    |               | GET | `ac`: class                                      |              |
| 列表    |               | GET | `ac`: videolist<br>`t`: 分类id<br>`pg`: 页数<br>`f`:筛选      | 筛选为字符串 |
| 搜索    |               | GET | `wd`: 搜索关键词                                   |               |
| 详情    |               | GET | `ac`: detail<br>`id`: 唯一标识                    |                |

## 3. app[v3]

>  常见路径

1. /api.php/app

| 类型    |      路径     |  方法 | 参数                                            | 说明           |
| :----: | ------------- | :--: | ---------------------------------------------- | ------------- |
| 分类    | /nav          | GET |                                                 |              |
| 列表    | /video        | GET | `tid`: 分类id<br>`pg`: 页数<br>`筛选`             | 筛选需格式化成key=value    |
| 搜索    | /search       | GET | `text`: 搜索关键词                                |               |
| 详情    | /video_detail | GET | `id`: 唯一标识                                    |                |

## 4. app[v1]

>  常见路径

1. /v1.vod

| 类型    |      路径     |  方法 | 参数                                            | 说明           |
| :----: | ------------- | :--: | ---------------------------------------------- | ------------- |
| 分类    | /types        | GET |                                                 |              |
| 列表    |               | GET | `tid`: 分类id<br>`page`: 页数<br>`筛选`           | 筛选需格式化成key=value    |
| 搜索    |               | GET | `wd`: 搜索关键词                                  |               |
| 详情    | /detail       | GET | `id`: 唯一标识                                    |                |


## 5. hipy[t4]

| 类型    |      路径     |  方法 | 参数                                            | 说明           |
| :----: | ------------- | :--: | ---------------------------------------------- | ------------- |
| 分类    |               | GET | `filter`: true<br>`extend`:扩展参数                                      |              |
| 列表    |               | GET | `ac`: videolist<br>`t`: 分类id<br>`pg`: 页数<br>`ext`: 筛选<br>`extend`:扩展参数| 筛选为 base64 |
| 搜索    |               | GET | `wd`: 搜索关键词<br>`extend`:扩展参数               |               |
| 详情    |               | GET | `ac`: detail<br>`ids`: 唯一标识<br>`extend`:扩展参数|                |

## 6. catvod[nodejs]

| 类型    |      路径     |  方法 | 参数                                            | 说明           |
| :----: | ------------- | :--: | ---------------------------------------------- | ------------- |
| 分类    | /home         | POST |                                                |              |
| 列表    | /category     | POST | `id`: 分类id<br>`page`: 页数<br>`f`:筛选         | 筛选为字典      |
| 搜索    | /search       | POST | `wd`: 搜索关键词<br>`pg`: 页数                   |               |
| 详情    | /detail       | POST | `id`: 唯一标识                                  |                |