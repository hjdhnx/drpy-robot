# 人工智脑

## 1. 回答
- 需求: `请帮我写一个关于电影《三生三世十里桃花》的简介`
- 输出: `《三生三世十里桃花》是一部改编自顾漫同名小说的古装玄幻电视剧，由赵小丁执导，杨幂、赵又廷主演。该剧讲述了白浅和夜华的三世情缘，跨越三生三世的爱恨情仇故事。剧中融合了仙侠、爱情和宫廷斗争等元素，以唯美的画面和动人的故事情节吸引了众多观众的关注。`
- 截图:
![ai-qa](/editSource/ai-brain/ai-qa.png)

## 2. 筛选
- 需求: `提取年份`
- 代码片段: 
```html:line-numbers
<div class="module-main module-class">
    <div class="module-class-items scroll-box">
    <div class="module-class-item scroll-content">
        <div class="module-item-title">年份<i class="icon-arrow"></i></div>
        <div class="module-item-box">
        <a data-pjax href="/vodshow/20-----------.html" class="active">全部</a>
        <a data-pjax href="/vodshow/20-----------2024.html" title="2024">2024</a>
        <a data-pjax href="/vodshow/20-----------2023.html" title="2023">2023</a>
        <a data-pjax href="/vodshow/20-----------2022.html" title="2022">2022</a>
        <a data-pjax href="/vodshow/20-----------2021.html" title="2021">2021</a>
        <a data-pjax href="/vodshow/20-----------2020.html" title="2020">2020</a>
        <a data-pjax href="/vodshow/20-----------2019.html" title="2019">2019</a>
        <a data-pjax href="/vodshow/20-----------2018.html" title="2018">2018</a>
        <a data-pjax href="/vodshow/20-----------2017.html" title="2017">2017</a>
        </div>
    </div>
    </div>
</div>
```
- 输出: 
```json:line-numbers
[
  {
    "key": "year",
    "name": "年份",
    "value": [
      {
        "n": "2024",
        "v": "2024"
      },
      {
        "n": "2023",
        "v": "2023"
      },
      {
        "n": "2022",
        "v": "2022"
      },
      {
        "n": "2021",
        "v": "2021"
      },
      {
        "n": "2020",
        "v": "2020"
      },
      {
        "n": "2019",
        "v": "2019"
      },
      {
        "n": "2018",
        "v": "2018"
      },
      {
        "n": "2017",
        "v": "2017"
      }
    ]
  }
]
```
- 截图:
![ai-筛选](/editSource/ai-brain/ai-filter.png)

## 3.css选择器
- 需求: `获取除全部外的年份css选择器`
- 代码片段: 
```html:line-numbers
<div class="module-main module-class">
    <div class="module-class-items scroll-box">
    <div class="module-class-item scroll-content">
        <div class="module-item-title">年份<i class="icon-arrow"></i></div>
        <div class="module-item-box">
        <a data-pjax href="/vodshow/20-----------.html" class="active">全部</a>
        <a data-pjax href="/vodshow/20-----------2024.html" title="2024">2024</a>
        <a data-pjax href="/vodshow/20-----------2023.html" title="2023">2023</a>
        <a data-pjax href="/vodshow/20-----------2022.html" title="2022">2022</a>
        <a data-pjax href="/vodshow/20-----------2021.html" title="2021">2021</a>
        <a data-pjax href="/vodshow/20-----------2020.html" title="2020">2020</a>
        <a data-pjax href="/vodshow/20-----------2019.html" title="2019">2019</a>
        <a data-pjax href="/vodshow/20-----------2018.html" title="2018">2018</a>
        <a data-pjax href="/vodshow/20-----------2017.html" title="2017">2017</a>
        </div>
    </div>
    </div>
</div>
```
- 输出: `.module-class-item.scroll-content .module-item-box a:not(.active)`
- 截图:
![ai-css选择器](/editSource/ai-brain/ai-cssSelector.png)
