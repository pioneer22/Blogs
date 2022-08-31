---
title: SASS
date: 2022-08-22
---

::: warning
**node-sass**
:::

```
单文件编译
node-sass 原有的scss文件 生成的css文件
node-sass 原有的scss文件 -o 生成目录

多文件编译
node-sass 原有的scss文件目录 -o 生成的css文件目录

文件监听模式
上面语句加上 -w
```

# 一、注释

1. Sass 支持标准的 CSS 多行注释 `/* */`，以及单行注释 `//`，前者会被完整输出到编译后的 CSS 文件中，而后者则不会。
2. 将 `!` 作为多行注释的第一个字符表示在压缩输出模式下保留这条注释并输出到 CSS 文件中，通常用于添加版权信息。
3. 插值语句 (interpolation) 也可写进多行注释中输出变量值。

# 二、变量

1. 变量以美元$符号开头, 使用变量名称调用变量。
2. 变量支持块级作用域，嵌套规则内定义的变量只能在嵌套规则内使用（局部变量），不在嵌套规则内定义的变量则可在任何地方使用（全局变量）。将局部变量转换为全局变量可以添加 `!global` 声明。

```SCSS
$color: rgba(#ffffff, 0.3);

#global {
  $color: #ffffff !global;
  color: $color;
}

#container {
  color: $color;
}
```

# 三、数据类型

sass 支持七种主要的数据类型:

- 数字，`1, 2, 10, 10px`
- 字符串，有引号字符串与无引号字符串，`"one", 'two', three`
- 颜色，`red, #ff0000, rgba(255,0,0,0.5)`
- 布尔型，`true, false`
- 空值，`null`
- 数组 (list)，用空格或逗号作分隔符，`1.5em 1em 0 2em, Helvetica, Arial, sans-serif`
- maps, 相当于 JavaScript 的 object，`(key1: value1, key2: value2)`

```
Sass也支持其他 CSS 属性值，比如 Unicode 字符集，或 `!important` 声明。然而 Sass 不会特殊对待这些属性值，一律视为无引号字符串。

判断数据类型的方式：`type-of($value)`

字符串：支持 CSS 的两种字符串类型：`有引号字符串 (quoted strings)`，和`无引号字符串 (unquoted strings)`。
在编译 CSS 文件时不会改变其类型。只有一种情况例外，使用 `#{}` (interpolation) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名

数字： 支持两种数字类型：`带单位数字`和`不带单位数字`。 例： 120px, 120
单位会和数字当做一个整体，进行算数运算

空值： 只有一个取值`null`
由于它代表空，所以不能够使用它与任何类型进行算数运算

布尔值： 只有两个取值：`true`和`false`
只有自身是 false 和 null 才会返回 false，其他一切都将返回 true

数组： 通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。索引从`1`开始

映射： Maps 必须被圆括号包围，可以映射任何类型键值对。(不推荐)
例：
$map: (
$key1: value1,
$key2: value2
)

颜色： CSS 原有颜色类型，十六进制、RGB、RGBA、HSL、HSLA 和色彩单词
例：
$color0: green;
$color1: lighten($color, 15%);
$color2: darken($color, 15%);
$color3: saturate($color, 15%);
$color4: desaturate($color, 15%);
$color5: (green + red);
```

# 四、运算

支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值
如果要保留运算符号，则应该使用插值语法如果要保留运算符号，则应该使用插值语法

```SCSS
加：+
例：
 // 纯数字
  $add1: 1 + 2;	// 3
  $add2: 1 + 2px; // 3px
  $add3: 1px + 2; // 3px
  $add4: 1px + 2px;//3px

  // 纯字符串
  $add5: "a" + "b"; // "ab"
  $add6: "a" + b;	  // "ab"
  $add7: a + "b";	  // ab
  $add8: a + b;	  // ab

  // 数字和字符串
  $add9: 1 + a;	// 1a
  $adda: a + 1;	// a1
  $addb: "1" + a; // "1a"
  $addc: 1 + "a"; // "1a"
  $addd: "a" + 1; // "a1"
  $adde: a + "1"; // a1
  $addf: 1 + "1"; // "11"

a. 纯数字：只要有单位，结果必有单位
b. 纯字符串：第一个字符串有无引号决定结果是否有引号
c. 数字和字符串：第一位有引号，结果必为引号；第一位对应数字非数字且最后一位带有引号，则结果必为引号
```

```SCSS
减：-
例：
  $add1: 1 - 2;	// -1
  $add2: 1 - 2px; // -1px
  $add3: 1px - 2; // -1px
  $add4: 1px - 2px;//-1px

  $sub1: a - 1;  // a-1
  $sub2: 1 - a;  // 1-a
  $sub3: "a" - 1;// "a"-1
  $sub4: a - "1";// a-"1"

a. 每个字段必须前部分为数字，且两个字段只能一个后部分是字符(因为此时后缀被当被单位看待了)。
b. 只要其中一个值首位不为数字的，结果就按顺序去除空格后拼接起来
```

```SCSS
乘： *
例：
  $num1: 1 * 2;    // 2
  $mul2: 1 * 2px;  // 2px
  $num3: 1px * 2;  // 2px
  $num4: 2px * 2px;// 编译不通过

  $num5: 1 * 2abc; // 2abc

  每个字段必须前部分为数字，且两个字段只能一个后部分是字符(因为此时后缀被当被单位看待了)。其余编译不通过
```

```SCSS
除： /
a. 不会四舍五入，精确到小数点后5位
b. 每个字段必须前部分为数字，且当前者只是单纯数字无单位时，后者(除数)后部分不能有字符。其余结果就按顺序去除空格后拼接起来。
  (因为此时后缀被当被单位看待了)
```

```SCSS
取余： %
值与"%"之间必须要有空格，否则会被看做字符串
```

```SCSS
运算符

大前提：两端必须为`数字` 或 `前部分数字后部分字符`
返回值：`true` or `false`

'>'
 $a: 1 > 2; // false

 '<'
 $a: 1 < 2; // true

'>='
 $a: 1 >= 2; // false

 '<='
 $a: 1 <= 2; // true

作用范围：相等运算 `==, !=` 可用于所有数据类型
返回值：`true` or `false`
前部分为不带引号数字时，对比的仅仅是数字部分；反之，忽略引号，要求字符一一对应
$a: 1 == 1px; // true
$b: "a" == a; // true

Sass 支持布尔型的 `and` `or` 以及 `not` 运算。
值与"and"、"or"和"not"之间必须要有空格，否则会被看做字符串
$a: 1>0 and 0>=5; // fasle

颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值
div{
    color: #010203 + #040506;
    background-color: #010203 * 2;
}
// 计算 01 + 04 = 05 02 + 05 = 07 03 + 06 = 09
// 计算 01 * 2 = 02 02 * 2 = 04 03 * 2 = 06
div {
    color: #050709;
    background-color:#020406;
}

如果颜色值包含 alpha channel（rgba 或 hsla 两种颜色值），必须拥有相等的 alpha 值才能进行运算，因为算术运算不会作用于 alpha 值。
  div {
    color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
  }
  // 编译为：
  div {
    color: rgba(255, 255, 0, 0.75);
  }

运算优先级
1. ()
2. *, / , %
3. +, -
4. >, <, >=, <=

```

# 五、语法

1. 通过 `#{}` 插值语句可以在选择器、属性名和属性值中使用变量。
2. 但大多数情况下，这样使用属性值可能还不如直接使用变量方便，但是使用 `#{}` 可以避免 Sass 运行运算表达式，直接编译 CSS。

```scss
$name: foo;
$attr: border;
p.#{$name} {
  #{$attr}-color: $name;
}
// 编译后：
p.foo {
  border-color: foo;
}

// &为父选择器
a {
  color: yellow;
  &:hover {
    color: green;
  }
  &:active {
    color: blank;
  }
}

!default: 可以在变量的结尾添加 ` !default` 给一个未通过 `!default` 声明赋值的变量赋值，此时，如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。;

$content: "First content";
$content: "Second content?" !default;
$new_content: "First time reference" !default;

#main {
  content: $content;
  new-content: $new_content;
}

// 编译为：
#main {
  content: "First content";
  new-content: "First time reference";
}
~~~

注意：变量是 null 空值时将视为未被 `!default` 赋值。

!global：将局部变量提升为全局变量。

!optional
如果 `@extend` 失败会收到错误提示，比如，这样写 `a.important {@extend .notice}`，当没有 `.notice` 选择器时，将会报错，只有 `h1.notice` 包含 `.notice` 时也会报错，因为 `h1` 与 `a` 冲突，会生成新的选择器。
如果要求 `@extend` 不生成新选择器，可以通过 `!optional` 声明达到这个目的.
简而言之：当`@extend`相关代码出现语法错误时，编译器可能会给我们"乱"编译为css，我们加上这个参数可以在出现问题后不让他编译该部分代码
```

# 六、 @-Rules 与指令

1. Sass 拓展了 `@import` 的功能，允许其导入 SCSS 或 SASS 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可。
2. 通常，`@import` 寻找 Sass 文件并将其导入，但在以下情况下，`@import` 仅作为普通的 CSS 语句，不会导入任何 Sass 文件。

- 文件拓展名是 `.css`；
- 文件名以 `http://` 开头；
- 文件名是 `url()`；
- `@import` 包含 media queries。

如果不在上述情况内，文件的拓展名是 `.scss` 或 `.sass`，则导入成功。没有指定拓展名，Sass 将会试着寻找文件名相同，拓展名为 `.scss` 或 `.sass` 的文件并将其导入。

```SCSS
// 以下两种方式均可
@import "foo.scss";
@import "foo";

// 以下方式均不可行
@import "foo.css";
@import "foo" screen;
@import "http://foo.com/bar";
@import url(foo);

// Sass 允许同时导入多个文件，例如同时导入 rounded-corners 与 text-shadow 两个文件
@import "rounded-corners", "text-shadow";
```

导入文件也可以使用 `#{ }` 插值语句，但不是通过变量动态导入 Sass 文件，只能作用于 CSS 的 `url()` 导入方式

1. 如果你有一个 SCSS 或 Sass 文件需要引入， 但是你又不希望它被编译为一个 CSS 文件， 这时，你就可以在文件名前面加一个下划线，就能避免被编译。 这将告诉 Sass 不要把它编译成 CSS 文件。 然后，你就可以像往常一样引入这个文件了，而且还可以省略掉文件名前面的下划线。
2. 除此之外，还支持嵌套 @import,但是不可以在混合指令 (mixin) 或控制指令 (control directives) 中嵌套 `@import`。

```scss
$family: unquote('Droid+Sans');
@import url('http://hupu.com/css?family=\#{$family}');

// 编译为：
@import url('http://hupu.com/css?family=Droid+Sans');
```

@media：Sass 中 `@media` 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 `@media` 嵌套在 CSS 规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 `@media` 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}
// 编译为
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

`@media`的 queries 允许互相嵌套使用，编译时，Sass 自动添加 `and`

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
// 编译为：
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

`@media` 甚至可以使用 SassScript（比如变量，函数，以及运算符）代替条件的名称或者值

```scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
// 编译为：
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px;
  }
}
```

1. `@extend`即`继承`。在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。
2. 支持层叠继承、多继承、允许延伸任何定义给单个元素的选择器（但是允许不一定好用）

```scss
.error {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
// 上面代码的意思是将 .error 下的所有样式继承给 .seriousError，border-width: 3px; 是单独给 .seriousError 设定特殊样式，这样，使用 .seriousError 的地方可以不再使用 .error。
// `@extend` 的作用是将重复使用的样式 (`.error`) 延伸 (extend) 给需要包含这个样式的特殊样式（`.seriousError`）
.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}
.seriousError {
  border-width: 3px;
}
```

当两个列合并时，如果没有包含相同的选择器，将生成两个新选择器：第一列出现在第二列之前，或者第二列出现在第一列之前

```scss
#admin .tabbar a {
  font-weight: bold;
}
#demo .overview .fakelink {
  @extend a;
}
// 编译为：
#admin .tabbar a,
#admin .tabbar #demo .overview .fakelink,
#demo .overview #admin .tabbar .fakelink {
  font-weight: bold;
}
```

如果两个列包含了相同的选择器，相同部分将会合并在一起，其他部分交替输出

```scss
#admin .tabbar a {
  font-weight: bold;
}
#admin .overview .fakelink {
  @extend a;
}
// 编译为
#admin .tabbar a,
#admin .tabbar .overview .fakelink,
#admin .overview .tabbar .fakelink {
  font-weight: bold;
}
```

在指令中使用 `@extend` 时（比如在 `@media` 中）有一些限制：Sass 不可以将 `@media` 层外的 CSS 规则延伸给指令层内的 CSS.

1. `%placeholder`为选择器占位符，配合`@extend-Only选择器`使用。
2. 效果：只定义了样式，但不会对原有选择器匹配的元素生效

```scss
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
.notice {
  @extend %extreme;
}

// 编译后：
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

```
@debug: 用于调试，按标准错误输出流输出
@warn: 用于警告，按标准错误输出流输出
@error: 用于报错，按标准错误输出流输出
```

| 序列 | @-rules  | 作用                               |
| ---- | -------- | ---------------------------------- |
| 1    | @import  | 导入 sass 或 scss 文件             |
| 2    | @media   | 用于将样式规则设置为不同的媒体类型 |
| 3    | @extend  | 以继承的方式共享选择器             |
| 4    | @at-root | 转到根节点                         |
| 5    | @debug   | 用于调试，按标准错误输出流输出     |
| 6    | @warn    | 用于警告，按标准错误输出流输出     |
| 7    | @error   | 用于报错，按标准错误输出流输出     |

# 七、控制指令

if(): 三元运算符, 表达式：`if(expression, value1, value2)`

```scss
p {
  color: if(1 + 1 = 2, green, yellow);
}

// 编译为：
p {
  color: green;
}
```

@if: 条件语句

1. 当 `@if` 的表达式返回值不是 `false` 或者 `null` 时，条件成立，输出 `{}` 内的代码
2. `@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明

```scss
// @if
@if 1 + 1 == 2 {
  color: red;
}
// 编译为:
p {
  color: red;
}

// @if - @else
p {
  @if 1 + 1 != 2 {
    color: red;
  } @else {
    color: blue;
  }
}
// 编译为:
p {
  color: blue;
}

// @if - @else if - @else
p {
  @if $age == 18 {
    color: red;
  } @else if $age == 19 {
    color: blue;
  } @else {
    color: green;
  }
}
// 编译为:
p {
  color: blue;
}
```

@for 循环语句 => 表达式：`@for $var from <start> through <end>` 或 `@for $var from <start> to <end>`。

```
through 和 to 的相同点与不同点：

相同点：两者均包含<start>的值
不同点：through 包含<end>的值，但 to 不包含<end>的值
```

```scss
@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

// 编译为:
.item-1 {
  width: 2em;
}
.item-2 {
  width: 4em;
}
.item-3 {
  width: 6em;
}
```

@while: 循环语句, 表达式：`@while expression`;

- `@while` 指令重复输出格式直到表达式返回结果为 `false`。这样可以实现比 `@for` 更复杂的循环，只是很少会用到

```scss
$i: 6;
@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}

// 编译为:
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

@each： 循环语句, 表达式：`$var in $vars`

- `$var` 可以是任何变量名
- `$vars` 只能是`Lists`或者`Maps`

```scss
// 一维列表
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}

// 编译为:
.puma-icon {
  background-image: url('/images/puma.png');
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
}
.egret-icon {
  background-image: url('/images/egret.png');
}
.salamander-icon {
  background-image: url('/images/salamander.png');
}

// 二位列表
@each $animal, $color, $cursor in (puma, black, default), (
    sea-slug,
    blue,
    pointer
  ), (egret, white, move)
{
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
    border: 2px solid $color;
    cursor: $cursor;
  }
}

// 编译为:
.puma-icon {
  background-image: url('/images/puma.png');
  border: 2px solid black;
  cursor: default;
}
.sea-slug-icon {
  background-image: url('/images/sea-slug.png');
  border: 2px solid blue;
  cursor: pointer;
}
.egret-icon {
  background-image: url('/images/egret.png');
  border: 2px solid white;
  cursor: move;
}

// maps
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}

// 编译为:
h1 {
  font-size: 2em;
}
h2 {
  font-size: 1.5em;
}
h3 {
  font-size: 1.2em;
}
```

# 八、 混合指令

- 混合指令（Mixin）用于定义可重复使用的样式，避免了使用无语意的 class，比如 `.float-left`。混合指令可以包含所有的 CSS 规则，绝大部分 Sass 规则，甚至通过参数功能引入变量，输出多样化的样式。

这不是函数！没有返回值！

```scss
//  混合指令的用法是在 `@mixin` 后添加名称与样式，以及需要的参数（可选）。
@mixin name {
  // 样式....
}

// 使用 `@include` 指令引用混合样式，格式是在其后添加混合名称，以及需要的参数（可选）。
@include name;

// 无参数或参数都有默认值时，带不带括号都可以

// 参数
// 格式：按照变量的格式，通过逗号分隔，将参数写进Mixin名称后的圆括号里
// 支持默认值；支持多参数；支持不定参数；支持位置传参和关键词传参

// 位置传参
@mixin mp($width) {
  margin: $width;
}

body {
  @include mp(300px);
}

// 关键词传参
@mixin mp($width) {
  margin: $width;
}

body {
  @include mp($width: 300px);
}

// 不定参数
// 有时，不能确定混合指令需要使用多少个参数。这时，可以使用参数变量 `…` 声明（写在参数的最后方）告诉 Sass 将这些参数视为值列表处理

@mixin mar($value...) {
  margin: $value;
}

// 向混合样式中导入内容
/* 
在引用混合样式的时候，可以先将一段代码导入到混合指令中，然后再输出混合样式，额外导入的部分将出现在 `@content` 标志的地方，
可以看作参数的升级版 
*/

@mixin example {
  html {
    @content;
  }
}
@include example {
  background-color: red;
  .logo {
    width: 600px;
  }
}

// 编译为:
html {
  background-color: red;
}

html .logo {
  width: 600px;
}
```

# 九、 函数指令

### 字符串函数

- 索引第一个为 1，最后一个为-1；切片两边均为闭区间

| 函数名和参数类型                        |                   函数作用                    |
| :-------------------------------------- | :-------------------------------------------: |
| quote($string)                          |                   添加引号                    |
| unquote($string)                        |                   除去引号                    |
| to-lower-case($string)                  |                   变为小写                    |
| to-upper-case($string)                  |                   变为大写                    |
| str-length($string)                     |        返回$string 的长度(汉字算一个)         |
| str-index($string，$substring)          |        返回$substring在$string 的位置         |
| str-insert($string, $insert, $index)    |        在$string的$index 处插入$insert        |
| str-slice($string, $start-at, $end-at） | 截取$string的$start-at 和$end-at 之间的字符串 |

### 数字函数

| 函数名和参数类型        |                                  函数作用                                  |
| ----------------------- | :------------------------------------------------------------------------: |
| percentage($number)     |                              转换为百分比形式                              |
| round($number)          |                               四舍五入为整数                               |
| ceil($number)           |                                数值向上取整                                |
| floor($number)          |                                数值向下取整                                |
| abs($number)            |                                 获取绝对值                                 |
| min($number...)         |                                 获取最小值                                 |
| max($number...)         |                                 获取最大值                                 |
| random($number?:number) | 不传入值：获得 0-1 的随机数；传入正整数 n：获得 0-n 的随机整数（左开右闭） |

### 数组函数

| 函数名和参数类型                 |                                        函数作用                                        |
| -------------------------------- | :------------------------------------------------------------------------------------: |
| length($list)                    |                                      获取数组长度                                      |
| nth($list, n)                    |                                   获取指定下标的元素                                   |
| set-nth($list, $n, $value)       |                                向$list的$n 处插入$value                                |
| join($list1, $list2, $separator) |   拼接$list1和list2；$separator 为新 list 的分隔符，默认为 auto，可选择 comma、space   |
| append($list, $val, $separator)  | 向$list的末尾添加$val；$separator 为新 list 的分隔符，默认为 auto，可选择 comma、space |
| index($list, $value)             |                             返回$value值在$list 中的索引值                             |
| zip($lists…)                     |            将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的            |

### 映射函数

| 函数名和参数类型        |                 函数作用                 |
| ----------------------- | :--------------------------------------: |
| map-get($map, $key)     |       获取$map中$key 对应的$value        |
| map-merge($map1, $map2) |     合并$map1和$map2，返回一个新$map     |
| map-remove($map, $key)  |     从$map中删除$key，返回一个新$map     |
| map-keys($map)          |            返回$map所有的$key            |
| map-values($map)        |           返回$map所有的$value           |
| map-has-key($map, $key) | 判断$map中是否存在$key，返回对应的布尔值 |
| keywords($args)         |  返回一个函数的参数，并可以动态修改其值  |

### 颜色函数

- **RGB 函数**

  | 函数名和参数类型               |                                          函数作用                                          |
  | ------------------------------ | :----------------------------------------------------------------------------------------: |
  | rgb($red, $green, $blue)       |                                   返回一个 16 进制颜色值                                   |
  | rgba($red,$green,$blue,$alpha) | 返回一个 rgba；$red,$green 和$blue 可被当作一个整体以颜色单词、hsl、rgb 或 16 进制形式传入 |
  | red($color)                    |                                 从$color 中获取其中红色值                                  |
  | green($color)                  |                                 从$color 中获取其中绿色值                                  |
  | blue($color)                   |                                 从$color 中获取其中蓝色值                                  |
  | mix($color1,$color2,$weight?)  |                   按照$weight比例，将$color1 和$color2 混合为一个新颜色                    |

- **HSL 函数**

  | 函数名和参数类型                         | 函数作用                                                                              |
  | ---------------------------------------- | ------------------------------------------------------------------------------------- |
  | hsl($hue,$saturation,$lightness)         | 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色                |
  | hsla($hue,$saturation,$lightness,$alpha) | 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色 |
  | saturation($color)                       | 从一个颜色中获取饱和度（saturation）值                                                |
  | lightness($color)                        | 从一个颜色中获取亮度（lightness）值                                                   |
  | adjust-hue($color,$degrees)              | 通过改变一个颜色的色相值，创建一个新的颜色                                            |
  | lighten($color,$amount)                  | 通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色                                    |
  | darken($color,$amount)                   | 通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色                                    |
  | hue($color)                              | 从一个颜色中获取亮度色相（hue）值                                                     |

- **Opacity 函数**

  |                                                             |                  |
  | ----------------------------------------------------------- | ---------------- |
  | alpha($color)/opacity($color)                               | 获取颜色透明度值 |
  | rgba($color,$alpha)                                         | 改变颜色的透明度 |
  | opacify($color, $amount) / fade-in($color, $amount)         | 使颜色更不透明   |
  | transparentize($color, $amount) / fade-out($color, $amount) | 使颜色更加透明   |

### Introspection 函数

| 函数名和参数类型               |                            函数作用                             |
| ------------------------------ | :-------------------------------------------------------------: |
| type-of($value)                |                        返回$value 的类型                        |
| unit($number)                  |                       返回$number 的单位                        |
| unitless($number)              |            判断$number 是否带单位，返回对应的布尔值             |
| comparable($number1, $number2) | 判断$number1和$number2 是否可以做加、减和合并，返回对应的布尔值 |

### 自定义函数

- Params: 与 Mixin 一致
- 支持返回值

```scss
@function fn-name($params...) {
  @return nth($params, 1);
}
p {
  height: fn-name(1px);
}

// 编译为
p {
  height: 1px;
}
```

```
`minxins`在网络传输中比`@extend` 拥有更好的性能.尽管有些文件未压缩时更大，但使用`gzip`压缩后，依然可以保证我们拥有更好的性能。
所以@extend我们就尽量不要使用了，而@Mixin和@function的差别在定义和使用上。

定义方式不同： `@function` 需要调用`@return`输出结果。而 @mixin则不需要。
使用方式不同： `@mixin` 使用`@include`引用，而 `@function` 使用小括号执行函数。
```
