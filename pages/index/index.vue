<template>
	<view>
		<view class="box">
			<view class="text-box">
				<input type="text" v-model="user" placeholder="请输入账号" />
			</view>
			<view class="text-box">
				<input type="password" v-model="pwd" placeholder="请输入密码" />
			</view>
			
			<view class="msg-box">
				<p>静态登录用户信息在:commen/tim/user.js 中,登录用户为 user1~user9;密码随便输</p>
				<p>测试/开发时请先更换为自己的IM腾讯云账户</p>
				
			</view>
			<button type="primary" @click="loginBtn">登录</button>
		</view>
	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js';
	import {mapState} from "vuex";
	export default {
		data() {
			return {
				user: '',
				data: null,
				pwd: '',

			}
		},
		computed:{
			...mapState({
				isLogin:state=>state.isLogin,
				isSDKReady:state=>state.isSDKReady
			})
		},
		onShow() {
			
		},
		onLoad() {
		},

		methods: {
			loginBtn() {
				console.log()
				if (this.user && this.pwd) {  //获取user的userId,实际接口为后端返回（user基础信息+userSig）
					let userInfo = null
					userList.forEach((item) => {
						if (item.user == this.user) {
							userInfo = item
						}
					})
					if (userInfo) {		//根据返回的userID 以及 userSig 登录tim
						let promise = this.tim.login({
							userID: userInfo.userId,
							userSig: userInfo.userSig
						});
						promise.then((res) => {
							//登录成功后 更新登录状态
							this.$store.commit("toggleIsLogin", true);
							//自己平台的用户基础信息
							uni.setStorageSync('userInfo', JSON.stringify(userInfo))
							//tim 返回的用户信息
							uni.setStorageSync('userTIMInfo', JSON.stringify(res.data))
							uni.navigateTo({
								url: '../tim/record'
							})
						}).catch((err) => {
							console.warn('login error:', err); // 登录失败的相关信息
						});
					} else {
						uni.showToast({
							icon: 'none',
							title: '用户不存在',
							duration: 1500
						});
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请将账户密码输入完整',
						duration: 1500
					});
				}
			},


		}
	}
</script>

<style scoped lang="scss">
	.box {
		width: 80%;
		margin: 0 auto;
	}

	.text-box {
		height: 80rpx;
		border-bottom: 1px solid #EEEEEE;
		margin: 20rpx 0;
		font-size: 28rpx;
		color: #f66;
		line-height: 80rpx;
	}
	.msg-box{
		margin:50rpx 0;
		color: #f06c7a;
		font-size: 24rpx;
		line-height: 40rpx;
	}
</style>
