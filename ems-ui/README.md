
# To start
注册淘宝的npm镜像，加快依赖模块的下载速度，之后cnpm替换npm；
npm install -g cnpm --registry=http://registry.npm.taobao.org

``` bash
# install dependencies
# cd 进入项目的根目录执行下面命令安装依赖模块
cnpm install

# serve with hot reload at localhost:8080
# 执行下面的命令启动开发模式，修改之后自动刷新浏览器 默认端口8080
cnpm run dev

# build for production with minification
# 打包混淆，自动将ES6代码转换成ES5代码供目前的浏览器执行，目前的浏览器大多数不支持ES6
cnpm run build

```

# Folder structure
* build - webpack config files
* config - webpack config files
* dist - build
* src - app
    * api
    * assets
    * common
    * components - your vue components
    * mock
    * styles
    * views - your pages
    * vuex
    * App.vue
    * main.js - main file
    * routes.js
* static - static assets //图片一般放在这里


修改修改element源码：
			    导航菜单 el-menu 组件存在bug
				注意此处是elementUI的一个bug,必须修改elementUI的el-menu 组件代码，才会菜单收缩之后可以在一次展开！！！！
				修改59行和71行代码
				
			leave(el) {
            if (!hasClass(el, 'el-menu--collapse')) {
              addClass(el, 'horizontal-collapse-transition');
              el.style.width = '230px';//---------------------修改原码第一处① 59
            } else {
              addClass(el, 'horizontal-collapse-transition');
              el.style.width = el.dataset.scrollWidth + 'px';
            }
          },

          afterLeave(el) {
            removeClass(el, 'horizontal-collapse-transition');
            if (hasClass(el, 'el-menu--collapse')) {
              el.style.width = el.dataset.scrollWidth + 'px';
            } else {
              el.style.width = '230px';//----------------------修改原码第二处② 71
            }
            el.style.overflow = el.dataset.oldOverflow;
          }



             修改了element的一个bug：2207行
             node_modules/element-ui/lib/element-ui.common.js
            var dd = this.$slots.dropdown;
	        if(dd){
                var dropdownElm = dd[0].elm;
                dropdownElm.addEventListener('mouseenter', show);
                dropdownElm.addEventListener('mouseleave', hide);
			}










**********************************************************************************************************************************************
常用的组件库：
http://blog.csdn.net/zgrkaka/article/details/53897202

iviwui:https://www.iviewui.com/docs/guide/i18n

elementui:http://element-cn.eleme.io/#/zh-CN/component/dropdown

**********************************************************************************************************************************************
过渡动画transition :https://segmentfault.com/q/1010000007738500

注意确保在初始化根实例之前注册组件


**********************************************************************************************************************************************
1.父子组件通信的方式：https://www.cnblogs.com/zqzjs/p/6789232.html

**********************************************************************************************************************************************
2.disable
<button v-bind:disabled="isButtonDisabled">Button</button>
**********************************************************************************************************************************************
3.表达式，单个
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
**********************************************************************************************************************************************
4.
修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
<form v-on:submit.prevent="onSubmit">...</form>
**********************************************************************************************************************************************
5.
Vue.js 为 v-bind 和 v-on 这两个最常用的指令，提供了特定简写：
v-bind 缩写

<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>
v-on 缩写

<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>
**********************************************************************************************************************************************
6.然而，【不同的是计算属性是基于它们的依赖进行缓存的】。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
  这也同样意味着下面的计算属性将不再更新，因为 【Date.now() 不是响应式依赖】：
  computed: {
    now: function () {
      return Date.now()
    }
  }
  相比之下，每当 触发重新渲染时，调用方法将总会再次执行函数。
**********************************************************************************************************************************************
7.
<div id="demo">{{ fullName }}</div>
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
})
上面代码是命令式且重复的。将它与计算属性的版本进行比较：
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
好得多了，不是吗？
**********************************************************************************************************************************************
8.
2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。
**********************************************************************************************************************************************
9.父子通信-不使用vuex--【推荐使用的是vuex技术】
<div id="todo-list-example">
  <input
    v-model="newTodoText"
    v-on:keyup.enter="addNewTodo"
    placeholder="Add a todo"
  >
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
注意这里的 is="todo-item" 属性。这种做法在使用 DOM 模板时是十分必要的，因为在 <ul> 元素内只有 <li> 元素会被看作有效内容。这样做实现的效果与 <todo-item> 相同，但是可以避开一些潜在的浏览器解析错误。查看 DOM 模板解析说明 来了解更多信息。

Vue.component('todo-item', {
  template: '\
    <li>\
      {{ title }}\
      <button v-on:click="$emit(\'remove\')">X</button>\
    </li>\
  ',
  props: ['title']
})

new Vue({
  el: '#todo-list-example',
  data: {
    newTodoText: '',
    todos: [
      {
        id: 1,
        title: 'Do the dishes',
      },
      {
        id: 2,
        title: 'Take out the trash',
      },
      {
        id: 3,
        title: 'Mow the lawn'
      }
    ],
    nextTodoId: 4
  },
  methods: {
    addNewTodo: function () {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      this.newTodoText = ''
    }
  }
})

//---------other------------


<div id="counter-event-example">
  <p>{{ total }}</p>
  <button-counter v-on:increment="incrementTotal"></button-counter>
  <button-counter v-on:increment="incrementTotal"></button-counter>
</div>
Vue.component('button-counter', {
  template: '<button v-on:click="incrementCounter">{{ counter }}</button>',
  data: function () {
    return {
      counter: 0
    }
  },
  methods: {
    incrementCounter: function () {
      this.counter += 1
      this.$emit('increment')
    }
  },
})

new Vue({
  el: '#counter-event-example',
  data: {
    total: 0
  },
  methods: {
    incrementTotal: function () {
      this.total += 1
    }
  }
})
**********************************************************************************************************************************************
10.原始的事件对象
有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法：
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
**********************************************************************************************************************************************
11.
.lazy

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
**********************************************************************************************************************************************
12.
所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。
**********************************************************************************************************************************************
13.
DOM 模板解析注意事项

当使用 DOM 作为模板时 (例如，使用 el 选项来把 Vue 实例挂载到一个已有内容的元素上)，你会受到 HTML 本身的一些限制，因为 Vue 只有在浏览器解析、规范化模板之后才能获取其内容。尤其要注意，像 <ul>、<ol>、<table>、<select> 这样的元素里允许包含的元素有限制，而另一些像 <option> 这样的元素只能出现在某些特定元素的内部。
在自定义组件中使用这些受限制的元素时会导致一些问题，例如：
<table>
  <my-row>...</my-row>
</table>
自定义组件 <my-row> 会被当作无效的内容，因此会导致错误的渲染结果。变通的方案是使用特殊的 is 特性：
<table>
  <tr is="my-row"></tr>
</table>
应当注意，如果使用来自以下来源之一的字符串模板，则没有这些限制：
<script type="text/x-template">
JavaScript 内联模板字符串
.vue 组件
因此，请尽可能使用字符串模板。
**********************************************************************************************************************************************
14.
动态 Prop

与绑定到任何普通的 HTML 特性相类似，我们可以用 v-bind 来动态地将 prop 绑定到父组件的数据。每当父组件的数据变化时，该变化也会传导给子组件：
<div>
  <input v-model="parentMsg">
  <br>
  <child v-bind:my-message="parentMsg"></child>
</div>
你也可以使用 v-bind 的缩写语法：
<child :my-message="parentMsg"></child>



字面量语法 vs 动态语法

初学者常犯的一个错误是使用字面量语法传递数值：
<!-- 传递了一个字符串 "1" -->
<comp some-prop="1"></comp>
因为它是一个字面量 prop，它的值是字符串 "1" 而不是一个数值。如果想传递一个真正的 JavaScript 数值，则需要使用 v-bind，从而让它的值被当作 JavaScript 表达式计算：
<!-- 传递真正的数值 -->
<comp v-bind:some-prop="1"></comp>


单向数据流

Prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是反过来不会。这是为了防止子组件无意间修改了父组件的状态，来避免应用的数据流变得难以理解。
另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。
在两种情况下，我们很容易忍不住想去修改 prop 中数据：
Prop 作为初始值传入后，子组件想把它当作局部数据来用；
Prop 作为原始数据传入，由子组件处理成其它数据输出。
对这两种情况，正确的应对方式是：
定义一个局部变量，并用 prop 的值初始化它：
props: ['initialCounter'],
data: function () {
  return { counter: this.initialCounter }
}
定义一个计算属性，处理 prop 的值并返回：
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
**********************************************************************************************************************************************

15.具名插槽
https://cn.vuejs.org/v2/guide/components.html
**********************************************************************************************************************************************
16.
只渲染元素和组件一次。随后的重新渲染,元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
[html] view plain copy print?
<!-- 单个元素 -->
<span v-once>This will never change: {{msg}}</span>
<!-- 有子元素 -->
<div v-once>
  <h1>comment</h1>
  <p>{{msg}}</p>
</div>
<!-- 组件 -->
<my-component v-once :comment="msg"></my-component>
<!-- v-for 指令-->
<ul>
  <li v-for="i in list" v-once>{{i}}</li>
</ul>
**********************************************************************************************************************************************
导航菜单 el-menu 组件存在bug
				
注意此处是elementUI的一个bug,必须修改elementUI的el-menu 组件代码，才会菜单收缩之后可以在一次展开！！！！
				
修改59行和71行代码
				
		 leave(el) {
            if (!hasClass(el, 'el-menu--collapse')) {
              addClass(el, 'horizontal-collapse-transition');
              el.style.width = '230px';//---------------------修改原码第一处① 59
            } else {
              addClass(el, 'horizontal-collapse-transition');
              el.style.width = el.dataset.scrollWidth + 'px';
            }
          },

          afterLeave(el) {
            removeClass(el, 'horizontal-collapse-transition');
            if (hasClass(el, 'el-menu--collapse')) {
              el.style.width = el.dataset.scrollWidth + 'px';
            } else {
              el.style.width = '230px';//----------------------修改原码第二处② 71
            }
            el.style.overflow = el.dataset.oldOverflow;
          }

