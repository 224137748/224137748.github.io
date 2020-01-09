(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{266:function(t,s,a){"use strict";a.r(s);var n=a(0),p=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"http-协议"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-协议"}},[t._v("#")]),t._v(" Http 协议")]),t._v(" "),a("p",[t._v("协议就是规范是用来约束双方\nhttp 协议，他是超文本传输协定\n约束的，是客户端，浏览器与服务器进行通讯的一个标准\n客户端与服务器通讯是基于请求和响应的")]),t._v(" "),a("p",[t._v("客户端发送一个请求给服务端，服务端给客户端一个响应，http 协议\n客户端与服务端进行交互交互的目的就是传递数据。")]),t._v(" "),a("p",[t._v("http 协议就是约束客户端，与服务器之间进行传递的数据格式:")]),t._v(" "),a("ul",[a("li",[t._v("http 协议的数据格式分为两块去进行分析客户端，发送到服务器的请求称之为请求的数据格式")]),t._v(" "),a("li",[t._v("服务器响应到客户端的内容称为相应的数据格式。")])]),t._v(" "),a("p",[t._v("注释:使用抓包工具进行查看。")]),t._v(" "),a("h2",{attrs:{id:"协议分析"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#协议分析"}},[t._v("#")]),t._v(" 协议分析")]),t._v(" "),a("ul",[a("li",[t._v("请求协议数据组成部分\n"),a("ul",[a("li",[t._v("1、请求首行")]),t._v(" "),a("li",[t._v("2、请求空行")]),t._v(" "),a("li",[t._v("3、请求体")])])])]),t._v(" "),a("h2",{attrs:{id:"get、post-请求区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get、post-请求区别"}},[t._v("#")]),t._v(" get、post 请求区别")]),t._v(" "),a("ul",[a("li",[t._v("1、get 发送的请求数据都在地址栏当中，不安全")]),t._v(" "),a("li",[t._v("2、get 发送的数据对数据大小，有限制")]),t._v(" "),a("li",[t._v("3、get 没有请球体")]),t._v(" "),a("li",[t._v("4、post 发送的数据，在请求体当中相对安全")]),t._v(" "),a("li",[t._v("5、post 请求的数据 d 大小没有限制，")]),t._v(" "),a("li",[t._v("6、post 有一个特殊的请求头 Content-Type:application/x-www-form-urlencoded")]),t._v(" "),a("li",[t._v("7、get 的请求头相对较少，性能稍微高一些")])]),t._v(" "),a("h2",{attrs:{id:"http-服务-ajax-编程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#http-服务-ajax-编程"}},[t._v("#")]),t._v(" HTTP 服务&AJAX 编程")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("文件上传的小案例(客户端怎么处理)(服务端怎么接收数据)")])]),t._v(" "),a("li",[a("p",[t._v("http 协议的基本概念(客户端与服务器端进行交互的一种数据格式)")])]),t._v(" "),a("li",[a("p",[t._v("http 请求的数据格式以及响应的数据格式分析(http 协议就是基于请求响应的协议.)")])]),t._v(" "),a("li",[a("p",[t._v("get 请求以 post 请求的区别")])]),t._v(" "),a("li",[a("p",[t._v("常见的请求头以及响应头的作用")]),t._v(" "),a("p",[t._v("(检测客户端浏览器的版本)")]),t._v(" "),a("p",[t._v("（浏览器客户端过几秒钟之后自动跳转）")])])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xml "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// get 请求")]),t._v("\nxml"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GET"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("/api/getUserInfor?id=****")]),a("span",{pre:!0,attrs:{class:"token template-punctuation string"}},[t._v("`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nxml"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// post 请求")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// xml.open('POST', '/api/getUserInfor);")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// xml.send('id=****');")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 判断xml readyState状态码")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xml"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readyState "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" xml"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("===")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("callback")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("ul",[a("li",[a("p",[t._v("xml readyState 状态码")]),t._v(" "),a("ul",[a("li",[t._v("0－未初始化，即尚未调用 open。")]),t._v(" "),a("li",[t._v("1－初始化，即尚未调用 send。")]),t._v(" "),a("li",[t._v("2－发送数据，即已经调用 send。")]),t._v(" "),a("li",[t._v("3－数据传送中。")]),t._v(" "),a("li",[t._v("4－完成。")])])]),t._v(" "),a("li",[a("p",[t._v("xml status 常见的状态码")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("1xx 该类状态代码用于表示临时回应。")])]),t._v(" "),a("li",[a("p",[t._v("200 请求成功！")])]),t._v(" "),a("li",[a("p",[t._v("3xx 该类状态码表示用户代理要想完成请求，还需要发出进一步的操作。")])]),t._v(" "),a("li",[a("p",[t._v("304 后端的文件的没有任何的改变")])]),t._v(" "),a("li",[a("p",[t._v("302 重定向")])]),t._v(" "),a("li",[a("p",[t._v("4xx 客户端错误")])]),t._v(" "),a("li",[a("p",[t._v("403 没有权限访问")])]),t._v(" "),a("li",[a("p",[t._v("404 请求的资源没有找到")])]),t._v(" "),a("li",[a("p",[t._v("500 服务器内部错误.")])])])])])])}),[],!1,null,null,null);s.default=p.exports}}]);