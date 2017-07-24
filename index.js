import {
    NativeModules,
    Platform,
    DeviceEventEmitter
} from 'react-native';

const JShareModule = NativeModules.JShareModule;

export default class JShare {
    /**
     * 
     * @param {Object} config = {
     *  appKey: String              // appKey 一个 JIGUANG 应用必须的,唯一的标识. 请参考 JIGUANG 相关说明文档来获取这个标识。
     *  channel: String             // channel 发布渠道. 可选。
     *  advertisingId: String       // advertisingIdentifier 广告标识符（IDFA). 可选，IDFA能帮助您更准确的统计。
     *  isProduction: Boolean       // isProduction 是否生产环境. 如果为开发状态,设置为NO; 如果为生产状态,应改为 YES.默认为NO。
     *  wechatAppId: String         // 微信的应用标识。
     *  wechatAppSecret: String     // 微信的应用密匙。
     *  qqAppId: String             // QQ 的应用密匙。
     *  qqAppKey: String            // QQ 应用Key。
     *  sinaWeiboAppKey: String     // 新浪微博应用标识。
     *  sinaWeiboAppSecret: String  // 新浪微博应用密匙。
     *  sinaRedirectUri: String     // 新浪微博应用回调地址。
     *  isSupportWebSina: Boolean   // 不存在新浪客户端的情况下，是否支持新浪网页版分享，默认不支持值为NO，若需支持将此值设置为YES，具体参考官方文档。
     * }
     */
    static setup(config) {
        JShareModule.setup(parma);
    }

    /**
     * 获取SDK所有能用的平台名称，如要使用某个平台，必须在JGShareSDK.xml中配置。
     * Android only
     * @param {*} callback 返回值 list 是一个数组
     */
    static getPlatformList(cb) {
        JShareModule.getPlatformList((list) => {
            cb(list);
        });
    }

    /**
     * 分享
     * @param {object} message = {
     * 
     * platformString 必填，用于分享置不同的平台 //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' 
     * type 必填
     * 
     * {
     *  type: 'text'
     *  platform: platformString  // 
     *  text: String
     *  imagePath: // 选填，新浪微博本地图片地址，其他平台没有这个字段
     * }
     * 
     * {
     *  type: 'image'
     *  platform: platformString  // 
     *  imagePath: String   // 本地图片路径 imagePath, imageUrl imageArray 必须三选一
     *  imageUrl: String // 网络图片地址，必须以 http 或 https 开头，imagePath, imageUrl imageArray 必须三选一
     *  imageArray: [String]  // (选填: 分享到 Qzone 才提供这个字段) 如果需要分享多张图片需要这个参数，数组中问题图片路径 imagePath, imageUrl imageArray 必须三选一
     * }
     * 
     * {
     *  type: 'video'
     *  platform: platformString  // 
     *  title: String // 选填
     *  url: String // 视频 url
     *  text: String  // 选填
     *  imagePath: String // 选填，缩略图，本地图片路径
     *  
     *  videoUrl: String  // QQ 空间本地视频 或者
     * !! iOS 相册视频，可传ALAsset的ALAssetPropertyAssetURL，或者PHAsset的localIdentifier。
     * 
     * }
     * 
     * {
     *  type: 'audio'
     *  platform: platformString  // 
     *  musicUrl: String //必填 点击直接播放的 url
     *  url: String //选填，点击跳转的 url
     *  imagePath: String   //选填，缩略图，本地图片路径，imagePath，imageUrl 必须二选一
     *  imageUrl: String // 选填，网络图片路径，imagePath， imageUrl 必须二选一
     *  title: String // 选填 
     *  text: String  // 选填
     * }
     * 
     * {
     *  type: 'file'
     *  platform: platformString  // 
     *  path: String // 必填，文件路径
     *  tile: String
     *  fileExt: String
     * }
     * 
     * {
     *  type: 'emoticon'
     *  platform: platformString  // 
     *  imagePath: String // 必填，本地图片路径
     * }
     * 
     * {
     *  type: 'app'
     *  platform: platformString  // 
     *  url: String
     *  extInfo: String
     *  path: String
     *  title: String
     *  text: String
     * }
     * 
     * {
     *  type: 'link'
     *  platform: platformString  // 
     *  url: String // 必填，网页 url
     *  imagePath: String // 选填，本地图片路径 imagePath，imageUrl 必须二选一
     *  imageUrl: String // 选填，网络图片地址 imagePath imageUrl 必须二选一
     *  title: String // 选填
     *  text: String // 选填
     * }
     * 
     * {
     *  type: 'undefined'
     *  platform: platformString  // 
     * }
     * 
     * @param {*} success = function (state) {} ## state = {state: String} state 可以是 ‘success’ / 'fail' / 'cancel' / 'unknow'
     * @param {*} fail = function (error) {} ## error = {code: number, descript: String}
     */
    static share(message, success, fail) {
        JShareModule.share(message, (map) => {
            success(map);
        }, (map) => {
            fail(map);
        });
    }

    /**
     * 获取社交平台用户信息
     * @param {*} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' 
     * }
     * @param {*} success function (userInfo) {} 
     * userInfo = {
     *  name: String        
     *  iconUrl: String   // 社交平台头像链接
     *  gender: String    // 'female' /  'male'
     *  response: Object  // 社交平台上的原始数据
     * }
     * @param {*} fail = function (error) {} ## error = {code: number, descript: String}
     */
    static getSocialUserInfo(param, success, fail) {
        JShareModule.getSocialUserInfo(param, (map) => {
            success(map);
        }, (errorCode) => {
            fail(errorCode);
        });
    }

    /**
     * 判断某平台是否支持授权
     * 
     * @param {*} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' 
     * }
     * @param {*} callback 
     */
    static isPlatformAuth(param, cb) {
        JShareModule.isPlatformAuth(param, (result) => {
            cb(result);
        });
    }

    /**
     * 判断该平台的分享是否有效
     * Android only
     * @param {*} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' 
     * }
     * @param {*} callback 
     */
    static isClientValid(param, cb) {
        JShareModule.isClientValid(param, (result) => {
            cb(result);
        })
    }

    /**
     *  授权接口
     * @param {*} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' 
     * }
     * @param {*} success 
     * @param {*} fail 
     */
    static authorize(param, success, fail) {
        JShareModule.authorize(param, (map) => {
            success(map);
        }, (errorCode) => {
            fail(errorCode);
        });
    }

    /**
     *  判断是否授权接口
     * @param {*} param = {
     *  platform: String //可以是 'wechat_session' / 'wechat_timeLine' / 'wechat_favourite' / 'qq' / 'qzone' / 'sina_weibo' / 'sina_weibo_contact' 
     * }
     * @param {*} callback 
     */
    static isAuthorize(param, cb) {
        JShareModule.isAuthorize(param, (result) => {
            cb(result);
        });
    }

    /**
     * 删除用户授权本地数据
     * 
     * @param {Object} param = {
     *  platform: String //可以是 'wechat_session' / 
     *                           'wechat_timeLine' / 
     *                           'wechat_favourite' / 
     *                           'qq' / 
     *                           'qzone' /
     *                           'sina_weibo' /
     *                           'sina_weibo_contact' 
     * }
     * @param {function} callback function
     * @code 返回码，0 表示成功删除
     */
    static cancelAuthWithPlatform(param, cb) {
        JPushModule.cancelAuthWithPlatform(param, (code) => {
            cb(code);
        });
    }

    /**
     * 检查不存在新浪客户端情况下的网页端是否登陆
     * 
     * @param {function} success 
     */
    static isSinaWeiboWebLogined(success) {
        JPushModule.isSinaWeiboWebLogined(success)
    }

    /**
     * 登出新浪网页端最新帐号
     * 
     * @param {function} success 
     */
    static sinaWeiboWebLogOut(success) {
        JShareModule.sinaWeiboWebLogOut(success)
    }

    /**
     * 检查是否安装微信客户端
     * 
     * @param {function} success 
     */
    static isWeChatInstalled(success) {
        JShareModule.isWeChatInstalled(success)
    }

    /**
     * 检查是否存在QQ客户端
     * 
     * @param {function} success 
     */
    static isQQInstalled(success) {
        JShareModule.isQQInstalled(success)
    }

    /**
     * 检查是否存在新浪微博客户端
     * 
     * @param {function} success 
     */
    static isSinaWeiBoInstalled(success) {
            JShareModule.isSinaWeiBoInstalled(success)
        }
        /**
         * 
         * @param {Object} param = {
         *  enable: Boolean
         * }
         */
    static setDebug(param) {
        JShareModule.setDebug(param)
    }

}