 <template>
     <!--<div @mouseover="ovv()" @mouseout="outt()">-->
     <!--系统管理-->
     <!--</div>-->
     <section>
          <div>
               <input type="file" id="file" multiple  @change="testupload_">
               <button @click="testupload">开始FormData上传文件...</button>
               <button @click="testQuery">测试查询数据</button>
               <button @click="testSetDefaultVersion">测试跟新默认版本</button>
          </div>

     </section>
</template>

     <script>
     import { mapGetters } from 'vuex'
     import { mapActions } from 'vuex'
     import * as httpAxios from '../api/api';

     export default {
         data() {
             return {
                 filedata: null,
                 suffix:"",
                 apkname:""
             }
         },
          methods:{
//              ovv:function () {
//                  console.log("ovv");
//              },
//              outt:function () {
//                  console.log("outt");
//              },
              //https://segmentfault.com/a/1190000006860258
              testupload_:function(e) {
                  var files = e.target.files || e.dataTransfer.files;
                  if (!files.length) return;
                  console.log(files[0]);
                  this.filedata= files[0];
                  var fileName = files[0].name;
                  var suffixIndex = fileName.lastIndexOf(".");
                  var suf = fileName.substring(suffixIndex);
                  var apkname = fileName.substring(0,suffixIndex)
                  this.suffix = suf;
                  this.apkname = apkname;
              },
              testupload:function (){
                  let  param = new FormData();
                  param.append("desname","复烤厂配置app3");
                  param.append("apkname",this.apkname);
                  param.append("suffix",this.suffix);
                  param.append("type","android");
                  param.append("vercode","V0.0.3");
                  param.append("innervercode","3");
                  param.append("isdefaultversion","1");
                  param.append("text","testnamesuffix");
                  param.append("creator","10000");
                  param.append(this.apkname,this.filedata);
                  httpAxios.testUploadApp(param).then( data => {
                      console.log(data);
                      }
                  ).catch(function (response) {
                      console.log(response);
                  });
              },
              testQuery:function () {
                  let  param = new FormData();
                  param.append("type","android");
//                  param.append("serach","V0.0.3");
//                  param.append("pageSize","2");
//                  param.append("pageIndex","1");
                  httpAxios.testQueryAppMess(param).then( data => {
                          console.log(data);
                      }
                  ).catch(function (response) {
                      console.log(response);
                  });
              },
              testSetDefaultVersion:function () {
                  let  param = new FormData();
                  param.append("id","31907");
                  param.append("apkname","SACGIS_V21");
                  param.append("type","android");
                  httpAxios.testSetDefaultVersion(param).then( data => {
                          console.log(data);
                      }
                  ).catch(function (response) {
                      console.log(response);
                  });
              }
          }
     }
     </script>