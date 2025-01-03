# 写源语法

了解语法才能更好的配合工具完成开发流程。

## 1. 相关教程
[pyquery定位](https://pythonhosted.org/pyquery/)

### 1.1. 字符串初始化
```python:line-numbers
html = '''
<div>
    <ul>
        <li class="item-0">first item</li>
        <li class="item-1"><a href="link2.html">second item</a><>/li
        <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
        <li class="item-1 active"><a href="link4.html">fourth item</a></li>
        <li class="item-0"><a href="link5.html">fifth item</a></li>
    </ul>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
print(doc('li'))#选择器实际上就是CSS选择器，即：选id就加“#”，选class前面加“.”
 
 
#URL初始化
doc1 = pq(url = "http://www.baidu.com")print(doc1("head"))
 
#文件初始化
doc2 = pq(filename = "demo.html")#自己下载一个HTML文件
 
print(doc2('li'))
```

### 1.2. CSS选择器

```python:line-numbers
html = '''
<div id="container">
    <ul class="list">
        <li class="item-0">first item</li>
        <li class="item-1"><a href="link2.html">second item</a><>/li
        <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
        <li class="item-1 active"><a href="link4.html">fourth item</a></li>
        <li class="item-0"><a href="link5.html">fifth item</a></li>
    </ul>
</div>
'''
 
doc3 = pq(html)
 
print(doc3("#container .list li"))#注意空格，空格代表嵌套关系
```

### 1.3. 查找子元素

```python:line-numbers
html = '''
<div id="container">
    <ul class="list">
        <li class="item-0">first item</li>
        <li class="item-1"><a href="link2.html">second item</a><>/li
        <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
        <li class="item-1 active"><a href="link4.html">fourth item</a></li>
        <li class="item-0"><a href="link5.html">fifth item</a></li>
    </ul>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
items = doc(".list")#首先选中url标签
 
print(type(items))
 
print(items)
 
lis = items.find('li')#实际上也是一个CSS选择器，将里面所有的li标签都打印出来；只要在它里面的标签都可以找到
 
print(type(lis))
 
print(lis)
#查找直接子元素
lis2 = items.children()
 
print(type(lis2))
 
 
print(lis2)
 
lis3 = items.children('.active')print(lis3)
```

### 1.4. 查找父元素1

```python:line-numbers
html = '''
<div id="container">
    <ul class="list">
        <li class="item-0">first item</li>
        <li class="item-1"><a href="link2.html">second item</a></li>
        <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
        <li class="item-1 active"><a href="link4.html">fourth item</a></li>
        <li class="item-0"><a href="link5.html">fifth item</a></li>
    </ul>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
items = doc(".list")#首先选中url标签
#每个标签外面肯定只能套一个父元素
container = items.parent()print(type(container))print(container)
```


### 1.5. 查找父元素2

```python:line-numbers
html = '''<div class="wrap">    <div id="container">        <ul class="list">            <li class="item-0">first item</li>            <li class="item-1"><a href="link2.html">second item</a><>/li            <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>            <li class="item-1 active"><a href="link4.html">fourth item</a></li>            <li class="item-0"><a href="link5.html">fifth item</a></li>        </ul>    </div></div>'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
items = doc(".list")#首先选中url标签
 
#将所有祖先节点返回
parents = items.parents()print(parents)
 
print(type(parents))#打印出两个div
#在其中进行搜索
doc = pq(html)items = doc(".list")parents1 = items.parents(".wrap")print(parents1)#通过筛选，只剩下一个div
```

### 1.6. 兄弟元素

```python:line-numbers
html = '''<div class="wrap">    <div id="container">        <ul class="list">            <li class="item-0">first item</li>            <li class="item-1"><a href="link2.html">second item</a><>/li            <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>            <li class="item-1 active"><a href="link4.html">fourth item</a></li>            <li class="item-0"><a href="link5.html">fifth item</a></li>        </ul>    </div></div>'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
li = doc('.list .item-0.active')#首先选class=“.list”，空格即使选择list里面的标签，再选class=“item-0”，并列active（实际就是一个整体）print(li.siblings())#获取所有的兄弟元素
 
#在向其中筛选
print(li.siblings('.active'))
```

### 1.7. 遍历-单个元素

```python:line-numbers
html = '''
<div class="wrap">
    <div id="container">
        <ul class="list">
            <li class="item-0">first item</li>
            <li class="item-1"><a href="link2.html">second item</a></li>
            <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
            <li class="item-1 active"><a href="link4.html">fourth item</a></li>
            <li class="item-0"><a href="link5.html">fifth item</a></li>
        </ul>
    </div>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
li = doc(".item-0.active")
 
print(li)
 
lis = doc('li').items()#多个元素，进行遍历，生成一个产生器print(type(lis))for li in lis:    print(li)
```

### 1.8. 获取信息-获取属性

```python:line-numbers
html = '''
<div class="wrap">
    <div id="container">
        <ul class="list">
            <li class="item-0">first item</li>
            <li class="item-1"><a href="link2.html">second item</a></li>
            <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
            <li class="item-1 active"><a href="link4.html">fourth item</a></li>
            <li class="item-0"><a href="link5.html">fifth item</a></li>
        </ul>
    </div>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
a = doc(".item-0.active a")#选择class同时为item-0和active，在选择class里面的啊标签，中间注意空格print(a)print(a.attr("href"))print(a.attr.href)#结果同上
 
#获取文本
 
print(a.text())#将上面的选中的class中包围的文字
 
#获取HTML
 
a1 = doc(".item-0.active")print(a1.html())
```

### 1.9. DOM操作

```python:line-numbers
html = '''
<div class="wrap">
    <div id="container">
        <ul class="list">
            <li class="item-0">first item</li>
            <li class="item-1"><a href="link2.html">second item</a></li>
            <li class="item-0 active"><a href="link3.html"><span class="boid">third item</span></a></li>
            <li class="item-1 active"><a href="link4.html">fourth item</a></li>
            <li class="item-0"><a href="link5.html">fifth item</a></li>
        </ul>
    </div>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html)
 
li = doc(".item-0.active")print(li)li.removeClass("active")#移除activeprint(li)li.addClass("active")#增加activeprint(li)
 
#attr、css
 
doc = pq(html)
li = doc(".item-0.active")
 
li.attr("name","link")#若存在，就会覆盖print(li)li.css("font-size","14px")#增加style属性print(li)


#remove
html1 = '''
<div class="wrap">
    Hello,World
    <p>This is a paragraph.</p>
</div>
'''
 
from pyquery import PyQuery as pq
 
doc = pq(html1)
 
wrap = doc(".wrap")
 
print(wrap.text())
 
wrap.find('p').remove()
 
print(wrap.text())
```

## 2. 模板规则说明
所有相关属性说明
```javascript:line-numbers
var rule = {
    title:'',//规则标题,没有实际作用,但是可以作为cms类名称依据
    编码:'',//不填就默认utf-8
    搜索编码:'',//不填则不编码，默认都是按utf-8.可优先于全局编码属性.比如网页源码编码是gbk,这里可以指定utf-8搜索独立编码。多数情况这个属性不填或者填写gbk应对特殊的网站搜索
    host:'',//网页的域名根,包含http头如 https://www,baidu.com
    hostJs:'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src = jsp.pdfh(html,"ul&&li&&a&&href");print(src);HOST=src.replace("/index.php","")',//网页域名根动态抓取js代码。通过HOST=赋值
    homeUrl:'/latest/',//网站的首页链接,可以是完整路径或者相对路径,用于分类获取和推荐获取 fyclass是分类标签 fypage是页数
    url:'/fyclass/fypage.html[/fyclass/]',//网站的分类页面链接
    detailUrl:'https://yanetflix.com/voddetail/fyid.html',//非必填,二级详情拼接链接,感觉没啥卵用
    searchUrl:'',//搜索链接 可以是完整路径或者相对路径,用于分类获取和推荐获取 **代表搜索词 fypage代表页数
    searchable:0,//是否启用全局搜索,
    quickSearch:0,//是否启用快速搜索,
    filterable:0,//是否启用筛选,
    filter:{},// 筛选条件字典
    // 默认筛选条件字典(不同分类可以指定同样筛选参数的不同默认值)
    filter_def:{
        douyu:{
        area:'一起看',
        other:'..'
        },
        huya:{
        area:'影音馆',
        other:'..'
        }
    }, 
    // 筛选网站传参,会自动传到分类链接下(本示例中的url参数)-url里参数为fyfilter,可参考蓝莓影视.js
    filter_url:'style={{fl.style}}&zone={{fl.zone}}&year={{fl.year}}&fee={{fl.fee}}&order={{fl.order}}',
    // 注意,由于猫有配置缓存,搜索配置没法热加载，修改了js不需要重启服务器
    // 但是需要tv_box进设置里换源使配置重新装载
    headers:{//网站的请求头,完整支持所有的,常带ua和cookies
        'User-Agent':'MOBILE_UA',
        "Cookie": "searchneed=ok"
    },
    timeout:5000,//网站的全局请求超时,默认是3000毫秒
    class_name:'电影&电视剧&动漫&综艺',//静态分类名称拼接
    class_url:'1&2&3&4',//静态分类标识拼接
    //动态分类获取 列表;标题;链接;正则提取 不需要正则的时候后面别加分号
    class_parse:'#side-menu:lt(1) li;a&&Text;a&&href;com/(.*?)/',
    // 除开全局过滤之外还需要过滤哪些标题不视为分类
    cate_exclude:'',
    // 除开全局动态线路名过滤之外还需要过滤哪些线路名标题不视为线路
    tab_exclude:'',
    //移除某个线路及相关的选集|js1
    tab_remove:['tkm3u8'],
    //线路顺序,按里面的顺序优先，没写的依次排后面|js1
    tab_order:['lzm3u8','wjm3u8','1080zyk','zuidam3u8','snm3u8'],
    //线路名替换如:lzm3u8替换为量子资源|js1
    tab_rename:{'lzm3u8':'量子','1080zyk':'1080看','zuidam3u8':'最大资源','kuaikan':'快看',
    'bfzym3u8':'暴风','ffm3u8':'非凡','snm3u8':'索尼','tpm3u8':'淘片','tkm3u8':'天空',},

    // 服务器解析播放
    play_parse:true,
    // play_json　传数组或者　类　true/false 比如 0,1 如果不传会内部默认处理 不传和传0可能效果不同
    // 效果等同说明: play_json:[{re:'*', json:{jx:0, parse:1}}], 等同于 play_json:0,
    play_json:[{
        re:'*',
        json:{
            jx:1,
            parse:1,
        },
    }],
    //控制不同分类栏目下的总页面,不填就是默认999.哔哩影视大部分分类无法翻页，都需要指定页数为 1
    pagecount:{"1":1,"2":1,"3":1,"4":1,"5":1,"7":1,"时间表":1},
    // 自定义免嗅 
    lazy:'',
    // 首页推荐显示数量
    limit:6,
    double:true,//是否双层列表定位,默认false
    // 对图片加了referer验证的有效,海阔专用,普通规则请勿填写此键值
    图片来源:'@Referer=http://www.jianpianapp.com@User-Agent=jianpian-version350',
    // 替换所有图片链接 欲替换文本=>替换为文本
    图片替换:'https://www.keke6.app/=>https://vres.a357899.cn/',
    
    // js写法，仅js模式1有效.可以用于代码动态获取全局cookie之类的
    // 可操作变量有 rule_fetch_params,rule,以及基础的网页访问request,post等操作
    预处理:'rule_fetch_params.headers.Cookie = "xxxx";',
    // 类似海阔一级 列表;标题;图片;描述;链接;详情 其中最后一个参数选填
    // 如果是双层定位的话,推荐的第2段分号代码也是第2层定位列表代码
    推荐:'.col-sm-6;h3&&Text;img&&data-src;.date&&Text;a&&href',
    // 类似海阔一级 列表;标题;图片;描述;链接;详情 其中最后一个参数选填
    一级:'.col-sm-6;h3&&Text;img&&data-src;.date&&Text;a&&href',
    //二级发起访问前进行js处理。解决特殊情况一级给出的链接非二级真实源码而是前端重定向链接的源码
    二级访问前:'log(MY_URL);let jump=request(MY_URL).match(/href="(.*?)"/)[1];log(jump);MY_URL=urljoin2(MY_URL,jump)',
    // 二级可以是*,表示规则无二级,直接拿一级的链接进行嗅探
    // 二级 title: 片名;类型
    // 二级 desc: 主要信息;年代;地区;演员;导演
    // 或者 {title:'',img:'',desc:'',content:'',tabs:'',lists:'',tab_text:'body&&Text',list_text:'body&&Text',list_url:'a&&href'} 同海阔dr二级
    二级:'*',
    // 搜索可以是*,集成一级，或者跟一级一样的写法 列表;标题;图片;描述;链接;详情
    搜索:'*',
    // 本地代理规则，可用于修改m3u8文件文本去广告后返回代理文件地址，也可以代理加密图片
    proxy_rule:`js:
    log(input);
    input = [200,'text;plain','hello drpy']
    `,
    //是否启用辅助嗅探: 1,0
    sniffer:1,
    // 辅助嗅探规则
    isVideo:"http((?!http).){26,}\\.(m3u8|mp4|flv|avi|mkv|wmv|mpg|mpeg|mov|ts|3gp|rm|rmvb|asf|m4a|mp3|wma)",
    // 辅助嗅探规则js写法
    isVideo:`js:
    log(input);
    if(/m3u8/.test(input)){
    input = true
    }else{
    input = false
    }
    `,
}
```
### 2.1. 模板继承写法

```javascript:line-numbers
var rule = Object.assign(muban.mxpro,{
    title:'鸭奈飞',
    host:'https://yanetflix.com',
    url:'/index.php/vod/show/id/fyclass/page/fypage.html',
    class_parse:`.navbar-items li:gt(1):lt(6);a&&Text;a&&href;.*/(.*?).html`,
});

```
### 2.2. 模板继承写法(新)

```javascript:line-numbers
var rule = {
    title:'cokemv',
    模板:'mxpro',
    host:'https://cokemv.me',
    class_parse:`.navbar-items li:gt(1):lt(7);a&&Text;a&&href;/(\\d+).html`,
}
```

### 2.3. 源正则写法说明

```text
属性class_parse按;分隔后取[3]为分类的正则字符串。  
这里的正则跟js的/.*/这种写法相比，由于是字符串,需要实现字符串标准。
比如想实现 /(\d+)/ 那么字符串写法为 (\\d+)  
原理是 new RegExp('(\\d+)') = /(\d+)/

属性lazy由于是纯js代码实现,不存在正则转义问题。  
每个源的属性对应的值如果是字符串,可以用反引号``包含起来。
避免内部出现单双引号混用等需\转义问题
```

### 2.4. js:内置变量

input,html,VODS,VOD,TABS,LISTS,MY_CATE,MY_FL
getProxyUrl(获取壳子本地代理地址返回 /proxy?do=js的完整链接)

### 2.5. 本地代理说明

proxy_rule参数input赋值格式为三元素列表[status,content-type,data]  
如: [200,'text/plain','hello drpy']  
input = [200,'application/vnd.apple.mpegurl',m3u8]

### 2.6. rsa加解密说明

```js:line-numbers
log(typeof(rsaX));
if(typeof(rsaX)=='function'){
    rsaX(mode, pub, encrypt, input, inBase64, key, outBase64)
}
```