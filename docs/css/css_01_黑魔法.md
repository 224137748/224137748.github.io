# 你不知道的 CSS 黑魔法

### 1、利用 `CSS` 的 `content` 属性 `attr` 抓取文本

#### 需求

在 `pc` 端经常会看见鼠标悬浮在某个按钮上，会出现对应的提示文字，类似于下面红框：
![](/imgs/css/content_attr.png)

利用 `Css` 伪元素我们可以实现上面的样式，但如果提示框里面的文字内容是动态获取的，又怎么实现呢？

一般情况下在 `CSS` 伪元素中，我们通常设置 `content: ''`为空值 ，比较少见的情况会给 `content` 属性设置其他值，注意汉字有点特殊，例如： `content: '输入姓名';`。 请注意这段 `css` 代码经过服务器传输后，在客户端会显示为乱码。其实，`content` 属性可以通过 `attr` 方法获取到 `div` 元素的属性；

`html` 代码：

```html
<div data-msg="Cannot fork because you own this repository .....">
  hover
</div>
```

`css` 代码：

```css
div {
  width: 100px;
  border: 1px solid red;
  position: relative;
}
div:hover::after {
  content: attr(data-msg);
  position: absolute;
  font-size: 12px;
  width: 200%;
  line-height: 30px;
  text-align: center;
  left: 0;
  top: 25px;
  border: 1px solid green;
}
```

在 `attr` 里面塞入我们在 `html` 新增的 `data-msg` 属性，这样伪元素 `(::after)` 就会得到该值。

### 最终的效果

![](/imgs/css/content_attr2.png)

::: tip 扩展运用
同样的，你还可以结合其他强大的选择器使用，例如：**使用属性选择器选择空链接**
显示没有文本值但是`href`属性具有链接的`a`元素的链接：
:::

```css
a[href^="http"]:empty::before {
  content: attr(href);
}
```

## #2、竖排展示文字

#### 需求

有时候，需要容器的文字从上到下排列，而不是从左往右排列，就像古诗词排版一样；
![](/imgs/css/write_mode.png)

#### 分析

通过设置`div` 宽度，让文字自动换行也可以实现需求的效果，但是如果一段文字中夹杂标点符号，用这种方法显示效果就有差强人意了。

今天介绍`writing-mode` 这个 `CSS` 属性，很少见到，也很少用到！我们往往称不常见的东西为“生僻”，就像是不常见的文字我们叫“生僻字”，因此不常见的 `CSS` 属性，我们可以叫做“生僻属性”。话不多说，直接上代码：

```html
<h4>咏柳</h4>
<p>
  碧玉妆成一树高，<br />万条垂下绿丝绦。<br />不知细叶谁裁出，<br />二月春风似剪刀。
</p>

<div class="verticle-mode">
  <h4>咏柳</h4>
  <p>
    碧玉妆成一树高，<br />万条垂下绿丝绦。<br />不知细叶谁裁出，<br />二月春风似剪刀。
  </p>
</div>
```

上面的`html`代码都是块级元素，默认会横排展示。

```css
.verticle-mode {
  writing-mode: tb-rl;
  -webkit-writing-mode: vertical-rl;
  writing-mode: vertical-rl;
}
```

其中`vertical-rl` 也可以为`vertical-lr`，`-` 后面的值控制排列方式；

#### 最终效果

![](/imgs/css/write_mode2.png)

### 3、实现文本两端对齐

#### 需求

我们经常在做`form` 表单的时候，有样式要求表头的文字两端对齐，比如：姓名、手机号，家庭住址....

#### 代码

`html` 代码：

```html
<div>姓名</div>
<div>手机号码</div>
<div>验证码</div>
<div>账号</div>
<div>密码</div>
```

`css` 代码：

```css
div {
  margin: 10px 0;
  width: 100px;
  border: 1px solid red;
  text-align-last: justify;
}
```

#### 最终效果

![](/imgs/css/text_aligin_last.png)

### 4、`:not()` 选择器

#### 需求

```html
<ul>
  <li>1</li>
  <li>2</li>
  <li>3</li>
  <li>4</li>
  <li>5</li>
  <li>6</li>
</ul>
```

经常我们会给一组列表元素`<li>`添加样式（例如:`background:red;`），但是我想让第 3 个，第 6 个`<li>`元素不设置背景色;

#### 代码

`css` 代码
第 3 个和第 6 个 `<li>`元素即，`3n`3 的倍数，使用 `:not(:nth-child(3n))` 来排除选择元素

```css
li {
  list-style: none;
  margin-bottom: 10px;
}

ul > li:not(:nth-child(3n)) {
  background: red;
}
```

#### 最终效果

![](/imgs/css/not.png)
