<template class="container">
	<el-row class="container_fkc">
		<el-col :span="24" class="header">
			<el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
				{{collapsed?'':sysName}}
			</el-col>
			<el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col>
			<el-col :span="4" class="userinfo">
				<el-dropdown trigger="hover">
					<span class="el-dropdown-link userinfo-inner">
						<!--<img :src="this.sysUserAvatar" /> -->
					{{sysUserName}}</span>
					<el-dropdown-menu slot="dropdown" >
						<el-dropdown-item  @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-col>
		<el-col :span="24" class="main">
			<aside :class="collapsed?'menu-collapsed':'menu-expanded'">
				<!--导航菜单 el-menu 组件存在bug
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


				-->
				<el-menu :default-active="$route.path" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" @select="handleselect"
					 unique-opened router v-show="!collapsed">
					<template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
						<!--不是单独的菜单这样循环子菜单-->
						<el-submenu :index="index+''" v-if="!item.leaf && item.havepermission" >
							<template slot="title" v-if="!item.subhidden"><i :class="item.iconCls"></i>{{item.name}}</template>
							<template slot="title" v-if="item.subhidden">
								<i :class="item.iconCls"></i>
								<router-link to="/testVUEX_" class="noLine">{{item.name}}</router-link>
								<div></div>
							</template>
							<el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden && child.havepermission">{{child.name}}</el-menu-item>
						 </el-submenu>
						<el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</el-menu-item>
					</template>
				</el-menu>
				<!--导航菜单-折叠后-->
				<ul class="el-menu el-menu-vertical-demo collapsed" v-show="collapsed" ref="menuCollapsed" style="">
					<li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="el-submenu item">
						<template v-if="!item.leaf">
							<div class="el-submenu__title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)"><i :class="item.iconCls"></i></div>
							<ul class="el-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
								<li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="el-menu-item" style="padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
							</ul>
						</template>
						<template v-else>
							<li class="el-submenu">
								<div class="el-submenu__title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)"><i :class="item.iconCls"></i></div>
							</li>
						</template>
					</li>
				</ul>
			</aside>
			<section class="content-container">
				<div class="grid-content bg-purple-light">
					<el-col :span="24" class="breadcrumb-container">
						<!--<strong class="title">{{$route.name}}</strong>-->
						<el-breadcrumb separator=" > " class="breadcrumb-inner">
							<!--:to="item.path" :replace="true"-->
							<el-breadcrumb-item v-for="item in $route.matched" :key="item.path" :to="{path: item.path}" :replace="false">
								{{ item.name }}
							</el-breadcrumb-item>
						</el-breadcrumb>
					</el-col>
					<el-col :span="24" class="content-wrapper">
						<transition name="fade" mode="out-in">
							<router-view></router-view>
						</transition>
					</el-col>
				</div>
			</section>
		</el-col>
	</el-row>
</template>

<script>
    import ElMenu from "../../node_modules/element-ui/packages/menu/src/menu";

    /**
	 * 主页面，也就是路由的根页面
     * @author heshengjin
     * @date 2017-06-03
     */
	export default {
        components: {ElMenu},
        data() {
			return {
				sysName:'仓储温湿度监控',
				collapsed:false,
				sysUserName: '',
				sysUserAvatar: '',
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				}
			}
		},

		methods: {
			onSubmit() {
				console.log('submit!');
			},
			handleopen() {
				//console.log('handleopen');
			},
			handleclose() {
				//console.log('handleclose');
			},
			handleselect: function (a, b) {
			},
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					sessionStorage.removeItem('user');
					_this.$router.push('/login');
				}).catch(() => {

				});


			},
			//折叠导航栏
			collapse:function(){
				this.collapsed=!this.collapsed;
			},
			showMenu(i,status){console.log("ov-out");
				this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-'+i)[0].style.display=status?'block':'none';
			},

		},

		mounted() {
//            console.log(this.$router)
            //权限的菜单显示隐藏[***后台的数据菜单放在最外面的一层循环,总共三层循环***]
            this.$router.options.routes.forEach(function (item,index) {
//                console.log(item);
                item.havepermission = true;
                if(item.children && item.children.length > 0){
                    item.children.forEach(function (item_,index_) {
//                        console.log(item_);
                        item_.havepermission = true;
                    });
				}
            });
		    //配合着jQuery搞定菜单的向下的箭头
            $(".el-submenu__icon-arrow").each(function(index){
//                console.log($(this));
                if(index === 0){//0 1 2排列死的 根据上卖弄的权限菜单得知那些权限菜一级单有值
                    $(this).removeClass("el-submenu__icon-arrow");
				}
            });
            var user = sessionStorage.getItem('user');
			if (user != null) {
				user = JSON.parse(user);
				this.sysUserName = user.username || '';
				this.sysUserAvatar = user.vatar || '';
			}

		},
        /**
		 * 解决刷新之后状态
         */
        updated(){
            console.log("updated")
            //权限的菜单显示隐藏[***后台的数据菜单放在最外面的一层循环,总共三层循环***]
            this.$router.options.routes.forEach(function (item,index) {
//                console.log(item);
                item.havepermission = true;
                if(item.children && item.children.length > 0){
                    item.children.forEach(function (item_,index_) {
//                        console.log(item_);
                        item_.havepermission = true;
                    });
                }
            });
            //配合着jQuery搞定菜单的向下的箭头
            $(".el-submenu__icon-arrow").each(function(index){
                if(index === 0 && $(".el-submenu__icon-arrow").length === 3){//0 1 2排列死的 根据上卖弄的权限菜单得知那些权限菜一级单有值[3是因为每次回删除一个，实际上只会删除第一次3个的状态]
                    $(this).removeClass("el-submenu__icon-arrow");
                }
            });
        },
	}

</script>

<style scoped lang="scss">
	@import "../styles/vars.scss";
	.noLine{
		text-decoration:none;
		color: #48576a;
	}
	active, .el-menu-item.is-active {
		color: #18c79c;
	}

	.container_fkc {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			height: 60px;
			line-height: 60px;
			background: $color-primary;
			color:#fff;
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#fff;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}
			.logo {
				//width:230px;
				height:60px;
				font-size: 22px;
				padding-left:20px;
				padding-right:20px;
				border-color: rgba(238,241,146,0.3);
				border-right-width: 1px;
				border-right-style: solid;
				img {
					width: 40px;
					float: left;
					margin: 10px 10px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:230px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			display: flex;
			// background: #324057;
			position: absolute;
			top: 60px;
			bottom: 0px;
			overflow: hidden;
			aside {
				flex:0 0 230px;
				width: 230px;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
					width:60px;
					.item{
						position: relative;
					}
					.submenu{
						position:absolute;
						top:0px;
						left:60px;
						z-index:99999;
						height:auto;
						display:none;
					}

				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.menu-expanded{
				flex:0 0 230px;
				width: 230px;
			}
			.content-container {
				// background: #f1f2f7;
				flex:1;
				// position: absolute;
				// right: 0px;
				// top: 0px;
				// bottom: 0px;
				// left: 230px;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
</style>