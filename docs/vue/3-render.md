# render 函数

Vue 的 `_render` 方法是实例的一个私有方法，它用来把实例渲染成一个虚拟 Node。接下来分析下面的源码：

```javascript
Vue.prototype._render = function(): VNode {
  const vm: Component = this;
  const { render, _parentVnode } = vm.$options;
  // .....

  // .....
  vm.$vnode = _parentVnode;
  // render self
  let vnode;
  try {
    vnode = render.call(vm._renderProxy, vm.$createElement);
  } catch (e) {
    // .....
  }
  // set parent
  vnode.parent = _parentVnode;
  return vnode;
};
```

这段代码最关键的是 `render` 方法的调用，在平时的开发工作中手写 `render` 方法的场景比较少，而写的比较多的是 `template` 模板，在之前的 `mounted` 方法的实现中，会把 `template` 编译成 `render` 方法。

在 Vue 的官方文档中介绍了 `render` 函数的第一个参数是 `createElement`，那么结合之前的例子：

```html
<div id="app">
  {{ message }}
</div>
```

相当于我们编写如下 `render` 函数：

```js
render: function (createElement) {
  return createElement('div', {
     attrs: {
        id: 'app'
      }
  }, this.message)
}
```

再回到 `_render` 函数中的 `render` 方法的调用：

```js
vnode = render.call(vm._renderProxy, vm.$createElement);
```

其中`vm._renderProxy`的定义在`this._init(vm)`中，与实际的环境有关系：![vm._renderProxy](/imgs/vue/vm._renderProxy.png)

如果当前为开发环境，走`initProxy(vm)`逻辑，将对开发中`render`函数执行出现的错误在控制台予以提示，生产环境即为`vm`实例。可以看到，`render` 函数中的 `createElement` 方法就是 `vm.$createElement` 方法：

```js
export function initRender(vm: Component) {
  // ...
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
}
```

实际上，`vm.$createElement` 方法定义是在执行 `initRender` 方法的时候，可以看到除了 `vm.$createElement` 方法，还有一个 `vm._c` 方法，它是被模板编译成的 `render` 函数使用，而 `vm.$createElement` 是用户手写 `render` 方法使用的， 这俩个方法支持的参数相同，并且内部都调用了 `createElement` 方法。

### 总结

`vm._render` 最终是通过执行 `createElement` 方法并返回的是 `vnode`，它是一个虚拟 `Node`。
