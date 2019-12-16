# Commander

## 介绍

node.js 命令行界面的完整解决方案，受 Ruby [Commander](https://github.com/commander-rb/commander)启发。

## API 解析

### 1. version

- 作用： 定义命令程序的版本号

- 用法示例： `.version('0.0.1', '-v, --version')`

- 参数解析：

  - 版本号 <必须>
  - 自定义标志 <可省略>： 默认为 `-V` 或 `--version`

  ```js
  const program = require("commander");
  // 定义命令程序版本号
  program.version(require("../package").version).usage("<command> [options]");
  ```

### 2. **option**

- 作用： 自定义命令选项
- 用法示例：`.option('-n, --name<path>', 'name description', 'default name')`
- 参数解析：
  1.  自定义标志<必须>：分为长短标识，中间用逗号、竖线或者空格分割；标志后面可跟必须参数或可选参数，前者用 `<>` 包含，后者用 `[]` 包含
  2.  选项描述<省略不报错>：在使用 `--help` 命令时显示标志描述
  3.  默认值<可省略>
- 示例：

```js
const program = require("commander");
program
  .version("0.1.0")
  .option("-p, --peppers", "Add peppers")
  .option("-P, --pineapple", "Add pineapple")
  .option("-b, --bbq-sauce", "Add bbq sauce")
  .option(
    "-c, --cheese [type]",
    "Add the specified type of cheese [marble]",
    "marble"
  )
  .parse(process.argv);

console.log("you ordered a pizza with:");
if (program.peppers) console.log(program.peppers + "  - peppers");
if (program.pineapple) console.log(program.pineapple + "  - pineapple");
if (program.bbqSauce) console.log(program.bbqSauce + "  - bbq");
console.log("  - %s cheese", program.cheese);
```

- 执行

```js
node index.js -pPbc hahah<br>
// 控制台打印
you ordered a pizza with:
true  - peppers
true  - pineapple
true  - bbq
  - hahah cheese

```

- 短标志可以作为单个 arg 传递，例如-abc 相当于-a -b -c。 比如“ --template-engine”之类的多词组成的选项会变成骆驼式的 program.templateEngine。

注意：以--no 前缀开头的多词选项是其后选项的布尔值的反。 例如，--no-sauce 将 program.sauce 的值设置为 false。

示例：

```js
var program = require("commander");

program.option("--no-sauce", "Remove sauce").parse(process.argv);

console.log("you ordered a pizza");
if (program.sauce) console.log("  with sauce");
else console.log(" without sauce");
```

执行：

```js
node index.js --no-sauce<br>
you ordered a pizza
 without sauce
```

### 3. parse

- 作用： 用于解析`process.argv`，设置`options`以及触发`commands`
- 用法示例： `.parse(process.argv)`

### 4. command

- 作用： 添加命令名称

- 用法示例：`.command('rmdir <dir>[otherDirs...]', 'install description', opts)`;

- 参数解析：

  1.  命令名称<必须>：命令后面可跟用 `<>` 或 `[]` 包含的参数；命令的最后一个参数可以是可变的，像实例中那样在数组后面加入 `...` 标志；在命令后面传入的参数会被传入到 `action` 的回调函数以及 `program.args` 数组中
  2.  命令描述<可省略>：如果存在，且没有显示调用 action(fn)，就会启动子命令程序，否则会报错
  3.  配置选项<可省略>：可配置 noHelp、isDefault 等

- 示例：

  ```js
  var program = require("commander");

  program
    .command("rm <dir>")
    .option("-r, --recursive", "Remove recursively")
    .action(function(dir, cmd) {
      console.log("remove " + dir + (cmd.recursive ? " recursively" : ""));
    });
  program.parse(process.argv);
  ```

  执行

  ```js
  node index.js rm /hahah -r
  // 控制台输出
  remove /hahah recursively
  ```

### 5. description

- 作用： 定义命令的描述
- 用法示例： `.description('rmdir desc')`

### 6. action

- 作用： 定义命令的回调函数
- 用法示例： `.action(fn)`
