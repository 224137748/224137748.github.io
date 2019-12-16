---
sidebarDepth: 2
---

# Mongoose

## 介绍

如果你使用过原生`MongoDB`进行数据存储的话，你是否觉得编写`MongoDB`数据格式验证，转换和业务逻辑非常麻烦。今天学习的`Mongoose`就能为我们消除上面的烦恼，`Mongoose`为模型提供了一种直接的，基于`scheme`结构去定义你的数据模型。它内置数据验证， 查询构建，业务逻辑钩子等，开箱即用。

## 安装

使用`npm`安装`Mongoose`:

```bash
npm install mongoose
```

## 使用

简单介绍以下使用，首先我们要在项目用引入 `mongoose` ，然后链接我们本地的 `test` 数据库。

```js
// app.js
var mongoose = require("mongoose");
// 创建一个数据库连接
mongoose.connect("mongodb//localhost/test");

// 创建一个Cat模型，语法mongoose.model(模型名字， Schema)
// Schema 类似于模型字段类型检查的一个接口，定义模型有什么属性，以及属性的类型
// 这里省略了一步，就是schema是通过 new mongoose.schema({});创建的

var Cat = mongoose.model("Cat", { name: String, age: Number });

// 实例化，使用 new 关键词
const kitty = new Cat({ name: "Zildjian", age: 15 });
// 保存
kitty.save().then(() => console.log("meow"));
```

:::tip 注意
1、每个实例化的模型都具备`save()`方法。
2、mongoose 连接数据库是持续性的，并没有断开连接；
:::

## 定义 schema

`Mongoose` 的一切始于 `Schema`。每个 `schema` 都会映射到一个 `MongoDB collection` ，并定义这个`collection` 里的文档的构成。我们先来看看，如何定义一个`Schema`:

```js
var monggoose = require("mongoose");
var Schema = mongoose.Schema;
var catSchema = new Schema({ name: String, age: Number, other: String });
```

比如上面的例子，我想对 `Cat` 这个对象新增一个属性应该怎么实现呢？

```js
// 在这之后你还想添加 keys 的话， 请使用 Schema.add 方法
catSchema.add({ color: "string" });
```

其中可以定义的 `SchemaType` 有：

- `String`
- `Number`
- `Date`
- `Buffer`
- `Boolean`
- `Mixed`
- `ObjectId`
- `Array`

:::warning 注意
在定义 `schema`的时候，如果不加第二个参数，那么即使你在 `model`中定义了表名为`'user'`，`mongoose`会智能的在表名末尾添加一个`'s'`，那么你查询的表就会变成 `'users'`表，所以，为了安全，务必加上 `{collection:'table_name'}`
:::
例如：

```js
var studentSchema = new mongoose.Schema(
  {
    username: String,
    phone: String,
    score: Array
  },
  {
    collection: "student"
  }
);
const student = mongoose.model("student", studentSchema);
```

### SchemaType 选项

上面我们只是初步的介绍了怎么定义一个`Schema`，实际上 `Schema` 还有更多参数供开发者配置，类似于 `Vue` 中的 `props` 传值一样，开发者不仅可以定义属性的类型，还可以设置默认值以及其他属性。

```js
var schema2 = new Schema({
  test: {
    type: String,
    lowercase: true, // 将 `test` 属性转换成小写
    default: "Jerry" // 默认值为 `Jerry`
  }
});
```

下面展示的属性适用于**全部**的 `SchemaType`:

- `required`: 布尔值或函数 如果值为真，为此属性添加 `required` 验证器
- `default`: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
- `select`: 布尔值 指定 `query` 的默认 `projections`
- `validate`: 函数 `adds a validator function for this property`
- `get`: 函数 使用 `Object.defineProperty()` 定义自定义 `getter`
- `set`: 函数 使用 `Object.defineProperty()` 定义自定义 `setter`
- `alias`: 字符串 仅`mongoose >= 4.10.0`。 为该字段路径定义虚拟值 `gets/sets`

至于`索引相关`, `String`, `Number`, `Date`等`SchemaType`的[详情配置](http://www.mongoosejs.net/docs/schematypes.html)可查看官网！

### 实例方法

`documents` 是 `Models` 的实例。 `Document` 有很多自带的[实例方法](http://www.mongoosejs.net/docs/api.html#document-js)， 当然开发者也可以自定义自己的方法。

```js
// 定义一个Schema
var animalSchema = new Schema({ name: String, type: String });
// 在 animalSchem 的 methods 对象中声明一个 findSimilarTypes 函数
animalSchema.methods.findSimilarTypes = function(cb) {
  return this.model("Animal").find({ type: this.type }, cb);
};
```

现在所有 `animal` 实例都有 `findSimilarTypes` 方法：

```js
var Animal = mongoose.model("Animal", animalSchema);
var dog = new Animal({ type: "dog" });

// dog 实例已经可以使用 findSimilarTypes 方法
dog.findSimilarTypes(function(err, dogs) {
  console.log(dogs); // woof
});
```

- 重写 `mongoose` 的默认方法会造成无法预料的结果，相关链接。
- **不要**在自定义方法中**使用 ES6 箭头函数**，会造成 `this` 指向错误。

### 静态方法

添加 `Model` 的静态方法也十分简单，继续用 `animalSchema` 举例：

```js
// 给animalSchema 的 statics 对象中 声明一个 findByName 函数
animalSchema.statics.findByName = function(name, cb) {
  return this.find({ name: new RegExp(name, "i") }, cb);
};

var Animal = mongoose.model("Animal", animalSchema);
Animal.findByName("fido", function(err, animals) {
  console.log(animals);
});
```

同样**不要**在静态方法中**使用 ES6 箭头函数**。

:::tip 实例方法 和 静态方法的区别？
实例方法中声明的函数，在实例 `document` 上调用；<br>
静态方法中声明的函数，在原型 `model` 上调用；
:::

## 创建一个 model

`Models` 是从 `Schema` 编译来的构造函数。 它们的实例就代表着可以从数据库保存和读取的 `documents`。 从数据库创建和读取 `document` 的所有操作都是通过 `model` 进行的。

我们要把`schema`转换为一个`Model`， 使用`mongoose.model(modelName, schema)` 函数：

```js
// mongoose.model(modelName, schema)
var Blog = mongoose.model("Blog", blogSchema);
```

第一个参数是跟 `model` 对应的集合（ `collection` ）名字的 **_单数_** 形式。 `Mongoose` 会自动找到名称是 `model` 名字 **_复数_** 形式的 `collection` 。 上面篇幅也讲到这个问题，在这里`Tank` 这个 `model` 就对应数据库中 `tanks` 这个 `collection`。

`.model()` 这个函数是对 `schema` 做了拷贝（生成了 `model`）。 **要确保在调用 `.model()` 之前把所有需要的东西都加进 `schema` 里了！**

### 构造 Document 实例

这里说的 `Documents` 是 `model` 的实例，实例化一个 `model`方法如下：

```js
var tankSchema = new mongoose.Schema({ name: String });

var Tank = mongoose.model("tank", tankSchema);
// 实例化
var kiki = new Tank({ name: "kiki" });

kiki.save(function(err) {
  if (err) {
    throw err;
  }
  // saved!
});
```

### model 连接方式

要注意，直到`model`使用的数据库连接（ `connection` ）被打开，`tanks` 才会被创建/删除。每个 `model` 都有一个绑定的连接。 如果 `model` 是通过调用 `mongoose.model()` 生成的，它将使用 `mongoose` 的默认连接，即使用下面的连接方式（方式一）：

```js
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  // we're connected!
});
```

如果自行创建了连接，就需要使用 `connection` 的 `model()` 函数连接（方式二）。

```js
var mongoose = require("mongoose");
var connection = mongoose.createConnection("mongodb://localhost:27017/test");
var Tank = connection.model("Tank", yourSchema);
```

### model 方法

#### 查询

用 `mongoose` 查询文档相当容易啦，它支持 `MongoDB` 的高级（ `rich` ）查询语法。 查询文档可以用 `model` 的 `find`, `findById`, `findOne`, 和 `where` 这些静态方法。

```js
Tank.find({ size: "small" })
  .where("createdDate")
  .gt(oneYearAgo)
  .exec(callback);
```

#### 删除

`model` 的 `remove` 方法可以删除所有匹配查询条件（ `conditions` ）的文档。

```js
Tank.remove({ size: "large" }, function(err) {
  if (err) return handleError(err);
  // removed!
});
```

#### 更新

`model` 的 `update` 方法可以修改数据库中的文档，**不过不会把文档返回给应用层**。

```js
Tank.update({ _id: id }, { $set: { size: "large" } }, callback);
```

如果想更新单独一条文档并且返回给应用层，可以使用 [findOneAndUpdate](http://www.mongoosejs.net/docs/api.html#model_Model.findOneAndUpdate) 方法。

#### 其他

API 文档中包含了很多额外的方法，比如 [count](http://www.mongoosejs.net/docs/api.html#model_Model.aggregate), [mapReduce](http://www.mongoosejs.net/docs/api.html#model_Model.aggregate), [aggregate](http://www.mongoosejs.net/docs/api.html#model_Model.aggregate), 还有 [其他](http://www.mongoosejs.net/docs/api.html#model_Model.aggregate)
