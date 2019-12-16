# inquirer.js

公共交互命令行用户界面的集合。现在大多数工程都是通过脚手架来创建的，使用脚手架的时候最明显的就是与命令行的交互，如果想自己做一个脚手架或者在某些时候要与用户进行交互，这个时候就不得不提到`inquirer.js`了。

## 介绍

由于交互的问题种类不同，`inquirer`为每个问题提供很多参数：

- `type`：表示提问的类型，包括：`input`,`confirm`, `list`, `rawlist`, `expand`, `checkbox`, `password`, `editor`；

- `name`： 存储当前问题回答的变量；

- `message`：问题的描述；

- `default`：默认值；

- `when`：属性值为一个函数，返回值是一个`boolean`值，根据前面问题的回答，判断当前问题是否需要被回答；

- `choices`：列表项，在有些`type`下可用，并且包含一个分隔符；

- `validate`：对用户的回答进行校验；

- `filter`：对用户的回答进行过滤处理，返回处理后的值；

- `transformer`：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；

- `pageSize`：修改某些 type 类型下的渲染行数；

- `prefix`：修改 message 默认前缀；

- `suffix`：修改 message 默认后缀。

  ```js
  {
      name: 'position',
      type: 'list',
      when: hasThisPlugin,
  	choices: ["zt/2019", "zt", "p", "t"]
  }
  ```

## 具体使用

### 1. 语法结构

```js
const inquirer = require("inquirer");
const promptList = [
  // 具体交互内容
];
inquirer.prompt(promptList).then(answers => {
  console.log(answers);
});
```

### 2. input 类型

```js
const promptList = [
  {
    name: "userName",
    type: "input",
    message: "请输入一个用户名",
    default: "test_ueser"
  },
  {
    name: "phone",
    type: "input",
    message: "请输入您的手机号",
    validate: function(val) {
      if (val.match(/\d{11}/g)) {
        // 校验位数
        return val;
      }
      return "请输入11位数字！！";
    }
  }
];
```

效果：

![](/imgs/cli/inquirer1.png)

### 3. confirm 类型

```js
const promptList = [
  {
    name: "isMan",
    type: "confirm",
    message: "你是男生吗？",
    prefix: "hey~! 朋友："
  },
  {
    name: "isknow_TokyoHot",
    type: "confirm",
    message: "你知道东京热吗？",
    suffix: "  哈哈~！",
    when: function(answer) {
      return answer.isMan;
    }
  }
];
```

效果：

![](/imgs/cli/inquirer2.png)

### 4. list 类型

```js
const promptList = [
  {
    name: "favorite_fruit",
    type: "list",
    message: "您最喜欢的水果是？",
    choices: ["Apple", "Pear", "Banana"],
    filter: function(val) {
      // 使用filter将回答变为小写
      return val.toLowerCase();
    }
  }
];
```

效果：

![](/imgs/cli/inquirer3.png)

![](/imgs/cli/inquirer3_1.png)

### 5. rawlist 类型

```
const promptList = [{
	name: 'favorite_fruit',
	type: 'rawlist',
	message: '您最喜欢的水果是?',
	choices: ['Apple', 'Pear', 'Banana'],
}]
```

效果：

![](/imgs/cli/inquirer4.png)

![](/imgs/cli/inquirer4_1.png)

### 6. expand 类型

```js
const promptList = [
  {
    type: "expand",
    message: "请选择一种水果：",
    name: "fruit",
    choices: [
      {
        key: "a",
        name: "Apple",
        value: "apple"
      },
      {
        key: "O",
        name: "Orange",
        value: "orange"
      },
      {
        key: "p",
        name: "Pear",
        value: "pear"
      }
    ]
  }
];
```

效果：

![](/imgs/cli/inquirer5.png)

![](/imgs/cli/inquirer5_1.png)

![](/imgs/cli/inquirer5_2.png)

### 7. checkbox 类型

```js
const promptList = [
  {
    type: "checkbox",
    message: "选择颜色:",
    name: "color",
    choices: [
      {
        name: "red"
      },
      new inquirer.Separator(), // 添加分隔符
      {
        name: "blur",
        checked: true // 默认选中
      },
      {
        name: "green"
      },
      new inquirer.Separator("--- 分隔符 ---"), // 自定义分隔符
      {
        name: "yellow"
      }
    ]
  }
];
// 或者下面这样
const promptList = [
  {
    type: "checkbox",
    message: "选择颜色:",
    name: "color",
    choices: ["red", "blur", "green", "yellow"],
    pageSize: 2 // 设置行数
  }
];
```

效果：

![](/imgs/cli/inquirer6.png)

![](/imgs/cli/inquirer6_1.png)

### 8. password 类型

```js
const promptList = [
  {
    type: "password", // 密码为密文输入
    message: "请输入密码：",
    name: "pwd"
  }
];
```

效果：

![](/imgs/cli/inquirer7.png)

### 9.editor 类型

```js
const promptList = [
  {
    type: "editor",
    message: "请输入备注：",
    name: "editor"
  }
];
```

效果：

![](/imgs/cli/inquirer8.png)

![](/imgs/cli/inquirer8_1.png)

![](/imgs/cli/inquirer8_2.png)
