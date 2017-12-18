
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


****************************************************************************************************************************************
1.父子组件通信的方式：https://www.cnblogs.com/zqzjs/p/6789232.html

****************************************************************************************************************************************
2.disable
<button v-bind:disabled="isButtonDisabled">Button</button>
****************************************************************************************************************************************
3.表达式，单个
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>
****************************************************************************************************************************************
4.
修饰符 (Modifiers) 是以半角句号 . 指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。例如，.prevent 修饰符告诉 v-on 指令对于触发的事件调用 event.preventDefault()：
<form v-on:submit.prevent="onSubmit">...</form>
****************************************************************************************************************************************
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
****************************************************************************************************************************************
6.然而，【不同的是计算属性是基于它们的依赖进行缓存的】。计算属性只有在它的相关依赖发生改变时才会重新求值。这就意味着只要 message 还没有发生改变，多次访问 reversedMessage 计算属性会立即返回之前的计算结果，而不必再次执行函数。
  这也同样意味着下面的计算属性将不再更新，因为 【Date.now() 不是响应式依赖】：
  computed: {
    now: function () {
      return Date.now()
    }
  }
  相比之下，每当 触发重新渲染时，调用方法将总会再次执行函数。
****************************************************************************************************************************************
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
****************************************************************************************************************************************
8.
2.2.0+ 的版本里，当在组件中使用 v-for 时，key 现在是必须的。
****************************************************************************************************************************************
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
****************************************************************************************************************************************
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
****************************************************************************************************************************************
11.
.lazy

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转变为使用 change 事件进行同步：
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
****************************************************************************************************************************************
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

