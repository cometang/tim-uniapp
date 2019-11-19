<template>
	<view>
		<view class="box">
			<view class="text-box">
				<input type="text" v-model="user" placeholder="请输入账号" />

			</view>
			<view class="text-box">
				<input type="password" v-model="pwd" placeholder="请输入密码" />
			</view>
			<button type="primary" @click="loginBtn">登录</button>
		</view>
	</view>
</template>

<script>
	import userList from '../../commen/tim/user.js'
	export default {
		data() {
			return {
				user: '',
				data: null,
				pwd: '',

			}
		},
		onShow() {
			
		},
		onLoad() {
			
		},
		
		methods: {
			loginBtn() {

				if (this.user && this.pwd) {
					let userInfo = null
					userList.forEach((item) => {
						if (item.user == this.user) {
							userInfo = item
						}
					})

					if (userInfo) {
						let promise = this.tim.login({
							userID: userInfo.userId,
							userSig:userInfo.userSig
						});
						promise.then((res) => {
							console.log(res)
							let userData = {}
							if(res.data.actionStatus == 'OK'){
								 userData.info = userInfo
								 userData.im = res.data
							}
							uni.setStorageSync('user',JSON.stringify(userData))
							uni.navigateTo({
								url:'../tim/record'
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
</style>
