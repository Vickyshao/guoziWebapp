# 国资文旅 APP 前端项目

# Usage

## rem方案使用说明

* 字体单位用dpx，例如`font-size: 16dpx;`、`line-height: 20dpx;`，换算时会根据dpr进行换算，避免粗暴地放大
* border、border-radius等单位用rpx，例如`border: 1rpx solid #eee;`，换算时会直接转成1px，避免小于1px被忽略
* 其余单位用px，例如`width: 180px;`

## 图标、图片使用说明

* 小图标统一用iconfont，我会把icon都上传上去
* 大图直接用svg，尽量不要用png或者jpg，一来不支持矢量，二来体积未必比svg小

```bash
# install dependencies
npm install # or yarn

# serve in dev mode, with hot reload
npm run dev

# serve in mock data
npm run mock

# serve in test mode
npm run test

# serve in production mode
npm run prd

# run eslint check
npm run lint

# build for production
npm run build

```

# 目录结构
+ app目录结构

    + components 所有控件以文件夹组织，方便换皮
        + biz （业务用的组件）
        + common （公用的组件，和业务无关）
    + directives 和业务无关
    + filters 和业务无关
    + views （业务的页面）
    + service （对应app中所用业务service）
    + utilities 工具类
    + vuex
        + biz （业务的vuex）
        + common （公用的vuex）
        + mutation-types.js 各种mutation的const
        + store.js 引用各种biz或者common的store
    + app.js 程序加载时候依赖顺序
