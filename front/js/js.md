---
title: JS
date: 2022-08-23
---

::: warning
**JS 基础**
:::

## JavaScript 组成

- ECMAScript
- DOM： 页面文档对象模型
- BOM： 浏览器对象模型

### DOM

1. 文档： 一个页面就是一个文档, DOM 中用 document 表示。
2. 元素： 页面中的所有标签都是元素, DOM 中使用 element 表示。
3. 节点： 网页中的所有内容都是节点(标签, 属性, 文本, 注释等), DOM 中使用 node 表示。

- 文档 -> 元素 -> 节点
- **DOM 把以上内容都看做是对象**

### **获取特殊元素**

- 获取 body 元素对象, document.body
- 获取 html 元素对象, document.documentElement

### **事件**

- 事件源
- 事件类型
- 事件处理程序

**执行事件步骤**

1. 获取事件源
2. 绑定事件
3. 添加事件处理程序（采取函数赋值形式）

| 鼠标事件    |   触发条件   |
| ----------- | :----------: |
| onclick     | 鼠标点击左键 |
| onmouseover |   鼠标经过   |
| onmouseout  |   鼠标离开   |
| onfocus     | 获得鼠标焦点 |
| onblur      | 失去鼠标焦点 |
| onmousemove |   鼠标移动   |
| onmouseup   |   鼠标弹起   |
| onmousedown |   鼠标按下   |

### **操作元素**

**改变元素内容**

- element.innerText: 起始位置到终止位置的内容, 但它去除 html 标签, 同时空格和换行也会去掉
- element.innerHTML: 起始位置到终止位置的内容, 包括 html 标签, 同时保留空格和换行

**样式属性操作**

- element.style: 行内样式操作
- element.className: 类名样式操作

1. 样式采取驼峰式命名。修改 style 操作, 改变的是行内样式, CSS 权重比较高。
2. class 是保留字, 使用 className 来操作元素类名属性, 使用 className 会直接更改元素的类名, 会覆盖原先的类名。

**属性值**

- element.属性 获取/设置 属性值
- element.getAttribute('属性') => 获取属性值
- element.setAttribute('属性', '值') => 设置属性值： 主要针对自定义属性

**自定义属性**

- 目的： 保存并使用数据, 有些数据可以保存到页面中而不用保存到数据库中。
- 自定义属性通过 getAttribute('属性')获取。
- H5 规定自定义属性 data- 开头作为属性名并赋值。
- H5 新增获取自定义属性的方法, 事件源.dataset.属性名(ie11+), dataset 是一个集合, 里面存放了所有以 data-开头的自定义属性。

**节点**

- nodeType: 节点类型
- nodeName：节点名称
- nodeValue： 节点值

1. 元素节点 nodeType 为 1
2. 属性节点 nodeType 为 2
3. 文本节点 nodeType 为 3 (文本节点包含文字, 空格, 换行等)

- **父级节点： node.parentNode**

1. parentNode 属性返回某节点的父节点, 最近的一个父节点。
2. 如果指定的节点没有父节点则返回 null。

- **子节点**

#### parentNode.childNodes（标准)

1. 子节点 childNodes 所有的子节点包含元素节点, 文本节点等。
2. 通过 nodeType 来判断获取元素节点。

#### parentNode.children （非标准）（实际开发常用）

- parentNode.children 是一个只读属性, 返回所有的子元素节点。

#### parentNode.firstChild

- firstChild 返回第一个子节点, 找不到则返回 null, 包含所有节点（元素节点, 文本节点等）。

#### parentNode.lastChild

- lastChild 返回最后一个子节点, 找不到则返回 null, 包含所有节点（元素节点, 文本节点等）。

#### parentNode.firstElementChild (ie9+)

- firstElementChild 返回第一个子元素节点, 找不到则返回 null。

#### parentNode.lastElementChild (ie9+)

- lastElementChild 返回最后一个子元素节点, 找不到则返回 null。

**实际开发写法：没兼容性问题, '事件源'.children[index]**

**兄弟节点**

- node.nextSibling: 返回当前元素的下一个兄弟节点, 找不到则返回 null, 包含所有的节点（元素节点, 文本节点等）。
- node.previousSibling: 返回当前元素的上一个兄弟节点, 找不到则返回 null, 包含所有的节点（元素节点, 文本节点等）。
- node.nextElementSibling: 返回当前元素的下一个兄弟元素节点, 找不到则返回 null。（ie9+）
- node.previousElementSibling: 返回当前元素的上一个兄弟元素节点, 找不到则返回 null。（ie9+）

```JS
function getNextElementSibling(element) {
  var el = element;
  while(el = el.nextSibling) {
    if(el.nodeType === 1) {
      return el;
    }
  }
  return null;
}
```

**添加节点**

- document.createElement(): 创建节点元素节点
- node.appendChild(child): 将一个节点添加到指定父节点的子节点列表末尾。
- node.insertBefore(child, 指定元素): 将一个节点添加到父节点的指定子节点的前面。

**删除节点**

- node.removeChild(child)

**阻止 a 链接跳转需要添加 javascript:void(0);或者 javascript:;**

**复制节点(克隆节点)**

- node.cloneNode()

1. 如果括号参数为空或者为 false,则是浅拷贝,即只克隆复制节点本身,不克隆里面的子节点。
2. 括号为 true, 深拷贝, 复制标签复制里面的内容。

#### **三种动态创建元素区别**

- document.write(): 直接将内容写入页面的内容流, 但是文档流执行完毕, 则它会导致页面重绘。
- element.innerHTML
- document.createElement()： 创建多个元素, 效率稍低一点点, 但是结构更清晰。

1. innerHTML 将内容写入某个 DOM 节点, 不会导致页面全部重绘。
2. innerHTML 创建多个元素效率更高(不要拼接字符串, 采取数组形式拼接), 结构稍微复杂。

**不同浏览器下, innerHTML 效率要比 createElement 高**

### **事件**

#### **注册事件：传统方式和方法监听注册**

1. 传统方式： 利用 on 开头的事件 => 同一元素同一事件只能设置一个处理函数, 最后注册的处理函数会覆盖前面注册的处理函数。
2. 方法监听注册方式： addEventListener(),(IE9+), 之前的可使用 attachEvent()代替

- addEventListener 里面的事件类型是字符串, 必定加引号, 且不带 on
- addEventListener, 同一个元素, 同一个事件可以添加多个侦听器(事件处理程序)
- attachEvent(IE9 以前版本), 里面的事件类型是字符串, 必定加引号, 且带 on

**注册事件兼容性解决方案**

```JS
function addEventListener(element, eventName, fn){
  // 判断当前是否支持addEventListener方法
  if(element.addEventListener){
    element.addEventListener(eventName, fn);
  } else if(element.attachEvent){
    element.attachEvent('on'+ eventName, fn);
  } else {
    // 相当于element.onclik = fn;
    element['on' + eventName] = fn;
  }
}
```

#### **删除事件(解绑事件)**

1. 传统注册方式 => eventTarget.onclick = null;
2. 方法监听注册方式 => eventTarget.removeEventListener(type, listener[, useCapture])

**删除事件兼容性解决方案**

```JS
// fn函数需要单独声明
function removeEventListener(element, eventName, fn){
  // 判断当前是否支持removeEventListener方法
  if(element.removeEventListener){
    element.removeEventListener(eventName, fn);
  } else if(element.detachEvent){
    element.detachEvent('on'+ eventName, fn);
  } else {
    element['on' + eventName] = null;
  }
}
```

### **DOM 事件**

- **事件流**

1. 捕获阶段
2. 当前目标阶段
3. 冒泡阶段

```
a. JS 代码中只能执行捕获或者冒泡其中一个阶段。
b. onclick和attachEvent(ie) 只能得到冒泡阶段。
c. 捕获阶段, 如果addEventListener第三个参数为true, 那么则处于捕获阶段。
d. 冒泡阶段, 如果addEventListener第三个参数为false 或者省略, 那么则处于冒泡阶段。

注： onblur, onfocus, onmouseenter, onmouseleave等事件是没有冒泡的。
```

```javascript
Event.onclick = function(event){
  1. event就是一个事件对象, 写到侦听函数里，当形参使用
  2. 事件对象只有有了事件才会存在, 他是系统给我们自动创建的, 不需要我们传递参数
  3. 事件对象是我们事件一系列相关数据的集合, 跟事件相关。
  4. 事件对象是形参， 可以自己命名。如： e, evt等
  5. 事件对象兼容性问题, ie678 通过window.event兼容性写法 e = e || window.event;
}
```

| 鼠标对象属性方法    |                               说明                                |
| ------------------- | :---------------------------------------------------------------: |
| e.target            |                    返回触发事件的对象（标准）                     |
| e.srcElement        |                   返回触发事件的对象（非标准）                    |
| e.type              |            返回事件的类型, 如 click, mouseover 不带 on            |
| e.cancelBubble      |                 该属性阻止冒泡, 非标准 ie6-8 使用                 |
| e.returnValue       | 该属性阻止默认事件（默认行为）非标准 ie6-8 使用, 比如不让链接跳转 |
| e.preventDefault()  |       该方法阻止默认事件（默认行为）标准, 比如不让链接跳转        |
| e.stopPropagation() |                           阻止冒泡 标准                           |

- e.target 返回的是触发事件的对象（元素）, this 返回的是绑定事件的对象（元素）
- 区别： e.target 点击了那个元素就返回哪个元素, this 哪个元素绑定了这个点击事件就返回谁。

**阻止事件冒泡的兼容性解决方案**

```js
if (e && e.stopPropagation) {
  e.stopPropagation()
} else {
  window.event.cancelBubble = true
}
```

**常用的鼠标事件**

```js
禁止鼠标右键菜单
contextmenu主要控制应该何时显示上下文菜单（用于取消默认的上下文菜单）
document.addEventListener('contextmenu', function(e){
  e.preventDefault();
});

禁止鼠标选中（selectstart 开始选中）
禁止选中文字
document.addEventListener('selectstart', function(e){
  e.preventDefault();
});

```

**鼠标事件对象 MouseEvent 和 键盘事件对象 KeyboardEvent**

| 鼠标事件对象 |                   说明                   |
| ------------ | :--------------------------------------: |
| e.clientX    |  返回鼠标相对于浏览区可视区域的 X 坐标   |
| e.clientY    |  返回鼠标相对于浏览区可视区域的 Y 坐标   |
| e.pageX      | 返回鼠标相对于文档页面的 X 坐标 （IE9+） |
| e.pageY      | 返回鼠标相对于文档页面的 Y 坐标 （IE9+） |
| e.screenX    |     返回鼠标相对于电脑屏幕的 X 坐标      |
| e.screenY    |     返回鼠标相对于电脑屏幕的 Y 坐标      |

| 键盘事件   |                           触发条件                            |
| ---------- | :-----------------------------------------------------------: |
| onkeyup    |                   某个键盘按键被松开时触发                    |
| onkeydown  |                   某个键盘按键被按下时触发                    |
| onkeypress | 某个键盘按键被按下时触发（不识别功能键, ctrl, shift, 箭头等） |

- 执行顺序： keydown -> keypress -> keyup
- 键盘事件对象中的 keyCode 属性可以得到相应的 ASCII 码值。
- keydown 与 keyup 不区分字母大小写, keypress 区分

- 注： keydown 与 keypress 在文本框里面的特点： 他们两个事件触发的时候, 文字还没落入文本框, keyup 事件触发的时候, 文字已经落入文本框里面

### **BOM**

- 浏览器对象模型, 提供了独立于内容而与浏览器窗口进行交互的对象, 其核心对象是 window
- BOM 比 DOM 更大, 它包含 DOM。

**window**

1. document
2. location
3. navigation
4. screen
5. history

**window 对象是浏览器的顶级对象**

1. 它是 JS 访问浏览器窗口的一个接口。
2. 它是一个全局对象。定义在全局作用域中的变量, 函数都会变成 window 对象的属性和方法。

- window 调用时可以省略, window 下一个特殊属性 window.name

#### **window 对象常见事件**

**窗口加载事件**

```JS
window.onload = function(){}
或者
window.addEventListener("load", function(){});

window.onload是窗口(页面)加载事件, 当文档内容完全加载完成会触发该事件(包括图像,脚本文件,CSS文件等), 就调用的处理函数。
window.onload传统注册事件方式只能写一次, 如果有多个, 会以最后一个window.onload为准。
如果使用 addEventListener 则没有限制。

document.addEventListener('DOMContentLoaded', function(){});
DOMContentLoaded事件触发时, 仅当DOM加载完成, 不包括样式表, 图片, flash等等。(ie9+)
```

**窗口大小事件**

```JS
window.onresize = function(){}

window.addEventListener("resize", function(){});

window.onresize 是调整窗口加载事件。
利用这个事件完成响应式布局。window.innerWidth: 当前屏幕宽度。
```

#### **JS 执行机制**

**同步任务**

- 同步任务都在主线程上执行, 形成一个执行栈。

**异步任务**

- JS 的异步是通过回调函数实现的。
  一般而言, 异步任务有一下三种类型

1. 普通事件, click, resize 等。
2. 资源加载, load, error 等。
3. 定时器, setTimeout, setInterval 等。

```
a. 先执行执行栈中的同步任务。
b. 异步任务（回调函数）放入任务队列中。
c. 一旦执行栈中的所有同步任务执行完毕, 系统就会按次序读取任务队列中的异步任务, 于是被读取的异步任务结束等待状态, 进入执行栈, 开始执行。

由于主线程不断的获得任务, 执行任务, 再获取任务, 再执行, 所以这种机制被称为事件循环。
```

#### **location 对象**

- window 对象给我们提供了一个 location 属性用于获取或设置窗体的 URL, 并且可以用于解析 URL。这个属性返回的是一个对象, 所以将这个属性也称为 location 对象。

**URL**

- 统一资源定位符： 一般语法格式: protocol://host[:port]/path/[?query]#fragment
  | 组成 | 说明 |
  | ------------ | :--------------------------------------: |
  | protocol | 通信协议 常用的 http,ftp,maito 等 |
  | host | 主机(域名) |
  | port | 端口号（可选）, 使用时使用方案默认端口, 如 http 默认端口 80 |
  | path | 路径 由零或多个 '/' 符号隔开的字符串, 一般用来表示主机上的一个目录或文件地址 |
  | query | 参数 以键值对的形式通过 & 符号分隔开来 |
  | fragment | 片段 #后面内容 常见于链接 锚点 |

| location 对象属性 |               返回值               |
| ----------------- | :--------------------------------: |
| location.href     |         获取或设置整个 URL         |
| location.host     |             主机(域名)             |
| location.port     |  返回端口号, 如果未写返回空字符串  |
| location.pathName |              返回路径              |
| location.search   |              返回参数              |
| location.hash     | 返回片段 #后面内容 常见于链接 锚点 |

| location 对象方法  |                                 作用                                 |
| ------------------ | :------------------------------------------------------------------: |
| location.assign()  |     跟 href 一样, 可以跳转页面(也称为重定向页面) , 可以实现后退      |
| location.replace() |            替换当前页面, 因为不记录历史, 所以不能后退页面            |
| location.reload()  | 重新加载页面, 相当于刷新按钮或者 f5 如果参数为 true 强制刷新 ctrl+f5 |

**navigator 对象**

- 包含有关浏览器的信息, 常用 userAgent, 该属性可以返回由客户发送服务器的 user-agent 头部的值

```js
if (
  navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|WOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
) {
  window.location.href = '' // 手机
} else {
  window.location.href = '' // 电脑
}
```

**history 对象**

- window 对象提供一个 history 对象, 与浏览器历史记录进行交互。该对象包含用户（在浏览器窗口中）访问过的 URL。

  | history 对象方法 |                            作用                             |
  | ---------------- | :---------------------------------------------------------: |
  | back()           |                        可以后退功能                         |
  | forward()        |                          前进功能                           |
  | go(参数)         | 前进后退功能, 参数为 1 前进 1 个页面, 参数为-1 后退一个页面 |

### **元素偏移量 offset**

- 使用 offset 系列相关属性可以动态的得到元素的位置（偏移）, 大小等。

1. 获得元素距离带有定位父元素的位置。
2. 获得元素自身的大小（宽高）。
3. 注：返回的数值都不带单位。

| offset 系列属性      |                            作用                            |
| -------------------- | :--------------------------------------------------------: |
| element.offsetParent | 返回该元素带有定位的父级元素 如果父级都没有定位则返回 body |
| element.offsetTop    |            返回元素相对带有定位父元素上方的偏移            |
| element.offsetLeft   |           返回元素相对带有定位父元素左边框的偏移           |
| element.offsetWidth  | 返回自身包括 padding, 边框, 内容区的宽度, 返回数值不带单位 |
| element.offsetHeight | 返回自身包括 padding, 边框, 内容区的高度, 返回数值不带单位 |

- offset

1. offset 可以得到任意样式表中的样式表
2. offset 系列获得的数值是没有单位的
3. offsetWidth 包含 padding+border+width
4. offsetWidth 等属性是只读属性, 只能获取不能复制
5. 获取元素大小位置, 用 offset 更合适

- style

1. style 只能得到行内样式表中的样式值。
2. style.width 获得的是带有单位的字符串。
3. style.width 获得不包含 padding 和 border 的值。
4. style.width 是可读写属性, 可以获取也可以赋值。
5. 想要给元素更改值, 则需要用 style 改变。

### **元素可视区 client**

- 使用 client 系列相关属性来获取元素可视区域相关信息, 通过 client 系列相关属性可以动态得到该元素边框大小, 元素大小等。

| client 系列属性      |                               作用                               |
| -------------------- | :--------------------------------------------------------------: |
| element.clientTop    |                        返回元素上边框大小                        |
| element.clientLeft   |                        返回元素左边框大小                        |
| element.clientWidth  | 返回自身包括 padding, 内容区域的宽度, 不含边框, 返回数值不带单位 |
| element.clientHeight | 返回自身包括 padding, 内容区域的高度, 不含边框, 返回数值不带单位 |

```JS
// flexible
(function flexible(window,document){
  // 获取的html的根元素
  var docEl = document.documentElement;
  // 获取物理像素比
  var dpr = document.devicePixelRatio || 1;

  // 设置body字体大小
  function setBodyFontSize(){
    if(document.body){
      document.body.style.fontSize = (12 * dpr) + 'px';
    } else {
      // 如果页面没有body元素, 则等着我们页面主要DOM元素加载完毕再去设置body字体大小
      document.addEventListener('DOMContentLoaded', setBodyFontSize)
    }
  }

  setBodyFontSize();

  //  设置html文字大小
  function setRemUnit(){
    var rem = docEl.clientWidth / 10;
    docEl.style.fontSize = rem + 'px';
  }

  setRemUnit();

  // 页面大小发生变化, 重新设置rem的大小
  window.addEventListener('resize', setRemUnit);

  // 重新加载页面触发的事件
  window.addEventListener('pageshow', function(e){
    // pageshow会在load事件触发后触发, 根据事件对象中的persisted来判断是否是缓存中的页面触发的pageshow事件
    if(e.persisted){
      // e.persisted为true, 就是说这个页面如果是缓存取过来的页面, 也需要重新计算一下rem的大小
      setRemUnit();
    }
  })

  // 有些移动端的浏览器不支持0.5像素的写法
  if(dpr >= 2){
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = '.5px solid transparent';
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if(testElement.offsetHeight === 1){
      docEl.classList.add('hairlines')
    }
    docEl.removeChild(fakeBody);
  }
})(window,document);
```

### **元素 scroll 系列属性**

- scroll 相关属性可以动态的得到元素的大小, 滚动距离等。
  | scroll 系列属性 | 作用 |
  | ------------------- | :--------------------------------------------------------------: |
  | element.scrollTop | 返回被卷去的上侧距离, 数值不带单位 |
  | element.scrollLeft | 返回被卷去的左侧距离, 数值不带单位 |
  | element.scrollWidth | 返回自身实际宽度, 不含边框, 返回数值不带单位 |
  | element.scrollHeight | 返回自身实际高度, 不含边框, 返回数值不带单位 |

```JS
// 页面被卷去的头部兼容性解决
1. 声明了DTD, 使用document.documentElement.scrollTop;
2. 未声明DTD, 使用document.body.scrollTop;
3. 可以通过 window.pageYOffset 获得, 左侧 window.pageXOffset (ie9+);

function getScroll(){
  return {
    left: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,
    top: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
}
```

1. offset 系列经常用于获得元素位置 offsetLeft, offsetTop。
2. client 经常用于获取元素大小 clientWidth, clientHeight。
3. scroll 经常用于获取滚轮距离 scrollTop, scrollLeft。
4. 页面滚动距离通过 window.pageXOffset 获得。

**mouseenter 鼠标事件**

- 当鼠标移动到元素上时就会触发 mouseenter 事件。
- 类似 mouseover, 两者之间差别是：mouseover 鼠标经过自身盒子会触发, mouseenter 只会经过自身盒子触发。（因为 mouseenter 不会冒泡）
- 跟 mouseenter 搭配, 鼠标离开 mouseleave 同样不会冒泡。

### **动画**

```js
利用定时器实现滚动

function animate(obj, target, callback) {
  clearInterval(obj.timer)
  obj.timer = setInterval(function () {
    var step = (target - obj.offsetLeft) / 10
    step = step > 0 ? Math.ceil(step) : Math.floor(step)
    if (obj.offsetLeft == target) {
      clearInterval(obj.timer)
      callback && callback()
    }
    obj.style.left = obj.offsetLeft + step + 'px'
  }, 15)
}
```

**轮播无缝滚动**

- 声明一个变量 num, 点击一次自增 1, 此变量乘以图片宽度, 就是滚动距离。
- 第一份图片克隆（cloneNode(), true(深克隆), false(浅克隆)）一份放到最后面（放到最后面的 appendChild）。
- 当图片滚动到克隆的最后一张时, 让容器快速的, 不做动画的跳到最左侧： left 为 0。
- 当 num 赋值为 0 时, 可以重新开始滚动图片。

**节流阀**

- 防止轮播图按钮连续点击造成播放过快。
- 目的： 当上一个函数动画内容执行完毕, 再去执行下一个函数动画, 让事件无法连续触发。
- 核心思路： 利用回调函数, 添加一个变量来控制, 锁住函数和解锁函数。

1. 设置一个变量 var flag = true;
2. if(flag){flag = false; ....}; 关闭水龙头
3. 利用回调函数, 动画执行完毕, flag = true; 打开水龙头

**返回顶部**

1. 利用上面滚动函数, 将所有 left 相关的值改为跟页面垂直滚动距离相关就可以了。
2. 页面滚动多少, 可以通过 window.pageYOffset 得到。
3. 页面滚动使用, window.scroll(x,y)。

### **移动端**

- 触屏事件

  | 触屏 touch 事件 |              说明               |
  | --------------- | :-----------------------------: |
  | touchstart      |  手指触摸到一个 DOM 元素时触发  |
  | touchmove       | 手指在一个 DOM 元素上滑动时触发 |
  | touchend        | 手指从一个 DOM 元素上移开时触发 |

- 触摸事件对象（TouchEvent）

  | 触屏列表       |                       说明                       |
  | -------------- | :----------------------------------------------: |
  | touches        |         正在触摸屏幕的所有手指的一个列表         |
  | targetTouches  |   正在触摸当前 DOM 元素的手指的一个列表 (常用)   |
  | changedTouches | 手指状态发生了改变的列表, 从无到有, 从有到无变化 |

- 移动端拖动元素

  1. 拖动元素需要当前手指坐标值, 可以使用 targetTouches[0]里面的 pageX 和 pageY。
  2. 移动端拖动原理, 手指移动过程中计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离。
  3. 手指移动的距离: 手指滑动中的位置减去手指刚开始触摸的位置。

- 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置。
- 移动手指 touchmove: 计算手指的滑动距离, 并且移动盒子。
- 离开手指 touchend:

注： 手指移动也会触发滚动屏幕, 所以这里要阻止默认的屏幕滚动 e.preventDefault();

- 移动端切换 class

1. xx.classList.add()
2. xx.classList.remove()
3. xx.classList.toggle()

- 移动端点击事件 300ms 延时问题, 原因是移动端屏幕双击会缩放页面。
  解决方案：

1. 禁用缩放, 浏览器禁用默认的双击缩放行为并且去掉 300ms 的点击延迟。

```html
<meta name="viewport" content="user-scalable=no" />
```

2. 利用 touch 事件封装解决 300ms 延迟。

```
原理：
1. 当手指触摸屏幕, 记录当前触摸时间。
2. 当手指离开屏幕, 用离开的时间减去触摸的时间。
3. 如果时间小于150ms, 并且没有滑动过屏幕, 那么就定义为点击。
```

```JS
function tap(obj, callback){
  var isMove = false;
  var startTime = 0; // 记录触摸时候的时间变量

  obj.addEventListener("touchstart", function(e) {
    startTime = Date.now(); // 记录触摸时间
  });

  obj.addEventListener("touchmove", function(e) {
    isMove = true; // 看看是否有滑动, 有滑动算拖拽, 不算点击
  });

  obj.addEventListener("touchend",function(e){
    if(!isMove && (Date.now() - startTime) < 150) {
      // 如果手指触摸和离开时间小于150ms算点击
      callback && callback(); // 执行回调
    }
    isMove = false; // 重置
    startTime = 0;
  });
}
```

3. 使用插件, fastclick 插件解决 300ms 延迟
