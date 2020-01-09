module.exports = {
  title: "findream",
  description: "不积硅步，无以至千里,前端，node.js,webpack,mongodb,express",
  // 网站部署的路径
  // base: "/blog/",
  dest: "./docs/.vuepress/dist",
  themeConfig: {
    logo: "/imgs/avatar.jpg",
    head: [["link", { rel: "icon", href: "/imgs/hero.png" }]],
    // 顶部导航栏
    nav: [
      {
        text: "首页",
        link: "/"
      },
      {
        text: "概览",
        link: "/guide/"
      },
      {
        text: "类别",
        items: [
          { text: "Css", link: "/css/" },
          { text: "Javascript", link: "/javascript/" },
          { text: "Typescript·", link: "/typescript/" },
          { text: "Vue", link: "/vue/" },
          { text: "Node.js", link: "/node/" },
          { text: "Mongodb", link: "/mongodb/" },
          { text: "Mysql", link: "/mysql/" },
          { text: "Cli", link: "/cli/" }
        ]
      }
      // {
      //   text: "文档"
      // },
      // {
      //   text: "other"
      // }
    ],
    // 显示所有页面的标题连接
    // displayAllHeaders: true, // 默认为false
    // 自动生成侧边栏
    // sidebar: "auto",
    sidebar: {
      "/css/": [
        ["", "揭秘 CSS"],
        ["css_01_黑魔法", "CSS 黑魔法"]
      ],
      "/javascript/": [
        ["", "Javascript"],
        ["JS_01基础知识", "01_基础知识"],
        ["JS_02继承", "02_继承"],
        ["JS_03原型链&闭包", "03_原型链&闭包"],
        ["JS_04ES6", "04_ES6"],
        ["JS_05框架封装", "05_框架封装"],
        ["JS_06正则表达式", "06_正则表达式"],
        ["JS_07模块化", "07_模块化"]
        // ["JS_08后端基础介绍", "08_后端基础介绍"],
        // ["JS_09HTTP协议", "09_HTTP协议"]
      ],
      "/vue/": [
        ["", "Vue 源码解读"],
        ["1-初识Vue", "初识Vue"],
        ["2-数据驱动", "数据驱动"],
        ["3-render", "render函数"],
        ["4-createElement", "createElement"],
        ["5-update", "update"],
        ["问题总结", "问题总结"]
      ],
      "/webpack/": [
        ["", "Webpack"],
        ["webpack_01_起步&loader", "01_起步&loader"],
        ["webpack_02_plugins", "02_plugins"],
        ["webpack_03_entry&sourceMap", "03_entry&sourceMap"],
        ["webpack_04_热更新", "04_热更新"],
        ["webpack_05_Babel处理Es6语法", "05_Babel处理Es6语法"],
        ["webpack_06_TreeShaking", "06_TreeShaking"],
        ["webpack_07_mode", "07_mode"],
        ["webpack_08_代码分割", "08_代码分割"],
        ["webpack_09_懒加载", "09_懒加载 & chunk"],
        ["webpack_10_Prefetch&Preload", "10_Prefetch & Preload"],
        ["webpack_11_Css代码分割", "11_Css代码分割"],
        ["webpack_12_Shimming", "12_Shimming"],
        ["webpack_13_实战技巧", "13_实战技巧"],
        ["webpack_14_打包性能优化", "14_性能优化"],
        ["webpack_15_多页面应用打包", "15_多页面应用"]
      ],
      "/mongodb/": [
        ["", "Mongodb"],
        ["mongodb_01_Mongodb", "Mongodb"],
        ["mongodb_02_Mongoose", "Mongoose"]
      ],
      "/node/": [
        ["", "Node.js"],
        ["node_01_初识", "Node.js初识"],
        ["node_02_模板引擎", "模板引擎"],
        ["node_03_后端介绍", "后端介绍"],
        ["node_04_http协议", "http 协议"],
        ["node_05_cookie和session", "cookie与session"],
        ["node_06_redis", "redis"]
      ],
      "/typescript/": [
        ["", "TypeScript"],
        ["part1_01_install", "安装 install"],
        ["part1_02_start", "开始 start"],
        ["part2_01_type", "基础类型 type"],
        ["part2_02_declare", "变量声明 declare"],
        ["part2_03_interface", "接口 interface"],
        ["part2_04_class", "类 class"],
        ["part2_05_function", "函数 function"],
        ["part2_06_generic", "泛型 generic"],
        ["part2_07_inference", "类型推断 inference"],
        ["part2_08_advance", "高级类型 advance"],
        ["part3_01_require", "需求分析 require"],
        ["part3_02_init", "初始化 init"],
        ["part3_03_base", "base"],
        ["part4_01_url", "url"],
        ["part4_02_data", "data"],
        ["part4_03_header", "header"],
        ["part4_04_response", "response"],
        ["part4_05_response-header", "response-header"],
        ["part4_06_response-data", "response-data"],
        ["part5_01_error", "errpr"],
        ["part5_02_enhance", "enhance"]
      ],
      "/mysql/": [
        ["", "Mysql"],
        ["mysql_01_start", "起步"],
        ["mysql_02_密码", "密码"]
      ],
      "/cli/": [
        ["", "Cli"],
        ["Commander", "Commander"],
        ["inquirer", "inquirer"]
      ],
      // fallback
      "/": ["", "about"]
    },
    // sidebarDepth: 2,
    // 醉胡更新时间
    lastUpdated: "上次更新",
    // 页面滚动效果
    smoothScroll: true,
    locales: {
      "/": {
        lang: "zh-CN"
      }
    },
    repo: "224137748/224137748.github.io",
    repoLabel: "GitHub",
    // 假如文档不是放在仓库的根目录下：
    docsDir: "docs",
    // 假如文档放在一个特定的分支下：  博客文件在master分支，文档在document分支
    docsBranch: "document",
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: "编辑"
  }
};
