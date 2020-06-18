## TIM-uniapp 使用说明

简介：使用uniapp 对接腾讯云IM功能实现基于uniapp的多端即时通讯，一套代码开发ios/安卓/h5 的即时通讯功能

#### 更新日志

### 1.1 版本  2020/3/25

- 修复聊天页 --上拉加载更多动画       

### 1.2 版本 2020/5/17

- 修复聊天页 -- 初始化聊天记录是报错    
- 修复聊天页 -- 上滑到顶部加载历史聊天记录 定位动画   
- 会话列表页 -- 新增在登陆成后 且SDK Ready 后，将当前登录用户的头像，昵称提交到IM服务，借此优化了会话列表页的会话列表展示的性能             

### 1.3 版本 2020/6/11

- 修复聊天页 --修复APP中底部输入法弹起 挡住聊天输入框的BUG

### 1.4 版本 2020/6/18

- 修复小程序会话列表页报错

#### 运行环境

- node 11.11.0
- HbuilderX 

#### 启动项目

###### 方式一

```
git clone https://github.com/cometang/tim-uniapp.git

npm install 

使用HbuilderX打开后即可运行[支持 APP 小程序 h5]
```

###### 方式二

```
直接进入uni-app插件市场将项目导入到hbuilderx 中即可运行
地址：https://ext.dcloud.net.cn/plugin?id=1421
```

#### 开发注意事项

##### 1.替换腾讯云SDKAPPID以及SECRETKEY

```
将commen/tim/tim.js 中 SDKAPPID以及 SECRETKEY 替换为自己的服务相关账户
自带账号只是作为体验使用。
```

![image](https://s1.ax1x.com/2020/03/25/8XnsYQ.png)



##### 2.修改基础用户数据

```
将 commen/tim/user.js 中的用户数据替换为自己在腾讯云IM控制台生成的用户信息及用户秘钥
控制台手动生成用户秘钥注意使用 “userId” 字段生成。
正式开发有后端可以直接通过后端接口直接生成userSign，走接口就不需要手动在控制台生成用户秘钥。
```

![image](https://s1.ax1x.com/2020/03/25/8XnrFg.png)

##### 3.注意TIM的动态监听--数据动态更新问题

```
App.vue 中写入了一些常用的监听事件，如有新的消息，会话列表动态更新等，其他的更多的监听事件可以按按需接入。
```

#### 未完成功能

- 发送文件语音图片（通过发送TIM的自定义消息可以解决，多端开发时不建议使用cos）
- 黑名单 （TIM支持黑名单功能，TIM有现成的api）
- 添加好友 （好友相关的功能只能做到自己的数据库里面，TIM是不支持好友关系建立的）
- 群组聊天（群聊功能和私聊实现非常类似，将消息类型由“C2C”更改为“GROUP”即可）

#### 点赞支持一下

- 项目地址 https://github.com/cometang/tim-uniapp.git  点赞支持一下吧
- uni-app插件市场地址：https://ext.dcloud.net.cn/plugin?id=1421

#### 致谢

聊天详情页使用  [回梦無痕](https://ext.dcloud.net.cn/publisher?id=5536)  的《聊天模板》https://ext.dcloud.net.cn/plugin?id=324 

