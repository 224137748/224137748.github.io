# cookie 与 session

## cookie

### 概念

什么是 `Cookies`（“小甜饼”）呢？简单来说，`Cookie` 就是服务器暂时存放在你的电脑里的资料（`.txt` 格式的文本文件），好让服务器用来辨认你的计算机。当你在浏览网站的时候，`Web` 服务器会先送一小小资料放在你的计算机上，`Cookies` 会把你在网站上所打的文字或是一些选择都记录下来。当下次你再访问同一个网站，`Web` 服务器会先看看有没有它上次留下的 `Cookies` 资料，有的话，就会依据 `Cookie` 里的内容来判断使用者，送出特定的网页内容给你。

### cookie 组成

`Cookie`是一段不超过 `4KB` 的小型文本数据，由一个名称（`Name`）、一个值（`Value`）和其它几个用于控制 `Cookie`有效期、安全性、使用范围的可选属性组成。

- `Name/Value`：设置`Cookie`的名称及相对应的值，对于认证`Cookie，Value`值包括`Web`服务器所提供的访问令牌
- `Expires`属性：设置 `Cookie` 的生存期。(详情见[生命周期](/node/node_05_cookie和session.html#cookie-的生命周期))
- `Path`属性：定义了`Web`站点上可以访问该`Cookie`的目录。
- `Domain`属性：指定了可以访问该 `Cookie` 的 `Web` 站点或域。
- `Secure`属性：指定是否使用`HTTPS`安全协议发送`Cookie`。
- `HTTPOnly`属性 ：用于防止客户端脚本通过`document.cookie`属性访问`Cookie`，有助于保护`Cookie`不被跨站脚本攻击窃取或篡改。**但是，`HTTPOnly`的应用仍存在局限性，一些浏览器可以阻止客户端脚本对`Cookie`的读操作，但允许写操作。**

### cookie 作用

`http` 协议是基于请求响应的协议，请求 --> 响应，连接断开。没有办法记录客户端的状态，也就没有办法对用户的行为进行跟踪。我们知道客户端与服务器的每次通信都会携带 `cookie`， 因此我们可以根据 `cookie` 对用户进行状态的跟踪。

cookie 流程：

- 当第一次访问服务器，服务器可以向客户端发送 `cookie`，可以往 `cookie` 当中存入需要的数据。
- 客户端如果接收到服务器端响应的 `cookie`，会把 `cookie` 自动保存起来。当客户端再次请求服务器的时候，浏览器会自动把客户端 `cookie` 的数据发送到服务器。
- 服务器收到客户端的请求，获取到 `cookie`， 通过 `cookie`信息，判断用户身份，进行对应操作

### 使用 cookie

- 服务端：怎么发送 `cookie` (`setcookie()` 函数用于设置 `cookie` );
  以`node.js` 原生写法为例：

```js
var handleServer = (req, res) => {
  res.setHeader("Set-Cookie", "userid=1234;");
};
```

服务端向客户端设置 `cookie` php 方法:

```php
setcookie("user", "Alex Porter", time() + 3600);
```

- 客户端：怎么获取 `cookie`

```js
var cookies = document.cookie;
```

### cookie 的生命周期

#### 1、内存 cookie

`setcookie("user", "zhuwu");` 如果不设置时间(即：`Expires/Max-Age`)，默认就是内存 `cookie` ，当浏览器关闭，客户端会把 `cookie` 清空，整个周期在浏览器的内存当中。

下图为在 `chrome` 浏览器中截取网页的 `cookie`， 每个`cookie` 都设置有过期时间。
![image](/imgs/node/cookie_expires.png)

#### 2、硬盘 cookie

以 `php`代码示例：

```php
header("Content-Type:text/html;charset=utf-8");
//设置当前cookie 的时间为一天。
setcookie("user", "zhuwu",time()+3600*24);
echo "php cookie";
```

#### 3、追杀 cookie

把 `cookie` 的 `value` 设置为空，失效时间改成 `-1` 这样即是追杀 `cookie`，把客户端成 `cookie` 清楚。

```php
setcookie("user", "",-1);
```

## session

在了解`session`之前，我们先了解一下`cookie`最大的缺点。

众所周知 `cookie`是暴露在外的，容易被人截取，因此一些安全信息不能直接使用`cookie`。我们来试想一下解决方案：

- 第一步： 在服务端新建一个对象 `var session = {};`，用域存储隐私数据；
- 第二步： 在服务器生成一串“乱码”作为键名 `var userId= Date.now();`，将其设置为`cookie`用域客户端与服务器网络传输
- 第三步： 在新建的对象中，设置键名，键值,`session[userId] = {username: 'zhangsan', password: '123'}`。

这样将涉及到安全信息的值存储在服务器端，能有效的保证信息的安全，这里存储信息的对象称之为`session`；

### session 概念

在计算机中，尤其是在网络应用中，称为“会话控制”。`Session` 对象存储特定用户会话所需的属性及配置信息。这样，当用户在应用程序的 `Web` 页之间跳转时，存储在 `Session` 对象中的变量将不会丢失，而是在整个用户会话中一直存在下去。当用户请求来自应用程序的 `Web` 页时，如果该用户还没有会话，则 `Web` 服务器将自动创建一个 `Session` 对象。当会话过期或被放弃后，服务器将终止该会话。

### 工作原理

实际上跟上面说的解决方案实施起来相差不大

- 1、服务器收到客户端的请求后，服务端主动设置一个`session`值，同时再服务端创建一个`session`池，并在返回给客户端的相应中添加一个`set-cookie`属性。
- 2、客户端收到响应后，在本地存储一个（客户端行为）`sessionId`，在此后的每次请求中都通过`cookie`的方式将`sessionId`携带到服务端
- 3、服务端拿到`sessionId`再到服务端中的`session`池中获取`session`值；

## cookie 与 session 对比

### cookie

`cookie` 是存储在客户端，它是服务器想客户端保存数据。记住用户名。

### sessionStroage

客户端的存储，基于 html5 ，也是本地存储。生命周期。

### localstorage

本地存储，它是实例化到本地的硬盘。

### session

存储在服务器的，依赖 cookie。
