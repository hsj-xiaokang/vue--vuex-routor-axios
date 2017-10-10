 <template>
     <div>
          <h1 ref="test">vuex 测试</h1>
           Clicked: {{ getDeviceCardShow }} {{getHttp200}}&nbsp;
          <br/>
          <el-form :model="ruleForm2"  ref="test_el">
               <el-form-item prop="account">
                    <el-input type="text" v-model="ruleForm2.account" auto-complete="on" placeholder="账号"></el-input>
               </el-form-item>
          </el-form>
          <button @click="reset">重置</button>
          <br/>

          <button @click="increment_true">true</button>
          <button @click="decrement_false">false</button>

          <button @click="increment_200">+1</button>
          <button @click="decrement_200">-1</button>

          <button @click="opreat200Param(100)">+100</button>
          <button @click="opreat200Param(-100)">-100</button>
          <br/>
          {{getState}}
          <br/>
          {{getUser}}
     </div>
</template>

     <script>
     import { mapGetters } from 'vuex'
     import { mapActions } from 'vuex'

     export default {
         data() {
             return {
                 ruleForm2: {
                     account: "hsj",//'hsj',
                 },
             };
         },
         computed: {
             // 使用对象展开运算符将 getters 混入 computed 对象中
             ...mapGetters([
                 'getDeviceCardShow',
                 'getHttp200',
                 'getUser',
                 'getState'
                 // ...
             ])
         },

         mounted:function () {
             this.$store.getters.getState.user = {
                name:'hsj',
                 age:25
             };

         },

         methods: {
             ...mapActions([
                 'increment_true', // 映射 this.increment() 为 this.$store.dispatch('increment')
                 'decrement_false',
                 'increment_200',
                 'decrement_200',
                 'opreat200Param'
             ]),
             //...mapActions({
             //  add: 'increment' // 映射 this.add() 为 this.$store.dispatch('increment')
             //})
             reset(){//1.ref是vue的一个属性，一般的就是指向一般的那个元素2.否则就是指向的自己定义的那个组件元素，可以使用组件的方法
                 this.$refs.test_el.resetFields();
             }
         }
     }
     </script>