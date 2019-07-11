(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ "../../../wky/baby/common/plugs/graceChecker.js":
/*!************************************************!*\
  !*** E:/wky/baby/common/plugs/graceChecker.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 /**
              数据验证（表单验证）
              来自 grace.hcoder.net 
              作者 hcoder 深海
              */
module.exports = {
  error: '',
  check: function check(data, rule) {
    for (var i = 0; i < rule.length; i++) {
      if (!rule[i].checkType) {return true;}
      if (!rule[i].name) {return true;}
      if (!rule[i].errorMsg) {return true;}
      if (!data[rule[i].name]) {this.error = rule[i].errorMsg;return false;}
      switch (rule[i].checkType) {
        case 'string':
          var reg = new RegExp('^.{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'int':
          var reg = new RegExp('^(-[1-9]|[1-9])[0-9]{' + rule[i].checkRule + '}$');
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
          break;
        case 'between':
          if (!this.isNumber(data[rule[i].name])) {
            this.error = rule[i].errorMsg;
            return false;
          }
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenD':
          var reg = /^-?[1-9][0-9]?$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'betweenF':
          var reg = /^-?[0-9][0-9]?.+[0-9]+$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          var minMax = rule[i].checkRule.split(',');
          minMax[0] = Number(minMax[0]);
          minMax[1] = Number(minMax[1]);
          if (data[rule[i].name] > minMax[1] || data[rule[i].name] < minMax[0]) {
            this.error = rule[i].errorMsg;
            return false;
          }
          break;
        case 'same':
          if (data[rule[i].name] != rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'notsame':
          if (data[rule[i].name] == rule[i].checkRule) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'email':
          var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'phoneno':
          var reg = /^1[0-9]{10,10}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'zipcode':
          var reg = /^[0-9]{6}$/;
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'reg':
          var reg = new RegExp(rule[i].checkRule);
          if (!reg.test(data[rule[i].name])) {this.error = rule[i].errorMsg;return false;}
          break;
        case 'in':
          if (rule[i].checkRule.indexOf(data[rule[i].name]) == -1) {
            this.error = rule[i].errorMsg;return false;
          }
          break;
        case 'notnull':
          if (data[rule[i].name] == null || data[rule[i].name].length < 1) {this.error = rule[i].errorMsg;return false;}
          break;}

    }
    return true;
  },
  isNumber: function isNumber(checkVal) {
    var reg = /^-?[1-9][0-9]?.?[0-9]*$/;
    return reg.test(checkVal);
  } };

/***/ }),

/***/ "../../../wky/baby/common/service/index.js":
/*!*******************************************!*\
  !*** E:/wky/baby/common/service/index.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) { // const __api = 'http://59.61.216.123:18980/jeezero-boblbee-app/v1';
var __api = 'https://dev.jeezero.com:18980/jeezero-boblbee-app/v1';
// const __api = 'https://boblbee.superpapa.com.cn/jeezero-boblbee-app/v1';

function Request() {
  this.m_send = function (url, method, data, onok, onno, _complete) {
    var access_token = uni.getStorageSync('access_token');
    var system_info = uni.getSystemInfoSync();
    var _data = {
      url: __api + url,
      method: method,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        authorization: access_token,
        appName: "boblbee",
        devicePlatform: 2,
        deviceModel: system_info.model,
        appVersion: system_info.version,
        deviceOs: system_info.system,
        deviceUuid: "" },

      data: data,
      success: function success(res) {
        if (res.data.code == 0) {
          onok ? onok(res.data) : null;
        } else if (res.data.code >= 10112 && res.data.code <= 10115 || res.data.code == 10103 || res.data.code == 10105) {
          uni.removeStorageSync('access_token');
          console.log(getCurrentPages());
          var route = "/" + getCurrentPages()[getCurrentPages().length - 1].route;
          var queryObj = JSON.stringify(getCurrentPages()[getCurrentPages().length - 1].options);
          uni.redirectTo({
            url: "/pages/index/index?redirect=" + route + "&queryObj=" + queryObj,
            success: function success() {
              uni.showToast({
                title: res.data.message,
                icon: "none",
                success: function success() {} });

            } });

        } else {
          console.log(res);
          if (res.data.message) {
            uni.showToast({
              title: res.data.message,
              icon: "none",
              duration: 2000 });

          }
          onno ? onno(res.data) : null;
        }
      },
      fail: function fail(err) {
        if (res.data.message) {
          uni.showToast({
            title: err.data.message,
            icon: "none",
            duration: 2000 });

        }
        console.log(err);
        onno ? onno(err) : null;
      },
      complete: function complete() {
        _complete ? _complete() : null;
      } };

    uni.request(_data);
  };
}
var _req = new Request();
module.exports = {
  host: __api,
  home: {
    wx_login: function wx_login(d, onok, onno) {//微信登陆获取参数
      var _url = "/miniApp/wxlogin";
      _req.m_send(_url, "POST", d, onok, onno);
    },
    get_recommend_article: function get_recommend_article(d, onok, onno) {//“首页”模块的推荐数据
      var _url = "/home/queryRecommendArticle";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    get_foucs_article: function get_foucs_article(d, onok, onno) {//“首页”模块的关注数据
      var _url = "/home/queryFocusArticle";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    get_hotVip_List: function get_hotVip_List(d, onok, onno) {//APP“首页”模块，点击“火”图标，显示推送4个大V账号。这4个大V账号是获取转发数最多的四个，如果无转发数，则以原创数最多排序。
      var _url = "/home/getHotVipList";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    search: {
      get_query_list: function get_query_list(d, onok, onno) {//获取APP“搜索”模块的热门问题列表。
        var _url = "/search/query";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      get_response_list: function get_response_list(d, onok, onno) {//根据输入的关键字搜索对应的内容列表
        var _url = "/search/searchPageList";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    hotVip: {
      get_info: function get_info(d, onok, onno) {//APP“首页”模块，点击“火”的图标，进行大V列表，再点击某个大V进入大V主界面的顶部大V信息数据。
        var _url = "/home/getVipInfo";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      get_all_list: function get_all_list(d, onok, onno) {//APP“首页”模块，点击导航右侧“火”的图标，点击“更多”按钮，获取大V账号数据列表，且带首字字母索引，一次性获取完所有的大V数据
        var _url = "/home/getVipPageList";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      toggle_followed: function toggle_followed(d, onok, onno) {//关注或取消关注大V用户
        var _url = "/home/attentionVipOrNo";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      get_article: function get_article(d, onok, onno) {//APP“首页”模块，点击“火”的图标，进行大V列表，再点击某个大V进入大v主界面，底部4种分类数据列表（最新发布、转发最多、评论最多、点赞最多）
        var _url = "/home/getVipArticlePageList";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      get_recommend_list: function get_recommend_list(d, onok, onno) {//APP“首页”模块，大V详情主界面里的相关推荐功能
        var _url = "/home/getRecommendVipList";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    article: {
      get_detail: function get_detail(d, onok, onno) {//内容相关功能，获取内容详情数据时用
        var _url = "/article/getArticleDetail";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      toggle_collect: function toggle_collect(d, onok, onno) {//内容相关功能，收藏或取消收藏文章
        var _url = "/article/faOrNoArticle";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      toggle_praise: function toggle_praise(d, onok, onno) {//内容相关功能，点赞或取消点赞该文章
        var _url = "/article/praiseArticleOrNo";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      get_comment_list: function get_comment_list(d, onok, onno) {//内容相关功能，获取文章评论列表
        var _url = "/article/queryArticleCommentPageList";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      toggle_shield: function toggle_shield(d, onok, onno) {//内容相关功能，屏蔽作者
        var _url = "/article/blockVipOrNo";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      un_interest: function un_interest(d, onok, onno) {//内容相关功能，屏蔽文章
        var _url = "/article/blockArticle";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      add_count: function add_count(d, onok, onno) {//内容相关功能，增加文章的“分享数”或“点击数”
        var _url = "/article/addArticleCountNum";
        _req.m_send(_url, "POST", d, onok, onno);
      } },

    comment: {
      toggle_praise: function toggle_praise(d, onok, onno) {//内容相关功能，评论列表里点赞或取消点赞某条评论
        var _url = "/article/praiseCommentOrNo";
        _req.m_send(_url, "POST", d, onok, onno);
      } } },


  helper: {
    get_query_list: function get_query_list(d, onok, onno) {//获取APP“助手”模块的热门问题列表。
      var _url = "/search/query";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    get_qaset_list: function get_qaset_list(d, onok, onno) {//APP“助手”的问题集列表
      var _url = "/search/qaset";
      _req.m_send(_url, "GET", d, onok, onno);
    } },

  center: {
    user: {
      get_detail: function get_detail(d, onok, onno) {//“我的”模块获取用户资料
        var _url = "/my/getDetail";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    address: {
      add: function add(d, onok, onno) {//收货地址添加
        var _url = "/my/addAddress";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      update: function update(d, onok, onno) {//收货地址修改
        var _url = "/my/updateAddress";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      deleted: function deleted(d, onok, onno) {//收货地址删除
        var _url = "/my/delAddress";
        _req.m_send(_url, "POST", d, onok, onno);
      },
      get_list: function get_list(d, onok, onno) {//获取收货地址列表
        var _url = "/my/getAddressList";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      get_region: function get_region(d, onok, onno) {//获取省市县街道的接口
        var _url = "/my/getRegion";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    record: {
      get_list: function get_list(d, onok, onno) {//APP“我的”模块获取用户的浏览记录列表
        var _url = "/my/queryHistoryList";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    collect: {
      get_list: function get_list(d, onok, onno) {//APP“我的”模块获取用户收藏的文章数据
        var _url = "/my/queryFaArticlePageList";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    classify: {
      get_list: function get_list(d, onok, onno) {//内容相关功能，获取用户关注的主题列表
        var _url = "/my/getAttentionCategoryPageList";
        _req.m_send(_url, "GET", d, onok, onno);
      },
      delete_attention: function delete_attention(d, onok, onno) {//内容相关功能，删除用户收藏的文章
        var _url = "/my/delAttentionCategory";
        _req.m_send(_url, "POST", d, onok, onno);
      } },

    shield: {
      get_list: function get_list(d, onok, onno) {//内容相关功能，取得用户屏蔽的作者数据
        var _url = "/my/getBlockVipPageList";
        _req.m_send(_url, "GET", d, onok, onno);
      } },


    about: {
      get_website: function get_website(d, onok, onno) {//APP“设置”模块的隐私政策页面数据
        var _url = "/setting/getPageData";
        _req.m_send(_url, "GET", d, onok, onno);
      } },

    manage: {
      baby: {
        get_list: function get_list(d, onok, onno) {//APP“我的”模块获取用户的宝宝数据，一次性给完宝宝列表数据
          var _url = "/my/getBabyList";
          _req.m_send(_url, "GET", d, onok, onno);
        },
        add: function add(d, onok, onno) {//APP“我的”模块，宝宝管理，添加宝宝
          var _url = "/my/addBaby";
          _req.m_send(_url, "POST", d, onok, onno);
        },
        update: function update(d, onok, onno) {//APP“我的”模块，宝宝管理，修改宝宝资料
          var _url = "/my/updateBaby";
          _req.m_send(_url, "POST", d, onok, onno);
        },
        delete: function _delete(d, onok, onno) {//APP“我的”模块，宝宝管理，删除宝宝资料
          var _url = "/my/delBaby";
          _req.m_send(_url, "POST", d, onok, onno);
        } } } },




  classify: {
    get_top_category: function get_top_category(d, onok, onno) {//获取分类头部数据列表
      var _url = "/category/getTopCategory";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    get_sub_category: function get_sub_category(d, onok, onno) {//获取某个分类下的子类
      var _url = "/category/getSubCategory";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    get_category_article: function get_category_article(d, onok, onno) {//APP“分类”模块，点击某个小类进入该小类详情主界面，底部4种分页菜单列表（最新发布、转发最多、评论最多、点赞最多）
      var _url = "/category/queryArticleByCategory";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    get_sub_category_header: function get_sub_category_header(d, onok, onno) {//获取某个小类的详情头部信息
      var _url = "/category/getSubCategoryHeader";
      _req.m_send(_url, "GET", d, onok, onno);
    },
    toggle_followed: function toggle_followed(d, onok, onno) {//关注或取消关注某分类
      var _url = "/category/attentionCategoryOrNo";
      _req.m_send(_url, "POST", d, onok, onno);
    } } };
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["default"]))

/***/ }),

/***/ "../../../wky/baby/common/util/aldSdk/ald-stat-conf.js":
/*!*******************************************************!*\
  !*** E:/wky/baby/common/util/aldSdk/ald-stat-conf.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.app_key = "1619e5e24d2721f0f8aeeb25e9946bf8"; //请在此行填写从阿拉丁后台获取的appkey
exports.getLocation = false; //默认不获取用户坐标位置
exports.plugin = false; //您的小程序中是否使用了插件。根据是否启用插件会有不同的接入方式，请参考文档文档。
exports.useOpen = false; //默认不启用，是否启用openid计算，开启后必须上传openid，否则数据不会上报。

/***/ }),

/***/ "../../../wky/baby/common/util/aldSdk/ald-stat.js":
/*!**************************************************!*\
  !*** E:/wky/baby/common/util/aldSdk/ald-stat.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
!function (n, t) { true ? module.exports = t() : undefined;}(void 0, function () {function n() {this.concurrency = 4, this.queue = [], this.tasks = [], this.activeCount = 0;var n = this;this.push = function (t) {this.tasks.push(new Promise(function (e, o) {var r = function r() {n.activeCount++, t().then(function (n) {e(n);}).then(function () {n.next();});};n.activeCount < n.concurrency ? r() : n.queue.push(r);}));}, this.all = function () {return Promise.all(this.tasks);}, this.next = function () {n.activeCount--, n.queue.length > 0 && n.queue.shift()();};}function t() {this.request = [], this.updata = !1, this.push = function (n) {this.request.length >= 8 && !this.updata && (this.updata = !0, e()), this.request.length >= 10 ? (this.request.shift(), this.request.push(n)) : this.request.push(n);}, this.concat = function () {this.request.map(function (n) {wx.Queue.push(n);}), this.request = [];};}function e() {"function" == typeof gn && "" === G && gn().then(function (n) {28 === n.length && (G = n, wx.setStorageSync("aldstat_op", n));});}function o(n) {this.app = n;}function r(n) {j = S(), W = n, ln = n.scene, this.aldstat = new o(this);}function i(n) {e();var t;t = n.scene != ln, ln = n.scene, V = 0, W = n, F = n.query.ald_share_src, X = n.query.aldsrc || "", Y = n.query.ald_share_src, fn || ($ = !1), fn = !1, (0 !== Q && Date.now() - Q > 3e4 || t) && (hn || (T = S(), N = Date.now(), wn = 0)), 0 !== Q && Date.now() - Q < 3e4 && (rn = !0), n.query.ald_share_src && "1044" == n.scene && n.shareTicket ? wx.getShareInfo({ shareTicket: n.shareTicket, success: function success(n) {nn = n, A("event", "ald_share_click", JSON.stringify(n));} }) : n.query.ald_share_src && A("event", "ald_share_click", 1), "" === tn && wx.getSetting({ withCredentials: !0, success: function success(n) {if (n.authSetting["scope.userInfo"]) {wx.getUserInfo({ withCredentials: !0, success: function success(n) {var t = v();tn = n, t.ufo = _(n), K = y(n.userInfo.avatarUrl.split("/")), g(t);} });}} }), q("app", "show");}function s() {e(), Q = Date.now(), "" === tn && wx.getSetting({ success: function success(n) {n.authSetting["scope.userInfo"] && wx.getUserInfo({ withCredentials: !0, success: function success(n) {tn = n, K = y(n.userInfo.avatarUrl.split("/"));var t = v();t.ufo = _(n), g(t);} });} }), q("app", "hide");}function a(n) {Z++, A("event", "ald_error_message", n);}function u(n) {un = n;}function c() {dn = Date.now(), sn = B ? this.$mp.page.route : this.route, D("page", "show"), rn = !1;}function f() {an = sn, wn = Date.now() - dn;}function h() {an = sn, wn = Date.now() - dn;}function l() {A("event", "ald_pulldownrefresh", 1);}function p() {A("event", "ald_reachbottom", 1);}function d(n) {hn = !0;var t = m(n.path),e = {};for (var o in W.query) {"ald_share_src" === o && (e[o] = W.query[o]);}var r = "";if (r = n.path.indexOf("?") == -1 ? n.path + "?" : n.path.substr(0, n.path.indexOf("?")) + "?", "" !== t) for (var o in t) {e[o] = t[o];}e.ald_share_src ? e.ald_share_src.indexOf(z) == -1 && e.ald_share_src.length < 200 && (e.ald_share_src = e.ald_share_src + "," + z) : e.ald_share_src = z;for (var i in e) {i.indexOf("ald") == -1 && (r += i + "=" + e[i] + "&");}return n.path = r + "ald_share_src=" + e.ald_share_src, A("event", "ald_share_status", n), n;}function w() {function n() {return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);}return n() + n() + n() + n() + n() + n() + n() + n();}function g(n) {function t() {return new Promise(function (t, e) {var o = { AldStat: "MiniApp-Stat", se: J || "", op: G || "", img: K };"" === E || (o.ai = E), wx.request({ url: "https://" + U + ".aldwx.com/d.html", data: n, header: o, method: "GET", success: function success(n) {t(200 == n.statusCode ? "" : "status error");}, fail: function fail() {t("fail");} });});}V++, n.at = T, n.uu = z, n.v = C, n.ak = H.app_key.replace(/(\t)|(\s)/g, ""), n.wsr = W, n.ifo = $, n.rq_c = V, n.ls = j, n.te = b, n.et = Date.now(), n.st = Date.now(), H.useOpen ? "" === G ? pn.push(t) : (wx.Queue.push(t), pn.concat()) : wx.Queue.push(t);}function v() {var n = {};for (var t in en) {n[t] = en[t];}return n;}function y(n) {for (var t = "", e = 0; e < n.length; e++) {n[e].length > t.length && (t = n[e]);}return t;}function S() {return "" + Date.now() + Math.floor(1e7 * Math.random());}function _(n) {var t = {};for (var e in n) {"rawData" != e && "errMsg" != e && (t[e] = n[e]);}return t;}function m(n) {if (n.indexOf("?") == -1) return "";var t = {};return n.split("?")[1].split("&").forEach(function (n) {var e = n.split("=")[1];t[n.split("=")[0]] = e;}), t;}function x(n) {for (var t in n) {if ("object" == typeof n[t] && null !== n[t]) return !0;}return !1;}function q(n, t) {var e = v();e.ev = n, e.life = t, e.ec = Z, e.dr = Date.now() - N, X && (e.qr = X, e.sr = X), F && (e.usr = F), g(e);}function D(n, t) {var e = v();e.ev = n, e.life = t, e.pp = sn, e.pc = an, e.dr = Date.now() - N, hn && (e.so = 1), hn = !1, un && "{}" != JSON.stringify(un) && (e.ag = un), X && (e.qr = X, e.sr = X), F && (e.usr = F), rn && (e.ps = 1), on ? e.pdr = wn : (cn = sn, on = !0, e.ifp = on, e.fp = sn, e.pdr = 0), g(e);}function A(n, t, e) {var o = v();o.ev = n, o.tp = t, o.dr = Date.now() - N, e && (o.ct = e), g(o);}function M(n, t, e) {if (n[t]) {var o = n[t];n[t] = function (n) {e.call(this, n, t), o.call(this, n);};} else n[t] = function (n) {e.call(this, n, t);};}function I(n) {var t = {};for (var e in n) {"onLaunch" !== e && "onShow" !== e && "onHide" !== e && "onError" !== e && (t[e] = n[e]);}return t.onLaunch = function (t) {r.call(this, t), "function" == typeof n.onLaunch && n.onLaunch.call(this, t);}, t.onShow = function (t) {i.call(this, t), n.onShow && "function" == typeof n.onShow && n.onShow.call(this, t);}, t.onHide = function () {s.call(this), n.onHide && "function" == typeof n.onHide && n.onHide.call(this);}, t.onError = function (t) {a.call(this, t), n.onError && "function" == typeof n.onError && n.onError.call(this, t);}, t;}function P(n) {var t = {};for (var e in n) {"onLoad" !== e && "onShow" !== e && "onHide" !== e && "onUnload" !== e && "onPullDownRefresh" !== e && "onReachBottom" !== e && "onShareAppMessage" !== e && (t[e] = n[e]);}return t.onLoad = function (t) {u.call(this, t), "function" == typeof n.onLoad && n.onLoad.call(this, t);}, t.onShow = function (t) {c.call(this), "function" == typeof n.onShow && n.onShow.call(this, t);}, t.onHide = function (t) {f.call(this), "function" == typeof n.onHide && n.onHide.call(this, t);}, t.onUnload = function (t) {h.call(this), "function" == typeof n.onUnload && n.onUnload.call(this, t);}, t.onReachBottom = function (t) {p(), n.onReachBottom && "function" == typeof n.onReachBottom && n.onReachBottom.call(this, t);}, t.onPullDownRefresh = function (t) {l(), n.onPullDownRefresh && "function" == typeof n.onPullDownRefresh && n.onPullDownRefresh.call(this, t);}, n.onShareAppMessage && "function" == typeof n.onShareAppMessage && (t.onShareAppMessage = function (t) {var e = n.onShareAppMessage.call(this, t);return void 0 === e ? (e = {}, e.path = this.route) : void 0 === e.path && (e.path = this.route), d.call(this, e);}), t;}function L(n) {return App(I(n));}function O(n) {return Page(P(n));}function R(n) {return B = !0, I(n);}function k(n) {return P(n);}var H = __webpack_require__(/*! ./ald-stat-conf */ "../../../wky/baby/common/util/aldSdk/ald-stat-conf.js");void 0 === wx.Queue && (wx.Queue = new n(), wx.Queue.all()), H.useOpen && console.warn("提示：开启了useOpen配置后，如果不上传用户opendId则不会上报数据。");var C = "7.3.2",U = "log",b = "wx",E = function () {return void 0 === wx.getAccountInfoSync ? "" : wx.getAccountInfoSync().miniProgram.appId.split("").map(function (n) {return n.charCodeAt(0) + 9;}).join("-");}(),B = !1,T = S(),j = "",N = Date.now(),Q = 0,J = "",G = function () {var n = "";try {n = wx.getStorageSync("aldstat_op");} catch (n) {}return n;}(),K = "",V = 0,W = "",$ = "",z = function () {var n = "";try {n = wx.getStorageSync("aldstat_uuid");} catch (t) {n = "uuid_getstoragesync";}if (n) $ = !1;else {n = w();try {wx.setStorageSync("aldstat_uuid", n), $ = !0;} catch (n) {wx.setStorageSync("aldstat_uuid", "uuid_getstoragesync");}}return n;}(),F = "",X = "",Y = "",Z = 0,nn = "",tn = "",en = {},on = !1,rn = !1,sn = "",an = "",un = "",cn = "",fn = !0,hn = !1,ln = "",pn = new t(),dn = 0,wn = 0,gn = "";!function () {wx.request({ url: "https://" + U + ".aldwx.com/config/app.json", header: { AldStat: "MiniApp-Stat" }, method: "GET", success: function success(n) {200 === n.statusCode && (C < n.data.version && console.warn("您的SDK不是最新版本，请尽快升级！"), n.data.warn && console.warn(n.data.warn), n.data.error && console.error(n.data.error));} });}(), wx.aldstat = new o("");try {var vn = wx.getSystemInfoSync();en.br = vn.brand, en.pm = vn.model, en.pr = vn.pixelRatio, en.ww = vn.windowWidth, en.wh = vn.windowHeight, en.lang = vn.language, en.wv = vn.version, en.wvv = vn.platform, en.wsdk = vn.SDKVersion, en.sv = vn.system;} catch (n) {}wx.getNetworkType({ success: function success(n) {en.nt = n.networkType;} }), wx.getSetting({ success: function success(n) {n.authSetting["scope.userLocation"] ? wx.getLocation({ type: "wgs84", success: function success(n) {en.lat = n.latitude, en.lng = n.longitude, en.spd = n.speed;} }) : H.getLocation && wx.getLocation({ type: "wgs84", success: function success(n) {en.lat = n.latitude, en.lng = n.longitude, en.spd = n.speed;} });} }), o.prototype.sendEvent = function (n, t) {if ("" !== n && "string" == typeof n && n.length <= 255) {if ("string" == typeof t && t.length <= 255) A("event", n, t);else if ("object" == typeof t) {if (JSON.stringify(t).length >= 255) return void console.error("自定义事件参数不能超过255个字符");if (x(t)) return void console.error("事件参数，参数内部只支持Number,String等类型，请参考接入文档");for (var e in t) {"number" == typeof t[e] && (t[e] = t[e] + "s##");}A("event", n, JSON.stringify(t));} else void 0 === t ? A("event", n, !1) : console.error("事件参数必须为String,Object类型,且参数长度不能超过255个字符");} else console.error("事件名称必须为String类型且不能超过255个字符");}, o.prototype.sendSession = function (n) {if ("" === n || !n) return void console.error("请传入从后台获取的session_key");J = n;var t = v();t.tp = "session", t.ct = "session", t.ev = "event", "" === tn ? wx.getSetting({ success: function success(n) {n.authSetting["scope.userInfo"] ? wx.getUserInfo({ success: function success(n) {t.ufo = _(n), K = y(n.userInfo.avatarUrl.split("/")), "" !== nn && (t.gid = nn), g(t);} }) : "" !== nn && (t.gid = nn, g(t));} }) : (t.ufo = tn, "" !== nn && (t.gid = nn), g(t));}, o.prototype.sendOpenid = function (n) {if ("" === n || !n || 28 !== n.length) return void console.error("openID不能为空");G = n, wx.setStorageSync("aldstat_op", n);var t = v();t.tp = "openid", t.ev = "event", t.ct = "openid", g(t);}, o.prototype.setOpenid = function (n) {"function" == typeof n && (gn = n, e());};return H.plugin ? { App: L, Page: O, MpvueApp: R, MpvuePage: k } : function (n) {!function () {var n = App,t = Page,e = Component;App = function App(t) {M(t, "onLaunch", r), M(t, "onShow", i), M(t, "onHide", s), M(t, "onError", a), n(t);}, Page = function Page(n) {var e = n.onShareAppMessage;M(n, "onLoad", u), M(n, "onUnload", h), M(n, "onShow", c), M(n, "onHide", f), M(n, "onReachBottom", p), M(n, "onPullDownRefresh", l), void 0 !== e && null !== e && (n.onShareAppMessage = function (n) {if (void 0 !== e) {var t = e.call(this, n);return void 0 === t ? (t = {}, t.path = sn) : void 0 === t.path && (t.path = sn), d(t);}}), t(n);}, Component = function Component(n) {try {var t = n.methods.onShareAppMessage;M(n.methods, "onLoad", u), M(n.methods, "onUnload", h), M(n.methods, "onShow", c), M(n.methods, "onHide", f), M(n.methods, "onReachBottom", p), M(n.methods, "onPullDownRefresh", l), void 0 !== t && null !== t && (n.methods.onShareAppMessage = function (n) {if (void 0 !== t) {var e = t.call(this, n);return void 0 === e ? (e = {}, e.path = sn) : void 0 === e.path && (e.path = sn), d(e);}}), e(n);} catch (t) {e(n);}};}();}();});

/***/ }),

/***/ "../../../wky/baby/common/util/filters.js":
/*!******************************************!*\
  !*** E:/wky/baby/common/util/filters.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
exports.imgConversion = function (value) {//过滤富文本图片问题
  if (!value) return '';
  value = value.replace(/<img/g, '<img style="max-width:100%;"').replace(/<section/g, '<section style="max-width:100%;"').replace(/preview.html/g, 'player.html');
  return value;
};
var now = Date.now();
exports.transformDate = function (value) {//时间处理
  value = value + 8 * 60 * 60 * 1000; //转换时区
  var time = new Date(parseInt(value));
  var timeDifference = now - time;
  var nowTime = new Date(now);
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = time.getDate();
  d = d < 10 ? '0' + d : d;
  var hh = time.getHours();
  hh = hh < 10 ? '0' + hh : hh;
  var mm = time.getMinutes();
  mm = mm < 10 ? '0' + mm : mm;
  var nd = nowTime.getDate();
  nd = nd < 10 ? '0' + nd : nd;
  var specificTime = y + '.' + m + '.' + d + '   ' + hh + ':' + mm;
  var todayTime = hh + ':' + mm;
  if (timeDifference <= 60 * 1000) {
    return "刚刚";
  } else if (timeDifference <= 60 * 60 * 1000) {
    return Math.floor(timeDifference / (60 * 1000)) + '分钟前';
  } else if (timeDifference <= 24 * 60 * 60 * 1000) {
    if (nd == d) {
      return todayTime;
    } else {
      return specificTime;
    }
  } else {
    return specificTime;
  }
};
exports.articleDataNum = function (value) {//列表的点击数、转发数、评论数、点赞数的规则

  if (value < 10000) {
    return value;
  } else {
    var num = value / 10000;
    var result = num.toString().indexOf(".");
    if (result != -1) {
      num = num.toFixed(1);
      if (num.split('.')[1].toString() == '0') {
        return num.split('.')[0] + '万';
      } else {
        return num + '万';
      }
    } else {
      return num + '万';
    }
  }
};

/***/ }),

/***/ "../../../wky/baby/common/util/index.js":
/*!****************************************!*\
  !*** E:/wky/baby/common/util/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.GetDistance = GetDistance;exports.AccMul = AccMul;exports.AccAdd = AccAdd;exports.delRepArr = delRepArr;exports.getImgsrc = getImgsrc; // 参数分别为第一点的纬度，经度；第二点的纬度，经度
function Rad(d) {
  return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}
function GetDistance(lat1, lng1, lat2, lng2) {
  var radLat1 = Rad(lat1);
  var radLat2 = Rad(lat2);
  var a = radLat1 - radLat2;
  var b = Rad(lng1) - Rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
  Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000; //输出为公里
  //s=s.toFixed(4);
  return s;
}
function AccMul(arg1, arg2) {
  var m = 0,
  s1 = arg1.toString(),
  s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}
function AccAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (arg1 * m + arg2 * m) / m;
}

function delRepArr(tempList) {
  var map = {},
  dest = [];
  for (var i = 0; i < tempList.length; i++) {
    var ai = tempList[i];
    if (!map[ai.letter]) {
      // console.log('++'+ai.letter)
      dest.push({
        letter: ai.letter,
        list: [ai] });

      map[ai.letter] = ai;
    } else {
      // console.log('--'+ai.letter)
      for (var j = 0; j < dest.length; j++) {
        var dj = dest[j];
        if (dj.letter == ai.letter) {
          dj.list.push(ai);
          break;
        }
      }
    }
  }
  var p = /[a-zA-Z]/i;
  var arr = [];
  for (var index in dest) {
    // console.log(dest[index])
    // console.log(!p.test(dest[index].letter))
    if (!p.test(dest[index].letter)) {
      // dest.splice(index, 1)
      dest[index].letter = "#";
      arr.push(dest[index]);
    } else {
      dest[index].letter = dest[index].letter.toUpperCase();
    }
  }
  dest.sort(function (a, b) {
    return a.letter.charCodeAt() - b.letter.charCodeAt();
  });
  var arr1 = [];
  var obj1 = {
    letter: "#",
    list: [] };

  for (var i in dest) {
    if (dest[i].letter == "#") {
      obj1.list = obj1.list.concat(dest[i].list);
      dest.splice(i, 1);
    }
  }
  var newArr = [];
  if (obj1.list.length) {
    newArr.push(obj1);
  }
  // newArr.concat(dest)
  console.log(dest.concat(newArr));
  return dest.concat(newArr);

}
function getImgsrc(htmlstr) {
  var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
  var imgsrcArr = [];
  while (tem = reg.exec(htmlstr)) {
    imgsrcArr.push(tem[2]);
  }
  return imgsrcArr;
}

/***/ }),

/***/ "../../../wky/baby/components/mpvue-citypicker/city-data/area.js":
/*!*****************************************************************!*\
  !*** E:/wky/baby/components/mpvue-citypicker/city-data/area.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var areaData = [
[
[{
  "label": "潮阳区",
  "value": "440513" },
{
  "label": "澄海区",
  "value": "440515" },
{
  "label": "濠江区",
  "value": "440512" },
{
  "label": "南澳县",
  "value": "440523" },
{
  "label": "潮南区",
  "value": "440514" },
{
  "label": "龙湖区",
  "value": "440507" },
{
  "label": "金平区",
  "value": "440511" }],

[{
  "label": "三水区",
  "value": "440607" },
{
  "label": "高明区",
  "value": "440608" },
{
  "label": "顺德区",
  "value": "440606" },
{
  "label": "南海区",
  "value": "440605" },
{
  "label": "禅城区",
  "value": "440604" }],

[{
  "label": "怀集县",
  "value": "441224" },
{
  "label": "封开县",
  "value": "441225" },
{
  "label": "广宁县",
  "value": "441223" },
{
  "label": "四会市",
  "value": "441284" },
{
  "label": "德庆县",
  "value": "441226" },
{
  "label": "鼎湖区",
  "value": "441203" },
{
  "label": "端州区",
  "value": "441202" },
{
  "label": "高要区",
  "value": "441204" }],

[{
  "label": "龙门县",
  "value": "441324" },
{
  "label": "博罗县",
  "value": "441322" },
{
  "label": "惠东县",
  "value": "441323" },
{
  "label": "惠阳区",
  "value": "441303" },
{
  "label": "惠城区",
  "value": "441302" }],

[{
  "label": "南山区",
  "value": "440305" },
{
  "label": "宝安区",
  "value": "440306" },
{
  "label": "福田区",
  "value": "440304" },
{
  "label": "盐田区",
  "value": "440308" },
{
  "label": "罗湖区",
  "value": "440303" },
{
  "label": "龙岗区",
  "value": "440307" },
{
  "label": "龙华区",
  "value": "440309" },
{
  "label": "坪山区",
  "value": "440310" },
{
  "label": "光明区",
  "value": "440311" }],

[{
  "label": "斗门区",
  "value": "440403" },
{
  "label": "金湾区",
  "value": "440404" },
{
  "label": "香洲区",
  "value": "440402" },
{
  "label": "澳门大学横琴校区(由澳门实施管辖)",
  "value": "440499" }],

[{
  "label": "廉江市",
  "value": "440881" },
{
  "label": "吴川市",
  "value": "440883" },
{
  "label": "霞山区",
  "value": "440803" },
{
  "label": "麻章区",
  "value": "440811" },
{
  "label": "徐闻县",
  "value": "440825" },
{
  "label": "雷州市",
  "value": "440882" },
{
  "label": "坡头区",
  "value": "440804" },
{
  "label": "赤坎区",
  "value": "440802" },
{
  "label": "遂溪县",
  "value": "440823" }],

[{
  "label": "鹤山市",
  "value": "440784" },
{
  "label": "开平市",
  "value": "440783" },
{
  "label": "江海区",
  "value": "440704" },
{
  "label": "台山市",
  "value": "440781" },
{
  "label": "恩平市",
  "value": "440785" },
{
  "label": "蓬江区",
  "value": "440703" },
{
  "label": "新会区",
  "value": "440705" }],

[{
  "label": "阳春市",
  "value": "441781" },
{
  "label": "江城区",
  "value": "441702" },
{
  "label": "阳西县",
  "value": "441721" },
{
  "label": "阳东区",
  "value": "441704" }],

[{
  "label": "信宜市",
  "value": "440983" },
{
  "label": "高州市",
  "value": "440981" },
{
  "label": "电白区",
  "value": "440904" },
{
  "label": "化州市",
  "value": "440982" },
{
  "label": "茂南区",
  "value": "440902" }],

[{
  "label": "陆河县",
  "value": "441523" },
{
  "label": "海丰县",
  "value": "441521" },
{
  "label": "陆丰市",
  "value": "441581" },
{
  "label": "城区",
  "value": "441502" }],

[],
[{
  "label": "饶平县",
  "value": "445122" },
{
  "label": "潮安区",
  "value": "445103" },
{
  "label": "湘桥区",
  "value": "445102" }],

[{
  "label": "郁南县",
  "value": "445322" },
{
  "label": "罗定市",
  "value": "445381" },
{
  "label": "新兴县",
  "value": "445321" },
{
  "label": "云安区",
  "value": "445303" },
{
  "label": "云城区",
  "value": "445302" }],

[{
  "label": "连平县",
  "value": "441623" },
{
  "label": "龙川县",
  "value": "441622" },
{
  "label": "和平县",
  "value": "441624" },
{
  "label": "东源县",
  "value": "441625" },
{
  "label": "源城区",
  "value": "441602" },
{
  "label": "紫金县",
  "value": "441621" }],

[{
  "label": "平远县",
  "value": "441426" },
{
  "label": "兴宁市",
  "value": "441481" },
{
  "label": "蕉岭县",
  "value": "441427" },
{
  "label": "五华县",
  "value": "441424" },
{
  "label": "丰顺县",
  "value": "441423" },
{
  "label": "梅江区",
  "value": "441402" },
{
  "label": "梅县区",
  "value": "441403" },
{
  "label": "大埔县",
  "value": "441422" }],

[{
  "label": "揭西县",
  "value": "445222" },
{
  "label": "普宁市",
  "value": "445281" },
{
  "label": "惠来县",
  "value": "445224" },
{
  "label": "揭东区",
  "value": "445203" },
{
  "label": "榕城区",
  "value": "445202" }],

[{
  "label": "莞城街道",
  "value": "441900" },
{
  "label": "常平镇",
  "value": "441900" },
{
  "label": "望牛墩镇",
  "value": "441900" },
{
  "label": "麻涌镇",
  "value": "441900" },
{
  "label": "大朗镇",
  "value": "441900" },
{
  "label": "黄江镇",
  "value": "441900" },
{
  "label": "东莞生态园",
  "value": "441900" },
{
  "label": "桥头镇",
  "value": "441900" },
{
  "label": "凤岗镇",
  "value": "441900" },
{
  "label": "樟木头镇",
  "value": "441900" },
{
  "label": "松山湖管委会",
  "value": "441900" },
{
  "label": "石龙镇",
  "value": "441900" },
{
  "label": "寮步镇",
  "value": "441900" },
{
  "label": "高埗镇",
  "value": "441900" },
{
  "label": "塘厦镇",
  "value": "441900" },
{
  "label": "谢岗镇",
  "value": "441900" },
{
  "label": "厚街镇",
  "value": "441900" },
{
  "label": "虎门镇",
  "value": "441900" },
{
  "label": "南城街道",
  "value": "441900" },
{
  "label": "虎门港管委会",
  "value": "441900" },
{
  "label": "横沥镇",
  "value": "441900" },
{
  "label": "企石镇",
  "value": "441900" },
{
  "label": "东坑镇",
  "value": "441900" },
{
  "label": "东城街道",
  "value": "441900" },
{
  "label": "石排镇",
  "value": "441900" },
{
  "label": "洪梅镇",
  "value": "441900" },
{
  "label": "长安镇",
  "value": "441900" },
{
  "label": "沙田镇",
  "value": "441900" },
{
  "label": "道滘镇",
  "value": "441900" },
{
  "label": "大岭山镇",
  "value": "441900" },
{
  "label": "清溪镇",
  "value": "441900" },
{
  "label": "茶山镇",
  "value": "441900" },
{
  "label": "万江街道",
  "value": "441900" },
{
  "label": "中堂镇",
  "value": "441900" },
{
  "label": "石碣镇",
  "value": "441900" }],

[{
  "label": "从化区",
  "value": "440117" },
{
  "label": "增城区",
  "value": "440118" },
{
  "label": "南沙区",
  "value": "440115" },
{
  "label": "花都区",
  "value": "440114" },
{
  "label": "黄埔区",
  "value": "440112" },
{
  "label": "白云区",
  "value": "440111" },
{
  "label": "天河区",
  "value": "440106" },
{
  "label": "番禺区",
  "value": "440113" },
{
  "label": "海珠区",
  "value": "440105" },
{
  "label": "荔湾区",
  "value": "440103" },
{
  "label": "越秀区",
  "value": "440104" }],

[{
  "label": "仁化县",
  "value": "440224" },
{
  "label": "南雄市",
  "value": "440282" },
{
  "label": "乳源瑶族自治县",
  "value": "440232" },
{
  "label": "始兴县",
  "value": "440222" },
{
  "label": "浈江区",
  "value": "440204" },
{
  "label": "武江区",
  "value": "440203" },
{
  "label": "曲江区",
  "value": "440205" },
{
  "label": "翁源县",
  "value": "440229" },
{
  "label": "新丰县",
  "value": "440233" },
{
  "label": "乐昌市",
  "value": "440281" }],

[{
  "label": "连州市",
  "value": "441882" },
{
  "label": "连南瑶族自治县",
  "value": "441826" },
{
  "label": "连山壮族瑶族自治县",
  "value": "441825" },
{
  "label": "英德市",
  "value": "441881" },
{
  "label": "佛冈县",
  "value": "441821" },
{
  "label": "阳山县",
  "value": "441823" },
{
  "label": "清新区",
  "value": "441803" },
{
  "label": "清城区",
  "value": "441802" }],

[{
  "label": "三角镇",
  "value": "442000" },
{
  "label": "横栏镇",
  "value": "442000" },
{
  "label": "五桂山街道",
  "value": "442000" },
{
  "label": "东升镇",
  "value": "442000" },
{
  "label": "神湾镇",
  "value": "442000" },
{
  "label": "火炬开发区街道",
  "value": "442000" },
{
  "label": "小榄镇",
  "value": "442000" },
{
  "label": "南朗镇",
  "value": "442000" },
{
  "label": "古镇镇",
  "value": "442000" },
{
  "label": "民众镇",
  "value": "442000" },
{
  "label": "港口镇",
  "value": "442000" },
{
  "label": "三乡镇",
  "value": "442000" },
{
  "label": "石岐区街道",
  "value": "442000" },
{
  "label": "大涌镇",
  "value": "442000" },
{
  "label": "南头镇",
  "value": "442000" },
{
  "label": "黄圃镇",
  "value": "442000" },
{
  "label": "东区街道",
  "value": "442000" },
{
  "label": "阜沙镇",
  "value": "442000" },
{
  "label": "坦洲镇",
  "value": "442000" },
{
  "label": "西区街道",
  "value": "442000" },
{
  "label": "板芙镇",
  "value": "442000" },
{
  "label": "南区街道",
  "value": "442000" },
{
  "label": "沙溪镇",
  "value": "442000" },
{
  "label": "东凤镇",
  "value": "442000" }]],


[
[{
  "label": "海勃湾区",
  "value": "150302" },
{
  "label": "海南区",
  "value": "150303" },
{
  "label": "乌达区",
  "value": "150304" }],

[{
  "label": "乌拉特中旗",
  "value": "150824" },
{
  "label": "五原县",
  "value": "150821" },
{
  "label": "临河区",
  "value": "150802" },
{
  "label": "杭锦后旗",
  "value": "150826" },
{
  "label": "磴口县",
  "value": "150822" },
{
  "label": "乌拉特后旗",
  "value": "150825" },
{
  "label": "乌拉特前旗",
  "value": "150823" }],

[{
  "label": "土默特右旗",
  "value": "150221" },
{
  "label": "达尔罕茂明安联合旗",
  "value": "150223" },
{
  "label": "白云鄂博矿区",
  "value": "150206" },
{
  "label": "固阳县",
  "value": "150222" },
{
  "label": "石拐区",
  "value": "150205" },
{
  "label": "东河区",
  "value": "150202" },
{
  "label": "昆都仑区",
  "value": "150203" },
{
  "label": "九原区",
  "value": "150207" },
{
  "label": "青山区",
  "value": "150204" }],

[{
  "label": "额尔古纳市",
  "value": "150784" },
{
  "label": "根河市",
  "value": "150785" },
{
  "label": "牙克石市",
  "value": "150782" },
{
  "label": "陈巴尔虎旗",
  "value": "150725" },
{
  "label": "莫力达瓦达斡尔族自治旗",
  "value": "150722" },
{
  "label": "海拉尔区",
  "value": "150702" },
{
  "label": "鄂温克族自治旗",
  "value": "150724" },
{
  "label": "阿荣旗",
  "value": "150721" },
{
  "label": "扎兰屯市",
  "value": "150783" },
{
  "label": "扎赉诺尔区",
  "value": "150703" },
{
  "label": "满洲里市",
  "value": "150781" },
{
  "label": "新巴尔虎右旗",
  "value": "150727" },
{
  "label": "新巴尔虎左旗",
  "value": "150726" },
{
  "label": "鄂伦春自治旗",
  "value": "150723" }],

[{
  "label": "杭锦旗",
  "value": "150625" },
{
  "label": "达拉特旗",
  "value": "150621" },
{
  "label": "准格尔旗",
  "value": "150622" },
{
  "label": "鄂托克旗",
  "value": "150624" },
{
  "label": "乌审旗",
  "value": "150626" },
{
  "label": "鄂托克前旗",
  "value": "150623" },
{
  "label": "伊金霍洛旗",
  "value": "150627" },
{
  "label": "东胜区",
  "value": "150602" },
{
  "label": "康巴什区",
  "value": "150603" }],

[{
  "label": "额济纳旗",
  "value": "152923" },
{
  "label": "阿拉善右旗",
  "value": "152922" },
{
  "label": "阿拉善左旗",
  "value": "152921" }],

[{
  "label": "阿鲁科尔沁旗",
  "value": "150421" },
{
  "label": "巴林左旗",
  "value": "150422" },
{
  "label": "巴林右旗",
  "value": "150423" },
{
  "label": "林西县",
  "value": "150424" },
{
  "label": "克什克腾旗",
  "value": "150425" },
{
  "label": "翁牛特旗",
  "value": "150426" },
{
  "label": "松山区",
  "value": "150404" },
{
  "label": "宁城县",
  "value": "150429" },
{
  "label": "红山区",
  "value": "150402" },
{
  "label": "元宝山区",
  "value": "150403" },
{
  "label": "喀喇沁旗",
  "value": "150428" },
{
  "label": "敖汉旗",
  "value": "150430" }],

[{
  "label": "霍林郭勒市",
  "value": "150581" },
{
  "label": "扎鲁特旗",
  "value": "150526" },
{
  "label": "科尔沁左翼中旗",
  "value": "150521" },
{
  "label": "开鲁县",
  "value": "150523" },
{
  "label": "科尔沁区",
  "value": "150502" },
{
  "label": "奈曼旗",
  "value": "150525" },
{
  "label": "库伦旗",
  "value": "150524" },
{
  "label": "科尔沁左翼后旗",
  "value": "150522" }],

[{
  "label": "阿尔山市",
  "value": "152202" },
{
  "label": "扎赉特旗",
  "value": "152223" },
{
  "label": "科尔沁右翼中旗",
  "value": "152222" },
{
  "label": "突泉县",
  "value": "152224" },
{
  "label": "乌兰浩特市",
  "value": "152201" },
{
  "label": "科尔沁右翼前旗",
  "value": "152221" }],

[{
  "label": "四子王旗",
  "value": "150929" },
{
  "label": "化德县",
  "value": "150922" },
{
  "label": "商都县",
  "value": "150923" },
{
  "label": "察哈尔右翼中旗",
  "value": "150927" },
{
  "label": "察哈尔右翼后旗",
  "value": "150928" },
{
  "label": "兴和县",
  "value": "150924" },
{
  "label": "卓资县",
  "value": "150921" },
{
  "label": "丰镇市",
  "value": "150981" },
{
  "label": "凉城县",
  "value": "150925" },
{
  "label": "集宁区",
  "value": "150902" },
{
  "label": "察哈尔右翼前旗",
  "value": "150926" }],

[{
  "label": "东乌珠穆沁旗",
  "value": "152525" },
{
  "label": "阿巴嘎旗",
  "value": "152522" },
{
  "label": "西乌珠穆沁旗",
  "value": "152526" },
{
  "label": "苏尼特左旗",
  "value": "152523" },
{
  "label": "锡林浩特市",
  "value": "152502" },
{
  "label": "二连浩特市",
  "value": "152501" },
{
  "label": "苏尼特右旗",
  "value": "152524" },
{
  "label": "镶黄旗",
  "value": "152528" },
{
  "label": "正镶白旗",
  "value": "152529" },
{
  "label": "正蓝旗",
  "value": "152530" },
{
  "label": "多伦县",
  "value": "152531" },
{
  "label": "太仆寺旗",
  "value": "152527" }],

[{
  "label": "和林格尔县",
  "value": "150123" },
{
  "label": "玉泉区",
  "value": "150104" },
{
  "label": "回民区",
  "value": "150103" },
{
  "label": "武川县",
  "value": "150125" },
{
  "label": "托克托县",
  "value": "150122" },
{
  "label": "土默特左旗",
  "value": "150121" },
{
  "label": "新城区",
  "value": "150102" },
{
  "label": "赛罕区",
  "value": "150105" },
{
  "label": "清水河县",
  "value": "150124" }]],


[
[{
  "label": "漠河市",
  "value": "232701" },
{
  "label": "塔河县",
  "value": "232722" },
{
  "label": "呼玛县",
  "value": "232721" },
{
  "label": "加格达奇区",
  "value": "232718" }],

[{
  "label": "桃山区",
  "value": "230903" },
{
  "label": "勃利县",
  "value": "230921" },
{
  "label": "新兴区",
  "value": "230902" },
{
  "label": "茄子河区",
  "value": "230904" }],

[{
  "label": "绥滨县",
  "value": "230422" },
{
  "label": "工农区",
  "value": "230403" },
{
  "label": "兴山区",
  "value": "230407" },
{
  "label": "向阳区",
  "value": "230402" },
{
  "label": "南山区",
  "value": "230404" },
{
  "label": "兴安区",
  "value": "230405" },
{
  "label": "东山区",
  "value": "230406" },
{
  "label": "萝北县",
  "value": "230421" }],

[{
  "label": "嘉荫县",
  "value": "230722" },
{
  "label": "汤旺河区",
  "value": "230712" },
{
  "label": "乌伊岭区",
  "value": "230714" },
{
  "label": "友好区",
  "value": "230704" },
{
  "label": "新青区",
  "value": "230707" },
{
  "label": "红星区",
  "value": "230715" },
{
  "label": "五营区",
  "value": "230710" },
{
  "label": "上甘岭区",
  "value": "230716" },
{
  "label": "乌马河区",
  "value": "230711" },
{
  "label": "翠峦区",
  "value": "230706" },
{
  "label": "美溪区",
  "value": "230708" },
{
  "label": "伊春区",
  "value": "230702" },
{
  "label": "金山屯区",
  "value": "230709" },
{
  "label": "西林区",
  "value": "230705" },
{
  "label": "铁力市",
  "value": "230781" },
{
  "label": "南岔区",
  "value": "230703" },
{
  "label": "带岭区",
  "value": "230713" }],

[{
  "label": "绥棱县",
  "value": "231226" },
{
  "label": "海伦市",
  "value": "231283" },
{
  "label": "庆安县",
  "value": "231224" },
{
  "label": "北林区",
  "value": "231202" },
{
  "label": "望奎县",
  "value": "231221" },
{
  "label": "青冈县",
  "value": "231223" },
{
  "label": "兰西县",
  "value": "231222" },
{
  "label": "明水县",
  "value": "231225" },
{
  "label": "肇东市",
  "value": "231282" },
{
  "label": "安达市",
  "value": "231281" }],

[{
  "label": "巴彦县",
  "value": "230126" },
{
  "label": "依兰县",
  "value": "230123" },
{
  "label": "通河县",
  "value": "230128" },
{
  "label": "木兰县",
  "value": "230127" },
{
  "label": "呼兰区",
  "value": "230111" },
{
  "label": "方正县",
  "value": "230124" },
{
  "label": "宾县",
  "value": "230125" },
{
  "label": "延寿县",
  "value": "230129" },
{
  "label": "双城区",
  "value": "230113" },
{
  "label": "平房区",
  "value": "230108" },
{
  "label": "尚志市",
  "value": "230183" },
{
  "label": "香坊区",
  "value": "230110" },
{
  "label": "道里区",
  "value": "230102" },
{
  "label": "松北区",
  "value": "230109" },
{
  "label": "五常市",
  "value": "230184" },
{
  "label": "阿城区",
  "value": "230112" },
{
  "label": "南岗区",
  "value": "230103" },
{
  "label": "道外区",
  "value": "230104" }],

[{
  "label": "嫩江县",
  "value": "231121" },
{
  "label": "爱辉区",
  "value": "231102" },
{
  "label": "北安市",
  "value": "231181" },
{
  "label": "孙吴县",
  "value": "231124" },
{
  "label": "逊克县",
  "value": "231123" },
{
  "label": "五大连池市",
  "value": "231182" }],

[{
  "label": "讷河市",
  "value": "230281" },
{
  "label": "克山县",
  "value": "230229" },
{
  "label": "甘南县",
  "value": "230225" },
{
  "label": "克东县",
  "value": "230230" },
{
  "label": "依安县",
  "value": "230223" },
{
  "label": "富裕县",
  "value": "230227" },
{
  "label": "梅里斯达斡尔族区",
  "value": "230208" },
{
  "label": "碾子山区",
  "value": "230207" },
{
  "label": "龙江县",
  "value": "230221" },
{
  "label": "铁锋区",
  "value": "230204" },
{
  "label": "建华区",
  "value": "230203" },
{
  "label": "富拉尔基区",
  "value": "230206" },
{
  "label": "龙沙区",
  "value": "230202" },
{
  "label": "昂昂溪区",
  "value": "230205" },
{
  "label": "泰来县",
  "value": "230224" },
{
  "label": "拜泉县",
  "value": "230231" }],

[{
  "label": "爱民区",
  "value": "231004" },
{
  "label": "东安区",
  "value": "231002" },
{
  "label": "绥芬河市",
  "value": "231081" },
{
  "label": "宁安市",
  "value": "231084" },
{
  "label": "东宁市",
  "value": "231086" },
{
  "label": "阳明区",
  "value": "231003" },
{
  "label": "穆棱市",
  "value": "231085" },
{
  "label": "林口县",
  "value": "231025" },
{
  "label": "西安区",
  "value": "231005" },
{
  "label": "海林市",
  "value": "231083" }],

[{
  "label": "滴道区",
  "value": "230304" },
{
  "label": "城子河区",
  "value": "230306" },
{
  "label": "麻山区",
  "value": "230307" },
{
  "label": "鸡冠区",
  "value": "230302" },
{
  "label": "恒山区",
  "value": "230303" },
{
  "label": "梨树区",
  "value": "230305" },
{
  "label": "密山市",
  "value": "230382" },
{
  "label": "鸡东县",
  "value": "230321" },
{
  "label": "虎林市",
  "value": "230381" }],

[{
  "label": "让胡路区",
  "value": "230604" },
{
  "label": "红岗区",
  "value": "230605" },
{
  "label": "肇源县",
  "value": "230622" },
{
  "label": "大同区",
  "value": "230606" },
{
  "label": "杜尔伯特蒙古族自治县",
  "value": "230624" },
{
  "label": "林甸县",
  "value": "230623" },
{
  "label": "萨尔图区",
  "value": "230602" },
{
  "label": "龙凤区",
  "value": "230603" },
{
  "label": "肇州县",
  "value": "230621" }],

[{
  "label": "友谊县",
  "value": "230522" },
{
  "label": "四方台区",
  "value": "230505" },
{
  "label": "尖山区",
  "value": "230502" },
{
  "label": "岭东区",
  "value": "230503" },
{
  "label": "宝山区",
  "value": "230506" },
{
  "label": "宝清县",
  "value": "230523" },
{
  "label": "饶河县",
  "value": "230524" },
{
  "label": "集贤县",
  "value": "230521" }],

[{
  "label": "同江市",
  "value": "230881" },
{
  "label": "桦川县",
  "value": "230826" },
{
  "label": "汤原县",
  "value": "230828" },
{
  "label": "向阳区",
  "value": "230803" },
{
  "label": "前进区",
  "value": "230804" },
{
  "label": "东风区",
  "value": "230805" },
{
  "label": "郊区",
  "value": "230811" },
{
  "label": "抚远市",
  "value": "230883" },
{
  "label": "富锦市",
  "value": "230882" },
{
  "label": "桦南县",
  "value": "230822" }]],


[
[{
  "label": "兵团八十九团",
  "value": "659007" },
{
  "label": "兵团八十六团",
  "value": "659007" },
{
  "label": "兵团八十四团",
  "value": "659007" },
{
  "label": "兵团九十团",
  "value": "659007" },
{
  "label": "兵团八十一团",
  "value": "659007" }],

[{
  "label": "兵团一八七团",
  "value": "659005" },
{
  "label": "兵团一八三团",
  "value": "659005" },
{
  "label": "北屯镇",
  "value": "659005" },
{
  "label": "兵团一八八团",
  "value": "659005" }],

[{
  "label": "兵团二十九团",
  "value": "659006" },
{
  "label": "农二师三十团",
  "value": "659006" }],

[{
  "label": "温泉县",
  "value": "652723" },
{
  "label": "阿拉山口市",
  "value": "652702" },
{
  "label": "博乐市",
  "value": "652701" },
{
  "label": "精河县",
  "value": "652722" }],

[{
  "label": "兵团六十八团",
  "value": "659008" },
{
  "label": "都拉塔口岸",
  "value": "659008" },
{
  "label": "兵团六十七团",
  "value": "659008" },
{
  "label": "兵团六十六团",
  "value": "659008" },
{
  "label": "兵团六十三团",
  "value": "659008" },
{
  "label": "兵团六十四团",
  "value": "659008" }],

[{
  "label": "塔城市",
  "value": "654201" },
{
  "label": "和布克赛尔蒙古自治县",
  "value": "654226" },
{
  "label": "额敏县",
  "value": "654221" },
{
  "label": "裕民县",
  "value": "654225" },
{
  "label": "托里县",
  "value": "654224" },
{
  "label": "沙湾县",
  "value": "654223" },
{
  "label": "乌苏市",
  "value": "654202" }],

[{
  "label": "于田县",
  "value": "653226" },
{
  "label": "民丰县",
  "value": "653227" },
{
  "label": "和田市",
  "value": "653201" },
{
  "label": "洛浦县",
  "value": "653224" },
{
  "label": "和田县",
  "value": "653221" },
{
  "label": "皮山县",
  "value": "653223" },
{
  "label": "墨玉县",
  "value": "653222" },
{
  "label": "策勒县",
  "value": "653225" }],

[{
  "label": "兵团皮山农场",
  "value": "659009" },
{
  "label": "兵团二二四团",
  "value": "659009" },
{
  "label": "兵团四十七团",
  "value": "659009" },
{
  "label": "乌尔其乡",
  "value": "659009" },
{
  "label": "普恰克其乡",
  "value": "659009" },
{
  "label": "阔依其乡",
  "value": "659009" },
{
  "label": "喀拉喀什镇",
  "value": "659009" },
{
  "label": "乌鲁克萨依乡",
  "value": "659009" },
{
  "label": "奴尔乡",
  "value": "659009" },
{
  "label": "兵团一牧场",
  "value": "659009" },
{
  "label": "博斯坦乡",
  "value": "659009" }],

[{
  "label": "布尔津县",
  "value": "654321" },
{
  "label": "哈巴河县",
  "value": "654324" },
{
  "label": "富蕴县",
  "value": "654322" },
{
  "label": "吉木乃县",
  "value": "654326" },
{
  "label": "青河县",
  "value": "654325" },
{
  "label": "阿勒泰市",
  "value": "654301" },
{
  "label": "福海县",
  "value": "654323" }],

[{
  "label": "乌尔禾区",
  "value": "650205" },
{
  "label": "克拉玛依区",
  "value": "650203" },
{
  "label": "白碱滩区",
  "value": "650204" },
{
  "label": "独山子区",
  "value": "650202" }],

[{
  "label": "兵团一五二团",
  "value": "659001" },
{
  "label": "向阳街道",
  "value": "659001" },
{
  "label": "红山街道",
  "value": "659001" },
{
  "label": "东城街道",
  "value": "659001" },
{
  "label": "老街街道",
  "value": "659001" },
{
  "label": "石河子乡",
  "value": "659001" },
{
  "label": "北泉镇",
  "value": "659001" },
{
  "label": "新城街道",
  "value": "659001" }],

[{
  "label": "奇台县",
  "value": "652325" },
{
  "label": "玛纳斯县",
  "value": "652324" },
{
  "label": "呼图壁县",
  "value": "652323" },
{
  "label": "木垒哈萨克自治县",
  "value": "652328" },
{
  "label": "阜康市",
  "value": "652302" },
{
  "label": "昌吉市",
  "value": "652301" },
{
  "label": "吉木萨尔县",
  "value": "652327" }],

[{
  "label": "兵团一零二团",
  "value": "659004" },
{
  "label": "军垦路街道",
  "value": "659004" },
{
  "label": "人民路街道",
  "value": "659004" },
{
  "label": "兵团一零一团",
  "value": "659004" },
{
  "label": "兵团一零三团",
  "value": "659004" },
{
  "label": "青湖路街道",
  "value": "659004" }],

[{
  "label": "和静县",
  "value": "652827" },
{
  "label": "和硕县",
  "value": "652828" },
{
  "label": "焉耆回族自治县",
  "value": "652826" },
{
  "label": "博湖县",
  "value": "652829" },
{
  "label": "若羌县",
  "value": "652824" },
{
  "label": "且末县",
  "value": "652825" },
{
  "label": "库尔勒市",
  "value": "652801" },
{
  "label": "轮台县",
  "value": "652822" },
{
  "label": "尉犁县",
  "value": "652823" }],

[{
  "label": "伽师县",
  "value": "653129" },
{
  "label": "疏勒县",
  "value": "653122" },
{
  "label": "麦盖提县",
  "value": "653127" },
{
  "label": "岳普湖县",
  "value": "653128" },
{
  "label": "莎车县",
  "value": "653125" },
{
  "label": "叶城县",
  "value": "653126" },
{
  "label": "塔什库尔干塔吉克自治县",
  "value": "653131" },
{
  "label": "泽普县",
  "value": "653124" },
{
  "label": "巴楚县",
  "value": "653130" },
{
  "label": "疏附县",
  "value": "653121" },
{
  "label": "英吉沙县",
  "value": "653123" },
{
  "label": "喀什市",
  "value": "653101" }],

[{
  "label": "奎屯市",
  "value": "654003" },
{
  "label": "尼勒克县",
  "value": "654028" },
{
  "label": "伊宁县",
  "value": "654021" },
{
  "label": "巩留县",
  "value": "654024" },
{
  "label": "新源县",
  "value": "654025" },
{
  "label": "特克斯县",
  "value": "654027" },
{
  "label": "昭苏县",
  "value": "654026" },
{
  "label": "伊宁市",
  "value": "654002" },
{
  "label": "霍城县",
  "value": "654023" },
{
  "label": "察布查尔锡伯自治县",
  "value": "654022" },
{
  "label": "霍尔果斯市",
  "value": "654004" }],

[{
  "label": "拜城县",
  "value": "652926" },
{
  "label": "库车县",
  "value": "652923" },
{
  "label": "温宿县",
  "value": "652922" },
{
  "label": "新和县",
  "value": "652925" },
{
  "label": "沙雅县",
  "value": "652924" },
{
  "label": "阿克苏市",
  "value": "652901" },
{
  "label": "柯坪县",
  "value": "652929" },
{
  "label": "阿瓦提县",
  "value": "652928" },
{
  "label": "乌什县",
  "value": "652927" }],

[{
  "label": "达坂城区",
  "value": "650107" },
{
  "label": "天山区",
  "value": "650102" },
{
  "label": "沙依巴克区",
  "value": "650103" },
{
  "label": "米东区",
  "value": "650109" },
{
  "label": "水磨沟区",
  "value": "650105" },
{
  "label": "新市区",
  "value": "650104" },
{
  "label": "头屯河区",
  "value": "650106" },
{
  "label": "乌鲁木齐县",
  "value": "650121" }],

[{
  "label": "幸福路街道",
  "value": "659002" },
{
  "label": "阿拉尔农场",
  "value": "659002" },
{
  "label": "兵团第一师幸福农场",
  "value": "659002" },
{
  "label": "工业园区",
  "value": "659002" },
{
  "label": "兵团七团",
  "value": "659002" },
{
  "label": "兵团十一团",
  "value": "659002" },
{
  "label": "托喀依乡",
  "value": "659002" },
{
  "label": "青松路街道",
  "value": "659002" },
{
  "label": "兵团第一师水利水电工程处",
  "value": "659002" },
{
  "label": "兵团八团",
  "value": "659002" },
{
  "label": "中心监狱",
  "value": "659002" },
{
  "label": "兵团第一师塔里木灌区水利管理处",
  "value": "659002" },
{
  "label": "兵团十四团",
  "value": "659002" },
{
  "label": "兵团十六团",
  "value": "659002" },
{
  "label": "南口街道",
  "value": "659002" },
{
  "label": "金银川路街道",
  "value": "659002" },
{
  "label": "兵团十团",
  "value": "659002" },
{
  "label": "兵团十二团",
  "value": "659002" },
{
  "label": "兵团十三团",
  "value": "659002" }],

[{
  "label": "兵团四十九团",
  "value": "659003" },
{
  "label": "兵团图木舒克市永安坝",
  "value": "659003" },
{
  "label": "兵团五十一团",
  "value": "659003" },
{
  "label": "前海街道",
  "value": "659003" },
{
  "label": "兵团图木舒克市喀拉拜勒镇",
  "value": "659003" },
{
  "label": "永安坝街道",
  "value": "659003" },
{
  "label": "齐干却勒街道",
  "value": "659003" },
{
  "label": "兵团五十三团",
  "value": "659003" },
{
  "label": "兵团五十团",
  "value": "659003" },
{
  "label": "兵团四十四团",
  "value": "659003" }],

[{
  "label": "乌恰县",
  "value": "653024" },
{
  "label": "阿图什市",
  "value": "653001" },
{
  "label": "阿合奇县",
  "value": "653023" },
{
  "label": "阿克陶县",
  "value": "653022" }],

[{
  "label": "巴里坤哈萨克自治县",
  "value": "650521" },
{
  "label": "伊吾县",
  "value": "650522" },
{
  "label": "伊州区",
  "value": "650502" }],

[{
  "label": "高昌区",
  "value": "650402" },
{
  "label": "鄯善县",
  "value": "650421" },
{
  "label": "托克逊县",
  "value": "650422" }]],


[
[{
  "label": "丹江口市",
  "value": "420381" },
{
  "label": "张湾区",
  "value": "420303" },
{
  "label": "郧阳区",
  "value": "420304" },
{
  "label": "茅箭区",
  "value": "420302" },
{
  "label": "竹溪县",
  "value": "420324" },
{
  "label": "房县",
  "value": "420325" },
{
  "label": "竹山县",
  "value": "420323" },
{
  "label": "郧西县",
  "value": "420322" }],

[{
  "label": "钟祥市",
  "value": "420881" },
{
  "label": "东宝区",
  "value": "420802" },
{
  "label": "京山市",
  "value": "420882" },
{
  "label": "掇刀区",
  "value": "420804" },
{
  "label": "沙洋县",
  "value": "420822" }],

[{
  "label": "老河口市",
  "value": "420682" },
{
  "label": "谷城县",
  "value": "420625" },
{
  "label": "保康县",
  "value": "420626" },
{
  "label": "襄州区",
  "value": "420607" },
{
  "label": "枣阳市",
  "value": "420683" },
{
  "label": "宜城市",
  "value": "420684" },
{
  "label": "南漳县",
  "value": "420624" },
{
  "label": "襄城区",
  "value": "420602" },
{
  "label": "樊城区",
  "value": "420606" }],

[{
  "label": "红安县",
  "value": "421122" },
{
  "label": "罗田县",
  "value": "421123" },
{
  "label": "英山县",
  "value": "421124" },
{
  "label": "麻城市",
  "value": "421181" },
{
  "label": "团风县",
  "value": "421121" },
{
  "label": "浠水县",
  "value": "421125" },
{
  "label": "蕲春县",
  "value": "421126" },
{
  "label": "黄州区",
  "value": "421102" },
{
  "label": "黄梅县",
  "value": "421127" },
{
  "label": "武穴市",
  "value": "421182" }],

[{
  "label": "黄陂区",
  "value": "420116" },
{
  "label": "新洲区",
  "value": "420117" },
{
  "label": "东西湖区",
  "value": "420112" },
{
  "label": "江岸区",
  "value": "420102" },
{
  "label": "汉南区",
  "value": "420113" },
{
  "label": "蔡甸区",
  "value": "420114" },
{
  "label": "江汉区",
  "value": "420103" },
{
  "label": "硚口区",
  "value": "420104" },
{
  "label": "青山区",
  "value": "420107" },
{
  "label": "江夏区",
  "value": "420115" },
{
  "label": "武昌区",
  "value": "420106" },
{
  "label": "汉阳区",
  "value": "420105" },
{
  "label": "洪山区",
  "value": "420111" }],

[{
  "label": "兴山县",
  "value": "420526" },
{
  "label": "远安县",
  "value": "420525" },
{
  "label": "当阳市",
  "value": "420582" },
{
  "label": "秭归县",
  "value": "420527" },
{
  "label": "伍家岗区",
  "value": "420503" },
{
  "label": "长阳土家族自治县",
  "value": "420528" },
{
  "label": "点军区",
  "value": "420504" },
{
  "label": "猇亭区",
  "value": "420505" },
{
  "label": "五峰土家族自治县",
  "value": "420529" },
{
  "label": "枝江市",
  "value": "420583" },
{
  "label": "宜都市",
  "value": "420581" },
{
  "label": "西陵区",
  "value": "420502" },
{
  "label": "夷陵区",
  "value": "420506" }],

[{
  "label": "胡市镇",
  "value": "429006" },
{
  "label": "黄潭镇",
  "value": "429006" },
{
  "label": "多祥镇",
  "value": "429006" },
{
  "label": "沉湖管委会",
  "value": "429006" },
{
  "label": "干驿镇",
  "value": "429006" },
{
  "label": "横林镇",
  "value": "429006" },
{
  "label": "马湾镇",
  "value": "429006" },
{
  "label": "蒋湖农场",
  "value": "429006" },
{
  "label": "小板镇",
  "value": "429006" },
{
  "label": "岳口镇",
  "value": "429006" },
{
  "label": "多宝镇",
  "value": "429006" },
{
  "label": "蒋场镇",
  "value": "429006" },
{
  "label": "石家河镇",
  "value": "429006" },
{
  "label": "彭市镇",
  "value": "429006" },
{
  "label": "佛子山镇",
  "value": "429006" },
{
  "label": "九真镇",
  "value": "429006" },
{
  "label": "竟陵街道",
  "value": "429006" },
{
  "label": "侨乡街道开发区",
  "value": "429006" },
{
  "label": "麻洋镇",
  "value": "429006" },
{
  "label": "杨林街道",
  "value": "429006" },
{
  "label": "汪场镇",
  "value": "429006" },
{
  "label": "白茅湖农场",
  "value": "429006" },
{
  "label": "张港镇",
  "value": "429006" },
{
  "label": "渔薪镇",
  "value": "429006" },
{
  "label": "皂市镇",
  "value": "429006" },
{
  "label": "拖市镇",
  "value": "429006" },
{
  "label": "净潭乡",
  "value": "429006" },
{
  "label": "卢市镇",
  "value": "429006" }],

[{
  "label": "大悟县",
  "value": "420922" },
{
  "label": "安陆市",
  "value": "420982" },
{
  "label": "云梦县",
  "value": "420923" },
{
  "label": "应城市",
  "value": "420981" },
{
  "label": "孝南区",
  "value": "420902" },
{
  "label": "汉川市",
  "value": "420984" },
{
  "label": "孝昌县",
  "value": "420921" }],

[{
  "label": "积玉口镇",
  "value": "429005" },
{
  "label": "广华街道",
  "value": "429005" },
{
  "label": "泰丰街道",
  "value": "429005" },
{
  "label": "周矶管理区",
  "value": "429005" },
{
  "label": "潜江经济开发区",
  "value": "429005" },
{
  "label": "高场街道",
  "value": "429005" },
{
  "label": "周矶街道",
  "value": "429005" },
{
  "label": "总口管理区",
  "value": "429005" },
{
  "label": "运粮湖管理区",
  "value": "429005" },
{
  "label": "王场镇",
  "value": "429005" },
{
  "label": "白鹭湖管理区",
  "value": "429005" },
{
  "label": "园林街道",
  "value": "429005" },
{
  "label": "竹根滩镇",
  "value": "429005" },
{
  "label": "渔洋镇",
  "value": "429005" },
{
  "label": "熊口镇",
  "value": "429005" },
{
  "label": "熊口管理区",
  "value": "429005" },
{
  "label": "后湖管理区",
  "value": "429005" },
{
  "label": "江汉石油管理局",
  "value": "429005" },
{
  "label": "张金镇",
  "value": "429005" },
{
  "label": "杨市街道",
  "value": "429005" },
{
  "label": "老新镇",
  "value": "429005" },
{
  "label": "龙湾镇",
  "value": "429005" },
{
  "label": "浩口镇",
  "value": "429005" },
{
  "label": "浩口原种场",
  "value": "429005" },
{
  "label": "高石碑镇",
  "value": "429005" }],

[{
  "label": "建始县",
  "value": "422822" },
{
  "label": "恩施市",
  "value": "422801" },
{
  "label": "利川市",
  "value": "422802" },
{
  "label": "鹤峰县",
  "value": "422828" },
{
  "label": "来凤县",
  "value": "422827" },
{
  "label": "宣恩县",
  "value": "422825" },
{
  "label": "巴东县",
  "value": "422823" },
{
  "label": "咸丰县",
  "value": "422826" }],

[{
  "label": "畜禽良种场",
  "value": "429004" },
{
  "label": "工业园区",
  "value": "429004" },
{
  "label": "豆河镇",
  "value": "429004" },
{
  "label": "沙湖镇",
  "value": "429004" },
{
  "label": "通海口镇",
  "value": "429004" },
{
  "label": "长倘口镇",
  "value": "429004" },
{
  "label": "胡场镇",
  "value": "429004" },
{
  "label": "五湖渔场",
  "value": "429004" },
{
  "label": "干河街道",
  "value": "429004" },
{
  "label": "杨林尾镇",
  "value": "429004" },
{
  "label": "西流河镇",
  "value": "429004" },
{
  "label": "赵西垸林场",
  "value": "429004" },
{
  "label": "九合垸原种场",
  "value": "429004" },
{
  "label": "彭场镇",
  "value": "429004" },
{
  "label": "沔城回族镇",
  "value": "429004" },
{
  "label": "龙华山街道",
  "value": "429004" },
{
  "label": "沙湖原种场",
  "value": "429004" },
{
  "label": "陈场镇",
  "value": "429004" },
{
  "label": "郑场镇",
  "value": "429004" },
{
  "label": "沙嘴街道",
  "value": "429004" },
{
  "label": "排湖风景区",
  "value": "429004" },
{
  "label": "郭河镇",
  "value": "429004" },
{
  "label": "毛嘴镇",
  "value": "429004" },
{
  "label": "张沟镇",
  "value": "429004" },
{
  "label": "三伏潭镇",
  "value": "429004" }],

[{
  "label": "荆州区",
  "value": "421003" },
{
  "label": "江陵县",
  "value": "421024" },
{
  "label": "洪湖市",
  "value": "421083" },
{
  "label": "监利县",
  "value": "421023" },
{
  "label": "石首市",
  "value": "421081" },
{
  "label": "松滋市",
  "value": "421087" },
{
  "label": "沙市区",
  "value": "421002" },
{
  "label": "公安县",
  "value": "421022" }],

[{
  "label": "木鱼镇",
  "value": "429021" },
{
  "label": "下谷坪土家族乡",
  "value": "429021" },
{
  "label": "新华镇",
  "value": "429021" },
{
  "label": "九湖镇",
  "value": "429021" },
{
  "label": "宋洛乡",
  "value": "429021" },
{
  "label": "松柏镇",
  "value": "429021" },
{
  "label": "红坪镇",
  "value": "429021" },
{
  "label": "阳日镇",
  "value": "429021" }],

[{
  "label": "嘉鱼县",
  "value": "421221" },
{
  "label": "崇阳县",
  "value": "421223" },
{
  "label": "通山县",
  "value": "421224" },
{
  "label": "咸安区",
  "value": "421202" },
{
  "label": "赤壁市",
  "value": "421281" },
{
  "label": "通城县",
  "value": "421222" }],

[{
  "label": "广水市",
  "value": "421381" },
{
  "label": "曾都区",
  "value": "421303" },
{
  "label": "随县",
  "value": "421321" }],

[{
  "label": "华容区",
  "value": "420703" },
{
  "label": "梁子湖区",
  "value": "420702" },
{
  "label": "鄂城区",
  "value": "420704" }],

[{
  "label": "下陆区",
  "value": "420204" },
{
  "label": "铁山区",
  "value": "420205" },
{
  "label": "西塞山区",
  "value": "420203" },
{
  "label": "大冶市",
  "value": "420281" },
{
  "label": "阳新县",
  "value": "420222" },
{
  "label": "黄石港区",
  "value": "420202" }]],


[
[{
  "label": "建昌县",
  "value": "211422" },
{
  "label": "龙港区",
  "value": "211403" },
{
  "label": "兴城市",
  "value": "211481" },
{
  "label": "绥中县",
  "value": "211421" },
{
  "label": "南票区",
  "value": "211404" },
{
  "label": "连山区",
  "value": "211402" }],

[{
  "label": "瓦房店市",
  "value": "210281" },
{
  "label": "庄河市",
  "value": "210283" },
{
  "label": "普兰店区",
  "value": "210214" },
{
  "label": "金州区",
  "value": "210213" },
{
  "label": "长海县",
  "value": "210224" },
{
  "label": "甘井子区",
  "value": "210211" },
{
  "label": "旅顺口区",
  "value": "210212" },
{
  "label": "中山区",
  "value": "210202" },
{
  "label": "西岗区",
  "value": "210203" },
{
  "label": "沙河口区",
  "value": "210204" }],

[{
  "label": "黑山县",
  "value": "210726" },
{
  "label": "义县",
  "value": "210727" },
{
  "label": "太和区",
  "value": "210711" },
{
  "label": "凌海市",
  "value": "210781" },
{
  "label": "北镇市",
  "value": "210782" },
{
  "label": "古塔区",
  "value": "210702" },
{
  "label": "凌河区",
  "value": "210703" }],

[{
  "label": "凤城市",
  "value": "210682" },
{
  "label": "振安区",
  "value": "210604" },
{
  "label": "东港市",
  "value": "210681" },
{
  "label": "振兴区",
  "value": "210603" },
{
  "label": "元宝区",
  "value": "210602" },
{
  "label": "宽甸满族自治县",
  "value": "210624" }],

[{
  "label": "清原满族自治县",
  "value": "210423" },
{
  "label": "新宾满族自治县",
  "value": "210422" },
{
  "label": "望花区",
  "value": "210404" },
{
  "label": "新抚区",
  "value": "210402" },
{
  "label": "顺城区",
  "value": "210411" },
{
  "label": "抚顺县",
  "value": "210421" },
{
  "label": "东洲区",
  "value": "210403" }],

[{
  "label": "新民市",
  "value": "210181" },
{
  "label": "沈北新区",
  "value": "210113" },
{
  "label": "浑南区",
  "value": "210112" },
{
  "label": "和平区",
  "value": "210102" },
{
  "label": "于洪区",
  "value": "210114" },
{
  "label": "皇姑区",
  "value": "210105" },
{
  "label": "苏家屯区",
  "value": "210111" },
{
  "label": "康平县",
  "value": "210123" },
{
  "label": "法库县",
  "value": "210124" },
{
  "label": "沈河区",
  "value": "210103" },
{
  "label": "大东区",
  "value": "210104" },
{
  "label": "铁西区",
  "value": "210106" },
{
  "label": "辽中区",
  "value": "210115" }],

[{
  "label": "清河区",
  "value": "211204" },
{
  "label": "开原市",
  "value": "211282" },
{
  "label": "调兵山市",
  "value": "211281" },
{
  "label": "银州区",
  "value": "211202" },
{
  "label": "铁岭县",
  "value": "211221" },
{
  "label": "西丰县",
  "value": "211223" },
{
  "label": "昌图县",
  "value": "211224" }],

[{
  "label": "西市区",
  "value": "210803" },
{
  "label": "大石桥市",
  "value": "210882" },
{
  "label": "鲅鱼圈区",
  "value": "210804" },
{
  "label": "盖州市",
  "value": "210881" },
{
  "label": "站前区",
  "value": "210802" },
{
  "label": "老边区",
  "value": "210811" }],

[{
  "label": "北票市",
  "value": "211381" },
{
  "label": "建平县",
  "value": "211322" },
{
  "label": "朝阳县",
  "value": "211321" },
{
  "label": "龙城区",
  "value": "211303" },
{
  "label": "双塔区",
  "value": "211302" },
{
  "label": "凌源市",
  "value": "211382" },
{
  "label": "喀喇沁左翼蒙古族自治县",
  "value": "211324" }],

[{
  "label": "太子河区",
  "value": "211011" },
{
  "label": "弓长岭区",
  "value": "211005" },
{
  "label": "辽阳县",
  "value": "211021" },
{
  "label": "白塔区",
  "value": "211002" },
{
  "label": "文圣区",
  "value": "211003" },
{
  "label": "灯塔市",
  "value": "211081" },
{
  "label": "宏伟区",
  "value": "211004" }],

[{
  "label": "台安县",
  "value": "210321" },
{
  "label": "岫岩满族自治县",
  "value": "210323" },
{
  "label": "千山区",
  "value": "210311" },
{
  "label": "铁东区",
  "value": "210302" },
{
  "label": "立山区",
  "value": "210304" },
{
  "label": "铁西区",
  "value": "210303" },
{
  "label": "海城市",
  "value": "210381" }],

[{
  "label": "细河区",
  "value": "210911" },
{
  "label": "太平区",
  "value": "210904" },
{
  "label": "海州区",
  "value": "210902" },
{
  "label": "清河门区",
  "value": "210905" },
{
  "label": "新邱区",
  "value": "210903" },
{
  "label": "阜新蒙古族自治县",
  "value": "210921" },
{
  "label": "彰武县",
  "value": "210922" }],

[{
  "label": "双台子区",
  "value": "211102" },
{
  "label": "大洼区",
  "value": "211104" },
{
  "label": "盘山县",
  "value": "211122" },
{
  "label": "兴隆台区",
  "value": "211103" }],

[{
  "label": "桓仁满族自治县",
  "value": "210522" },
{
  "label": "溪湖区",
  "value": "210503" },
{
  "label": "南芬区",
  "value": "210505" },
{
  "label": "平山区",
  "value": "210502" },
{
  "label": "明山区",
  "value": "210504" },
{
  "label": "本溪满族自治县",
  "value": "210521" }]],


[
[{
  "label": "长岛县",
  "value": "370634" },
{
  "label": "莱州市",
  "value": "370683" },
{
  "label": "芝罘区",
  "value": "370602" },
{
  "label": "海阳市",
  "value": "370687" },
{
  "label": "龙口市",
  "value": "370681" },
{
  "label": "牟平区",
  "value": "370612" },
{
  "label": "莱阳市",
  "value": "370682" },
{
  "label": "蓬莱市",
  "value": "370684" },
{
  "label": "招远市",
  "value": "370685" },
{
  "label": "福山区",
  "value": "370611" },
{
  "label": "莱山区",
  "value": "370613" },
{
  "label": "栖霞市",
  "value": "370686" }],

[{
  "label": "环翠区",
  "value": "371002" },
{
  "label": "荣成市",
  "value": "371082" },
{
  "label": "文登区",
  "value": "371003" },
{
  "label": "乳山市",
  "value": "371083" }],

[{
  "label": "莱城区",
  "value": "371202" },
{
  "label": "钢城区",
  "value": "371203" }],

[{
  "label": "莱西市",
  "value": "370285" },
{
  "label": "平度市",
  "value": "370283" },
{
  "label": "即墨区",
  "value": "370215" },
{
  "label": "崂山区",
  "value": "370212" },
{
  "label": "城阳区",
  "value": "370214" },
{
  "label": "李沧区",
  "value": "370213" },
{
  "label": "黄岛区",
  "value": "370211" },
{
  "label": "市北区",
  "value": "370203" },
{
  "label": "胶州市",
  "value": "370281" },
{
  "label": "市南区",
  "value": "370202" }],

[{
  "label": "高青县",
  "value": "370322" },
{
  "label": "桓台县",
  "value": "370321" },
{
  "label": "张店区",
  "value": "370303" },
{
  "label": "临淄区",
  "value": "370305" },
{
  "label": "博山区",
  "value": "370304" },
{
  "label": "沂源县",
  "value": "370323" },
{
  "label": "淄川区",
  "value": "370302" },
{
  "label": "周村区",
  "value": "370306" }],

[{
  "label": "临清市",
  "value": "371581" },
{
  "label": "冠县",
  "value": "371525" },
{
  "label": "东阿县",
  "value": "371524" },
{
  "label": "高唐县",
  "value": "371526" },
{
  "label": "莘县",
  "value": "371522" },
{
  "label": "阳谷县",
  "value": "371521" },
{
  "label": "东昌府区",
  "value": "371502" },
{
  "label": "茌平县",
  "value": "371523" }],

[{
  "label": "五莲县",
  "value": "371121" },
{
  "label": "岚山区",
  "value": "371103" },
{
  "label": "东港区",
  "value": "371102" },
{
  "label": "莒县",
  "value": "371122" }],

[{
  "label": "沂水县",
  "value": "371323" },
{
  "label": "蒙阴县",
  "value": "371328" },
{
  "label": "平邑县",
  "value": "371326" },
{
  "label": "兰山区",
  "value": "371302" },
{
  "label": "费县",
  "value": "371325" },
{
  "label": "郯城县",
  "value": "371322" },
{
  "label": "沂南县",
  "value": "371321" },
{
  "label": "莒南县",
  "value": "371327" },
{
  "label": "兰陵县",
  "value": "371324" },
{
  "label": "罗庄区",
  "value": "371311" },
{
  "label": "河东区",
  "value": "371312" },
{
  "label": "临沭县",
  "value": "371329" }],

[{
  "label": "潍城区",
  "value": "370702" },
{
  "label": "奎文区",
  "value": "370705" },
{
  "label": "坊子区",
  "value": "370704" },
{
  "label": "高密市",
  "value": "370785" },
{
  "label": "临朐县",
  "value": "370724" },
{
  "label": "安丘市",
  "value": "370784" },
{
  "label": "诸城市",
  "value": "370782" },
{
  "label": "寿光市",
  "value": "370783" },
{
  "label": "昌邑市",
  "value": "370786" },
{
  "label": "寒亭区",
  "value": "370703" },
{
  "label": "青州市",
  "value": "370781" },
{
  "label": "昌乐县",
  "value": "370725" }],

[{
  "label": "商河县",
  "value": "370126" },
{
  "label": "济阳区",
  "value": "370125" },
{
  "label": "章丘区",
  "value": "370114" },
{
  "label": "长清区",
  "value": "370113" },
{
  "label": "天桥区",
  "value": "370105" },
{
  "label": "市中区",
  "value": "370103" },
{
  "label": "槐荫区",
  "value": "370104" },
{
  "label": "平阴县",
  "value": "370124" },
{
  "label": "历城区",
  "value": "370112" },
{
  "label": "历下区",
  "value": "370102" }],

[{
  "label": "利津县",
  "value": "370522" },
{
  "label": "广饶县",
  "value": "370523" },
{
  "label": "东营区",
  "value": "370502" },
{
  "label": "河口区",
  "value": "370503" },
{
  "label": "垦利区",
  "value": "370505" }],

[{
  "label": "沾化区",
  "value": "371603" },
{
  "label": "滨城区",
  "value": "371602" },
{
  "label": "博兴县",
  "value": "371625" },
{
  "label": "邹平县",
  "value": "371626" },
{
  "label": "无棣县",
  "value": "371623" },
{
  "label": "惠民县",
  "value": "371621" },
{
  "label": "阳信县",
  "value": "371622" }],

[{
  "label": "山亭区",
  "value": "370406" },
{
  "label": "市中区",
  "value": "370402" },
{
  "label": "薛城区",
  "value": "370403" },
{
  "label": "峄城区",
  "value": "370404" },
{
  "label": "台儿庄区",
  "value": "370405" },
{
  "label": "滕州市",
  "value": "370481" }],

[{
  "label": "汶上县",
  "value": "370830" },
{
  "label": "曲阜市",
  "value": "370881" },
{
  "label": "泗水县",
  "value": "370831" },
{
  "label": "邹城市",
  "value": "370883" },
{
  "label": "金乡县",
  "value": "370828" },
{
  "label": "鱼台县",
  "value": "370827" },
{
  "label": "任城区",
  "value": "370811" },
{
  "label": "嘉祥县",
  "value": "370829" },
{
  "label": "梁山县",
  "value": "370832" },
{
  "label": "微山县",
  "value": "370826" },
{
  "label": "兖州区",
  "value": "370812" }],

[{
  "label": "岱岳区",
  "value": "370911" },
{
  "label": "新泰市",
  "value": "370982" },
{
  "label": "肥城市",
  "value": "370983" },
{
  "label": "泰山区",
  "value": "370902" },
{
  "label": "东平县",
  "value": "370923" },
{
  "label": "宁阳县",
  "value": "370921" }],

[{
  "label": "宁津县",
  "value": "371422" },
{
  "label": "乐陵市",
  "value": "371481" },
{
  "label": "陵城区",
  "value": "371403" },
{
  "label": "武城县",
  "value": "371428" },
{
  "label": "德城区",
  "value": "371402" },
{
  "label": "临邑县",
  "value": "371424" },
{
  "label": "夏津县",
  "value": "371427" },
{
  "label": "禹城市",
  "value": "371482" },
{
  "label": "平原县",
  "value": "371426" },
{
  "label": "齐河县",
  "value": "371425" },
{
  "label": "庆云县",
  "value": "371423" }],

[{
  "label": "鄄城县",
  "value": "371726" },
{
  "label": "牡丹区",
  "value": "371702" },
{
  "label": "东明县",
  "value": "371728" },
{
  "label": "定陶区",
  "value": "371703" },
{
  "label": "曹县",
  "value": "371721" },
{
  "label": "单县",
  "value": "371722" },
{
  "label": "成武县",
  "value": "371723" },
{
  "label": "巨野县",
  "value": "371724" },
{
  "label": "郓城县",
  "value": "371725" }]],


[
[{
  "label": "丹凤县",
  "value": "611022" },
{
  "label": "洛南县",
  "value": "611021" },
{
  "label": "商州区",
  "value": "611002" },
{
  "label": "柞水县",
  "value": "611026" },
{
  "label": "镇安县",
  "value": "611025" },
{
  "label": "商南县",
  "value": "611023" },
{
  "label": "山阳县",
  "value": "611024" }],

[{
  "label": "宜君县",
  "value": "610222" },
{
  "label": "印台区",
  "value": "610203" },
{
  "label": "耀州区",
  "value": "610204" },
{
  "label": "王益区",
  "value": "610202" }],

[{
  "label": "阎良区",
  "value": "610114" },
{
  "label": "临潼区",
  "value": "610115" },
{
  "label": "高陵区",
  "value": "610117" },
{
  "label": "蓝田县",
  "value": "610122" },
{
  "label": "长安区",
  "value": "610116" },
{
  "label": "鄠邑区",
  "value": "610118" },
{
  "label": "未央区",
  "value": "610112" },
{
  "label": "碑林区",
  "value": "610103" },
{
  "label": "雁塔区",
  "value": "610113" },
{
  "label": "莲湖区",
  "value": "610104" },
{
  "label": "周至县",
  "value": "610124" },
{
  "label": "新城区",
  "value": "610102" },
{
  "label": "灞桥区",
  "value": "610111" }],

[{
  "label": "留坝县",
  "value": "610729" },
{
  "label": "佛坪县",
  "value": "610730" },
{
  "label": "洋县",
  "value": "610723" },
{
  "label": "城固县",
  "value": "610722" },
{
  "label": "勉县",
  "value": "610725" },
{
  "label": "略阳县",
  "value": "610727" },
{
  "label": "汉台区",
  "value": "610702" },
{
  "label": "西乡县",
  "value": "610724" },
{
  "label": "宁强县",
  "value": "610726" },
{
  "label": "南郑区",
  "value": "610703" },
{
  "label": "镇巴县",
  "value": "610728" }],

[{
  "label": "府谷县",
  "value": "610822" },
{
  "label": "榆阳区",
  "value": "610802" },
{
  "label": "神木市",
  "value": "610881" },
{
  "label": "佳县",
  "value": "610828" },
{
  "label": "横山区",
  "value": "610803" },
{
  "label": "米脂县",
  "value": "610827" },
{
  "label": "靖边县",
  "value": "610824" },
{
  "label": "子洲县",
  "value": "610831" },
{
  "label": "绥德县",
  "value": "610826" },
{
  "label": "吴堡县",
  "value": "610829" },
{
  "label": "清涧县",
  "value": "610830" },
{
  "label": "定边县",
  "value": "610825" }],

[{
  "label": "宁陕县",
  "value": "610923" },
{
  "label": "石泉县",
  "value": "610922" },
{
  "label": "汉滨区",
  "value": "610902" },
{
  "label": "旬阳县",
  "value": "610928" },
{
  "label": "汉阴县",
  "value": "610921" },
{
  "label": "白河县",
  "value": "610929" },
{
  "label": "紫阳县",
  "value": "610924" },
{
  "label": "平利县",
  "value": "610926" },
{
  "label": "岚皋县",
  "value": "610925" },
{
  "label": "镇坪县",
  "value": "610927" }],

[{
  "label": "子长县",
  "value": "610623" },
{
  "label": "安塞区",
  "value": "610603" },
{
  "label": "吴起县",
  "value": "610626" },
{
  "label": "志丹县",
  "value": "610625" },
{
  "label": "延川县",
  "value": "610622" },
{
  "label": "宝塔区",
  "value": "610602" },
{
  "label": "洛川县",
  "value": "610629" },
{
  "label": "富县",
  "value": "610628" },
{
  "label": "甘泉县",
  "value": "610627" },
{
  "label": "黄陵县",
  "value": "610632" },
{
  "label": "宜川县",
  "value": "610630" },
{
  "label": "延长县",
  "value": "610621" },
{
  "label": "黄龙县",
  "value": "610631" }],

[{
  "label": "韩城市",
  "value": "610581" },
{
  "label": "白水县",
  "value": "610527" },
{
  "label": "富平县",
  "value": "610528" },
{
  "label": "大荔县",
  "value": "610523" },
{
  "label": "华阴市",
  "value": "610582" },
{
  "label": "华州区",
  "value": "610503" },
{
  "label": "潼关县",
  "value": "610522" },
{
  "label": "合阳县",
  "value": "610524" },
{
  "label": "澄城县",
  "value": "610525" },
{
  "label": "蒲城县",
  "value": "610526" },
{
  "label": "临渭区",
  "value": "610502" }],

[{
  "label": "旬邑县",
  "value": "610429" },
{
  "label": "彬州市",
  "value": "610482" },
{
  "label": "淳化县",
  "value": "610430" },
{
  "label": "永寿县",
  "value": "610426" },
{
  "label": "三原县",
  "value": "610422" },
{
  "label": "乾县",
  "value": "610424" },
{
  "label": "渭城区",
  "value": "610404" },
{
  "label": "武功县",
  "value": "610431" },
{
  "label": "泾阳县",
  "value": "610423" },
{
  "label": "杨陵区",
  "value": "610403" },
{
  "label": "长武县",
  "value": "610428" },
{
  "label": "兴平市",
  "value": "610481" },
{
  "label": "礼泉县",
  "value": "610425" },
{
  "label": "秦都区",
  "value": "610402" }],

[{
  "label": "陇县",
  "value": "610327" },
{
  "label": "麟游县",
  "value": "610329" },
{
  "label": "千阳县",
  "value": "610328" },
{
  "label": "岐山县",
  "value": "610323" },
{
  "label": "金台区",
  "value": "610303" },
{
  "label": "凤县",
  "value": "610330" },
{
  "label": "渭滨区",
  "value": "610302" },
{
  "label": "眉县",
  "value": "610326" },
{
  "label": "太白县",
  "value": "610331" },
{
  "label": "陈仓区",
  "value": "610304" },
{
  "label": "凤翔县",
  "value": "610322" },
{
  "label": "扶风县",
  "value": "610324" }]],


[
[{
  "label": "新海镇",
  "value": "310151" },
{
  "label": "中兴镇",
  "value": "310151" },
{
  "label": "绿华镇",
  "value": "310151" },
{
  "label": "堡镇",
  "value": "310151" },
{
  "label": "竖新镇",
  "value": "310151" },
{
  "label": "港沿镇",
  "value": "310151" },
{
  "label": "长兴镇",
  "value": "310151" },
{
  "label": "上实现代农业园区",
  "value": "310151" },
{
  "label": "新村乡",
  "value": "310151" },
{
  "label": "新河镇",
  "value": "310151" },
{
  "label": "陈家镇",
  "value": "310151" },
{
  "label": "东平镇",
  "value": "310151" },
{
  "label": "建设镇",
  "value": "310151" },
{
  "label": "港西镇",
  "value": "310151" },
{
  "label": "庙镇",
  "value": "310151" },
{
  "label": "前卫农场",
  "value": "310151" },
{
  "label": "城桥镇",
  "value": "310151" },
{
  "label": "东平林场",
  "value": "310151" },
{
  "label": "三星镇",
  "value": "310151" },
{
  "label": "向化镇",
  "value": "310151" },
{
  "label": "横沙乡",
  "value": "310151" }],

[{
  "label": "康桥镇",
  "value": "310115" },
{
  "label": "宣桥镇",
  "value": "310115" },
{
  "label": "高行镇",
  "value": "310115" },
{
  "label": "航头镇",
  "value": "310115" },
{
  "label": "高东镇",
  "value": "310115" },
{
  "label": "北蔡镇",
  "value": "310115" },
{
  "label": "大团镇",
  "value": "310115" },
{
  "label": "潍坊新村街道",
  "value": "310115" },
{
  "label": "新场镇",
  "value": "310115" },
{
  "label": "金桥镇",
  "value": "310115" },
{
  "label": "祝桥镇",
  "value": "310115" },
{
  "label": "洋泾街道",
  "value": "310115" },
{
  "label": "花木街道",
  "value": "310115" },
{
  "label": "沪东新村街道",
  "value": "310115" },
{
  "label": "张江镇",
  "value": "310115" },
{
  "label": "惠南镇",
  "value": "310115" },
{
  "label": "塘桥街道",
  "value": "310115" },
{
  "label": "周家渡街道",
  "value": "310115" },
{
  "label": "张江高科技园区",
  "value": "310115" },
{
  "label": "南码头路街道",
  "value": "310115" },
{
  "label": "川沙新镇",
  "value": "310115" },
{
  "label": "周浦镇",
  "value": "310115" },
{
  "label": "万祥镇",
  "value": "310115" },
{
  "label": "曹路镇",
  "value": "310115" },
{
  "label": "外高桥保税区",
  "value": "310115" },
{
  "label": "老港镇",
  "value": "310115" },
{
  "label": "东明路街道",
  "value": "310115" },
{
  "label": "金杨新村街道",
  "value": "310115" },
{
  "label": "浦兴路街道",
  "value": "310115" },
{
  "label": "合庆镇",
  "value": "310115" },
{
  "label": "金桥经济技术开发区",
  "value": "310115" },
{
  "label": "泥城镇",
  "value": "310115" },
{
  "label": "陆家嘴街道",
  "value": "310115" },
{
  "label": "书院镇",
  "value": "310115" },
{
  "label": "高桥镇",
  "value": "310115" },
{
  "label": "上钢新村街道",
  "value": "310115" },
{
  "label": "三林镇",
  "value": "310115" },
{
  "label": "唐镇",
  "value": "310115" },
{
  "label": "南汇新城镇",
  "value": "310115" }],

[{
  "label": "金海社区",
  "value": "310120" },
{
  "label": "柘林镇",
  "value": "310120" },
{
  "label": "南桥镇",
  "value": "310120" },
{
  "label": "海湾镇",
  "value": "310120" },
{
  "label": "奉城镇",
  "value": "310120" },
{
  "label": "青村镇",
  "value": "310120" },
{
  "label": "金汇镇",
  "value": "310120" },
{
  "label": "上海市奉贤区海湾旅游区",
  "value": "310120" },
{
  "label": "四团镇",
  "value": "310120" },
{
  "label": "上海海港综合经济开发区",
  "value": "310120" },
{
  "label": "奉浦社区",
  "value": "310120" },
{
  "label": "庄行镇",
  "value": "310120" }],

[{
  "label": "廊下镇",
  "value": "310116" },
{
  "label": "金山工业区",
  "value": "310116" },
{
  "label": "漕泾镇",
  "value": "310116" },
{
  "label": "吕巷镇",
  "value": "310116" },
{
  "label": "张堰镇",
  "value": "310116" },
{
  "label": "山阳镇",
  "value": "310116" },
{
  "label": "朱泾镇",
  "value": "310116" },
{
  "label": "亭林镇",
  "value": "310116" },
{
  "label": "金山卫镇",
  "value": "310116" },
{
  "label": "枫泾镇",
  "value": "310116" },
{
  "label": "石化街道",
  "value": "310116" }],

[{
  "label": "张庙街道",
  "value": "310113" },
{
  "label": "罗店镇",
  "value": "310113" },
{
  "label": "月浦镇",
  "value": "310113" },
{
  "label": "大场镇",
  "value": "310113" },
{
  "label": "宝山城市工业园区",
  "value": "310113" },
{
  "label": "淞南镇",
  "value": "310113" },
{
  "label": "吴淞街道",
  "value": "310113" },
{
  "label": "友谊路街道",
  "value": "310113" },
{
  "label": "庙行镇",
  "value": "310113" },
{
  "label": "杨行镇",
  "value": "310113" },
{
  "label": "罗泾镇",
  "value": "310113" },
{
  "label": "顾村镇",
  "value": "310113" },
{
  "label": "高境镇",
  "value": "310113" }],

[{
  "label": "新成路街道",
  "value": "310114" },
{
  "label": "华亭镇",
  "value": "310114" },
{
  "label": "外冈镇",
  "value": "310114" },
{
  "label": "嘉定镇街道",
  "value": "310114" },
{
  "label": "南翔镇",
  "value": "310114" },
{
  "label": "嘉定工业区",
  "value": "310114" },
{
  "label": "菊园新区",
  "value": "310114" },
{
  "label": "马陆镇",
  "value": "310114" },
{
  "label": "真新街道",
  "value": "310114" },
{
  "label": "徐行镇",
  "value": "310114" },
{
  "label": "江桥镇",
  "value": "310114" },
{
  "label": "安亭镇",
  "value": "310114" }],

[{
  "label": "长征镇",
  "value": "310107" },
{
  "label": "万里街道",
  "value": "310107" },
{
  "label": "石泉路街道",
  "value": "310107" },
{
  "label": "宜川路街道",
  "value": "310107" },
{
  "label": "真如镇街道",
  "value": "310107" },
{
  "label": "长寿路街道",
  "value": "310107" },
{
  "label": "甘泉路街道",
  "value": "310107" },
{
  "label": "长风新村街道",
  "value": "310107" },
{
  "label": "曹杨新村街道",
  "value": "310107" },
{
  "label": "桃浦镇",
  "value": "310107" }],

[{
  "label": "豫园街道",
  "value": "310101" },
{
  "label": "小东门街道",
  "value": "310101" },
{
  "label": "打浦桥街道",
  "value": "310101" },
{
  "label": "淮海中路街道",
  "value": "310101" },
{
  "label": "老西门街道",
  "value": "310101" },
{
  "label": "南京东路街道",
  "value": "310101" },
{
  "label": "五里桥街道",
  "value": "310101" },
{
  "label": "外滩街道",
  "value": "310101" },
{
  "label": "半淞园路街道",
  "value": "310101" },
{
  "label": "瑞金二路街道",
  "value": "310101" }],

[{
  "label": "江浦路街道",
  "value": "310110" },
{
  "label": "大桥街道",
  "value": "310110" },
{
  "label": "新江湾城街道",
  "value": "310110" },
{
  "label": "长白新村街道",
  "value": "310110" },
{
  "label": "延吉新村街道",
  "value": "310110" },
{
  "label": "五角场街道",
  "value": "310110" },
{
  "label": "定海路街道",
  "value": "310110" },
{
  "label": "控江路街道",
  "value": "310110" },
{
  "label": "殷行街道",
  "value": "310110" },
{
  "label": "五角场镇",
  "value": "310110" },
{
  "label": "四平路街道",
  "value": "310110" },
{
  "label": "平凉路街道",
  "value": "310110" }],

[{
  "label": "小昆山镇",
  "value": "310117" },
{
  "label": "佘山镇",
  "value": "310117" },
{
  "label": "洞泾镇",
  "value": "310117" },
{
  "label": "叶榭镇",
  "value": "310117" },
{
  "label": "永丰街道",
  "value": "310117" },
{
  "label": "新浜镇",
  "value": "310117" },
{
  "label": "石湖荡镇",
  "value": "310117" },
{
  "label": "岳阳街道",
  "value": "310117" },
{
  "label": "松江工业区",
  "value": "310117" },
{
  "label": "泖港镇",
  "value": "310117" },
{
  "label": "新桥镇",
  "value": "310117" },
{
  "label": "车墩镇",
  "value": "310117" },
{
  "label": "中山街道",
  "value": "310117" },
{
  "label": "泗泾镇",
  "value": "310117" },
{
  "label": "九里亭街道",
  "value": "310117" },
{
  "label": "九亭镇",
  "value": "310117" },
{
  "label": "广富林街道",
  "value": "310117" },
{
  "label": "方松街道",
  "value": "310117" }],

[{
  "label": "重固镇",
  "value": "310118" },
{
  "label": "朱家角镇",
  "value": "310118" },
{
  "label": "夏阳街道",
  "value": "310118" },
{
  "label": "盈浦街道",
  "value": "310118" },
{
  "label": "香花桥街道",
  "value": "310118" },
{
  "label": "金泽镇",
  "value": "310118" },
{
  "label": "赵巷镇",
  "value": "310118" },
{
  "label": "练塘镇",
  "value": "310118" },
{
  "label": "华新镇",
  "value": "310118" },
{
  "label": "白鹤镇",
  "value": "310118" },
{
  "label": "徐泾镇",
  "value": "310118" }],

[{
  "label": "程家桥街道",
  "value": "310105" },
{
  "label": "天山路街道",
  "value": "310105" },
{
  "label": "新泾镇",
  "value": "310105" },
{
  "label": "华阳路街道",
  "value": "310105" },
{
  "label": "新华路街道",
  "value": "310105" },
{
  "label": "虹桥街道",
  "value": "310105" },
{
  "label": "北新泾街道",
  "value": "310105" },
{
  "label": "仙霞新村街道",
  "value": "310105" },
{
  "label": "江苏路街道",
  "value": "310105" },
{
  "label": "周家桥街道",
  "value": "310105" }],

[{
  "label": "石门二路街道",
  "value": "310106" },
{
  "label": "北站街道",
  "value": "310106" },
{
  "label": "江宁路街道",
  "value": "310106" },
{
  "label": "芷江西路街道",
  "value": "310106" },
{
  "label": "彭浦新村街道",
  "value": "310106" },
{
  "label": "大宁路街道",
  "value": "310106" },
{
  "label": "静安寺街道",
  "value": "310106" },
{
  "label": "南京西路街道",
  "value": "310106" },
{
  "label": "共和新路街道",
  "value": "310106" },
{
  "label": "天目西路街道",
  "value": "310106" },
{
  "label": "彭浦镇",
  "value": "310106" },
{
  "label": "曹家渡街道",
  "value": "310106" },
{
  "label": "宝山路街道",
  "value": "310106" },
{
  "label": "临汾路街道",
  "value": "310106" }],

[{
  "label": "欧阳路街道",
  "value": "310109" },
{
  "label": "四川北路街道",
  "value": "310109" },
{
  "label": "嘉兴路街道",
  "value": "310109" },
{
  "label": "江湾镇街道",
  "value": "310109" },
{
  "label": "北外滩街道",
  "value": "310109" },
{
  "label": "曲阳路街道",
  "value": "310109" },
{
  "label": "凉城新村街道",
  "value": "310109" },
{
  "label": "广中路街道",
  "value": "310109" }],

[{
  "label": "虹桥镇",
  "value": "310112" },
{
  "label": "莘庄工业区",
  "value": "310112" },
{
  "label": "马桥镇",
  "value": "310112" },
{
  "label": "吴泾镇",
  "value": "310112" },
{
  "label": "江川路街道",
  "value": "310112" },
{
  "label": "古美街道",
  "value": "310112" },
{
  "label": "梅陇镇",
  "value": "310112" },
{
  "label": "颛桥镇",
  "value": "310112" },
{
  "label": "新虹街道",
  "value": "310112" },
{
  "label": "华漕镇",
  "value": "310112" },
{
  "label": "莘庄镇",
  "value": "310112" },
{
  "label": "浦江镇",
  "value": "310112" },
{
  "label": "七宝镇",
  "value": "310112" },
{
  "label": "浦锦街道",
  "value": "310112" }],

[{
  "label": "枫林路街道",
  "value": "310104" },
{
  "label": "漕河泾街道",
  "value": "310104" },
{
  "label": "斜土路街道",
  "value": "310104" },
{
  "label": "康健新村街道",
  "value": "310104" },
{
  "label": "龙华街道",
  "value": "310104" },
{
  "label": "虹梅路街道",
  "value": "310104" },
{
  "label": "田林街道",
  "value": "310104" },
{
  "label": "长桥街道",
  "value": "310104" },
{
  "label": "天平路街道",
  "value": "310104" },
{
  "label": "徐家汇街道",
  "value": "310104" },
{
  "label": "华泾镇",
  "value": "310104" },
{
  "label": "湖南路街道",
  "value": "310104" },
{
  "label": "漕河泾新兴技术开发区",
  "value": "310104" },
{
  "label": "凌云路街道",
  "value": "310104" }]],


[
[{
  "label": "桐梓县",
  "value": "520322" },
{
  "label": "绥阳县",
  "value": "520323" },
{
  "label": "湄潭县",
  "value": "520328" },
{
  "label": "余庆县",
  "value": "520329" },
{
  "label": "红花岗区",
  "value": "520302" },
{
  "label": "汇川区",
  "value": "520303" },
{
  "label": "凤冈县",
  "value": "520327" },
{
  "label": "仁怀市",
  "value": "520382" },
{
  "label": "务川仡佬族苗族自治县",
  "value": "520326" },
{
  "label": "播州区",
  "value": "520304" },
{
  "label": "赤水市",
  "value": "520381" },
{
  "label": "习水县",
  "value": "520330" },
{
  "label": "正安县",
  "value": "520324" },
{
  "label": "道真仡佬族苗族自治县",
  "value": "520325" }],

[{
  "label": "印江土家族苗族自治县",
  "value": "520625" },
{
  "label": "玉屏侗族自治县",
  "value": "520622" },
{
  "label": "石阡县",
  "value": "520623" },
{
  "label": "碧江区",
  "value": "520602" },
{
  "label": "思南县",
  "value": "520624" },
{
  "label": "德江县",
  "value": "520626" },
{
  "label": "沿河土家族自治县",
  "value": "520627" },
{
  "label": "江口县",
  "value": "520621" },
{
  "label": "万山区",
  "value": "520603" },
{
  "label": "松桃苗族自治县",
  "value": "520628" }],

[{
  "label": "钟山区",
  "value": "520201" },
{
  "label": "六枝特区",
  "value": "520203" },
{
  "label": "盘州市",
  "value": "520281" },
{
  "label": "水城县",
  "value": "520221" }],

[{
  "label": "三穗县",
  "value": "522624" },
{
  "label": "剑河县",
  "value": "522629" },
{
  "label": "锦屏县",
  "value": "522628" },
{
  "label": "天柱县",
  "value": "522627" },
{
  "label": "雷山县",
  "value": "522634" },
{
  "label": "黎平县",
  "value": "522631" },
{
  "label": "榕江县",
  "value": "522632" },
{
  "label": "从江县",
  "value": "522633" },
{
  "label": "施秉县",
  "value": "522623" },
{
  "label": "镇远县",
  "value": "522625" },
{
  "label": "麻江县",
  "value": "522635" },
{
  "label": "凯里市",
  "value": "522601" },
{
  "label": "黄平县",
  "value": "522622" },
{
  "label": "丹寨县",
  "value": "522636" },
{
  "label": "台江县",
  "value": "522630" },
{
  "label": "岑巩县",
  "value": "522626" }],

[{
  "label": "西秀区",
  "value": "520402" },
{
  "label": "紫云苗族布依族自治县",
  "value": "520425" },
{
  "label": "关岭布依族苗族自治县",
  "value": "520424" },
{
  "label": "镇宁布依族苗族自治县",
  "value": "520423" },
{
  "label": "平坝区",
  "value": "520403" },
{
  "label": "普定县",
  "value": "520422" }],

[{
  "label": "都匀市",
  "value": "522701" },
{
  "label": "惠水县",
  "value": "522731" },
{
  "label": "平塘县",
  "value": "522727" },
{
  "label": "长顺县",
  "value": "522729" },
{
  "label": "独山县",
  "value": "522726" },
{
  "label": "罗甸县",
  "value": "522728" },
{
  "label": "荔波县",
  "value": "522722" },
{
  "label": "龙里县",
  "value": "522730" },
{
  "label": "贵定县",
  "value": "522723" },
{
  "label": "瓮安县",
  "value": "522725" },
{
  "label": "福泉市",
  "value": "522702" },
{
  "label": "三都水族自治县",
  "value": "522732" }],

[{
  "label": "兴仁县",
  "value": "522322" },
{
  "label": "安龙县",
  "value": "522328" },
{
  "label": "兴义市",
  "value": "522301" },
{
  "label": "册亨县",
  "value": "522327" },
{
  "label": "普安县",
  "value": "522323" },
{
  "label": "晴隆县",
  "value": "522324" },
{
  "label": "贞丰县",
  "value": "522325" },
{
  "label": "望谟县",
  "value": "522326" }],

[{
  "label": "七星关区",
  "value": "520502" },
{
  "label": "大方县",
  "value": "520521" },
{
  "label": "黔西县",
  "value": "520522" },
{
  "label": "金沙县",
  "value": "520523" },
{
  "label": "纳雍县",
  "value": "520525" },
{
  "label": "织金县",
  "value": "520524" },
{
  "label": "赫章县",
  "value": "520527" },
{
  "label": "威宁彝族回族苗族自治县",
  "value": "520526" }],

[{
  "label": "开阳县",
  "value": "520121" },
{
  "label": "白云区",
  "value": "520113" },
{
  "label": "乌当区",
  "value": "520112" },
{
  "label": "观山湖区",
  "value": "520115" },
{
  "label": "息烽县",
  "value": "520122" },
{
  "label": "修文县",
  "value": "520123" },
{
  "label": "清镇市",
  "value": "520181" },
{
  "label": "花溪区",
  "value": "520111" },
{
  "label": "南明区",
  "value": "520102" },
{
  "label": "云岩区",
  "value": "520103" }]],


[
[{
  "label": "城口县",
  "value": "500229" },
{
  "label": "巫溪县",
  "value": "500238" },
{
  "label": "奉节县",
  "value": "500236" },
{
  "label": "丰都县",
  "value": "500230" },
{
  "label": "彭水苗族土家族自治县",
  "value": "500243" },
{
  "label": "云阳县",
  "value": "500235" },
{
  "label": "秀山土家族苗族自治县",
  "value": "500241" },
{
  "label": "巫山县",
  "value": "500237" },
{
  "label": "垫江县",
  "value": "500231" },
{
  "label": "酉阳土家族苗族自治县",
  "value": "500242" },
{
  "label": "忠县",
  "value": "500233" },
{
  "label": "石柱土家族自治县",
  "value": "500240" }],

[{
  "label": "合川区",
  "value": "500117" },
{
  "label": "潼南区",
  "value": "500152" },
{
  "label": "铜梁区",
  "value": "500151" },
{
  "label": "长寿区",
  "value": "500115" },
{
  "label": "璧山区",
  "value": "500120" },
{
  "label": "大足区",
  "value": "500111" },
{
  "label": "荣昌区",
  "value": "500153" },
{
  "label": "江北区",
  "value": "500105" },
{
  "label": "武隆区",
  "value": "500156" },
{
  "label": "渝中区",
  "value": "500103" },
{
  "label": "永川区",
  "value": "500118" },
{
  "label": "大渡口区",
  "value": "500104" },
{
  "label": "南川区",
  "value": "500119" },
{
  "label": "九龙坡区",
  "value": "500107" },
{
  "label": "万州区",
  "value": "500101" },
{
  "label": "涪陵区",
  "value": "500102" },
{
  "label": "綦江区",
  "value": "500110" },
{
  "label": "渝北区",
  "value": "500112" },
{
  "label": "梁平区",
  "value": "500155" },
{
  "label": "开州区",
  "value": "500154" },
{
  "label": "江津区",
  "value": "500116" },
{
  "label": "黔江区",
  "value": "500114" },
{
  "label": "巴南区",
  "value": "500113" },
{
  "label": "南岸区",
  "value": "500108" },
{
  "label": "沙坪坝区",
  "value": "500106" },
{
  "label": "北碚区",
  "value": "500109" }]],


[
[{
  "label": "江达县",
  "value": "540321" },
{
  "label": "丁青县",
  "value": "540324" },
{
  "label": "卡若区",
  "value": "540302" },
{
  "label": "类乌齐县",
  "value": "540323" },
{
  "label": "边坝县",
  "value": "540330" },
{
  "label": "贡觉县",
  "value": "540322" },
{
  "label": "洛隆县",
  "value": "540329" },
{
  "label": "察雅县",
  "value": "540325" },
{
  "label": "八宿县",
  "value": "540326" },
{
  "label": "左贡县",
  "value": "540327" },
{
  "label": "芒康县",
  "value": "540328" }],

[{
  "label": "安多县",
  "value": "540624" },
{
  "label": "聂荣县",
  "value": "540623" },
{
  "label": "巴青县",
  "value": "540628" },
{
  "label": "申扎县",
  "value": "540625" },
{
  "label": "比如县",
  "value": "540622" },
{
  "label": "班戈县",
  "value": "540627" },
{
  "label": "索县",
  "value": "540626" },
{
  "label": "色尼区",
  "value": "540602" },
{
  "label": "嘉黎县",
  "value": "540621" },
{
  "label": "尼玛县",
  "value": "540629" },
{
  "label": "双湖县",
  "value": "540630" }],

[{
  "label": "当雄县",
  "value": "540122" },
{
  "label": "林周县",
  "value": "540121" },
{
  "label": "墨竹工卡县",
  "value": "540127" },
{
  "label": "堆龙德庆区",
  "value": "540103" },
{
  "label": "达孜区",
  "value": "540104" },
{
  "label": "尼木县",
  "value": "540123" },
{
  "label": "城关区",
  "value": "540102" },
{
  "label": "曲水县",
  "value": "540124" }],

[{
  "label": "仲巴县",
  "value": "540232" },
{
  "label": "昂仁县",
  "value": "540226" },
{
  "label": "谢通门县",
  "value": "540227" },
{
  "label": "南木林县",
  "value": "540221" },
{
  "label": "萨嘎县",
  "value": "540236" },
{
  "label": "桑珠孜区",
  "value": "540202" },
{
  "label": "拉孜县",
  "value": "540225" },
{
  "label": "白朗县",
  "value": "540228" },
{
  "label": "仁布县",
  "value": "540229" },
{
  "label": "吉隆县",
  "value": "540234" },
{
  "label": "萨迦县",
  "value": "540224" },
{
  "label": "定日县",
  "value": "540223" },
{
  "label": "江孜县",
  "value": "540222" },
{
  "label": "康马县",
  "value": "540230" },
{
  "label": "聂拉木县",
  "value": "540235" },
{
  "label": "岗巴县",
  "value": "540237" },
{
  "label": "定结县",
  "value": "540231" },
{
  "label": "亚东县",
  "value": "540233" }],

[{
  "label": "桑日县",
  "value": "540523" },
{
  "label": "加查县",
  "value": "540528" },
{
  "label": "乃东区",
  "value": "540502" },
{
  "label": "扎囊县",
  "value": "540521" },
{
  "label": "贡嘎县",
  "value": "540522" },
{
  "label": "浪卡子县",
  "value": "540531" },
{
  "label": "曲松县",
  "value": "540525" },
{
  "label": "琼结县",
  "value": "540524" },
{
  "label": "措美县",
  "value": "540526" },
{
  "label": "隆子县",
  "value": "540529" },
{
  "label": "洛扎县",
  "value": "540527" },
{
  "label": "错那县",
  "value": "540530" }],

[{
  "label": "波密县",
  "value": "540424" },
{
  "label": "工布江达县",
  "value": "540421" },
{
  "label": "巴宜区",
  "value": "540402" },
{
  "label": "米林县",
  "value": "540422" },
{
  "label": "墨脱县",
  "value": "540423" },
{
  "label": "察隅县",
  "value": "540425" },
{
  "label": "朗县",
  "value": "540426" }],

[{
  "label": "改则县",
  "value": "542526" },
{
  "label": "札达县",
  "value": "542522" },
{
  "label": "措勤县",
  "value": "542527" },
{
  "label": "普兰县",
  "value": "542521" },
{
  "label": "日土县",
  "value": "542524" },
{
  "label": "噶尔县",
  "value": "542523" },
{
  "label": "革吉县",
  "value": "542525" }]],


[
[{
  "label": "太和县",
  "value": "341222" },
{
  "label": "颍泉区",
  "value": "341204" },
{
  "label": "临泉县",
  "value": "341221" },
{
  "label": "颍州区",
  "value": "341202" },
{
  "label": "颍东区",
  "value": "341203" },
{
  "label": "阜南县",
  "value": "341225" },
{
  "label": "颍上县",
  "value": "341226" },
{
  "label": "界首市",
  "value": "341282" }],

[{
  "label": "杜集区",
  "value": "340602" },
{
  "label": "相山区",
  "value": "340603" },
{
  "label": "濉溪县",
  "value": "340621" },
{
  "label": "烈山区",
  "value": "340604" }],

[{
  "label": "博望区",
  "value": "340506" },
{
  "label": "当涂县",
  "value": "340521" },
{
  "label": "花山区",
  "value": "340503" },
{
  "label": "雨山区",
  "value": "340504" },
{
  "label": "和县",
  "value": "340523" },
{
  "label": "含山县",
  "value": "340522" }],

[{
  "label": "东至县",
  "value": "341721" },
{
  "label": "青阳县",
  "value": "341723" },
{
  "label": "贵池区",
  "value": "341702" },
{
  "label": "石台县",
  "value": "341722" }],

[{
  "label": "枞阳县",
  "value": "340722" },
{
  "label": "郊区",
  "value": "340711" },
{
  "label": "铜官区",
  "value": "340705" },
{
  "label": "义安区",
  "value": "340706" }],

[{
  "label": "谯城区",
  "value": "341602" },
{
  "label": "涡阳县",
  "value": "341621" },
{
  "label": "蒙城县",
  "value": "341622" },
{
  "label": "利辛县",
  "value": "341623" }],

[{
  "label": "固镇县",
  "value": "340323" },
{
  "label": "淮上区",
  "value": "340311" },
{
  "label": "五河县",
  "value": "340322" },
{
  "label": "怀远县",
  "value": "340321" },
{
  "label": "禹会区",
  "value": "340304" },
{
  "label": "蚌山区",
  "value": "340303" },
{
  "label": "龙子湖区",
  "value": "340302" }],

[{
  "label": "明光市",
  "value": "341182" },
{
  "label": "天长市",
  "value": "341181" },
{
  "label": "全椒县",
  "value": "341124" },
{
  "label": "凤阳县",
  "value": "341126" },
{
  "label": "来安县",
  "value": "341122" },
{
  "label": "定远县",
  "value": "341125" },
{
  "label": "南谯区",
  "value": "341103" },
{
  "label": "琅琊区",
  "value": "341102" }],

[{
  "label": "潜山市",
  "value": "340824" },
{
  "label": "岳西县",
  "value": "340828" },
{
  "label": "桐城市",
  "value": "340881" },
{
  "label": "迎江区",
  "value": "340802" },
{
  "label": "宜秀区",
  "value": "340811" },
{
  "label": "太湖县",
  "value": "340825" },
{
  "label": "望江县",
  "value": "340827" },
{
  "label": "宿松县",
  "value": "340826" },
{
  "label": "大观区",
  "value": "340803" },
{
  "label": "怀宁县",
  "value": "340822" }],

[{
  "label": "霍山县",
  "value": "341525" },
{
  "label": "裕安区",
  "value": "341503" },
{
  "label": "金寨县",
  "value": "341524" },
{
  "label": "金安区",
  "value": "341502" },
{
  "label": "舒城县",
  "value": "341523" },
{
  "label": "霍邱县",
  "value": "341522" },
{
  "label": "叶集区",
  "value": "341504" }],

[{
  "label": "繁昌县",
  "value": "340222" },
{
  "label": "弋江区",
  "value": "340203" },
{
  "label": "镜湖区",
  "value": "340202" },
{
  "label": "无为县",
  "value": "340225" },
{
  "label": "南陵县",
  "value": "340223" },
{
  "label": "三山区",
  "value": "340208" },
{
  "label": "鸠江区",
  "value": "340207" },
{
  "label": "芜湖县",
  "value": "340221" }],

[{
  "label": "黄山区",
  "value": "341003" },
{
  "label": "黟县",
  "value": "341023" },
{
  "label": "祁门县",
  "value": "341024" },
{
  "label": "歙县",
  "value": "341021" },
{
  "label": "屯溪区",
  "value": "341002" },
{
  "label": "徽州区",
  "value": "341004" },
{
  "label": "休宁县",
  "value": "341022" }],

[{
  "label": "广德县",
  "value": "341822" },
{
  "label": "泾县",
  "value": "341823" },
{
  "label": "旌德县",
  "value": "341825" },
{
  "label": "绩溪县",
  "value": "341824" },
{
  "label": "宣州区",
  "value": "341802" },
{
  "label": "宁国市",
  "value": "341881" },
{
  "label": "郎溪县",
  "value": "341821" }],

[{
  "label": "凤台县",
  "value": "340421" },
{
  "label": "潘集区",
  "value": "340406" },
{
  "label": "八公山区",
  "value": "340405" },
{
  "label": "谢家集区",
  "value": "340404" },
{
  "label": "田家庵区",
  "value": "340403" },
{
  "label": "大通区",
  "value": "340402" },
{
  "label": "寿县",
  "value": "340422" }],

[{
  "label": "庐阳区",
  "value": "340103" },
{
  "label": "肥东县",
  "value": "340122" },
{
  "label": "庐江县",
  "value": "340124" },
{
  "label": "瑶海区",
  "value": "340102" },
{
  "label": "长丰县",
  "value": "340121" },
{
  "label": "包河区",
  "value": "340111" },
{
  "label": "巢湖市",
  "value": "340181" },
{
  "label": "蜀山区",
  "value": "340104" },
{
  "label": "肥西县",
  "value": "340123" }],

[{
  "label": "砀山县",
  "value": "341321" },
{
  "label": "埇桥区",
  "value": "341302" },
{
  "label": "灵璧县",
  "value": "341323" },
{
  "label": "泗县",
  "value": "341324" },
{
  "label": "萧县",
  "value": "341322" }]],


[
[{
  "label": "寿宁县",
  "value": "350924" },
{
  "label": "屏南县",
  "value": "350923" },
{
  "label": "福鼎市",
  "value": "350982" },
{
  "label": "柘荣县",
  "value": "350926" },
{
  "label": "周宁县",
  "value": "350925" },
{
  "label": "福安市",
  "value": "350981" },
{
  "label": "古田县",
  "value": "350922" },
{
  "label": "蕉城区",
  "value": "350902" },
{
  "label": "霞浦县",
  "value": "350921" }],

[{
  "label": "罗源县",
  "value": "350123" },
{
  "label": "闽清县",
  "value": "350124" },
{
  "label": "闽侯县",
  "value": "350121" },
{
  "label": "连江县",
  "value": "350122" },
{
  "label": "长乐区",
  "value": "350112" },
{
  "label": "仓山区",
  "value": "350104" },
{
  "label": "永泰县",
  "value": "350125" },
{
  "label": "福清市",
  "value": "350181" },
{
  "label": "平潭县",
  "value": "350128" },
{
  "label": "鼓楼区",
  "value": "350102" },
{
  "label": "台江区",
  "value": "350103" },
{
  "label": "马尾区",
  "value": "350105" },
{
  "label": "晋安区",
  "value": "350111" }],

[{
  "label": "长汀县",
  "value": "350821" },
{
  "label": "连城县",
  "value": "350825" },
{
  "label": "漳平市",
  "value": "350881" },
{
  "label": "上杭县",
  "value": "350823" },
{
  "label": "新罗区",
  "value": "350802" },
{
  "label": "武平县",
  "value": "350824" },
{
  "label": "永定区",
  "value": "350803" }],

[{
  "label": "仙游县",
  "value": "350322" },
{
  "label": "城厢区",
  "value": "350302" },
{
  "label": "荔城区",
  "value": "350304" },
{
  "label": "秀屿区",
  "value": "350305" },
{
  "label": "涵江区",
  "value": "350303" }],

[{
  "label": "德化县",
  "value": "350526" },
{
  "label": "永春县",
  "value": "350525" },
{
  "label": "安溪县",
  "value": "350524" },
{
  "label": "南安市",
  "value": "350583" },
{
  "label": "洛江区",
  "value": "350504" },
{
  "label": "泉港区",
  "value": "350505" },
{
  "label": "惠安县",
  "value": "350521" },
{
  "label": "丰泽区",
  "value": "350503" },
{
  "label": "石狮市",
  "value": "350581" },
{
  "label": "晋江市",
  "value": "350582" },
{
  "label": "金门县",
  "value": "350527" },
{
  "label": "鲤城区",
  "value": "350502" }],

[{
  "label": "同安区",
  "value": "350212" },
{
  "label": "集美区",
  "value": "350211" },
{
  "label": "海沧区",
  "value": "350205" },
{
  "label": "湖里区",
  "value": "350206" },
{
  "label": "思明区",
  "value": "350203" },
{
  "label": "翔安区",
  "value": "350213" }],

[{
  "label": "华安县",
  "value": "350629" },
{
  "label": "南靖县",
  "value": "350627" },
{
  "label": "龙海市",
  "value": "350681" },
{
  "label": "长泰县",
  "value": "350625" },
{
  "label": "诏安县",
  "value": "350624" },
{
  "label": "漳浦县",
  "value": "350623" },
{
  "label": "东山县",
  "value": "350626" },
{
  "label": "龙文区",
  "value": "350603" },
{
  "label": "芗城区",
  "value": "350602" },
{
  "label": "平和县",
  "value": "350628" },
{
  "label": "云霄县",
  "value": "350622" }],

[{
  "label": "光泽县",
  "value": "350723" },
{
  "label": "浦城县",
  "value": "350722" },
{
  "label": "武夷山市",
  "value": "350782" },
{
  "label": "建阳区",
  "value": "350703" },
{
  "label": "松溪县",
  "value": "350724" },
{
  "label": "邵武市",
  "value": "350781" },
{
  "label": "顺昌县",
  "value": "350721" },
{
  "label": "政和县",
  "value": "350725" },
{
  "label": "建瓯市",
  "value": "350783" },
{
  "label": "延平区",
  "value": "350702" }],

[{
  "label": "泰宁县",
  "value": "350429" },
{
  "label": "宁化县",
  "value": "350424" },
{
  "label": "梅列区",
  "value": "350402" },
{
  "label": "清流县",
  "value": "350423" },
{
  "label": "三元区",
  "value": "350403" },
{
  "label": "永安市",
  "value": "350481" },
{
  "label": "大田县",
  "value": "350425" },
{
  "label": "沙县",
  "value": "350427" },
{
  "label": "尤溪县",
  "value": "350426" },
{
  "label": "建宁县",
  "value": "350430" },
{
  "label": "明溪县",
  "value": "350421" },
{
  "label": "将乐县",
  "value": "350428" }]],


[
[{
  "label": "华容县",
  "value": "430623" },
{
  "label": "君山区",
  "value": "430611" },
{
  "label": "云溪区",
  "value": "430603" },
{
  "label": "岳阳楼区",
  "value": "430602" },
{
  "label": "汨罗市",
  "value": "430681" },
{
  "label": "湘阴县",
  "value": "430624" },
{
  "label": "岳阳县",
  "value": "430621" },
{
  "label": "平江县",
  "value": "430626" },
{
  "label": "临湘市",
  "value": "430682" }],

[{
  "label": "南县",
  "value": "430921" },
{
  "label": "沅江市",
  "value": "430981" },
{
  "label": "资阳区",
  "value": "430902" },
{
  "label": "桃江县",
  "value": "430922" },
{
  "label": "赫山区",
  "value": "430903" },
{
  "label": "安化县",
  "value": "430923" }],

[{
  "label": "衡山县",
  "value": "430423" },
{
  "label": "衡东县",
  "value": "430424" },
{
  "label": "衡阳县",
  "value": "430421" },
{
  "label": "南岳区",
  "value": "430412" },
{
  "label": "祁东县",
  "value": "430426" },
{
  "label": "珠晖区",
  "value": "430405" },
{
  "label": "石鼓区",
  "value": "430407" },
{
  "label": "衡南县",
  "value": "430422" },
{
  "label": "雁峰区",
  "value": "430406" },
{
  "label": "耒阳市",
  "value": "430481" },
{
  "label": "蒸湘区",
  "value": "430408" },
{
  "label": "常宁市",
  "value": "430482" }],

[{
  "label": "冷水江市",
  "value": "431381" },
{
  "label": "新化县",
  "value": "431322" },
{
  "label": "涟源市",
  "value": "431382" },
{
  "label": "双峰县",
  "value": "431321" },
{
  "label": "娄星区",
  "value": "431302" }],

[{
  "label": "岳麓区",
  "value": "430104" },
{
  "label": "开福区",
  "value": "430105" },
{
  "label": "芙蓉区",
  "value": "430102" },
{
  "label": "天心区",
  "value": "430103" },
{
  "label": "浏阳市",
  "value": "430181" },
{
  "label": "长沙县",
  "value": "430121" },
{
  "label": "雨花区",
  "value": "430111" },
{
  "label": "宁乡市",
  "value": "430182" },
{
  "label": "望城区",
  "value": "430112" }],

[{
  "label": "慈利县",
  "value": "430821" },
{
  "label": "武陵源区",
  "value": "430811" },
{
  "label": "桑植县",
  "value": "430822" },
{
  "label": "永定区",
  "value": "430802" }],

[{
  "label": "芷江侗族自治县",
  "value": "431228" },
{
  "label": "洪江市",
  "value": "431281" },
{
  "label": "通道侗族自治县",
  "value": "431230" },
{
  "label": "沅陵县",
  "value": "431222" },
{
  "label": "辰溪县",
  "value": "431223" },
{
  "label": "溆浦县",
  "value": "431224" },
{
  "label": "会同县",
  "value": "431225" },
{
  "label": "靖州苗族侗族自治县",
  "value": "431229" },
{
  "label": "麻阳苗族自治县",
  "value": "431226" },
{
  "label": "新晃侗族自治县",
  "value": "431227" },
{
  "label": "中方县",
  "value": "431221" },
{
  "label": "鹤城区",
  "value": "431202" }],

[{
  "label": "永顺县",
  "value": "433127" },
{
  "label": "保靖县",
  "value": "433125" },
{
  "label": "花垣县",
  "value": "433124" },
{
  "label": "吉首市",
  "value": "433101" },
{
  "label": "古丈县",
  "value": "433126" },
{
  "label": "泸溪县",
  "value": "433122" },
{
  "label": "龙山县",
  "value": "433130" },
{
  "label": "凤凰县",
  "value": "433123" }],

[{
  "label": "石门县",
  "value": "430726" },
{
  "label": "澧县",
  "value": "430723" },
{
  "label": "津市市",
  "value": "430781" },
{
  "label": "临澧县",
  "value": "430724" },
{
  "label": "汉寿县",
  "value": "430722" },
{
  "label": "鼎城区",
  "value": "430703" },
{
  "label": "武陵区",
  "value": "430702" },
{
  "label": "桃源县",
  "value": "430725" },
{
  "label": "安乡县",
  "value": "430721" }],

[{
  "label": "荷塘区",
  "value": "430202" },
{
  "label": "攸县",
  "value": "430223" },
{
  "label": "茶陵县",
  "value": "430224" },
{
  "label": "炎陵县",
  "value": "430225" },
{
  "label": "天元区",
  "value": "430211" },
{
  "label": "芦淞区",
  "value": "430203" },
{
  "label": "株洲县",
  "value": "430221" },
{
  "label": "石峰区",
  "value": "430204" },
{
  "label": "醴陵市",
  "value": "430281" }],

[{
  "label": "隆回县",
  "value": "430524" },
{
  "label": "邵东县",
  "value": "430521" },
{
  "label": "双清区",
  "value": "430502" },
{
  "label": "北塔区",
  "value": "430511" },
{
  "label": "邵阳县",
  "value": "430523" },
{
  "label": "绥宁县",
  "value": "430527" },
{
  "label": "大祥区",
  "value": "430503" },
{
  "label": "新宁县",
  "value": "430528" },
{
  "label": "新邵县",
  "value": "430522" },
{
  "label": "城步苗族自治县",
  "value": "430529" },
{
  "label": "武冈市",
  "value": "430581" },
{
  "label": "洞口县",
  "value": "430525" }],

[{
  "label": "湘潭县",
  "value": "430321" },
{
  "label": "岳塘区",
  "value": "430304" },
{
  "label": "雨湖区",
  "value": "430302" },
{
  "label": "韶山市",
  "value": "430382" },
{
  "label": "湘乡市",
  "value": "430381" }],

[{
  "label": "东安县",
  "value": "431122" },
{
  "label": "祁阳县",
  "value": "431121" },
{
  "label": "冷水滩区",
  "value": "431103" },
{
  "label": "零陵区",
  "value": "431102" },
{
  "label": "新田县",
  "value": "431128" },
{
  "label": "宁远县",
  "value": "431126" },
{
  "label": "道县",
  "value": "431124" },
{
  "label": "江永县",
  "value": "431125" },
{
  "label": "江华瑶族自治县",
  "value": "431129" },
{
  "label": "双牌县",
  "value": "431123" },
{
  "label": "蓝山县",
  "value": "431127" }],

[{
  "label": "永兴县",
  "value": "431023" },
{
  "label": "安仁县",
  "value": "431028" },
{
  "label": "资兴市",
  "value": "431081" },
{
  "label": "桂东县",
  "value": "431027" },
{
  "label": "苏仙区",
  "value": "431003" },
{
  "label": "汝城县",
  "value": "431026" },
{
  "label": "北湖区",
  "value": "431002" },
{
  "label": "临武县",
  "value": "431025" },
{
  "label": "桂阳县",
  "value": "431021" },
{
  "label": "宜章县",
  "value": "431022" },
{
  "label": "嘉禾县",
  "value": "431024" }]],


[
[{
  "label": "新竹镇",
  "value": "469021" },
{
  "label": "黄竹镇",
  "value": "469021" },
{
  "label": "国营中瑞农场",
  "value": "469021" },
{
  "label": "富文镇",
  "value": "469021" },
{
  "label": "岭口镇",
  "value": "469021" },
{
  "label": "定城镇",
  "value": "469021" },
{
  "label": "翰林镇",
  "value": "469021" },
{
  "label": "雷鸣镇",
  "value": "469021" },
{
  "label": "国营南海农场",
  "value": "469021" },
{
  "label": "龙门镇",
  "value": "469021" },
{
  "label": "国营金鸡岭农场",
  "value": "469021" },
{
  "label": "龙河镇",
  "value": "469021" },
{
  "label": "龙湖镇",
  "value": "469021" }],

[{
  "label": "国营中建农场",
  "value": "469022" },
{
  "label": "屯城镇",
  "value": "469022" },
{
  "label": "新兴镇",
  "value": "469022" },
{
  "label": "南吕镇",
  "value": "469022" },
{
  "label": "坡心镇",
  "value": "469022" },
{
  "label": "国营中坤农场",
  "value": "469022" },
{
  "label": "西昌镇",
  "value": "469022" },
{
  "label": "枫木镇",
  "value": "469022" },
{
  "label": "南坤镇",
  "value": "469022" },
{
  "label": "乌坡镇",
  "value": "469022" }],

[{
  "label": "博厚镇",
  "value": "469024" },
{
  "label": "南宝镇",
  "value": "469024" },
{
  "label": "和舍镇",
  "value": "469024" },
{
  "label": "调楼镇",
  "value": "469024" },
{
  "label": "东英镇",
  "value": "469024" },
{
  "label": "波莲镇",
  "value": "469024" },
{
  "label": "国营加来农场",
  "value": "469024" },
{
  "label": "多文镇",
  "value": "469024" },
{
  "label": "新盈镇",
  "value": "469024" },
{
  "label": "临城镇",
  "value": "469024" },
{
  "label": "国营红华农场",
  "value": "469024" },
{
  "label": "皇桐镇",
  "value": "469024" }],

[{
  "label": "十月田镇",
  "value": "469026" },
{
  "label": "国营霸王岭林场",
  "value": "469026" },
{
  "label": "乌烈镇",
  "value": "469026" },
{
  "label": "七叉镇",
  "value": "469026" },
{
  "label": "海南矿业联合有限公司",
  "value": "469026" },
{
  "label": "叉河镇",
  "value": "469026" },
{
  "label": "石碌镇",
  "value": "469026" },
{
  "label": "海尾镇",
  "value": "469026" },
{
  "label": "国营红林农场",
  "value": "469026" },
{
  "label": "昌化镇",
  "value": "469026" },
{
  "label": "王下乡",
  "value": "469026" }],

[{
  "label": "七坊镇",
  "value": "469025" },
{
  "label": "金波乡",
  "value": "469025" },
{
  "label": "南开乡",
  "value": "469025" },
{
  "label": "荣邦乡",
  "value": "469025" },
{
  "label": "邦溪镇",
  "value": "469025" },
{
  "label": "青松乡",
  "value": "469025" },
{
  "label": "国营龙江农场",
  "value": "469025" },
{
  "label": "细水乡",
  "value": "469025" },
{
  "label": "元门乡",
  "value": "469025" },
{
  "label": "牙叉镇",
  "value": "469025" },
{
  "label": "国营白沙农场",
  "value": "469025" },
{
  "label": "打安镇",
  "value": "469025" },
{
  "label": "阜龙乡",
  "value": "469025" },
{
  "label": "国营邦溪农场",
  "value": "469025" }],

[{
  "label": "东方华侨农场",
  "value": "469007" },
{
  "label": "江边乡",
  "value": "469007" },
{
  "label": "东河镇",
  "value": "469007" },
{
  "label": "新龙镇",
  "value": "469007" },
{
  "label": "天安乡",
  "value": "469007" },
{
  "label": "国营广坝农场",
  "value": "469007" },
{
  "label": "感城镇",
  "value": "469007" },
{
  "label": "三家镇",
  "value": "469007" },
{
  "label": "四更镇",
  "value": "469007" },
{
  "label": "板桥镇",
  "value": "469007" },
{
  "label": "八所镇",
  "value": "469007" },
{
  "label": "大田镇",
  "value": "469007" }],

[{
  "label": "嘉积镇",
  "value": "469002" },
{
  "label": "会山镇",
  "value": "469002" },
{
  "label": "国营东升农场",
  "value": "469002" },
{
  "label": "国营东太农场",
  "value": "469002" },
{
  "label": "万泉镇",
  "value": "469002" },
{
  "label": "国营东红农场",
  "value": "469002" },
{
  "label": "彬村山华侨农场",
  "value": "469002" },
{
  "label": "大路镇",
  "value": "469002" },
{
  "label": "潭门镇",
  "value": "469002" },
{
  "label": "塔洋镇",
  "value": "469002" },
{
  "label": "龙江镇",
  "value": "469002" },
{
  "label": "石壁镇",
  "value": "469002" },
{
  "label": "中原镇",
  "value": "469002" },
{
  "label": "博鳌镇",
  "value": "469002" },
{
  "label": "阳江镇",
  "value": "469002" },
{
  "label": "长坡镇",
  "value": "469002" }],

[{
  "label": "吊罗山乡",
  "value": "469030" },
{
  "label": "什运乡",
  "value": "469030" },
{
  "label": "和平镇",
  "value": "469030" },
{
  "label": "湾岭镇",
  "value": "469030" },
{
  "label": "国营加钗农场",
  "value": "469030" },
{
  "label": "国营阳江农场",
  "value": "469030" },
{
  "label": "国营乌石农场",
  "value": "469030" },
{
  "label": "营根镇",
  "value": "469030" },
{
  "label": "上安乡",
  "value": "469030" },
{
  "label": "国营黎母山林业公司",
  "value": "469030" },
{
  "label": "中平镇",
  "value": "469030" },
{
  "label": "长征镇",
  "value": "469030" },
{
  "label": "国营长征农场",
  "value": "469030" },
{
  "label": "黎母山镇",
  "value": "469030" },
{
  "label": "红毛镇",
  "value": "469030" }],

[{
  "label": "礼纪镇",
  "value": "469006" },
{
  "label": "国营东和农场",
  "value": "469006" },
{
  "label": "后安镇",
  "value": "469006" },
{
  "label": "万城镇",
  "value": "469006" },
{
  "label": "国营东兴农场",
  "value": "469006" },
{
  "label": "山根镇",
  "value": "469006" },
{
  "label": "大茂镇",
  "value": "469006" },
{
  "label": "龙滚镇",
  "value": "469006" },
{
  "label": "和乐镇",
  "value": "469006" },
{
  "label": "兴隆华侨农场",
  "value": "469006" },
{
  "label": "三更罗镇",
  "value": "469006" },
{
  "label": "长丰镇",
  "value": "469006" },
{
  "label": "国营新中农场",
  "value": "469006" },
{
  "label": "地方国营六连林场",
  "value": "469006" },
{
  "label": "北大镇",
  "value": "469006" },
{
  "label": "南桥镇",
  "value": "469006" },
{
  "label": "东澳镇",
  "value": "469006" }],

[{
  "label": "南圣镇",
  "value": "469001" },
{
  "label": "毛阳镇",
  "value": "469001" },
{
  "label": "国营畅好农场",
  "value": "469001" },
{
  "label": "水满乡",
  "value": "469001" },
{
  "label": "通什镇",
  "value": "469001" },
{
  "label": "番阳镇",
  "value": "469001" },
{
  "label": "畅好乡",
  "value": "469001" },
{
  "label": "毛道乡",
  "value": "469001" }],

[{
  "label": "椰林镇",
  "value": "469028" },
{
  "label": "黎安镇",
  "value": "469028" },
{
  "label": "新村镇",
  "value": "469028" },
{
  "label": "文罗镇",
  "value": "469028" },
{
  "label": "国营吊罗山林业公司",
  "value": "469028" },
{
  "label": "国营南平农场",
  "value": "469028" },
{
  "label": "光坡镇",
  "value": "469028" },
{
  "label": "本号镇",
  "value": "469028" },
{
  "label": "群英乡",
  "value": "469028" },
{
  "label": "提蒙乡",
  "value": "469028" },
{
  "label": "三才镇",
  "value": "469028" },
{
  "label": "隆广镇",
  "value": "469028" },
{
  "label": "国营岭门农场",
  "value": "469028" },
{
  "label": "英州镇",
  "value": "469028" }],

[{
  "label": "海南保亭热带作物研究所",
  "value": "469029" },
{
  "label": "加茂镇",
  "value": "469029" },
{
  "label": "新政镇",
  "value": "469029" },
{
  "label": "国营金江农场",
  "value": "469029" },
{
  "label": "保城镇",
  "value": "469029" },
{
  "label": "国营新星农场",
  "value": "469029" },
{
  "label": "南林乡",
  "value": "469029" },
{
  "label": "国营三道农场",
  "value": "469029" },
{
  "label": "毛感乡",
  "value": "469029" },
{
  "label": "什玲镇",
  "value": "469029" },
{
  "label": "响水镇",
  "value": "469029" },
{
  "label": "六弓乡",
  "value": "469029" },
{
  "label": "三道镇",
  "value": "469029" }],

[{
  "label": "国营山荣农场",
  "value": "469027" },
{
  "label": "莺歌海镇",
  "value": "469027" },
{
  "label": "国营保国农场",
  "value": "469027" },
{
  "label": "万冲镇",
  "value": "469027" },
{
  "label": "国营乐光农场",
  "value": "469027" },
{
  "label": "抱由镇",
  "value": "469027" },
{
  "label": "利国镇",
  "value": "469027" },
{
  "label": "大安镇",
  "value": "469027" },
{
  "label": "佛罗镇",
  "value": "469027" },
{
  "label": "九所镇",
  "value": "469027" },
{
  "label": "国营莺歌海盐场",
  "value": "469027" },
{
  "label": "黄流镇",
  "value": "469027" },
{
  "label": "尖峰镇",
  "value": "469027" },
{
  "label": "国营尖峰岭林业公司",
  "value": "469027" },
{
  "label": "志仲镇",
  "value": "469027" },
{
  "label": "千家镇",
  "value": "469027" }],

[{
  "label": "洋浦经济开发区",
  "value": "460400" },
{
  "label": "光村镇",
  "value": "460400" },
{
  "label": "兰洋镇",
  "value": "460400" },
{
  "label": "东成镇",
  "value": "460400" },
{
  "label": "和庆镇",
  "value": "460400" },
{
  "label": "国营蓝洋农场",
  "value": "460400" },
{
  "label": "海头镇",
  "value": "460400" },
{
  "label": "华南热作学院",
  "value": "460400" },
{
  "label": "王五镇",
  "value": "460400" },
{
  "label": "木棠镇",
  "value": "460400" },
{
  "label": "新州镇",
  "value": "460400" },
{
  "label": "中和镇",
  "value": "460400" },
{
  "label": "排浦镇",
  "value": "460400" },
{
  "label": "雅星镇",
  "value": "460400" },
{
  "label": "国营西联农场",
  "value": "460400" },
{
  "label": "国营八一农场",
  "value": "460400" },
{
  "label": "南丰镇",
  "value": "460400" },
{
  "label": "国营西培农场",
  "value": "460400" },
{
  "label": "白马井镇",
  "value": "460400" },
{
  "label": "大成镇",
  "value": "460400" },
{
  "label": "那大镇",
  "value": "460400" },
{
  "label": "峨蔓镇",
  "value": "460400" },
{
  "label": "三都镇",
  "value": "460400" }],

[{
  "label": "会文镇",
  "value": "469005" },
{
  "label": "国营罗豆农场",
  "value": "469005" },
{
  "label": "东阁镇",
  "value": "469005" },
{
  "label": "文教镇",
  "value": "469005" },
{
  "label": "国营东路农场",
  "value": "469005" },
{
  "label": "铺前镇",
  "value": "469005" },
{
  "label": "翁田镇",
  "value": "469005" },
{
  "label": "锦山镇",
  "value": "469005" },
{
  "label": "东郊镇",
  "value": "469005" },
{
  "label": "龙楼镇",
  "value": "469005" },
{
  "label": "国营南阳农场",
  "value": "469005" },
{
  "label": "冯坡镇",
  "value": "469005" },
{
  "label": "昌洒镇",
  "value": "469005" },
{
  "label": "公坡镇",
  "value": "469005" },
{
  "label": "抱罗镇",
  "value": "469005" },
{
  "label": "潭牛镇",
  "value": "469005" },
{
  "label": "重兴镇",
  "value": "469005" },
{
  "label": "蓬莱镇",
  "value": "469005" },
{
  "label": "文城镇",
  "value": "469005" },
{
  "label": "东路镇",
  "value": "469005" }],

[{
  "label": "西沙群岛",
  "value": "460321" },
{
  "label": "中沙群岛的岛礁及其海域",
  "value": "460323" },
{
  "label": "南沙群岛",
  "value": "460322" }],

[{
  "label": "崖州区",
  "value": "460205" },
{
  "label": "天涯区",
  "value": "460204" },
{
  "label": "吉阳区",
  "value": "460203" },
{
  "label": "海棠区",
  "value": "460202" }],

[{
  "label": "福山镇",
  "value": "469023" },
{
  "label": "永发镇",
  "value": "469023" },
{
  "label": "桥头镇",
  "value": "469023" },
{
  "label": "金江镇",
  "value": "469023" },
{
  "label": "中兴镇",
  "value": "469023" },
{
  "label": "文儒镇",
  "value": "469023" },
{
  "label": "老城镇",
  "value": "469023" },
{
  "label": "国营红岗农场",
  "value": "469023" },
{
  "label": "瑞溪镇",
  "value": "469023" },
{
  "label": "国营红光农场",
  "value": "469023" },
{
  "label": "大丰镇",
  "value": "469023" },
{
  "label": "加乐镇",
  "value": "469023" },
{
  "label": "国营金安农场",
  "value": "469023" },
{
  "label": "仁兴镇",
  "value": "469023" },
{
  "label": "国营昆仑农场",
  "value": "469023" },
{
  "label": "国营和岭农场",
  "value": "469023" },
{
  "label": "国营西达农场",
  "value": "469023" }],

[{
  "label": "龙华区",
  "value": "460106" },
{
  "label": "美兰区",
  "value": "460108" },
{
  "label": "琼山区",
  "value": "460107" },
{
  "label": "秀英区",
  "value": "460105" }]],


[
[{
  "label": "东海县",
  "value": "320722" },
{
  "label": "灌云县",
  "value": "320723" },
{
  "label": "连云区",
  "value": "320703" },
{
  "label": "灌南县",
  "value": "320724" },
{
  "label": "赣榆区",
  "value": "320707" },
{
  "label": "海州区",
  "value": "320706" }],

[{
  "label": "沭阳县",
  "value": "321322" },
{
  "label": "泗阳县",
  "value": "321323" },
{
  "label": "泗洪县",
  "value": "321324" },
{
  "label": "宿豫区",
  "value": "321311" },
{
  "label": "宿城区",
  "value": "321302" }],

[{
  "label": "扬中市",
  "value": "321182" },
{
  "label": "丹阳市",
  "value": "321181" },
{
  "label": "润州区",
  "value": "321111" },
{
  "label": "句容市",
  "value": "321183" },
{
  "label": "丹徒区",
  "value": "321112" },
{
  "label": "京口区",
  "value": "321102" }],

[{
  "label": "宜兴市",
  "value": "320282" },
{
  "label": "江阴市",
  "value": "320281" },
{
  "label": "梁溪区",
  "value": "320213" },
{
  "label": "锡山区",
  "value": "320205" },
{
  "label": "新吴区",
  "value": "320214" },
{
  "label": "滨湖区",
  "value": "320211" },
{
  "label": "惠山区",
  "value": "320206" }],

[{
  "label": "如皋市",
  "value": "320682" },
{
  "label": "海门市",
  "value": "320684" },
{
  "label": "海安县",
  "value": "320621" },
{
  "label": "启东市",
  "value": "320681" },
{
  "label": "如东县",
  "value": "320623" },
{
  "label": "通州区",
  "value": "320612" },
{
  "label": "崇川区",
  "value": "320602" },
{
  "label": "港闸区",
  "value": "320611" }],

[{
  "label": "浦口区",
  "value": "320111" },
{
  "label": "江宁区",
  "value": "320115" },
{
  "label": "雨花台区",
  "value": "320114" },
{
  "label": "溧水区",
  "value": "320117" },
{
  "label": "高淳区",
  "value": "320118" },
{
  "label": "六合区",
  "value": "320116" },
{
  "label": "鼓楼区",
  "value": "320106" },
{
  "label": "建邺区",
  "value": "320105" },
{
  "label": "栖霞区",
  "value": "320113" },
{
  "label": "玄武区",
  "value": "320102" },
{
  "label": "秦淮区",
  "value": "320104" }],

[{
  "label": "涟水县",
  "value": "320826" },
{
  "label": "淮阴区",
  "value": "320804" },
{
  "label": "淮安区",
  "value": "320803" },
{
  "label": "洪泽区",
  "value": "320813" },
{
  "label": "盱眙县",
  "value": "320830" },
{
  "label": "金湖县",
  "value": "320831" },
{
  "label": "清江浦区",
  "value": "320812" }],

[{
  "label": "丰县",
  "value": "320321" },
{
  "label": "邳州市",
  "value": "320382" },
{
  "label": "新沂市",
  "value": "320381" },
{
  "label": "泉山区",
  "value": "320311" },
{
  "label": "铜山区",
  "value": "320312" },
{
  "label": "睢宁县",
  "value": "320324" },
{
  "label": "鼓楼区",
  "value": "320302" },
{
  "label": "云龙区",
  "value": "320303" },
{
  "label": "沛县",
  "value": "320322" },
{
  "label": "贾汪区",
  "value": "320305" }],

[{
  "label": "金坛区",
  "value": "320413" },
{
  "label": "武进区",
  "value": "320412" },
{
  "label": "天宁区",
  "value": "320402" },
{
  "label": "钟楼区",
  "value": "320404" },
{
  "label": "溧阳市",
  "value": "320481" },
{
  "label": "新北区",
  "value": "320411" }],

[{
  "label": "响水县",
  "value": "320921" },
{
  "label": "滨海县",
  "value": "320922" },
{
  "label": "射阳县",
  "value": "320924" },
{
  "label": "阜宁县",
  "value": "320923" },
{
  "label": "建湖县",
  "value": "320925" },
{
  "label": "亭湖区",
  "value": "320902" },
{
  "label": "盐都区",
  "value": "320903" },
{
  "label": "大丰区",
  "value": "320904" },
{
  "label": "东台市",
  "value": "320981" }],

[{
  "label": "张家港市",
  "value": "320582" },
{
  "label": "常熟市",
  "value": "320581" },
{
  "label": "太仓市",
  "value": "320585" },
{
  "label": "虎丘区",
  "value": "320505" },
{
  "label": "姑苏区",
  "value": "320508" },
{
  "label": "相城区",
  "value": "320507" },
{
  "label": "吴江区",
  "value": "320509" },
{
  "label": "昆山市",
  "value": "320583" },
{
  "label": "吴中区",
  "value": "320506" }],

[{
  "label": "兴化市",
  "value": "321281" },
{
  "label": "靖江市",
  "value": "321282" },
{
  "label": "海陵区",
  "value": "321202" },
{
  "label": "高港区",
  "value": "321203" },
{
  "label": "泰兴市",
  "value": "321283" },
{
  "label": "姜堰区",
  "value": "321204" }],

[{
  "label": "邗江区",
  "value": "321003" },
{
  "label": "江都区",
  "value": "321012" },
{
  "label": "广陵区",
  "value": "321002" },
{
  "label": "仪征市",
  "value": "321081" },
{
  "label": "宝应县",
  "value": "321023" },
{
  "label": "高邮市",
  "value": "321084" }]],


[
[{
  "label": "共和县",
  "value": "632521" },
{
  "label": "贵德县",
  "value": "632523" },
{
  "label": "贵南县",
  "value": "632525" },
{
  "label": "同德县",
  "value": "632522" },
{
  "label": "兴海县",
  "value": "632524" }],

[{
  "label": "乐都区",
  "value": "630202" },
{
  "label": "化隆回族自治县",
  "value": "630224" },
{
  "label": "民和回族土族自治县",
  "value": "630222" },
{
  "label": "循化撒拉族自治县",
  "value": "630225" },
{
  "label": "平安区",
  "value": "630203" },
{
  "label": "互助土族自治县",
  "value": "630223" }],

[{
  "label": "天峻县",
  "value": "632823" },
{
  "label": "德令哈市",
  "value": "632802" },
{
  "label": "格尔木市",
  "value": "632801" },
{
  "label": "都兰县",
  "value": "632822" },
{
  "label": "乌兰县",
  "value": "632821" },
{
  "label": "海西蒙古族藏族自治州直辖",
  "value": "632825" },
{
  "label": "茫崖市",
  "value": "632803" }],

[{
  "label": "尖扎县",
  "value": "632322" },
{
  "label": "同仁县",
  "value": "632321" },
{
  "label": "泽库县",
  "value": "632323" }],

[{
  "label": "治多县",
  "value": "632724" },
{
  "label": "曲麻莱县",
  "value": "632726" },
{
  "label": "称多县",
  "value": "632723" },
{
  "label": "杂多县",
  "value": "632722" },
{
  "label": "囊谦县",
  "value": "632725" },
{
  "label": "玉树市",
  "value": "632701" }],

[{
  "label": "甘德县",
  "value": "632623" },
{
  "label": "玛沁县",
  "value": "632621" },
{
  "label": "久治县",
  "value": "632625" },
{
  "label": "达日县",
  "value": "632624" },
{
  "label": "班玛县",
  "value": "632622" },
{
  "label": "玛多县",
  "value": "632626" }],

[{
  "label": "湟源县",
  "value": "630123" },
{
  "label": "大通回族土族自治县",
  "value": "630121" },
{
  "label": "城东区",
  "value": "630102" },
{
  "label": "城中区",
  "value": "630103" },
{
  "label": "城西区",
  "value": "630104" },
{
  "label": "湟中县",
  "value": "630122" },
{
  "label": "城北区",
  "value": "630105" }],

[{
  "label": "海晏县",
  "value": "632223" },
{
  "label": "门源回族自治县",
  "value": "632221" },
{
  "label": "刚察县",
  "value": "632224" },
{
  "label": "祁连县",
  "value": "632222" }]],


[
[{
  "label": "港北区",
  "value": "450802" },
{
  "label": "覃塘区",
  "value": "450804" },
{
  "label": "港南区",
  "value": "450803" },
{
  "label": "平南县",
  "value": "450821" },
{
  "label": "桂平市",
  "value": "450881" }],

[{
  "label": "兴安县",
  "value": "450325" },
{
  "label": "资源县",
  "value": "450329" },
{
  "label": "临桂区",
  "value": "450312" },
{
  "label": "七星区",
  "value": "450305" },
{
  "label": "永福县",
  "value": "450326" },
{
  "label": "雁山区",
  "value": "450311" },
{
  "label": "恭城瑶族自治县",
  "value": "450332" },
{
  "label": "阳朔县",
  "value": "450321" },
{
  "label": "荔浦县",
  "value": "450331" },
{
  "label": "平乐县",
  "value": "450330" },
{
  "label": "龙胜各族自治县",
  "value": "450328" },
{
  "label": "灌阳县",
  "value": "450327" },
{
  "label": "全州县",
  "value": "450324" },
{
  "label": "象山区",
  "value": "450304" },
{
  "label": "秀峰区",
  "value": "450302" },
{
  "label": "叠彩区",
  "value": "450303" },
{
  "label": "灵川县",
  "value": "450323" }],

[{
  "label": "乐业县",
  "value": "451028" },
{
  "label": "隆林各族自治县",
  "value": "451031" },
{
  "label": "西林县",
  "value": "451030" },
{
  "label": "凌云县",
  "value": "451027" },
{
  "label": "右江区",
  "value": "451002" },
{
  "label": "田阳县",
  "value": "451021" },
{
  "label": "平果县",
  "value": "451023" },
{
  "label": "德保县",
  "value": "451024" },
{
  "label": "田东县",
  "value": "451022" },
{
  "label": "那坡县",
  "value": "451026" },
{
  "label": "靖西市",
  "value": "451081" },
{
  "label": "田林县",
  "value": "451029" }],

[{
  "label": "灵山县",
  "value": "450721" },
{
  "label": "钦南区",
  "value": "450702" },
{
  "label": "浦北县",
  "value": "450722" },
{
  "label": "钦北区",
  "value": "450703" }],

[{
  "label": "银海区",
  "value": "450503" },
{
  "label": "铁山港区",
  "value": "450512" },
{
  "label": "海城区",
  "value": "450502" },
{
  "label": "合浦县",
  "value": "450521" }],

[{
  "label": "南丹县",
  "value": "451221" },
{
  "label": "环江毛南族自治县",
  "value": "451226" },
{
  "label": "天峨县",
  "value": "451222" },
{
  "label": "罗城仫佬族自治县",
  "value": "451225" },
{
  "label": "金城江区",
  "value": "451202" },
{
  "label": "凤山县",
  "value": "451223" },
{
  "label": "宜州区",
  "value": "451203" },
{
  "label": "都安瑶族自治县",
  "value": "451228" },
{
  "label": "巴马瑶族自治县",
  "value": "451227" },
{
  "label": "大化瑶族自治县",
  "value": "451229" },
{
  "label": "东兰县",
  "value": "451224" }],

[{
  "label": "融水苗族自治县",
  "value": "450225" },
{
  "label": "三江侗族自治县",
  "value": "450226" },
{
  "label": "融安县",
  "value": "450224" },
{
  "label": "鹿寨县",
  "value": "450223" },
{
  "label": "城中区",
  "value": "450202" },
{
  "label": "柳城县",
  "value": "450222" },
{
  "label": "柳北区",
  "value": "450205" },
{
  "label": "鱼峰区",
  "value": "450203" },
{
  "label": "柳江区",
  "value": "450206" },
{
  "label": "柳南区",
  "value": "450204" }],

[{
  "label": "金秀瑶族自治县",
  "value": "451324" },
{
  "label": "忻城县",
  "value": "451321" },
{
  "label": "象州县",
  "value": "451322" },
{
  "label": "兴宾区",
  "value": "451302" },
{
  "label": "武宣县",
  "value": "451323" },
{
  "label": "合山市",
  "value": "451381" }],

[{
  "label": "马山县",
  "value": "450124" },
{
  "label": "上林县",
  "value": "450125" },
{
  "label": "宾阳县",
  "value": "450126" },
{
  "label": "武鸣区",
  "value": "450110" },
{
  "label": "横县",
  "value": "450127" },
{
  "label": "江南区",
  "value": "450105" },
{
  "label": "良庆区",
  "value": "450108" },
{
  "label": "邕宁区",
  "value": "450109" },
{
  "label": "西乡塘区",
  "value": "450107" },
{
  "label": "兴宁区",
  "value": "450102" },
{
  "label": "青秀区",
  "value": "450103" },
{
  "label": "隆安县",
  "value": "450123" }],

[{
  "label": "扶绥县",
  "value": "451421" },
{
  "label": "宁明县",
  "value": "451422" },
{
  "label": "江州区",
  "value": "451402" },
{
  "label": "凭祥市",
  "value": "451481" },
{
  "label": "天等县",
  "value": "451425" },
{
  "label": "龙州县",
  "value": "451423" },
{
  "label": "大新县",
  "value": "451424" }],

[{
  "label": "上思县",
  "value": "450621" },
{
  "label": "防城区",
  "value": "450603" },
{
  "label": "港口区",
  "value": "450602" },
{
  "label": "东兴市",
  "value": "450681" }],

[{
  "label": "蒙山县",
  "value": "450423" },
{
  "label": "藤县",
  "value": "450422" },
{
  "label": "长洲区",
  "value": "450405" },
{
  "label": "龙圩区",
  "value": "450406" },
{
  "label": "岑溪市",
  "value": "450481" },
{
  "label": "万秀区",
  "value": "450403" },
{
  "label": "苍梧县",
  "value": "450421" }],

[{
  "label": "富川瑶族自治县",
  "value": "451123" },
{
  "label": "昭平县",
  "value": "451121" },
{
  "label": "钟山县",
  "value": "451122" },
{
  "label": "平桂区",
  "value": "451103" },
{
  "label": "八步区",
  "value": "451102" }],

[{
  "label": "福绵区",
  "value": "450903" },
{
  "label": "兴业县",
  "value": "450924" },
{
  "label": "玉州区",
  "value": "450902" },
{
  "label": "博白县",
  "value": "450923" },
{
  "label": "陆川县",
  "value": "450922" },
{
  "label": "北流市",
  "value": "450981" },
{
  "label": "容县",
  "value": "450921" }]],


[
[{
  "label": "隆德县",
  "value": "640423" },
{
  "label": "彭阳县",
  "value": "640425" },
{
  "label": "泾源县",
  "value": "640424" },
{
  "label": "西吉县",
  "value": "640422" },
{
  "label": "原州区",
  "value": "640402" }],

[{
  "label": "大武口区",
  "value": "640202" },
{
  "label": "平罗县",
  "value": "640221" },
{
  "label": "惠农区",
  "value": "640205" }],

[{
  "label": "中宁县",
  "value": "640521" },
{
  "label": "海原县",
  "value": "640522" },
{
  "label": "沙坡头区",
  "value": "640502" }],

[{
  "label": "贺兰县",
  "value": "640122" },
{
  "label": "西夏区",
  "value": "640105" },
{
  "label": "兴庆区",
  "value": "640104" },
{
  "label": "金凤区",
  "value": "640106" },
{
  "label": "永宁县",
  "value": "640121" },
{
  "label": "灵武市",
  "value": "640181" }],

[{
  "label": "青铜峡市",
  "value": "640381" },
{
  "label": "盐池县",
  "value": "640323" },
{
  "label": "利通区",
  "value": "640302" },
{
  "label": "红寺堡区",
  "value": "640303" },
{
  "label": "同心县",
  "value": "640324" }]],


[
[{
  "label": "乐平市",
  "value": "360281" },
{
  "label": "珠山区",
  "value": "360203" },
{
  "label": "昌江区",
  "value": "360202" },
{
  "label": "浮梁县",
  "value": "360222" }],

[{
  "label": "分宜县",
  "value": "360521" },
{
  "label": "渝水区",
  "value": "360502" }],

[{
  "label": "贵溪市",
  "value": "360681" },
{
  "label": "余江区",
  "value": "360603" },
{
  "label": "月湖区",
  "value": "360602" }],

[{
  "label": "东乡区",
  "value": "361003" },
{
  "label": "临川区",
  "value": "361002" },
{
  "label": "金溪县",
  "value": "361027" },
{
  "label": "崇仁县",
  "value": "361024" },
{
  "label": "资溪县",
  "value": "361028" },
{
  "label": "南城县",
  "value": "361021" },
{
  "label": "乐安县",
  "value": "361025" },
{
  "label": "宜黄县",
  "value": "361026" },
{
  "label": "黎川县",
  "value": "361022" },
{
  "label": "南丰县",
  "value": "361023" },
{
  "label": "广昌县",
  "value": "361030" }],

[{
  "label": "彭泽县",
  "value": "360430" },
{
  "label": "湖口县",
  "value": "360429" },
{
  "label": "瑞昌市",
  "value": "360481" },
{
  "label": "柴桑区",
  "value": "360404" },
{
  "label": "都昌县",
  "value": "360428" },
{
  "label": "武宁县",
  "value": "360423" },
{
  "label": "修水县",
  "value": "360424" },
{
  "label": "庐山市",
  "value": "360483" },
{
  "label": "濂溪区",
  "value": "360402" },
{
  "label": "德安县",
  "value": "360426" },
{
  "label": "永修县",
  "value": "360425" },
{
  "label": "浔阳区",
  "value": "360403" },
{
  "label": "共青城市",
  "value": "360482" }],

[{
  "label": "宁都县",
  "value": "360730" },
{
  "label": "兴国县",
  "value": "360732" },
{
  "label": "石城县",
  "value": "360735" },
{
  "label": "于都县",
  "value": "360731" },
{
  "label": "瑞金市",
  "value": "360781" },
{
  "label": "上犹县",
  "value": "360724" },
{
  "label": "会昌县",
  "value": "360733" },
{
  "label": "崇义县",
  "value": "360725" },
{
  "label": "安远县",
  "value": "360726" },
{
  "label": "大余县",
  "value": "360723" },
{
  "label": "信丰县",
  "value": "360722" },
{
  "label": "寻乌县",
  "value": "360734" },
{
  "label": "全南县",
  "value": "360729" },
{
  "label": "定南县",
  "value": "360728" },
{
  "label": "龙南县",
  "value": "360727" },
{
  "label": "章贡区",
  "value": "360702" },
{
  "label": "南康区",
  "value": "360703" },
{
  "label": "赣县区",
  "value": "360704" }],

[{
  "label": "婺源县",
  "value": "361130" },
{
  "label": "余干县",
  "value": "361127" },
{
  "label": "万年县",
  "value": "361129" },
{
  "label": "德兴市",
  "value": "361181" },
{
  "label": "上饶县",
  "value": "361121" },
{
  "label": "信州区",
  "value": "361102" },
{
  "label": "横峰县",
  "value": "361125" },
{
  "label": "广丰区",
  "value": "361103" },
{
  "label": "鄱阳县",
  "value": "361128" },
{
  "label": "弋阳县",
  "value": "361126" },
{
  "label": "铅山县",
  "value": "361124" },
{
  "label": "玉山县",
  "value": "361123" }],

[{
  "label": "安义县",
  "value": "360123" },
{
  "label": "进贤县",
  "value": "360124" },
{
  "label": "青云谱区",
  "value": "360104" },
{
  "label": "南昌县",
  "value": "360121" },
{
  "label": "青山湖区",
  "value": "360111" },
{
  "label": "湾里区",
  "value": "360105" },
{
  "label": "新建区",
  "value": "360112" },
{
  "label": "东湖区",
  "value": "360102" },
{
  "label": "西湖区",
  "value": "360103" }],

[{
  "label": "靖安县",
  "value": "360925" },
{
  "label": "奉新县",
  "value": "360921" },
{
  "label": "宜丰县",
  "value": "360924" },
{
  "label": "高安市",
  "value": "360983" },
{
  "label": "丰城市",
  "value": "360981" },
{
  "label": "上高县",
  "value": "360923" },
{
  "label": "铜鼓县",
  "value": "360926" },
{
  "label": "袁州区",
  "value": "360902" },
{
  "label": "万载县",
  "value": "360922" },
{
  "label": "樟树市",
  "value": "360982" }],

[{
  "label": "湘东区",
  "value": "360313" },
{
  "label": "安源区",
  "value": "360302" },
{
  "label": "上栗县",
  "value": "360322" },
{
  "label": "莲花县",
  "value": "360321" },
{
  "label": "芦溪县",
  "value": "360323" }],

[{
  "label": "峡江县",
  "value": "360823" },
{
  "label": "青原区",
  "value": "360803" },
{
  "label": "吉安县",
  "value": "360821" },
{
  "label": "永新县",
  "value": "360830" },
{
  "label": "万安县",
  "value": "360828" },
{
  "label": "吉州区",
  "value": "360802" },
{
  "label": "永丰县",
  "value": "360825" },
{
  "label": "井冈山市",
  "value": "360881" },
{
  "label": "泰和县",
  "value": "360826" },
{
  "label": "吉水县",
  "value": "360822" },
{
  "label": "遂川县",
  "value": "360827" },
{
  "label": "新干县",
  "value": "360824" },
{
  "label": "安福县",
  "value": "360829" }]],


[
[{
  "label": "嵊泗县",
  "value": "330922" },
{
  "label": "岱山县",
  "value": "330921" },
{
  "label": "普陀区",
  "value": "330903" },
{
  "label": "定海区",
  "value": "330902" }],

[{
  "label": "平湖市",
  "value": "330482" },
{
  "label": "海宁市",
  "value": "330481" },
{
  "label": "桐乡市",
  "value": "330483" },
{
  "label": "秀洲区",
  "value": "330411" },
{
  "label": "南湖区",
  "value": "330402" },
{
  "label": "嘉善县",
  "value": "330421" },
{
  "label": "海盐县",
  "value": "330424" }],

[{
  "label": "北仑区",
  "value": "330206" },
{
  "label": "象山县",
  "value": "330225" },
{
  "label": "镇海区",
  "value": "330211" },
{
  "label": "江北区",
  "value": "330205" },
{
  "label": "奉化区",
  "value": "330213" },
{
  "label": "宁海县",
  "value": "330226" },
{
  "label": "余姚市",
  "value": "330281" },
{
  "label": "鄞州区",
  "value": "330212" },
{
  "label": "海曙区",
  "value": "330203" },
{
  "label": "慈溪市",
  "value": "330282" }],

[{
  "label": "路桥区",
  "value": "331004" },
{
  "label": "椒江区",
  "value": "331002" },
{
  "label": "临海市",
  "value": "331082" },
{
  "label": "玉环市",
  "value": "331083" },
{
  "label": "三门县",
  "value": "331022" },
{
  "label": "温岭市",
  "value": "331081" },
{
  "label": "天台县",
  "value": "331023" },
{
  "label": "黄岩区",
  "value": "331003" },
{
  "label": "仙居县",
  "value": "331024" }],

[{
  "label": "洞头区",
  "value": "330305" },
{
  "label": "平阳县",
  "value": "330326" },
{
  "label": "苍南县",
  "value": "330327" },
{
  "label": "鹿城区",
  "value": "330302" },
{
  "label": "瑞安市",
  "value": "330381" },
{
  "label": "泰顺县",
  "value": "330329" },
{
  "label": "文成县",
  "value": "330328" },
{
  "label": "永嘉县",
  "value": "330324" },
{
  "label": "乐清市",
  "value": "330382" },
{
  "label": "龙湾区",
  "value": "330303" },
{
  "label": "瓯海区",
  "value": "330304" }],

[{
  "label": "开化县",
  "value": "330824" },
{
  "label": "柯城区",
  "value": "330802" },
{
  "label": "衢江区",
  "value": "330803" },
{
  "label": "常山县",
  "value": "330822" },
{
  "label": "龙游县",
  "value": "330825" },
{
  "label": "江山市",
  "value": "330881" }],

[{
  "label": "浦江县",
  "value": "330726" },
{
  "label": "永康市",
  "value": "330784" },
{
  "label": "武义县",
  "value": "330723" },
{
  "label": "兰溪市",
  "value": "330781" },
{
  "label": "磐安县",
  "value": "330727" },
{
  "label": "东阳市",
  "value": "330783" },
{
  "label": "婺城区",
  "value": "330702" },
{
  "label": "金东区",
  "value": "330703" },
{
  "label": "义乌市",
  "value": "330782" }],

[{
  "label": "龙泉市",
  "value": "331181" },
{
  "label": "莲都区",
  "value": "331102" },
{
  "label": "云和县",
  "value": "331125" },
{
  "label": "松阳县",
  "value": "331124" },
{
  "label": "遂昌县",
  "value": "331123" },
{
  "label": "景宁畲族自治县",
  "value": "331127" },
{
  "label": "青田县",
  "value": "331121" },
{
  "label": "缙云县",
  "value": "331122" },
{
  "label": "庆元县",
  "value": "331126" }],

[{
  "label": "西湖区",
  "value": "330106" },
{
  "label": "上城区",
  "value": "330102" },
{
  "label": "富阳区",
  "value": "330111" },
{
  "label": "桐庐县",
  "value": "330122" },
{
  "label": "建德市",
  "value": "330182" },
{
  "label": "淳安县",
  "value": "330127" },
{
  "label": "余杭区",
  "value": "330110" },
{
  "label": "萧山区",
  "value": "330109" },
{
  "label": "滨江区",
  "value": "330108" },
{
  "label": "下城区",
  "value": "330103" },
{
  "label": "江干区",
  "value": "330104" },
{
  "label": "临安区",
  "value": "330112" },
{
  "label": "拱墅区",
  "value": "330105" }],

[{
  "label": "嵊州市",
  "value": "330683" },
{
  "label": "上虞区",
  "value": "330604" },
{
  "label": "越城区",
  "value": "330602" },
{
  "label": "柯桥区",
  "value": "330603" },
{
  "label": "诸暨市",
  "value": "330681" },
{
  "label": "新昌县",
  "value": "330624" }],

[{
  "label": "德清县",
  "value": "330521" },
{
  "label": "安吉县",
  "value": "330523" },
{
  "label": "南浔区",
  "value": "330503" },
{
  "label": "吴兴区",
  "value": "330502" },
{
  "label": "长兴县",
  "value": "330522" }]],


[
[{
  "label": "滦南县",
  "value": "130224" },
{
  "label": "乐亭县",
  "value": "130225" },
{
  "label": "遵化市",
  "value": "130281" },
{
  "label": "曹妃甸区",
  "value": "130209" },
{
  "label": "迁安市",
  "value": "130283" },
{
  "label": "滦县",
  "value": "130223" },
{
  "label": "迁西县",
  "value": "130227" },
{
  "label": "玉田县",
  "value": "130229" },
{
  "label": "路南区",
  "value": "130202" },
{
  "label": "丰南区",
  "value": "130207" },
{
  "label": "丰润区",
  "value": "130208" },
{
  "label": "路北区",
  "value": "130203" },
{
  "label": "古冶区",
  "value": "130204" },
{
  "label": "开平区",
  "value": "130205" }],

[{
  "label": "围场满族蒙古族自治县",
  "value": "130828" },
{
  "label": "隆化县",
  "value": "130825" },
{
  "label": "鹰手营子矿区",
  "value": "130804" },
{
  "label": "宽城满族自治县",
  "value": "130827" },
{
  "label": "丰宁满族自治县",
  "value": "130826" },
{
  "label": "兴隆县",
  "value": "130822" },
{
  "label": "平泉市",
  "value": "130881" },
{
  "label": "滦平县",
  "value": "130824" },
{
  "label": "双滦区",
  "value": "130803" },
{
  "label": "承德县",
  "value": "130821" },
{
  "label": "双桥区",
  "value": "130802" }],

[{
  "label": "霸州市",
  "value": "131081" },
{
  "label": "大城县",
  "value": "131025" },
{
  "label": "大厂回族自治县",
  "value": "131028" },
{
  "label": "永清县",
  "value": "131023" },
{
  "label": "固安县",
  "value": "131022" },
{
  "label": "香河县",
  "value": "131024" },
{
  "label": "文安县",
  "value": "131026" },
{
  "label": "广阳区",
  "value": "131003" },
{
  "label": "三河市",
  "value": "131082" },
{
  "label": "安次区",
  "value": "131002" }],

[{
  "label": "运河区",
  "value": "130903" },
{
  "label": "青县",
  "value": "130922" },
{
  "label": "河间市",
  "value": "130984" },
{
  "label": "沧县",
  "value": "130921" },
{
  "label": "任丘市",
  "value": "130982" },
{
  "label": "肃宁县",
  "value": "130926" },
{
  "label": "献县",
  "value": "130929" },
{
  "label": "南皮县",
  "value": "130927" },
{
  "label": "东光县",
  "value": "130923" },
{
  "label": "孟村回族自治县",
  "value": "130930" },
{
  "label": "海兴县",
  "value": "130924" },
{
  "label": "新华区",
  "value": "130902" },
{
  "label": "盐山县",
  "value": "130925" },
{
  "label": "吴桥县",
  "value": "130928" },
{
  "label": "黄骅市",
  "value": "130983" },
{
  "label": "泊头市",
  "value": "130981" }],

[{
  "label": "饶阳县",
  "value": "131124" },
{
  "label": "武邑县",
  "value": "131122" },
{
  "label": "桃城区",
  "value": "131102" },
{
  "label": "枣强县",
  "value": "131121" },
{
  "label": "武强县",
  "value": "131123" },
{
  "label": "冀州区",
  "value": "131103" },
{
  "label": "故城县",
  "value": "131126" },
{
  "label": "景县",
  "value": "131127" },
{
  "label": "阜城县",
  "value": "131128" },
{
  "label": "深州市",
  "value": "131182" },
{
  "label": "安平县",
  "value": "131125" }],

[{
  "label": "青龙满族自治县",
  "value": "130321" },
{
  "label": "卢龙县",
  "value": "130324" },
{
  "label": "山海关区",
  "value": "130303" },
{
  "label": "北戴河区",
  "value": "130304" },
{
  "label": "抚宁区",
  "value": "130306" },
{
  "label": "海港区",
  "value": "130302" },
{
  "label": "昌黎县",
  "value": "130322" }],

[{
  "label": "望都县",
  "value": "130631" },
{
  "label": "徐水区",
  "value": "130609" },
{
  "label": "顺平县",
  "value": "130636" },
{
  "label": "高阳县",
  "value": "130628" },
{
  "label": "容城县",
  "value": "130629" },
{
  "label": "涞源县",
  "value": "130630" },
{
  "label": "阜平县",
  "value": "130624" },
{
  "label": "雄县",
  "value": "130638" },
{
  "label": "安新县",
  "value": "130632" },
{
  "label": "定兴县",
  "value": "130626" },
{
  "label": "易县",
  "value": "130633" },
{
  "label": "竞秀区",
  "value": "130602" },
{
  "label": "涿州市",
  "value": "130681" },
{
  "label": "高碑店市",
  "value": "130684" },
{
  "label": "曲阳县",
  "value": "130634" },
{
  "label": "唐县",
  "value": "130627" },
{
  "label": "满城区",
  "value": "130607" },
{
  "label": "安国市",
  "value": "130683" },
{
  "label": "定州市",
  "value": "130682" },
{
  "label": "莲池区",
  "value": "130606" },
{
  "label": "清苑区",
  "value": "130608" },
{
  "label": "蠡县",
  "value": "130635" },
{
  "label": "博野县",
  "value": "130637" },
{
  "label": "涞水县",
  "value": "130623" }],

[{
  "label": "平山县",
  "value": "130131" },
{
  "label": "灵寿县",
  "value": "130126" },
{
  "label": "行唐县",
  "value": "130125" },
{
  "label": "无极县",
  "value": "130130" },
{
  "label": "藁城区",
  "value": "130109" },
{
  "label": "晋州市",
  "value": "130183" },
{
  "label": "栾城区",
  "value": "130111" },
{
  "label": "裕华区",
  "value": "130108" },
{
  "label": "正定县",
  "value": "130123" },
{
  "label": "赞皇县",
  "value": "130129" },
{
  "label": "鹿泉区",
  "value": "130110" },
{
  "label": "元氏县",
  "value": "130132" },
{
  "label": "高邑县",
  "value": "130127" },
{
  "label": "赵县",
  "value": "130133" },
{
  "label": "新乐市",
  "value": "130184" },
{
  "label": "辛集市",
  "value": "130181" },
{
  "label": "新华区",
  "value": "130105" },
{
  "label": "井陉县",
  "value": "130121" },
{
  "label": "桥西区",
  "value": "130104" },
{
  "label": "长安区",
  "value": "130102" },
{
  "label": "井陉矿区",
  "value": "130107" },
{
  "label": "深泽县",
  "value": "130128" }],

[{
  "label": "肥乡区",
  "value": "130407" },
{
  "label": "涉县",
  "value": "130426" },
{
  "label": "武安市",
  "value": "130481" },
{
  "label": "广平县",
  "value": "130432" },
{
  "label": "峰峰矿区",
  "value": "130406" },
{
  "label": "魏县",
  "value": "130434" },
{
  "label": "大名县",
  "value": "130425" },
{
  "label": "临漳县",
  "value": "130423" },
{
  "label": "鸡泽县",
  "value": "130431" },
{
  "label": "曲周县",
  "value": "130435" },
{
  "label": "磁县",
  "value": "130427" },
{
  "label": "永年区",
  "value": "130408" },
{
  "label": "复兴区",
  "value": "130404" },
{
  "label": "丛台区",
  "value": "130403" },
{
  "label": "邯山区",
  "value": "130402" },
{
  "label": "成安县",
  "value": "130424" },
{
  "label": "馆陶县",
  "value": "130433" },
{
  "label": "邱县",
  "value": "130430" }],

[{
  "label": "临城县",
  "value": "130522" },
{
  "label": "南宫市",
  "value": "130581" },
{
  "label": "柏乡县",
  "value": "130524" },
{
  "label": "新河县",
  "value": "130530" },
{
  "label": "宁晋县",
  "value": "130528" },
{
  "label": "巨鹿县",
  "value": "130529" },
{
  "label": "内丘县",
  "value": "130523" },
{
  "label": "隆尧县",
  "value": "130525" },
{
  "label": "广宗县",
  "value": "130531" },
{
  "label": "沙河市",
  "value": "130582" },
{
  "label": "平乡县",
  "value": "130532" },
{
  "label": "南和县",
  "value": "130527" },
{
  "label": "清河县",
  "value": "130534" },
{
  "label": "桥西区",
  "value": "130503" },
{
  "label": "任县",
  "value": "130526" },
{
  "label": "桥东区",
  "value": "130502" },
{
  "label": "邢台县",
  "value": "130521" },
{
  "label": "临西县",
  "value": "130535" },
{
  "label": "威县",
  "value": "130533" }],

[{
  "label": "赤城县",
  "value": "130732" },
{
  "label": "崇礼区",
  "value": "130709" },
{
  "label": "下花园区",
  "value": "130706" },
{
  "label": "沽源县",
  "value": "130724" },
{
  "label": "涿鹿县",
  "value": "130731" },
{
  "label": "尚义县",
  "value": "130725" },
{
  "label": "张北县",
  "value": "130722" },
{
  "label": "怀来县",
  "value": "130730" },
{
  "label": "康保县",
  "value": "130723" },
{
  "label": "万全区",
  "value": "130708" },
{
  "label": "阳原县",
  "value": "130727" },
{
  "label": "蔚县",
  "value": "130726" },
{
  "label": "桥东区",
  "value": "130702" },
{
  "label": "桥西区",
  "value": "130703" },
{
  "label": "宣化区",
  "value": "130705" },
{
  "label": "怀安县",
  "value": "130728" }]],


[
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[],
[]],

[],
[
[],
[],
[],
[],
[],
[],
[],
[]],

[
[{
  "label": "峪泉镇",
  "value": "620200" },
{
  "label": "新城镇",
  "value": "620200" },
{
  "label": "文殊镇",
  "value": "620200" },
{
  "label": "雄关区",
  "value": "620200" },
{
  "label": "镜铁区",
  "value": "620200" },
{
  "label": "长城区",
  "value": "620200" }],

[{
  "label": "肃北蒙古族自治县",
  "value": "620923" },
{
  "label": "敦煌市",
  "value": "620982" },
{
  "label": "金塔县",
  "value": "620921" },
{
  "label": "玉门市",
  "value": "620981" },
{
  "label": "肃州区",
  "value": "620902" },
{
  "label": "瓜州县",
  "value": "620922" },
{
  "label": "阿克塞哈萨克族自治县",
  "value": "620924" }],

[{
  "label": "金川区",
  "value": "620302" },
{
  "label": "永昌县",
  "value": "620321" }],

[{
  "label": "永登县",
  "value": "620121" },
{
  "label": "皋兰县",
  "value": "620122" },
{
  "label": "红古区",
  "value": "620111" },
{
  "label": "西固区",
  "value": "620104" },
{
  "label": "城关区",
  "value": "620102" },
{
  "label": "安宁区",
  "value": "620105" },
{
  "label": "七里河区",
  "value": "620103" },
{
  "label": "榆中县",
  "value": "620123" }],

[{
  "label": "临洮县",
  "value": "621124" },
{
  "label": "渭源县",
  "value": "621123" },
{
  "label": "陇西县",
  "value": "621122" },
{
  "label": "岷县",
  "value": "621126" },
{
  "label": "安定区",
  "value": "621102" },
{
  "label": "通渭县",
  "value": "621121" },
{
  "label": "漳县",
  "value": "621125" }],

[{
  "label": "崆峒区",
  "value": "620802" },
{
  "label": "庄浪县",
  "value": "620825" },
{
  "label": "崇信县",
  "value": "620823" },
{
  "label": "灵台县",
  "value": "620822" },
{
  "label": "华亭县",
  "value": "620824" },
{
  "label": "静宁县",
  "value": "620826" },
{
  "label": "泾川县",
  "value": "620821" }],

[{
  "label": "平川区",
  "value": "620403" },
{
  "label": "靖远县",
  "value": "620421" },
{
  "label": "白银区",
  "value": "620402" },
{
  "label": "会宁县",
  "value": "620422" },
{
  "label": "景泰县",
  "value": "620423" }],

[{
  "label": "礼县",
  "value": "621226" },
{
  "label": "成县",
  "value": "621221" },
{
  "label": "两当县",
  "value": "621228" },
{
  "label": "徽县",
  "value": "621227" },
{
  "label": "宕昌县",
  "value": "621223" },
{
  "label": "武都区",
  "value": "621202" },
{
  "label": "康县",
  "value": "621224" },
{
  "label": "文县",
  "value": "621222" },
{
  "label": "西和县",
  "value": "621225" }],

[{
  "label": "张家川回族自治县",
  "value": "620525" },
{
  "label": "甘谷县",
  "value": "620523" },
{
  "label": "清水县",
  "value": "620521" },
{
  "label": "秦安县",
  "value": "620522" },
{
  "label": "秦州区",
  "value": "620502" },
{
  "label": "武山县",
  "value": "620524" },
{
  "label": "麦积区",
  "value": "620503" }],

[{
  "label": "凉州区",
  "value": "620602" },
{
  "label": "古浪县",
  "value": "620622" },
{
  "label": "天祝藏族自治县",
  "value": "620623" },
{
  "label": "民勤县",
  "value": "620621" }],

[{
  "label": "合水县",
  "value": "621024" },
{
  "label": "庆城县",
  "value": "621021" },
{
  "label": "宁县",
  "value": "621026" },
{
  "label": "正宁县",
  "value": "621025" },
{
  "label": "环县",
  "value": "621022" },
{
  "label": "西峰区",
  "value": "621002" },
{
  "label": "华池县",
  "value": "621023" },
{
  "label": "镇原县",
  "value": "621027" }],

[{
  "label": "夏河县",
  "value": "623027" },
{
  "label": "合作市",
  "value": "623001" },
{
  "label": "临潭县",
  "value": "623021" },
{
  "label": "卓尼县",
  "value": "623022" },
{
  "label": "玛曲县",
  "value": "623025" },
{
  "label": "舟曲县",
  "value": "623023" },
{
  "label": "迭部县",
  "value": "623024" },
{
  "label": "碌曲县",
  "value": "623026" }],

[{
  "label": "东乡族自治县",
  "value": "622926" },
{
  "label": "临夏县",
  "value": "622921" },
{
  "label": "积石山保安族东乡族撒拉族自治县",
  "value": "622927" },
{
  "label": "永靖县",
  "value": "622923" },
{
  "label": "临夏市",
  "value": "622901" },
{
  "label": "和政县",
  "value": "622925" },
{
  "label": "广河县",
  "value": "622924" },
{
  "label": "康乐县",
  "value": "622922" }],

[{
  "label": "高台县",
  "value": "620724" },
{
  "label": "肃南裕固族自治县",
  "value": "620721" },
{
  "label": "临泽县",
  "value": "620723" },
{
  "label": "甘州区",
  "value": "620702" },
{
  "label": "山丹县",
  "value": "620725" },
{
  "label": "民乐县",
  "value": "620722" }]],


[
[{
  "label": "蓬安县",
  "value": "511323" },
{
  "label": "南部县",
  "value": "511321" },
{
  "label": "营山县",
  "value": "511322" },
{
  "label": "西充县",
  "value": "511325" },
{
  "label": "顺庆区",
  "value": "511302" },
{
  "label": "嘉陵区",
  "value": "511304" },
{
  "label": "阆中市",
  "value": "511381" },
{
  "label": "仪陇县",
  "value": "511324" },
{
  "label": "高坪区",
  "value": "511303" }],

[{
  "label": "朝天区",
  "value": "510812" },
{
  "label": "昭化区",
  "value": "510811" },
{
  "label": "剑阁县",
  "value": "510823" },
{
  "label": "苍溪县",
  "value": "510824" },
{
  "label": "旺苍县",
  "value": "510821" },
{
  "label": "青川县",
  "value": "510822" },
{
  "label": "利州区",
  "value": "510802" }],

[{
  "label": "通江县",
  "value": "511921" },
{
  "label": "巴州区",
  "value": "511902" },
{
  "label": "南江县",
  "value": "511922" },
{
  "label": "平昌县",
  "value": "511923" },
{
  "label": "恩阳区",
  "value": "511903" }],

[{
  "label": "旌阳区",
  "value": "510603" },
{
  "label": "什邡市",
  "value": "510682" },
{
  "label": "中江县",
  "value": "510623" },
{
  "label": "广汉市",
  "value": "510681" },
{
  "label": "罗江区",
  "value": "510604" },
{
  "label": "绵竹市",
  "value": "510683" }],

[{
  "label": "江油市",
  "value": "510781" },
{
  "label": "梓潼县",
  "value": "510725" },
{
  "label": "游仙区",
  "value": "510704" },
{
  "label": "三台县",
  "value": "510722" },
{
  "label": "盐亭县",
  "value": "510723" },
{
  "label": "北川羌族自治县",
  "value": "510726" },
{
  "label": "安州区",
  "value": "510705" },
{
  "label": "涪城区",
  "value": "510703" },
{
  "label": "平武县",
  "value": "510727" }],

[{
  "label": "都江堰市",
  "value": "510181" },
{
  "label": "彭州市",
  "value": "510182" },
{
  "label": "青白江区",
  "value": "510113" },
{
  "label": "崇州市",
  "value": "510184" },
{
  "label": "大邑县",
  "value": "510129" },
{
  "label": "简阳市",
  "value": "510185" },
{
  "label": "蒲江县",
  "value": "510131" },
{
  "label": "成华区",
  "value": "510108" },
{
  "label": "金堂县",
  "value": "510121" },
{
  "label": "新津县",
  "value": "510132" },
{
  "label": "邛崃市",
  "value": "510183" },
{
  "label": "青羊区",
  "value": "510105" },
{
  "label": "锦江区",
  "value": "510104" },
{
  "label": "温江区",
  "value": "510115" },
{
  "label": "金牛区",
  "value": "510106" },
{
  "label": "双流区",
  "value": "510116" },
{
  "label": "武侯区",
  "value": "510107" },
{
  "label": "郫都区",
  "value": "510117" },
{
  "label": "龙泉驿区",
  "value": "510112" },
{
  "label": "新都区",
  "value": "510114" }],

[{
  "label": "大竹县",
  "value": "511724" },
{
  "label": "宣汉县",
  "value": "511722" },
{
  "label": "通川区",
  "value": "511702" },
{
  "label": "达川区",
  "value": "511703" },
{
  "label": "渠县",
  "value": "511725" },
{
  "label": "开江县",
  "value": "511723" },
{
  "label": "万源市",
  "value": "511781" }],

[{
  "label": "乐至县",
  "value": "512022" },
{
  "label": "安岳县",
  "value": "512021" },
{
  "label": "雁江区",
  "value": "512002" }],

[{
  "label": "射洪县",
  "value": "510922" },
{
  "label": "大英县",
  "value": "510923" },
{
  "label": "船山区",
  "value": "510903" },
{
  "label": "安居区",
  "value": "510904" },
{
  "label": "蓬溪县",
  "value": "510921" }],

[{
  "label": "丹棱县",
  "value": "511424" },
{
  "label": "仁寿县",
  "value": "511421" },
{
  "label": "洪雅县",
  "value": "511423" },
{
  "label": "青神县",
  "value": "511425" },
{
  "label": "彭山区",
  "value": "511403" },
{
  "label": "东坡区",
  "value": "511402" }],

[{
  "label": "邻水县",
  "value": "511623" },
{
  "label": "武胜县",
  "value": "511622" },
{
  "label": "广安区",
  "value": "511602" },
{
  "label": "岳池县",
  "value": "511621" },
{
  "label": "前锋区",
  "value": "511603" },
{
  "label": "华蓥市",
  "value": "511681" }],

[{
  "label": "资中县",
  "value": "511025" },
{
  "label": "东兴区",
  "value": "511011" },
{
  "label": "威远县",
  "value": "511024" },
{
  "label": "隆昌市",
  "value": "511083" },
{
  "label": "市中区",
  "value": "511002" }],

[{
  "label": "夹江县",
  "value": "511126" },
{
  "label": "五通桥区",
  "value": "511112" },
{
  "label": "沙湾区",
  "value": "511111" },
{
  "label": "井研县",
  "value": "511124" },
{
  "label": "金口河区",
  "value": "511113" },
{
  "label": "犍为县",
  "value": "511123" },
{
  "label": "峨边彝族自治县",
  "value": "511132" },
{
  "label": "沐川县",
  "value": "511129" },
{
  "label": "市中区",
  "value": "511102" },
{
  "label": "马边彝族自治县",
  "value": "511133" },
{
  "label": "峨眉山市",
  "value": "511181" }],

[{
  "label": "大安区",
  "value": "510304" },
{
  "label": "富顺县",
  "value": "510322" },
{
  "label": "荣县",
  "value": "510321" },
{
  "label": "自流井区",
  "value": "510302" },
{
  "label": "贡井区",
  "value": "510303" },
{
  "label": "沿滩区",
  "value": "510311" }],

[{
  "label": "龙马潭区",
  "value": "510504" },
{
  "label": "泸县",
  "value": "510521" },
{
  "label": "纳溪区",
  "value": "510503" },
{
  "label": "叙永县",
  "value": "510524" },
{
  "label": "古蔺县",
  "value": "510525" },
{
  "label": "江阳区",
  "value": "510502" },
{
  "label": "合江县",
  "value": "510522" }],

[{
  "label": "珙县",
  "value": "511526" },
{
  "label": "高县",
  "value": "511525" },
{
  "label": "兴文县",
  "value": "511528" },
{
  "label": "南溪区",
  "value": "511503" },
{
  "label": "长宁县",
  "value": "511524" },
{
  "label": "翠屏区",
  "value": "511502" },
{
  "label": "江安县",
  "value": "511523" },
{
  "label": "筠连县",
  "value": "511527" },
{
  "label": "屏山县",
  "value": "511529" },
{
  "label": "叙州区",
  "value": "511521" }],

[{
  "label": "甘洛县",
  "value": "513435" },
{
  "label": "木里藏族自治县",
  "value": "513422" },
{
  "label": "冕宁县",
  "value": "513433" },
{
  "label": "越西县",
  "value": "513434" },
{
  "label": "美姑县",
  "value": "513436" },
{
  "label": "雷波县",
  "value": "513437" },
{
  "label": "喜德县",
  "value": "513432" },
{
  "label": "昭觉县",
  "value": "513431" },
{
  "label": "盐源县",
  "value": "513423" },
{
  "label": "西昌市",
  "value": "513401" },
{
  "label": "金阳县",
  "value": "513430" },
{
  "label": "布拖县",
  "value": "513429" },
{
  "label": "普格县",
  "value": "513428" },
{
  "label": "会东县",
  "value": "513426" },
{
  "label": "会理县",
  "value": "513425" },
{
  "label": "德昌县",
  "value": "513424" },
{
  "label": "宁南县",
  "value": "513427" }],

[{
  "label": "米易县",
  "value": "510421" },
{
  "label": "西区",
  "value": "510403" },
{
  "label": "东区",
  "value": "510402" },
{
  "label": "仁和区",
  "value": "510411" },
{
  "label": "盐边县",
  "value": "510422" }],

[{
  "label": "若尔盖县",
  "value": "513232" },
{
  "label": "黑水县",
  "value": "513228" },
{
  "label": "九寨沟县",
  "value": "513225" },
{
  "label": "汶川县",
  "value": "513221" },
{
  "label": "马尔康市",
  "value": "513201" },
{
  "label": "金川县",
  "value": "513226" },
{
  "label": "理县",
  "value": "513222" },
{
  "label": "阿坝县",
  "value": "513231" },
{
  "label": "红原县",
  "value": "513233" },
{
  "label": "松潘县",
  "value": "513224" },
{
  "label": "茂县",
  "value": "513223" },
{
  "label": "小金县",
  "value": "513227" },
{
  "label": "壤塘县",
  "value": "513230" }],

[{
  "label": "宝兴县",
  "value": "511827" },
{
  "label": "芦山县",
  "value": "511826" },
{
  "label": "天全县",
  "value": "511825" },
{
  "label": "雨城区",
  "value": "511802" },
{
  "label": "荥经县",
  "value": "511822" },
{
  "label": "汉源县",
  "value": "511823" },
{
  "label": "石棉县",
  "value": "511824" },
{
  "label": "名山区",
  "value": "511803" }],

[{
  "label": "石渠县",
  "value": "513332" },
{
  "label": "甘孜县",
  "value": "513328" },
{
  "label": "道孚县",
  "value": "513326" },
{
  "label": "炉霍县",
  "value": "513327" },
{
  "label": "白玉县",
  "value": "513331" },
{
  "label": "新龙县",
  "value": "513329" },
{
  "label": "德格县",
  "value": "513330" },
{
  "label": "康定市",
  "value": "513301" },
{
  "label": "巴塘县",
  "value": "513335" },
{
  "label": "理塘县",
  "value": "513334" },
{
  "label": "雅江县",
  "value": "513325" },
{
  "label": "乡城县",
  "value": "513336" },
{
  "label": "稻城县",
  "value": "513337" },
{
  "label": "九龙县",
  "value": "513324" },
{
  "label": "得荣县",
  "value": "513338" },
{
  "label": "色达县",
  "value": "513333" },
{
  "label": "丹巴县",
  "value": "513323" },
{
  "label": "泸定县",
  "value": "513322" }]],


[
[{
  "label": "舒兰市",
  "value": "220283" },
{
  "label": "丰满区",
  "value": "220211" },
{
  "label": "船营区",
  "value": "220204" },
{
  "label": "桦甸市",
  "value": "220282" },
{
  "label": "龙潭区",
  "value": "220203" },
{
  "label": "蛟河市",
  "value": "220281" },
{
  "label": "昌邑区",
  "value": "220202" },
{
  "label": "永吉县",
  "value": "220221" },
{
  "label": "磐石市",
  "value": "220284" }],

[{
  "label": "德惠市",
  "value": "220183" },
{
  "label": "榆树市",
  "value": "220182" },
{
  "label": "双阳区",
  "value": "220112" },
{
  "label": "农安县",
  "value": "220122" },
{
  "label": "绿园区",
  "value": "220106" },
{
  "label": "朝阳区",
  "value": "220104" },
{
  "label": "宽城区",
  "value": "220103" },
{
  "label": "南关区",
  "value": "220102" },
{
  "label": "二道区",
  "value": "220105" },
{
  "label": "九台区",
  "value": "220113" }],

[{
  "label": "西安区",
  "value": "220403" },
{
  "label": "龙山区",
  "value": "220402" },
{
  "label": "东辽县",
  "value": "220422" },
{
  "label": "东丰县",
  "value": "220421" }],

[{
  "label": "洮南市",
  "value": "220881" },
{
  "label": "大安市",
  "value": "220882" },
{
  "label": "通榆县",
  "value": "220822" },
{
  "label": "洮北区",
  "value": "220802" },
{
  "label": "镇赉县",
  "value": "220821" }],

[{
  "label": "扶余市",
  "value": "220781" },
{
  "label": "宁江区",
  "value": "220702" },
{
  "label": "前郭尔罗斯蒙古族自治县",
  "value": "220721" },
{
  "label": "乾安县",
  "value": "220723" },
{
  "label": "长岭县",
  "value": "220722" }],

[{
  "label": "铁东区",
  "value": "220303" },
{
  "label": "双辽市",
  "value": "220382" },
{
  "label": "公主岭市",
  "value": "220381" },
{
  "label": "伊通满族自治县",
  "value": "220323" },
{
  "label": "梨树县",
  "value": "220322" },
{
  "label": "铁西区",
  "value": "220302" }],

[{
  "label": "敦化市",
  "value": "222403" },
{
  "label": "珲春市",
  "value": "222404" },
{
  "label": "图们市",
  "value": "222402" },
{
  "label": "和龙市",
  "value": "222406" },
{
  "label": "汪清县",
  "value": "222424" },
{
  "label": "延吉市",
  "value": "222401" },
{
  "label": "安图县",
  "value": "222426" },
{
  "label": "龙井市",
  "value": "222405" }],

[{
  "label": "靖宇县",
  "value": "220622" },
{
  "label": "长白朝鲜族自治县",
  "value": "220623" },
{
  "label": "江源区",
  "value": "220605" },
{
  "label": "抚松县",
  "value": "220621" },
{
  "label": "浑江区",
  "value": "220602" },
{
  "label": "临江市",
  "value": "220681" }],

[{
  "label": "二道江区",
  "value": "220503" },
{
  "label": "东昌区",
  "value": "220502" },
{
  "label": "通化县",
  "value": "220521" },
{
  "label": "柳河县",
  "value": "220524" },
{
  "label": "梅河口市",
  "value": "220581" },
{
  "label": "辉南县",
  "value": "220523" },
{
  "label": "集安市",
  "value": "220582" }]],


[
[{
  "label": "东丽区",
  "value": "120110" },
{
  "label": "和平区",
  "value": "120101" },
{
  "label": "河东区",
  "value": "120102" },
{
  "label": "宝坻区",
  "value": "120115" },
{
  "label": "河西区",
  "value": "120103" },
{
  "label": "河北区",
  "value": "120105" },
{
  "label": "静海区",
  "value": "120118" },
{
  "label": "津南区",
  "value": "120112" },
{
  "label": "滨海新区",
  "value": "120116" },
{
  "label": "蓟州区",
  "value": "120119" },
{
  "label": "武清区",
  "value": "120114" },
{
  "label": "西青区",
  "value": "120111" },
{
  "label": "南开区",
  "value": "120104" },
{
  "label": "宁河区",
  "value": "120117" },
{
  "label": "北辰区",
  "value": "120113" },
{
  "label": "红桥区",
  "value": "120106" }]],


[
[{
  "label": "绥江县",
  "value": "530626" },
{
  "label": "水富县",
  "value": "530630" },
{
  "label": "永善县",
  "value": "530625" },
{
  "label": "大关县",
  "value": "530624" },
{
  "label": "威信县",
  "value": "530629" },
{
  "label": "巧家县",
  "value": "530622" },
{
  "label": "镇雄县",
  "value": "530627" },
{
  "label": "彝良县",
  "value": "530628" },
{
  "label": "昭阳区",
  "value": "530602" },
{
  "label": "鲁甸县",
  "value": "530621" },
{
  "label": "盐津县",
  "value": "530623" }],

[{
  "label": "会泽县",
  "value": "530326" },
{
  "label": "沾益区",
  "value": "530303" },
{
  "label": "麒麟区",
  "value": "530302" },
{
  "label": "马龙区",
  "value": "530304" },
{
  "label": "罗平县",
  "value": "530324" },
{
  "label": "陆良县",
  "value": "530322" },
{
  "label": "师宗县",
  "value": "530323" },
{
  "label": "宣威市",
  "value": "530381" },
{
  "label": "富源县",
  "value": "530325" }],

[{
  "label": "泸西县",
  "value": "532527" },
{
  "label": "弥勒市",
  "value": "532504" },
{
  "label": "建水县",
  "value": "532524" },
{
  "label": "石屏县",
  "value": "532525" },
{
  "label": "开远市",
  "value": "532502" },
{
  "label": "个旧市",
  "value": "532501" },
{
  "label": "红河县",
  "value": "532529" },
{
  "label": "蒙自市",
  "value": "532503" },
{
  "label": "元阳县",
  "value": "532528" },
{
  "label": "屏边苗族自治县",
  "value": "532523" },
{
  "label": "绿春县",
  "value": "532531" },
{
  "label": "金平苗族瑶族傣族自治县",
  "value": "532530" },
{
  "label": "河口瑶族自治县",
  "value": "532532" }],

[{
  "label": "贡山独龙族怒族自治县",
  "value": "533324" },
{
  "label": "福贡县",
  "value": "533323" },
{
  "label": "兰坪白族普米族自治县",
  "value": "533325" },
{
  "label": "泸水市",
  "value": "533301" }],

[{
  "label": "景洪市",
  "value": "532801" },
{
  "label": "勐海县",
  "value": "532822" },
{
  "label": "勐腊县",
  "value": "532823" }],

[{
  "label": "易门县",
  "value": "530425" },
{
  "label": "澄江县",
  "value": "530422" },
{
  "label": "红塔区",
  "value": "530402" },
{
  "label": "华宁县",
  "value": "530424" },
{
  "label": "峨山彝族自治县",
  "value": "530426" },
{
  "label": "江川区",
  "value": "530403" },
{
  "label": "新平彝族傣族自治县",
  "value": "530427" },
{
  "label": "通海县",
  "value": "530423" },
{
  "label": "元江哈尼族彝族傣族自治县",
  "value": "530428" }],

[{
  "label": "鹤庆县",
  "value": "532932" },
{
  "label": "剑川县",
  "value": "532931" },
{
  "label": "洱源县",
  "value": "532930" },
{
  "label": "云龙县",
  "value": "532929" },
{
  "label": "宾川县",
  "value": "532924" },
{
  "label": "大理市",
  "value": "532901" },
{
  "label": "漾濞彝族自治县",
  "value": "532922" },
{
  "label": "祥云县",
  "value": "532923" },
{
  "label": "永平县",
  "value": "532928" },
{
  "label": "巍山彝族回族自治县",
  "value": "532927" },
{
  "label": "弥渡县",
  "value": "532925" },
{
  "label": "南涧彝族自治县",
  "value": "532926" }],

[{
  "label": "宁蒗彝族自治县",
  "value": "530724" },
{
  "label": "玉龙纳西族自治县",
  "value": "530721" },
{
  "label": "古城区",
  "value": "530702" },
{
  "label": "永胜县",
  "value": "530722" },
{
  "label": "华坪县",
  "value": "530723" }],

[{
  "label": "德钦县",
  "value": "533422" },
{
  "label": "香格里拉市",
  "value": "533401" },
{
  "label": "维西傈僳族自治县",
  "value": "533423" }],

[{
  "label": "丘北县",
  "value": "532626" },
{
  "label": "广南县",
  "value": "532627" },
{
  "label": "砚山县",
  "value": "532622" },
{
  "label": "文山市",
  "value": "532601" },
{
  "label": "麻栗坡县",
  "value": "532624" },
{
  "label": "西畴县",
  "value": "532623" },
{
  "label": "马关县",
  "value": "532625" },
{
  "label": "富宁县",
  "value": "532628" }],

[{
  "label": "腾冲市",
  "value": "530581" },
{
  "label": "隆阳区",
  "value": "530502" },
{
  "label": "昌宁县",
  "value": "530524" },
{
  "label": "施甸县",
  "value": "530521" },
{
  "label": "龙陵县",
  "value": "530523" }],

[{
  "label": "景东彝族自治县",
  "value": "530823" },
{
  "label": "镇沅彝族哈尼族拉祜族自治县",
  "value": "530825" },
{
  "label": "墨江哈尼族自治县",
  "value": "530822" },
{
  "label": "景谷傣族彝族自治县",
  "value": "530824" },
{
  "label": "宁洱哈尼族彝族自治县",
  "value": "530821" },
{
  "label": "澜沧拉祜族自治县",
  "value": "530828" },
{
  "label": "西盟佤族自治县",
  "value": "530829" },
{
  "label": "思茅区",
  "value": "530802" },
{
  "label": "孟连傣族拉祜族佤族自治县",
  "value": "530827" },
{
  "label": "江城哈尼族彝族自治县",
  "value": "530826" }],

[{
  "label": "东川区",
  "value": "530113" },
{
  "label": "寻甸回族彝族自治县",
  "value": "530129" },
{
  "label": "五华区",
  "value": "530102" },
{
  "label": "宜良县",
  "value": "530125" },
{
  "label": "西山区",
  "value": "530112" },
{
  "label": "石林彝族自治县",
  "value": "530126" },
{
  "label": "呈贡区",
  "value": "530114" },
{
  "label": "晋宁区",
  "value": "530115" },
{
  "label": "富民县",
  "value": "530124" },
{
  "label": "安宁市",
  "value": "530181" },
{
  "label": "禄劝彝族苗族自治县",
  "value": "530128" },
{
  "label": "官渡区",
  "value": "530111" },
{
  "label": "嵩明县",
  "value": "530127" },
{
  "label": "盘龙区",
  "value": "530103" }],

[{
  "label": "大姚县",
  "value": "532326" },
{
  "label": "元谋县",
  "value": "532328" },
{
  "label": "牟定县",
  "value": "532323" },
{
  "label": "姚安县",
  "value": "532325" },
{
  "label": "楚雄市",
  "value": "532301" },
{
  "label": "禄丰县",
  "value": "532331" },
{
  "label": "南华县",
  "value": "532324" },
{
  "label": "双柏县",
  "value": "532322" },
{
  "label": "武定县",
  "value": "532329" },
{
  "label": "永仁县",
  "value": "532327" }],

[{
  "label": "凤庆县",
  "value": "530921" },
{
  "label": "云县",
  "value": "530922" },
{
  "label": "永德县",
  "value": "530923" },
{
  "label": "临翔区",
  "value": "530902" },
{
  "label": "镇康县",
  "value": "530924" },
{
  "label": "耿马傣族佤族自治县",
  "value": "530926" },
{
  "label": "双江拉祜族佤族布朗族傣族自治县",
  "value": "530925" },
{
  "label": "沧源佤族自治县",
  "value": "530927" }],

[{
  "label": "盈江县",
  "value": "533123" },
{
  "label": "梁河县",
  "value": "533122" },
{
  "label": "陇川县",
  "value": "533124" },
{
  "label": "芒市",
  "value": "533103" },
{
  "label": "瑞丽市",
  "value": "533102" }]],


[
[{
  "label": "密云区",
  "value": "110118" },
{
  "label": "怀柔区",
  "value": "110116" },
{
  "label": "延庆区",
  "value": "110119" },
{
  "label": "丰台区",
  "value": "110106" },
{
  "label": "门头沟区",
  "value": "110109" },
{
  "label": "顺义区",
  "value": "110113" },
{
  "label": "朝阳区",
  "value": "110105" },
{
  "label": "石景山区",
  "value": "110107" },
{
  "label": "平谷区",
  "value": "110117" },
{
  "label": "大兴区",
  "value": "110115" },
{
  "label": "通州区",
  "value": "110112" },
{
  "label": "昌平区",
  "value": "110114" },
{
  "label": "海淀区",
  "value": "110108" },
{
  "label": "西城区",
  "value": "110102" },
{
  "label": "东城区",
  "value": "110101" },
{
  "label": "房山区",
  "value": "110111" }]],


[
[{
  "label": "平定县",
  "value": "140321" },
{
  "label": "郊区",
  "value": "140311" },
{
  "label": "矿区",
  "value": "140303" },
{
  "label": "城区",
  "value": "140302" },
{
  "label": "盂县",
  "value": "140322" }],

[{
  "label": "临猗县",
  "value": "140821" },
{
  "label": "平陆县",
  "value": "140829" },
{
  "label": "闻喜县",
  "value": "140823" },
{
  "label": "万荣县",
  "value": "140822" },
{
  "label": "盐湖区",
  "value": "140802" },
{
  "label": "夏县",
  "value": "140828" },
{
  "label": "芮城县",
  "value": "140830" },
{
  "label": "永济市",
  "value": "140881" },
{
  "label": "垣曲县",
  "value": "140827" },
{
  "label": "绛县",
  "value": "140826" },
{
  "label": "新绛县",
  "value": "140825" },
{
  "label": "稷山县",
  "value": "140824" },
{
  "label": "河津市",
  "value": "140882" }],

[{
  "label": "屯留县",
  "value": "140424" },
{
  "label": "沁县",
  "value": "140430" },
{
  "label": "城区",
  "value": "140402" },
{
  "label": "郊区",
  "value": "140411" },
{
  "label": "长子县",
  "value": "140428" },
{
  "label": "黎城县",
  "value": "140426" },
{
  "label": "壶关县",
  "value": "140427" },
{
  "label": "潞城市",
  "value": "140481" },
{
  "label": "长治县",
  "value": "140421" },
{
  "label": "沁源县",
  "value": "140431" },
{
  "label": "平顺县",
  "value": "140425" },
{
  "label": "襄垣县",
  "value": "140423" },
{
  "label": "武乡县",
  "value": "140429" }],

[{
  "label": "万柏林区",
  "value": "140109" },
{
  "label": "娄烦县",
  "value": "140123" },
{
  "label": "晋源区",
  "value": "140110" },
{
  "label": "尖草坪区",
  "value": "140108" },
{
  "label": "杏花岭区",
  "value": "140107" },
{
  "label": "阳曲县",
  "value": "140122" },
{
  "label": "小店区",
  "value": "140105" },
{
  "label": "迎泽区",
  "value": "140106" },
{
  "label": "清徐县",
  "value": "140121" },
{
  "label": "古交市",
  "value": "140181" }],

[{
  "label": "洪洞县",
  "value": "141024" },
{
  "label": "古县",
  "value": "141025" },
{
  "label": "隰县",
  "value": "141031" },
{
  "label": "吉县",
  "value": "141028" },
{
  "label": "汾西县",
  "value": "141034" },
{
  "label": "安泽县",
  "value": "141026" },
{
  "label": "尧都区",
  "value": "141002" },
{
  "label": "大宁县",
  "value": "141030" },
{
  "label": "永和县",
  "value": "141032" },
{
  "label": "霍州市",
  "value": "141082" },
{
  "label": "浮山县",
  "value": "141027" },
{
  "label": "曲沃县",
  "value": "141021" },
{
  "label": "翼城县",
  "value": "141022" },
{
  "label": "乡宁县",
  "value": "141029" },
{
  "label": "侯马市",
  "value": "141081" },
{
  "label": "襄汾县",
  "value": "141023" },
{
  "label": "蒲县",
  "value": "141033" }],

[{
  "label": "五寨县",
  "value": "140928" },
{
  "label": "宁武县",
  "value": "140925" },
{
  "label": "静乐县",
  "value": "140926" },
{
  "label": "偏关县",
  "value": "140932" },
{
  "label": "河曲县",
  "value": "140930" },
{
  "label": "五台县",
  "value": "140922" },
{
  "label": "原平市",
  "value": "140981" },
{
  "label": "岢岚县",
  "value": "140929" },
{
  "label": "忻府区",
  "value": "140902" },
{
  "label": "定襄县",
  "value": "140921" },
{
  "label": "代县",
  "value": "140923" },
{
  "label": "神池县",
  "value": "140927" },
{
  "label": "保德县",
  "value": "140931" },
{
  "label": "繁峙县",
  "value": "140924" }],

[{
  "label": "城区",
  "value": "140502" },
{
  "label": "高平市",
  "value": "140581" },
{
  "label": "陵川县",
  "value": "140524" },
{
  "label": "泽州县",
  "value": "140525" },
{
  "label": "沁水县",
  "value": "140521" },
{
  "label": "阳城县",
  "value": "140522" }],

[{
  "label": "右玉县",
  "value": "140623" },
{
  "label": "平鲁区",
  "value": "140603" },
{
  "label": "山阴县",
  "value": "140621" },
{
  "label": "怀仁市",
  "value": "140681" },
{
  "label": "朔城区",
  "value": "140602" },
{
  "label": "应县",
  "value": "140622" }],

[{
  "label": "昔阳县",
  "value": "140724" },
{
  "label": "和顺县",
  "value": "140723" },
{
  "label": "平遥县",
  "value": "140728" },
{
  "label": "太谷县",
  "value": "140726" },
{
  "label": "榆次区",
  "value": "140702" },
{
  "label": "寿阳县",
  "value": "140725" },
{
  "label": "介休市",
  "value": "140781" },
{
  "label": "榆社县",
  "value": "140721" },
{
  "label": "左权县",
  "value": "140722" },
{
  "label": "祁县",
  "value": "140727" },
{
  "label": "灵石县",
  "value": "140729" }],

[{
  "label": "临县",
  "value": "141124" },
{
  "label": "岚县",
  "value": "141127" },
{
  "label": "方山县",
  "value": "141128" },
{
  "label": "中阳县",
  "value": "141129" },
{
  "label": "交口县",
  "value": "141130" },
{
  "label": "柳林县",
  "value": "141125" },
{
  "label": "离石区",
  "value": "141102" },
{
  "label": "兴县",
  "value": "141123" },
{
  "label": "石楼县",
  "value": "141126" },
{
  "label": "交城县",
  "value": "141122" },
{
  "label": "孝义市",
  "value": "141181" },
{
  "label": "汾阳市",
  "value": "141182" },
{
  "label": "文水县",
  "value": "141121" }],

[{
  "label": "广灵县",
  "value": "140223" },
{
  "label": "灵丘县",
  "value": "140224" },
{
  "label": "浑源县",
  "value": "140225" },
{
  "label": "左云县",
  "value": "140226" },
{
  "label": "阳高县",
  "value": "140221" },
{
  "label": "云冈区",
  "value": "140214" },
{
  "label": "平城区",
  "value": "140213" },
{
  "label": "云州区",
  "value": "140215" },
{
  "label": "新荣区",
  "value": "140212" },
{
  "label": "天镇县",
  "value": "140222" }]]];var _default =



areaData;exports.default = _default;

/***/ }),

/***/ "../../../wky/baby/components/mpvue-citypicker/city-data/city.js":
/*!*****************************************************************!*\
  !*** E:/wky/baby/components/mpvue-citypicker/city-data/city.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var cityData = [
[{
  "label": "汕头市",
  "value": "440500" },
{
  "label": "佛山市",
  "value": "440600" },
{
  "label": "肇庆市",
  "value": "441200" },
{
  "label": "惠州市",
  "value": "441300" },
{
  "label": "深圳市",
  "value": "440300" },
{
  "label": "珠海市",
  "value": "440400" },
{
  "label": "湛江市",
  "value": "440800" },
{
  "label": "江门市",
  "value": "440700" },
{
  "label": "阳江市",
  "value": "441700" },
{
  "label": "茂名市",
  "value": "440900" },
{
  "label": "汕尾市",
  "value": "441500" },
{
  "label": "东沙群岛",
  "value": "442100" },
{
  "label": "潮州市",
  "value": "445100" },
{
  "label": "云浮市",
  "value": "445300" },
{
  "label": "河源市",
  "value": "441600" },
{
  "label": "梅州市",
  "value": "441400" },
{
  "label": "揭阳市",
  "value": "445200" },
{
  "label": "东莞市",
  "value": "441900" },
{
  "label": "广州市",
  "value": "440100" },
{
  "label": "韶关市",
  "value": "440200" },
{
  "label": "清远市",
  "value": "441800" },
{
  "label": "中山市",
  "value": "442000" }],

[{
  "label": "乌海市",
  "value": "150300" },
{
  "label": "巴彦淖尔市",
  "value": "150800" },
{
  "label": "包头市",
  "value": "150200" },
{
  "label": "呼伦贝尔市",
  "value": "150700" },
{
  "label": "鄂尔多斯市",
  "value": "150600" },
{
  "label": "阿拉善盟",
  "value": "152900" },
{
  "label": "赤峰市",
  "value": "150400" },
{
  "label": "通辽市",
  "value": "150500" },
{
  "label": "兴安盟",
  "value": "152200" },
{
  "label": "乌兰察布市",
  "value": "150900" },
{
  "label": "锡林郭勒盟",
  "value": "152500" },
{
  "label": "呼和浩特市",
  "value": "150100" }],

[{
  "label": "大兴安岭地区",
  "value": "232700" },
{
  "label": "七台河市",
  "value": "230900" },
{
  "label": "鹤岗市",
  "value": "230400" },
{
  "label": "伊春市",
  "value": "230700" },
{
  "label": "绥化市",
  "value": "231200" },
{
  "label": "哈尔滨市",
  "value": "230100" },
{
  "label": "黑河市",
  "value": "231100" },
{
  "label": "齐齐哈尔市",
  "value": "230200" },
{
  "label": "牡丹江市",
  "value": "231000" },
{
  "label": "鸡西市",
  "value": "230300" },
{
  "label": "大庆市",
  "value": "230600" },
{
  "label": "双鸭山市",
  "value": "230500" },
{
  "label": "佳木斯市",
  "value": "230800" }],

[{
  "label": "双河市",
  "value": "659007" },
{
  "label": "北屯市",
  "value": "659005" },
{
  "label": "铁门关市",
  "value": "659006" },
{
  "label": "博尔塔拉蒙古自治州",
  "value": "652700" },
{
  "label": "可克达拉市",
  "value": "659008" },
{
  "label": "塔城地区",
  "value": "654200" },
{
  "label": "和田地区",
  "value": "653200" },
{
  "label": "昆玉市",
  "value": "659009" },
{
  "label": "阿勒泰地区",
  "value": "654300" },
{
  "label": "克拉玛依市",
  "value": "650200" },
{
  "label": "石河子市",
  "value": "659001" },
{
  "label": "昌吉回族自治州",
  "value": "652300" },
{
  "label": "五家渠市",
  "value": "659004" },
{
  "label": "巴音郭楞蒙古自治州",
  "value": "652800" },
{
  "label": "喀什地区",
  "value": "653100" },
{
  "label": "伊犁哈萨克自治州",
  "value": "654000" },
{
  "label": "阿克苏地区",
  "value": "652900" },
{
  "label": "乌鲁木齐市",
  "value": "650100" },
{
  "label": "阿拉尔市",
  "value": "659002" },
{
  "label": "图木舒克市",
  "value": "659003" },
{
  "label": "克孜勒苏柯尔克孜自治州",
  "value": "653000" },
{
  "label": "哈密市",
  "value": "650500" },
{
  "label": "吐鲁番市",
  "value": "650400" }],

[{
  "label": "十堰市",
  "value": "420300" },
{
  "label": "荆门市",
  "value": "420800" },
{
  "label": "襄阳市",
  "value": "420600" },
{
  "label": "黄冈市",
  "value": "421100" },
{
  "label": "武汉市",
  "value": "420100" },
{
  "label": "宜昌市",
  "value": "420500" },
{
  "label": "天门市",
  "value": "429006" },
{
  "label": "孝感市",
  "value": "420900" },
{
  "label": "潜江市",
  "value": "429005" },
{
  "label": "恩施土家族苗族自治州",
  "value": "422800" },
{
  "label": "仙桃市",
  "value": "429004" },
{
  "label": "荆州市",
  "value": "421000" },
{
  "label": "神农架林区",
  "value": "429021" },
{
  "label": "咸宁市",
  "value": "421200" },
{
  "label": "随州市",
  "value": "421300" },
{
  "label": "鄂州市",
  "value": "420700" },
{
  "label": "黄石市",
  "value": "420200" }],

[{
  "label": "葫芦岛市",
  "value": "211400" },
{
  "label": "大连市",
  "value": "210200" },
{
  "label": "锦州市",
  "value": "210700" },
{
  "label": "丹东市",
  "value": "210600" },
{
  "label": "抚顺市",
  "value": "210400" },
{
  "label": "沈阳市",
  "value": "210100" },
{
  "label": "铁岭市",
  "value": "211200" },
{
  "label": "营口市",
  "value": "210800" },
{
  "label": "朝阳市",
  "value": "211300" },
{
  "label": "辽阳市",
  "value": "211000" },
{
  "label": "鞍山市",
  "value": "210300" },
{
  "label": "阜新市",
  "value": "210900" },
{
  "label": "盘锦市",
  "value": "211100" },
{
  "label": "本溪市",
  "value": "210500" }],

[{
  "label": "烟台市",
  "value": "370600" },
{
  "label": "威海市",
  "value": "371000" },
{
  "label": "莱芜市",
  "value": "371200" },
{
  "label": "青岛市",
  "value": "370200" },
{
  "label": "淄博市",
  "value": "370300" },
{
  "label": "聊城市",
  "value": "371500" },
{
  "label": "日照市",
  "value": "371100" },
{
  "label": "临沂市",
  "value": "371300" },
{
  "label": "潍坊市",
  "value": "370700" },
{
  "label": "济南市",
  "value": "370100" },
{
  "label": "东营市",
  "value": "370500" },
{
  "label": "滨州市",
  "value": "371600" },
{
  "label": "枣庄市",
  "value": "370400" },
{
  "label": "济宁市",
  "value": "370800" },
{
  "label": "泰安市",
  "value": "370900" },
{
  "label": "德州市",
  "value": "371400" },
{
  "label": "菏泽市",
  "value": "371700" }],

[{
  "label": "商洛市",
  "value": "611000" },
{
  "label": "铜川市",
  "value": "610200" },
{
  "label": "西安市",
  "value": "610100" },
{
  "label": "汉中市",
  "value": "610700" },
{
  "label": "榆林市",
  "value": "610800" },
{
  "label": "安康市",
  "value": "610900" },
{
  "label": "延安市",
  "value": "610600" },
{
  "label": "渭南市",
  "value": "610500" },
{
  "label": "咸阳市",
  "value": "610400" },
{
  "label": "宝鸡市",
  "value": "610300" }],

[{
  "label": "崇明区",
  "value": "310151" },
{
  "label": "浦东新区",
  "value": "310115" },
{
  "label": "奉贤区",
  "value": "310120" },
{
  "label": "金山区",
  "value": "310116" },
{
  "label": "宝山区",
  "value": "310113" },
{
  "label": "嘉定区",
  "value": "310114" },
{
  "label": "普陀区",
  "value": "310107" },
{
  "label": "黄浦区",
  "value": "310101" },
{
  "label": "杨浦区",
  "value": "310110" },
{
  "label": "松江区",
  "value": "310117" },
{
  "label": "青浦区",
  "value": "310118" },
{
  "label": "长宁区",
  "value": "310105" },
{
  "label": "静安区",
  "value": "310106" },
{
  "label": "虹口区",
  "value": "310109" },
{
  "label": "闵行区",
  "value": "310112" },
{
  "label": "徐汇区",
  "value": "310104" }],

[{
  "label": "遵义市",
  "value": "520300" },
{
  "label": "铜仁市",
  "value": "520600" },
{
  "label": "六盘水市",
  "value": "520200" },
{
  "label": "黔东南苗族侗族自治州",
  "value": "522600" },
{
  "label": "安顺市",
  "value": "520400" },
{
  "label": "黔南布依族苗族自治州",
  "value": "522700" },
{
  "label": "黔西南布依族苗族自治州",
  "value": "522300" },
{
  "label": "毕节市",
  "value": "520500" },
{
  "label": "贵阳市",
  "value": "520100" }],

[{
  "label": "重庆郊县",
  "value": "500200" },
{
  "label": "重庆城区",
  "value": "500100" }],

[{
  "label": "昌都市",
  "value": "540300" },
{
  "label": "那曲市",
  "value": "540600" },
{
  "label": "拉萨市",
  "value": "540100" },
{
  "label": "日喀则市",
  "value": "540200" },
{
  "label": "山南市",
  "value": "540500" },
{
  "label": "林芝市",
  "value": "540400" },
{
  "label": "阿里地区",
  "value": "542500" }],

[{
  "label": "阜阳市",
  "value": "341200" },
{
  "label": "淮北市",
  "value": "340600" },
{
  "label": "马鞍山市",
  "value": "340500" },
{
  "label": "池州市",
  "value": "341700" },
{
  "label": "铜陵市",
  "value": "340700" },
{
  "label": "亳州市",
  "value": "341600" },
{
  "label": "蚌埠市",
  "value": "340300" },
{
  "label": "滁州市",
  "value": "341100" },
{
  "label": "安庆市",
  "value": "340800" },
{
  "label": "六安市",
  "value": "341500" },
{
  "label": "芜湖市",
  "value": "340200" },
{
  "label": "黄山市",
  "value": "341000" },
{
  "label": "宣城市",
  "value": "341800" },
{
  "label": "淮南市",
  "value": "340400" },
{
  "label": "合肥市",
  "value": "340100" },
{
  "label": "宿州市",
  "value": "341300" }],

[{
  "label": "宁德市",
  "value": "350900" },
{
  "label": "福州市",
  "value": "350100" },
{
  "label": "龙岩市",
  "value": "350800" },
{
  "label": "莆田市",
  "value": "350300" },
{
  "label": "泉州市",
  "value": "350500" },
{
  "label": "厦门市",
  "value": "350200" },
{
  "label": "漳州市",
  "value": "350600" },
{
  "label": "南平市",
  "value": "350700" },
{
  "label": "三明市",
  "value": "350400" }],

[{
  "label": "岳阳市",
  "value": "430600" },
{
  "label": "益阳市",
  "value": "430900" },
{
  "label": "衡阳市",
  "value": "430400" },
{
  "label": "娄底市",
  "value": "431300" },
{
  "label": "长沙市",
  "value": "430100" },
{
  "label": "张家界市",
  "value": "430800" },
{
  "label": "怀化市",
  "value": "431200" },
{
  "label": "湘西土家族苗族自治州",
  "value": "433100" },
{
  "label": "常德市",
  "value": "430700" },
{
  "label": "株洲市",
  "value": "430200" },
{
  "label": "邵阳市",
  "value": "430500" },
{
  "label": "湘潭市",
  "value": "430300" },
{
  "label": "永州市",
  "value": "431100" },
{
  "label": "郴州市",
  "value": "431000" }],

[{
  "label": "定安县",
  "value": "469021" },
{
  "label": "屯昌县",
  "value": "469022" },
{
  "label": "临高县",
  "value": "469024" },
{
  "label": "昌江黎族自治县",
  "value": "469026" },
{
  "label": "白沙黎族自治县",
  "value": "469025" },
{
  "label": "东方市",
  "value": "469007" },
{
  "label": "琼海市",
  "value": "469002" },
{
  "label": "琼中黎族苗族自治县",
  "value": "469030" },
{
  "label": "万宁市",
  "value": "469006" },
{
  "label": "五指山市",
  "value": "469001" },
{
  "label": "陵水黎族自治县",
  "value": "469028" },
{
  "label": "保亭黎族苗族自治县",
  "value": "469029" },
{
  "label": "乐东黎族自治县",
  "value": "469027" },
{
  "label": "儋州市",
  "value": "460400" },
{
  "label": "文昌市",
  "value": "469005" },
{
  "label": "三沙市",
  "value": "460300" },
{
  "label": "三亚市",
  "value": "460200" },
{
  "label": "澄迈县",
  "value": "469023" },
{
  "label": "海口市",
  "value": "460100" }],

[{
  "label": "连云港市",
  "value": "320700" },
{
  "label": "宿迁市",
  "value": "321300" },
{
  "label": "镇江市",
  "value": "321100" },
{
  "label": "无锡市",
  "value": "320200" },
{
  "label": "南通市",
  "value": "320600" },
{
  "label": "南京市",
  "value": "320100" },
{
  "label": "淮安市",
  "value": "320800" },
{
  "label": "徐州市",
  "value": "320300" },
{
  "label": "常州市",
  "value": "320400" },
{
  "label": "盐城市",
  "value": "320900" },
{
  "label": "苏州市",
  "value": "320500" },
{
  "label": "泰州市",
  "value": "321200" },
{
  "label": "扬州市",
  "value": "321000" }],

[{
  "label": "海南藏族自治州",
  "value": "632500" },
{
  "label": "海东市",
  "value": "630200" },
{
  "label": "海西蒙古族藏族自治州",
  "value": "632800" },
{
  "label": "黄南藏族自治州",
  "value": "632300" },
{
  "label": "玉树藏族自治州",
  "value": "632700" },
{
  "label": "果洛藏族自治州",
  "value": "632600" },
{
  "label": "西宁市",
  "value": "630100" },
{
  "label": "海北藏族自治州",
  "value": "632200" }],

[{
  "label": "贵港市",
  "value": "450800" },
{
  "label": "桂林市",
  "value": "450300" },
{
  "label": "百色市",
  "value": "451000" },
{
  "label": "钦州市",
  "value": "450700" },
{
  "label": "北海市",
  "value": "450500" },
{
  "label": "河池市",
  "value": "451200" },
{
  "label": "柳州市",
  "value": "450200" },
{
  "label": "来宾市",
  "value": "451300" },
{
  "label": "南宁市",
  "value": "450100" },
{
  "label": "崇左市",
  "value": "451400" },
{
  "label": "防城港市",
  "value": "450600" },
{
  "label": "梧州市",
  "value": "450400" },
{
  "label": "贺州市",
  "value": "451100" },
{
  "label": "玉林市",
  "value": "450900" }],

[{
  "label": "固原市",
  "value": "640400" },
{
  "label": "石嘴山市",
  "value": "640200" },
{
  "label": "中卫市",
  "value": "640500" },
{
  "label": "银川市",
  "value": "640100" },
{
  "label": "吴忠市",
  "value": "640300" }],

[{
  "label": "景德镇市",
  "value": "360200" },
{
  "label": "新余市",
  "value": "360500" },
{
  "label": "鹰潭市",
  "value": "360600" },
{
  "label": "抚州市",
  "value": "361000" },
{
  "label": "九江市",
  "value": "360400" },
{
  "label": "赣州市",
  "value": "360700" },
{
  "label": "上饶市",
  "value": "361100" },
{
  "label": "南昌市",
  "value": "360100" },
{
  "label": "宜春市",
  "value": "360900" },
{
  "label": "萍乡市",
  "value": "360300" },
{
  "label": "吉安市",
  "value": "360800" }],

[{
  "label": "舟山市",
  "value": "330900" },
{
  "label": "嘉兴市",
  "value": "330400" },
{
  "label": "宁波市",
  "value": "330200" },
{
  "label": "台州市",
  "value": "331000" },
{
  "label": "温州市",
  "value": "330300" },
{
  "label": "衢州市",
  "value": "330800" },
{
  "label": "金华市",
  "value": "330700" },
{
  "label": "丽水市",
  "value": "331100" },
{
  "label": "杭州市",
  "value": "330100" },
{
  "label": "绍兴市",
  "value": "330600" },
{
  "label": "湖州市",
  "value": "330500" }],

[{
  "label": "唐山市",
  "value": "130200" },
{
  "label": "承德市",
  "value": "130800" },
{
  "label": "廊坊市",
  "value": "131000" },
{
  "label": "沧州市",
  "value": "130900" },
{
  "label": "衡水市",
  "value": "131100" },
{
  "label": "秦皇岛市",
  "value": "130300" },
{
  "label": "保定市",
  "value": "130600" },
{
  "label": "石家庄市",
  "value": "130100" },
{
  "label": "邯郸市",
  "value": "130400" },
{
  "label": "邢台市",
  "value": "130500" },
{
  "label": "张家口市",
  "value": "130700" }],

[{
  "label": "北区",
  "value": "810013" },
{
  "label": "大埔区",
  "value": "810014" },
{
  "label": "沙田区",
  "value": "810016" },
{
  "label": "西贡区",
  "value": "810015" },
{
  "label": "屯门区",
  "value": "810011" },
{
  "label": "九龙城区",
  "value": "810007" },
{
  "label": "深水埗区",
  "value": "810006" },
{
  "label": "观塘区",
  "value": "810009" },
{
  "label": "黄大仙区",
  "value": "810008" },
{
  "label": "东区",
  "value": "810003" },
{
  "label": "中西区",
  "value": "810001" },
{
  "label": "离岛区",
  "value": "810018" },
{
  "label": "南区",
  "value": "810004" },
{
  "label": "油尖旺区",
  "value": "810005" },
{
  "label": "湾仔区",
  "value": "810002" },
{
  "label": "元朗区",
  "value": "810012" },
{
  "label": "荃湾区",
  "value": "810010" },
{
  "label": "葵青区",
  "value": "810017" }],

[],
[{
  "label": "花王堂区",
  "value": "820002" },
{
  "label": "望德堂区",
  "value": "820003" },
{
  "label": "路凼填海区",
  "value": "820007" },
{
  "label": "圣方济各堂区",
  "value": "820008" },
{
  "label": "嘉模堂区",
  "value": "820006" },
{
  "label": "花地玛堂区",
  "value": "820001" },
{
  "label": "大堂区",
  "value": "820004" },
{
  "label": "风顺堂区",
  "value": "820005" }],

[{
  "label": "嘉峪关市",
  "value": "620200" },
{
  "label": "酒泉市",
  "value": "620900" },
{
  "label": "金昌市",
  "value": "620300" },
{
  "label": "兰州市",
  "value": "620100" },
{
  "label": "定西市",
  "value": "621100" },
{
  "label": "平凉市",
  "value": "620800" },
{
  "label": "白银市",
  "value": "620400" },
{
  "label": "陇南市",
  "value": "621200" },
{
  "label": "天水市",
  "value": "620500" },
{
  "label": "武威市",
  "value": "620600" },
{
  "label": "庆阳市",
  "value": "621000" },
{
  "label": "甘南藏族自治州",
  "value": "623000" },
{
  "label": "临夏回族自治州",
  "value": "622900" },
{
  "label": "张掖市",
  "value": "620700" }],

[{
  "label": "南充市",
  "value": "511300" },
{
  "label": "广元市",
  "value": "510800" },
{
  "label": "巴中市",
  "value": "511900" },
{
  "label": "德阳市",
  "value": "510600" },
{
  "label": "绵阳市",
  "value": "510700" },
{
  "label": "成都市",
  "value": "510100" },
{
  "label": "达州市",
  "value": "511700" },
{
  "label": "资阳市",
  "value": "512000" },
{
  "label": "遂宁市",
  "value": "510900" },
{
  "label": "眉山市",
  "value": "511400" },
{
  "label": "广安市",
  "value": "511600" },
{
  "label": "内江市",
  "value": "511000" },
{
  "label": "乐山市",
  "value": "511100" },
{
  "label": "自贡市",
  "value": "510300" },
{
  "label": "泸州市",
  "value": "510500" },
{
  "label": "宜宾市",
  "value": "511500" },
{
  "label": "凉山彝族自治州",
  "value": "513400" },
{
  "label": "攀枝花市",
  "value": "510400" },
{
  "label": "阿坝藏族羌族自治州",
  "value": "513200" },
{
  "label": "雅安市",
  "value": "511800" },
{
  "label": "甘孜藏族自治州",
  "value": "513300" }],

[{
  "label": "吉林市",
  "value": "220200" },
{
  "label": "长春市",
  "value": "220100" },
{
  "label": "辽源市",
  "value": "220400" },
{
  "label": "白城市",
  "value": "220800" },
{
  "label": "松原市",
  "value": "220700" },
{
  "label": "四平市",
  "value": "220300" },
{
  "label": "延边朝鲜族自治州",
  "value": "222400" },
{
  "label": "白山市",
  "value": "220600" },
{
  "label": "通化市",
  "value": "220500" }],

[{
  "label": "天津城区",
  "value": "120100" }],

[{
  "label": "昭通市",
  "value": "530600" },
{
  "label": "曲靖市",
  "value": "530300" },
{
  "label": "红河哈尼族彝族自治州",
  "value": "532500" },
{
  "label": "怒江傈僳族自治州",
  "value": "533300" },
{
  "label": "西双版纳傣族自治州",
  "value": "532800" },
{
  "label": "玉溪市",
  "value": "530400" },
{
  "label": "大理白族自治州",
  "value": "532900" },
{
  "label": "丽江市",
  "value": "530700" },
{
  "label": "迪庆藏族自治州",
  "value": "533400" },
{
  "label": "文山壮族苗族自治州",
  "value": "532600" },
{
  "label": "保山市",
  "value": "530500" },
{
  "label": "普洱市",
  "value": "530800" },
{
  "label": "昆明市",
  "value": "530100" },
{
  "label": "楚雄彝族自治州",
  "value": "532300" },
{
  "label": "临沧市",
  "value": "530900" },
{
  "label": "德宏傣族景颇族自治州",
  "value": "533100" }],

[{
  "label": "北京城区",
  "value": "110100" }],

[{
  "label": "阳泉市",
  "value": "140300" },
{
  "label": "运城市",
  "value": "140800" },
{
  "label": "长治市",
  "value": "140400" },
{
  "label": "太原市",
  "value": "140100" },
{
  "label": "临汾市",
  "value": "141000" },
{
  "label": "忻州市",
  "value": "140900" },
{
  "label": "晋城市",
  "value": "140500" },
{
  "label": "朔州市",
  "value": "140600" },
{
  "label": "晋中市",
  "value": "140700" },
{
  "label": "吕梁市",
  "value": "141100" },
{
  "label": "大同市",
  "value": "140200" }]];var _default =


cityData;exports.default = _default;

/***/ }),

/***/ "../../../wky/baby/components/mpvue-citypicker/city-data/province.js":
/*!*********************************************************************!*\
  !*** E:/wky/baby/components/mpvue-citypicker/city-data/province.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /* eslint-disable */
var provinceData = [{
  "label": "广东省",
  "value": "440000" },
{
  "label": "内蒙古自治区",
  "value": "150000" },
{
  "label": "黑龙江省",
  "value": "230000" },
{
  "label": "新疆维吾尔自治区",
  "value": "650000" },
{
  "label": "湖北省",
  "value": "420000" },
{
  "label": "辽宁省",
  "value": "210000" },
{
  "label": "山东省",
  "value": "370000" },
{
  "label": "陕西省",
  "value": "610000" },
{
  "label": "上海市",
  "value": "310000" },
{
  "label": "贵州省",
  "value": "520000" },
{
  "label": "重庆市",
  "value": "500000" },
{
  "label": "西藏自治区",
  "value": "540000" },
{
  "label": "安徽省",
  "value": "340000" },
{
  "label": "福建省",
  "value": "350000" },
{
  "label": "湖南省",
  "value": "430000" },
{
  "label": "海南省",
  "value": "460000" },
{
  "label": "江苏省",
  "value": "320000" },
{
  "label": "青海省",
  "value": "630000" },
{
  "label": "广西壮族自治区",
  "value": "450000" },
{
  "label": "宁夏回族自治区",
  "value": "640000" },
{
  "label": "江西省",
  "value": "360000" },
{
  "label": "浙江省",
  "value": "330000" },
{
  "label": "河北省",
  "value": "130000" },
{
  "label": "香港特别行政区",
  "value": "810000" },
{
  "label": "台湾省",
  "value": "710000" },
{
  "label": "澳门特别行政区",
  "value": "820000" },
{
  "label": "甘肃省",
  "value": "620000" },
{
  "label": "四川省",
  "value": "510000" },
{
  "label": "吉林省",
  "value": "220000" },
{
  "label": "天津市",
  "value": "120000" },
{
  "label": "云南省",
  "value": "530000" },
{
  "label": "北京市",
  "value": "110000" },
{
  "label": "山西省",
  "value": "140000" }];var _default =

provinceData;exports.default = _default;

/***/ }),

/***/ "../../../wky/baby/components/un-parse/libs/html2json.js":
/*!*********************************************************!*\
  !*** E:/wky/baby/components/un-parse/libs/html2json.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;













var _wxDiscode = _interopRequireDefault(__webpack_require__(/*! ./wxDiscode */ "../../../wky/baby/components/un-parse/libs/wxDiscode.js"));
var _htmlparser = _interopRequireDefault(__webpack_require__(/*! ./htmlparser */ "../../../wky/baby/components/un-parse/libs/htmlparser.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /**
                                                                                                                                                                 * html2Json 改造来自: https://github.com/Jxck/html2json
                                                                                                                                                                 *
                                                                                                                                                                 *
                                                                                                                                                                 * author: Di (微信小程序开发工程师)
                                                                                                                                                                 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                                                                                 *               垂直微信小程序开发交流社区
                                                                                                                                                                 *
                                                                                                                                                                 * github地址: https://github.com/icindy/wxParse
                                                                                                                                                                 *
                                                                                                                                                                 * for: 微信小程序富文本解析
                                                                                                                                                                 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                                                                                 */function makeMap(str) {var obj = {};var items = str.split(',');for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}return obj;} // Block Elements - HTML 5
var block = makeMap('br,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video'); // Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');
// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

function removeDOCTYPE(html) {
  var isDocument = /<body.*>([^]*)<\/body>/.test(html);
  return isDocument ? RegExp.$1 : html;
}

function trimHtml(html) {
  return html.
  replace(/<!--.*?-->/gi, '').
  replace(/\/\*.*?\*\//gi, '').
  replace(/[ ]+</gi, '<').
  replace(/<script[^]*<\/script>/gi, '').
  replace(/<style[^]*<\/style>/gi, '');
}

function getScreenInfo() {
  var screen = {};
  wx.getSystemInfo({
    success: function success(res) {
      screen.width = res.windowWidth;
      screen.height = res.windowHeight;
    } });

  return screen;
}

function html2json(html, customHandler, imageProp, host) {
  // 处理字符串
  html = removeDOCTYPE(html);
  html = trimHtml(html);
  html = _wxDiscode.default.strDiscode(html);
  // 生成node节点
  var bufArray = [];
  var results = {
    nodes: [],
    imageUrls: [] };


  var screen = getScreenInfo();
  function Node(tag) {
    this.node = 'element';
    this.tag = tag;

    this.$screen = screen;
  }

  (0, _htmlparser.default)(html, {
    start: function start(tag, attrs, unary) {
      // node for this element
      var node = new Node(tag);

      if (bufArray.length !== 0) {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
      }

      if (block[tag]) {
        node.tagType = 'block';
      } else if (inline[tag]) {
        node.tagType = 'inline';
      } else if (closeSelf[tag]) {
        node.tagType = 'closeSelf';
      }

      node.attr = attrs.reduce(function (pre, attr) {var
        name = attr.name;var
        value = attr.value;
        if (name === 'class') {
          node.classStr = value;
        }
        // has multi attibutes
        // make it array of attribute
        if (name === 'style') {
          node.styleStr = value;
        }
        if (value.match(/ /)) {
          value = value.split(' ');
        }

        // if attr already exists
        // merge it
        if (pre[name]) {
          if (Array.isArray(pre[name])) {
            // already array, push to last
            pre[name].push(value);
          } else {
            // single value, make it array
            pre[name] = [pre[name], value];
          }
        } else {
          // not exist, put it
          pre[name] = value;
        }

        return pre;
      }, {});

      // 优化样式相关属性
      if (node.classStr) {
        node.classStr += " ".concat(node.tag);
      } else {
        node.classStr = node.tag;
      }
      if (node.tagType === 'inline') {
        node.classStr += ' inline';
      }

      // 对img添加额外数据
      if (node.tag === 'img') {
        var imgUrl = node.attr.src;
        imgUrl = _wxDiscode.default.urlToHttpUrl(imgUrl, imageProp.domain);
        Object.assign(node.attr, imageProp, {
          src: imgUrl || '' });

        if (imgUrl) {
          results.imageUrls.push(imgUrl);
        }
      }

      // 处理a标签属性
      if (node.tag === 'a') {
        node.attr.href = node.attr.href || '';
      }

      // 处理font标签样式属性
      if (node.tag === 'font') {
        var fontSize = [
        'x-small',
        'small',
        'medium',
        'large',
        'x-large',
        'xx-large',
        '-webkit-xxx-large'];

        var styleAttrs = {
          color: 'color',
          face: 'font-family',
          size: 'font-size' };

        if (!node.styleStr) node.styleStr = '';
        Object.keys(styleAttrs).forEach(function (key) {
          if (node.attr[key]) {
            var value = key === 'size' ? fontSize[node.attr[key] - 1] : node.attr[key];
            node.styleStr += "".concat(styleAttrs[key], ": ").concat(value, ";");
          }
        });
      }

      // 临时记录source资源
      if (node.tag === 'source') {
        results.source = node.attr.src;
      }

      if (customHandler.start) {
        customHandler.start(node, results);
      }

      if (unary) {
        // if this tag doesn't have end tag
        // like <img src="hoge.png"/>
        // add to parents
        var _parent = bufArray[0] || results;
        if (_parent.nodes === undefined) {
          _parent.nodes = [];
        }
        _parent.nodes.push(node);
      } else {
        bufArray.unshift(node);
      }
    },
    end: function end(tag) {
      // merge into parent tag
      var node = bufArray.shift();
      if (node.tag !== tag) {
        console.error('invalid state: mismatch end tag');
      }

      // 当有缓存source资源时于于video补上src资源
      if (node.tag === 'video' && results.source) {
        node.attr.src = results.source;
        delete results.source;
      }

      if (customHandler.end) {
        customHandler.end(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (!parent.nodes) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    },
    chars: function chars(text) {
      if (!text.trim()) return;

      var node = {
        node: 'text',
        text: text };


      if (customHandler.chars) {
        customHandler.chars(node, results);
      }

      if (bufArray.length === 0) {
        results.nodes.push(node);
      } else {
        var parent = bufArray[0];
        if (parent.nodes === undefined) {
          parent.nodes = [];
        }
        parent.nodes.push(node);
      }
    } });


  return results;
}var _default =

html2json;exports.default = _default;

/***/ }),

/***/ "../../../wky/baby/components/un-parse/libs/htmlparser.js":
/*!**********************************************************!*\
  !*** E:/wky/baby/components/un-parse/libs/htmlparser.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; /**
                                                                                                      *
                                                                                                      * htmlParser改造自: https://github.com/blowsie/Pure-JavaScript-HTML5-Parser
                                                                                                      *
                                                                                                      * author: Di (微信小程序开发工程师)
                                                                                                      * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
                                                                                                      *               垂直微信小程序开发交流社区
                                                                                                      *
                                                                                                      * github地址: https://github.com/icindy/wxParse
                                                                                                      *
                                                                                                      * for: 微信小程序富文本解析
                                                                                                      * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
                                                                                                      */
// Regular Expressions for parsing tags and attributes

var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z0-9_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
var attr = /([a-zA-Z0-9_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g;

function makeMap(str) {
  var obj = {};
  var items = str.split(',');
  for (var i = 0; i < items.length; i += 1) {obj[items[i]] = true;}
  return obj;
}

// Empty Elements - HTML 5
var empty = makeMap('area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr');

// Block Elements - HTML 5
var block = makeMap('address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video');

// Inline Elements - HTML 5
var inline = makeMap('a,abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var');

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap('colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr');

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap('checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected');

function HTMLParser(html, handler) {
  var index;
  var chars;
  var match;
  var last = html;
  var stack = [];

  stack.last = function () {return stack[stack.length - 1];};

  function parseEndTag(tag, tagName) {
    // If no tag name is provided, clean shop
    var pos;
    if (!tagName) {
      pos = 0;
    } else {
      // Find the closest opened tag of the same type
      tagName = tagName.toLowerCase();
      for (pos = stack.length - 1; pos >= 0; pos -= 1) {
        if (stack[pos] === tagName) break;
      }
    }
    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i -= 1) {
        if (handler.end) handler.end(stack[i]);
      }

      // Remove the open elements from the stack
      stack.length = pos;
    }
  }

  function parseStartTag(tag, tagName, rest, unary) {
    tagName = tagName.toLowerCase();

    if (block[tagName]) {
      while (stack.last() && inline[stack.last()]) {
        parseEndTag('', stack.last());
      }
    }

    if (closeSelf[tagName] && stack.last() === tagName) {
      parseEndTag('', tagName);
    }

    unary = empty[tagName] || !!unary;

    if (!unary) stack.push(tagName);

    if (handler.start) {
      var attrs = [];

      rest.replace(attr, function genAttr(matches, name) {
        var value = arguments[2] || arguments[3] || arguments[4] || (fillAttrs[name] ? name : '');

        attrs.push({
          name: name,
          value: value,
          escaped: value.replace(/(^|[^\\])"/g, '$1\\"') // "
        });
      });

      if (handler.start) {
        handler.start(tagName, attrs, unary);
      }
    }
  }

  while (html) {
    chars = true;

    if (html.indexOf('</') === 0) {
      match = html.match(endTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(endTag, parseEndTag);
        chars = false;
      }

      // start tag
    } else if (html.indexOf('<') === 0) {
      match = html.match(startTag);

      if (match) {
        html = html.substring(match[0].length);
        match[0].replace(startTag, parseStartTag);
        chars = false;
      }
    }

    if (chars) {
      index = html.indexOf('<');
      var text = '';
      while (index === 0) {
        text += '<';
        html = html.substring(1);
        index = html.indexOf('<');
      }
      text += index < 0 ? html : html.substring(0, index);
      html = index < 0 ? '' : html.substring(index);

      if (handler.chars) handler.chars(text);
    }

    if (html === last) throw new Error("Parse Error: ".concat(html));
    last = html;
  }

  // Clean up any remaining tags
  parseEndTag();
}var _default =

HTMLParser;exports.default = _default;

/***/ }),

/***/ "../../../wky/baby/components/un-parse/libs/wxDiscode.js":
/*!*********************************************************!*\
  !*** E:/wky/baby/components/un-parse/libs/wxDiscode.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0; // HTML 支持的数学符号
function strNumDiscode(str) {
  str = str.replace(/&forall;/g, '∀');
  str = str.replace(/&part;/g, '∂');
  str = str.replace(/&exist;/g, '∃');
  str = str.replace(/&empty;/g, '∅');
  str = str.replace(/&nabla;/g, '∇');
  str = str.replace(/&isin;/g, '∈');
  str = str.replace(/&notin;/g, '∉');
  str = str.replace(/&ni;/g, '∋');
  str = str.replace(/&prod;/g, '∏');
  str = str.replace(/&sum;/g, '∑');
  str = str.replace(/&minus;/g, '−');
  str = str.replace(/&lowast;/g, '∗');
  str = str.replace(/&radic;/g, '√');
  str = str.replace(/&prop;/g, '∝');
  str = str.replace(/&infin;/g, '∞');
  str = str.replace(/&ang;/g, '∠');
  str = str.replace(/&and;/g, '∧');
  str = str.replace(/&or;/g, '∨');
  str = str.replace(/&cap;/g, '∩');
  str = str.replace(/&cup;/g, '∪');
  str = str.replace(/&int;/g, '∫');
  str = str.replace(/&there4;/g, '∴');
  str = str.replace(/&sim;/g, '∼');
  str = str.replace(/&cong;/g, '≅');
  str = str.replace(/&asymp;/g, '≈');
  str = str.replace(/&ne;/g, '≠');
  str = str.replace(/&le;/g, '≤');
  str = str.replace(/&ge;/g, '≥');
  str = str.replace(/&sub;/g, '⊂');
  str = str.replace(/&sup;/g, '⊃');
  str = str.replace(/&nsub;/g, '⊄');
  str = str.replace(/&sube;/g, '⊆');
  str = str.replace(/&supe;/g, '⊇');
  str = str.replace(/&oplus;/g, '⊕');
  str = str.replace(/&otimes;/g, '⊗');
  str = str.replace(/&perp;/g, '⊥');
  str = str.replace(/&sdot;/g, '⋅');
  return str;
}

// HTML 支持的希腊字母
function strGreeceDiscode(str) {
  str = str.replace(/&Alpha;/g, 'Α');
  str = str.replace(/&Beta;/g, 'Β');
  str = str.replace(/&Gamma;/g, 'Γ');
  str = str.replace(/&Delta;/g, 'Δ');
  str = str.replace(/&Epsilon;/g, 'Ε');
  str = str.replace(/&Zeta;/g, 'Ζ');
  str = str.replace(/&Eta;/g, 'Η');
  str = str.replace(/&Theta;/g, 'Θ');
  str = str.replace(/&Iota;/g, 'Ι');
  str = str.replace(/&Kappa;/g, 'Κ');
  str = str.replace(/&Lambda;/g, 'Λ');
  str = str.replace(/&Mu;/g, 'Μ');
  str = str.replace(/&Nu;/g, 'Ν');
  str = str.replace(/&Xi;/g, 'Ν');
  str = str.replace(/&Omicron;/g, 'Ο');
  str = str.replace(/&Pi;/g, 'Π');
  str = str.replace(/&Rho;/g, 'Ρ');
  str = str.replace(/&Sigma;/g, 'Σ');
  str = str.replace(/&Tau;/g, 'Τ');
  str = str.replace(/&Upsilon;/g, 'Υ');
  str = str.replace(/&Phi;/g, 'Φ');
  str = str.replace(/&Chi;/g, 'Χ');
  str = str.replace(/&Psi;/g, 'Ψ');
  str = str.replace(/&Omega;/g, 'Ω');

  str = str.replace(/&alpha;/g, 'α');
  str = str.replace(/&beta;/g, 'β');
  str = str.replace(/&gamma;/g, 'γ');
  str = str.replace(/&delta;/g, 'δ');
  str = str.replace(/&epsilon;/g, 'ε');
  str = str.replace(/&zeta;/g, 'ζ');
  str = str.replace(/&eta;/g, 'η');
  str = str.replace(/&theta;/g, 'θ');
  str = str.replace(/&iota;/g, 'ι');
  str = str.replace(/&kappa;/g, 'κ');
  str = str.replace(/&lambda;/g, 'λ');
  str = str.replace(/&mu;/g, 'μ');
  str = str.replace(/&nu;/g, 'ν');
  str = str.replace(/&xi;/g, 'ξ');
  str = str.replace(/&omicron;/g, 'ο');
  str = str.replace(/&pi;/g, 'π');
  str = str.replace(/&rho;/g, 'ρ');
  str = str.replace(/&sigmaf;/g, 'ς');
  str = str.replace(/&sigma;/g, 'σ');
  str = str.replace(/&tau;/g, 'τ');
  str = str.replace(/&upsilon;/g, 'υ');
  str = str.replace(/&phi;/g, 'φ');
  str = str.replace(/&chi;/g, 'χ');
  str = str.replace(/&psi;/g, 'ψ');
  str = str.replace(/&omega;/g, 'ω');
  str = str.replace(/&thetasym;/g, 'ϑ');
  str = str.replace(/&upsih;/g, 'ϒ');
  str = str.replace(/&piv;/g, 'ϖ');
  str = str.replace(/&middot;/g, '·');
  return str;
}

function strcharacterDiscode(str) {
  // 加入常用解析
  str = str.replace(/&nbsp;/g, ' ');
  str = str.replace(/&ensp;/g, ' ');
  str = str.replace(/&emsp;/g, '　');
  str = str.replace(/&quot;/g, "'");
  str = str.replace(/&amp;/g, '&');
  str = str.replace(/&lt;/g, '<');
  str = str.replace(/&gt;/g, '>');
  str = str.replace(/&#8226;/g, '•');

  return str;
}

// HTML 支持的其他实体
function strOtherDiscode(str) {
  str = str.replace(/&OElig;/g, 'Œ');
  str = str.replace(/&oelig;/g, 'œ');
  str = str.replace(/&Scaron;/g, 'Š');
  str = str.replace(/&scaron;/g, 'š');
  str = str.replace(/&Yuml;/g, 'Ÿ');
  str = str.replace(/&fnof;/g, 'ƒ');
  str = str.replace(/&circ;/g, 'ˆ');
  str = str.replace(/&tilde;/g, '˜');
  str = str.replace(/&ensp;/g, '');
  str = str.replace(/&emsp;/g, '');
  str = str.replace(/&thinsp;/g, '');
  str = str.replace(/&zwnj;/g, '');
  str = str.replace(/&zwj;/g, '');
  str = str.replace(/&lrm;/g, '');
  str = str.replace(/&rlm;/g, '');
  str = str.replace(/&ndash;/g, '–');
  str = str.replace(/&mdash;/g, '—');
  str = str.replace(/&lsquo;/g, '‘');
  str = str.replace(/&rsquo;/g, '’');
  str = str.replace(/&sbquo;/g, '‚');
  str = str.replace(/&ldquo;/g, '“');
  str = str.replace(/&rdquo;/g, '”');
  str = str.replace(/&bdquo;/g, '„');
  str = str.replace(/&dagger;/g, '†');
  str = str.replace(/&Dagger;/g, '‡');
  str = str.replace(/&bull;/g, '•');
  str = str.replace(/&hellip;/g, '…');
  str = str.replace(/&permil;/g, '‰');
  str = str.replace(/&prime;/g, '′');
  str = str.replace(/&Prime;/g, '″');
  str = str.replace(/&lsaquo;/g, '‹');
  str = str.replace(/&rsaquo;/g, '›');
  str = str.replace(/&oline;/g, '‾');
  str = str.replace(/&euro;/g, '€');
  str = str.replace(/&trade;/g, '™');

  str = str.replace(/&larr;/g, '←');
  str = str.replace(/&uarr;/g, '↑');
  str = str.replace(/&rarr;/g, '→');
  str = str.replace(/&darr;/g, '↓');
  str = str.replace(/&harr;/g, '↔');
  str = str.replace(/&crarr;/g, '↵');
  str = str.replace(/&lceil;/g, '⌈');
  str = str.replace(/&rceil;/g, '⌉');

  str = str.replace(/&lfloor;/g, '⌊');
  str = str.replace(/&rfloor;/g, '⌋');
  str = str.replace(/&loz;/g, '◊');
  str = str.replace(/&spades;/g, '♠');
  str = str.replace(/&clubs;/g, '♣');
  str = str.replace(/&hearts;/g, '♥');

  str = str.replace(/&diams;/g, '♦');
  str = str.replace(/&#39;/g, "'");
  return str;
}

function strDiscode(str) {
  str = strNumDiscode(str);
  str = strGreeceDiscode(str);
  str = strcharacterDiscode(str);
  str = strOtherDiscode(str);
  return str;
}

function urlToHttpUrl(url, domain) {
  if (/^\/\//.test(url)) {
    return "https:".concat(url);
  } else if (/^\//.test(url)) {
    return "https://".concat(domain).concat(url);
  }
  return url;
}var _default =

{
  strDiscode: strDiscode,
  urlToHttpUrl: urlToHttpUrl };exports.default = _default;

/***/ }),

/***/ "../../../wky/baby/main.js":
/*!***************************!*\
  !*** E:/wky/baby/main.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createApp) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");
__webpack_require__(/*! ./common/util/aldSdk/ald-stat.js */ "../../../wky/baby/common/util/aldSdk/ald-stat.js");
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _App = _interopRequireDefault(__webpack_require__(/*! ./App */ "../../../wky/baby/App.vue"));
var _filters = _interopRequireDefault(__webpack_require__(/*! ./common/util/filters.js */ "../../../wky/baby/common/util/filters.js"));

var _index = _interopRequireDefault(__webpack_require__(/*! ./common/service/index.js */ "../../../wky/baby/common/service/index.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};var ownKeys = Object.keys(source);if (typeof Object.getOwnPropertySymbols === 'function') {ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {return Object.getOwnPropertyDescriptor(source, sym).enumerable;}));}ownKeys.forEach(function (key) {_defineProperty(target, key, source[key]);});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //过滤器
Object.keys(_filters.default).forEach(function (k) {return _vue.default.filter(k, _filters.default[k]);});_vue.default.config.productionTip = false;
_vue.default.prototype.api = _index.default;var empty = function empty() {return __webpack_require__.e(/*! import() | components/empty-data */ "components/empty-data").then(__webpack_require__.bind(null, /*! ./components/empty-data.vue */ "../../../wky/baby/components/empty-data.vue"));};var uniLoadMore = function uniLoadMore() {return __webpack_require__.e(/*! import() | components/uni-load-more */ "components/uni-load-more").then(__webpack_require__.bind(null, /*! ./components/uni-load-more.vue */ "../../../wky/baby/components/uni-load-more.vue"));};


_vue.default.component('empty', empty);
_vue.default.component('uniLoadMore', uniLoadMore);var uniTag = function uniTag() {return __webpack_require__.e(/*! import() | components/uni-tag */ "components/uni-tag").then(__webpack_require__.bind(null, /*! ./components/uni-tag.vue */ "../../../wky/baby/components/uni-tag.vue"));};

_vue.default.component('uniTag', uniTag);var articleItem = function articleItem() {return __webpack_require__.e(/*! import() | components/article-item */ "components/article-item").then(__webpack_require__.bind(null, /*! ./components/article-item.vue */ "../../../wky/baby/components/article-item.vue"));};

_vue.default.component('articleItem', articleItem);var articleOperate = function articleOperate() {return __webpack_require__.e(/*! import() | components/article-operate */ "components/article-operate").then(__webpack_require__.bind(null, /*! ./components/article-operate.vue */ "../../../wky/baby/components/article-operate.vue"));};

_vue.default.component('articleOperate', articleOperate);var cuCustom = function cuCustom() {return __webpack_require__.e(/*! import() | components/cu-custom */ "components/cu-custom").then(__webpack_require__.bind(null, /*! ./components/cu-custom.vue */ "../../../wky/baby/components/cu-custom.vue"));};
//自定义导航栏
_vue.default.component('cu-custom', cuCustom);
_App.default.mpType = 'app';

var app = new _vue.default(_objectSpread({},
_App.default));

createApp(app).$mount();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createApp"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fabout%2Findex%2Findex\"}":
/*!*****************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fabout%2Findex%2Findex"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/center/about/index/index.vue */ "../../../wky/baby/pages/center/about/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fabout%2Fwebsite%2Findex%2Findex\"}":
/*!***************************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fabout%2Fwebsite%2Findex%2Findex"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/center/about/website/index/index.vue */ "../../../wky/baby/pages/center/about/website/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Faddress%2Faddress-choose%2Faddress-choose\"}":
/*!*************************************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Faddress%2Faddress-choose%2Faddress-choose"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _addressChoose = _interopRequireDefault(__webpack_require__(/*! ./pages/center/address/address-choose/address-choose.vue */ "../../../wky/baby/pages/center/address/address-choose/address-choose.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_addressChoose.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Faddress%2Faddress-handle%2Faddress-handle\"}":
/*!*************************************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Faddress%2Faddress-handle%2Faddress-handle"} ***!
  \*************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _addressHandle = _interopRequireDefault(__webpack_require__(/*! ./pages/center/address/address-handle/address-handle.vue */ "../../../wky/baby/pages/center/address/address-handle/address-handle.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_addressHandle.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Faddress%2Faddress-list%2Faddress-list\"}":
/*!*********************************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Faddress%2Faddress-list%2Faddress-list"} ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _addressList = _interopRequireDefault(__webpack_require__(/*! ./pages/center/address/address-list/address-list.vue */ "../../../wky/baby/pages/center/address/address-list/address-list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_addressList.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fclassify%2Flist%2Flist\"}":
/*!******************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fclassify%2Flist%2Flist"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/center/classify/list/list.vue */ "../../../wky/baby/pages/center/classify/list/list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fcollect%2Flist%2Flist\"}":
/*!*****************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fcollect%2Flist%2Flist"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/center/collect/list/list.vue */ "../../../wky/baby/pages/center/collect/list/list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fcomment%2Flist%2Flist\"}":
/*!*****************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fcomment%2Flist%2Flist"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/center/comment/list/list.vue */ "../../../wky/baby/pages/center/comment/list/list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Findex%2Findex\"}":
/*!*********************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Findex%2Findex"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/center/index/index.vue */ "../../../wky/baby/pages/center/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fmanage%2Fbaby%2Fhandle%2Fhandle\"}":
/*!***************************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fmanage%2Fbaby%2Fhandle%2Fhandle"} ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _handle = _interopRequireDefault(__webpack_require__(/*! ./pages/center/manage/baby/handle/handle.vue */ "../../../wky/baby/pages/center/manage/baby/handle/handle.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_handle.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fmanage%2Findex%2Findex\"}":
/*!******************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fmanage%2Findex%2Findex"} ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/center/manage/index/index.vue */ "../../../wky/baby/pages/center/manage/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fmanage%2Fpregnancy%2Fhandle%2Fhandle\"}":
/*!********************************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fmanage%2Fpregnancy%2Fhandle%2Fhandle"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _handle = _interopRequireDefault(__webpack_require__(/*! ./pages/center/manage/pregnancy/handle/handle.vue */ "../../../wky/baby/pages/center/manage/pregnancy/handle/handle.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_handle.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Frecord%2Flist%2Flist\"}":
/*!****************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Frecord%2Flist%2Flist"} ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/center/record/list/list.vue */ "../../../wky/baby/pages/center/record/list/list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fcenter%2Fshield-author%2Flist%2Flist\"}":
/*!***********************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fcenter%2Fshield-author%2Flist%2Flist"} ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/center/shield-author/list/list.vue */ "../../../wky/baby/pages/center/shield-author/list/list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fclassify%2Fdetail%2Fdetail\"}":
/*!*************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fclassify%2Fdetail%2Fdetail"} ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/classify/detail/detail.vue */ "../../../wky/baby/pages/classify/detail/detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fclassify%2Findex%2Findex\"}":
/*!***********************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fclassify%2Findex%2Findex"} ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/classify/index/index.vue */ "../../../wky/baby/pages/classify/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhelper%2Findex%2Findex\"}":
/*!*********************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhelper%2Findex%2Findex"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/helper/index/index.vue */ "../../../wky/baby/pages/helper/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhelper%2Flist%2Flist\"}":
/*!*******************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhelper%2Flist%2Flist"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _list = _interopRequireDefault(__webpack_require__(/*! ./pages/helper/list/list.vue */ "../../../wky/baby/pages/helper/list/list.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_list.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhome%2Farticle%2Fdetail%2Fdetail\"}":
/*!*******************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhome%2Farticle%2Fdetail%2Fdetail"} ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/home/article/detail/detail.vue */ "../../../wky/baby/pages/home/article/detail/detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhome%2Fcelebrity%2Fdetail%2Fdetail\"}":
/*!*********************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhome%2Fcelebrity%2Fdetail%2Fdetail"} ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _detail = _interopRequireDefault(__webpack_require__(/*! ./pages/home/celebrity/detail/detail.vue */ "../../../wky/baby/pages/home/celebrity/detail/detail.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_detail.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhome%2Fcelebrity%2Fmore%2Fmore\"}":
/*!*****************************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhome%2Fcelebrity%2Fmore%2Fmore"} ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _more = _interopRequireDefault(__webpack_require__(/*! ./pages/home/celebrity/more/more.vue */ "../../../wky/baby/pages/home/celebrity/more/more.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_more.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhome%2Findex%2Findex\"}":
/*!*******************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhome%2Findex%2Findex"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/home/index/index.vue */ "../../../wky/baby/pages/home/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Fhome%2Fsearch%2Fsearch\"}":
/*!*********************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Fhome%2Fsearch%2Fsearch"} ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _search = _interopRequireDefault(__webpack_require__(/*! ./pages/home/search/search.vue */ "../../../wky/baby/pages/home/search/search.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_search.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Findex%2Findex\"}":
/*!************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Findex%2Findex"} ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/index/index.vue */ "../../../wky/baby/pages/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/main.js?{\"page\":\"pages%2Ftask%2Findex%2Findex\"}":
/*!*******************************************************************!*\
  !*** E:/wky/baby/main.js?{"page":"pages%2Ftask%2Findex%2Findex"} ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ "../../../wky/baby/pages.json");

var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));
var _index = _interopRequireDefault(__webpack_require__(/*! ./pages/task/index/index.vue */ "../../../wky/baby/pages/task/index/index.vue"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_index.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js")["createPage"]))

/***/ }),

/***/ "../../../wky/baby/pages.json":
/*!******************************!*\
  !*** E:/wky/baby/pages.json ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime-module.js");


/***/ }),

/***/ "./node_modules/@dcloudio/uni-mp-weixin/dist/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createPage = createPage;exports.createComponent = createComponent;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance");}function _iterableToArrayLimit(arr, i) {var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var SYNC_API_RE = /^\$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;

var CONTEXT_API_RE = /^create|Manager$/;

var CALLBACK_API_RE = /^on/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name);
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name);
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name);
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {params[_key - 1] = arguments[_key];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return api.apply(void 0, [options].concat(params));
    }
    return handlePromise(new Promise(function (resolve, reject) {
      api.apply(void 0, [Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
      /* eslint-disable no-extend-native */
      if (!Promise.prototype.finally) {
        Promise.prototype.finally = function (callback) {
          var promise = this.constructor;
          return this.then(
          function (value) {return promise.resolve(callback()).then(function () {return value;});},
          function (reason) {return promise.resolve(callback()).then(function () {
              throw reason;
            });});

        };
      }
    }));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      return 1;
    } else {
      return 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var protocols = {
  previewImage: previewImage };

var todos = [];
var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ".concat(methodName, "\u6682\u4E0D\u652F\u6301").concat(key));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301".concat(methodName));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      var returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail:\u6682\u4E0D\u652F\u6301 ").concat(name, " \u65B9\u6CD5") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail:服务[' + service + ']不存在' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  getProvider: getProvider });


var getEmitter = function () {
  if (typeof getUniEmitter === 'function') {
    /* eslint-disable no-undef */
    return getUniEmitter;
  }
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}



var eventApi = /*#__PURE__*/Object.freeze({
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });




var api = /*#__PURE__*/Object.freeze({});



var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  {
    if (!wx.canIUse('nextTick')) {
      return;
    }
  }
  var oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function (event) {for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {args[_key2 - 1] = arguments[_key2];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
}

function initHook(name, options) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {args[_key3] = arguments[_key3];}
      return oldHook.apply(this, args);
    };
  }
}

Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('onLoad', options);
  return MPPage(options);
};

Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  initHook('created', options);
  return MPComponent(options);
};

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function initHooks(mpOptions, hooks) {
  hooks.forEach(function (hook) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  });
}

function initVueComponent(Vue$$1, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
    vueOptions = VueComponent.extendOptions;
  } else {
    VueComponent = Vue$$1.extend(vueOptions);
  }
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions['behaviors'];
  var vueExtends = vueOptions['extends'];
  var vueMixins = vueOptions['mixins'];

  var vueProps = vueOptions['props'];

  if (!vueProps) {
    vueOptions['props'] = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps['name'] = String;
          vueProps['value'] = null;
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts['default'];
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type, value, file);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts, null, file);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor = dataPath ? vm.__get_value(dataPath, context) : context;

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *[
                                                  *    ['data.items', 'data.id', item.data.id],
                                                  *    ['metas', 'id', meta.id]
                                                  *],
                                                  *'test'
                                                  */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var eventOpts = (event.currentTarget || event.target).dataset.eventOpts;
  if (!eventOpts) {
    return console.warn("\u4E8B\u4EF6\u4FE1\u606F\u4E0D\u5B58\u5728");
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (
          handlerCtx.$options.generic &&
          handlerCtx.$parent &&
          handlerCtx.$parent.$parent)
          {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = handlerCtx.$parent.$parent;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          handler.apply(handlerCtx, processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName));

        }
      });
    }
  });
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound'];


function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;

      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      {
        if (!wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属
  var parentVm = $children.find(function (childVm) {return childVm.$scope._$vueId === vuePid;});
  if (parentVm) {
    return parentVm;
  }
  // 反向递归查找
  for (var i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      var components = mpInstance.selectAllComponents('.vue-ref');
      components.forEach(function (component) {
        var ref = component.dataset.ref;
        $refs[ref] = component.$vm || component;
      });
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage$$1 = _ref5.isPage,initRelation$$1 = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var componentOptions = {
    options: {
      multipleSlots: true,
      addGlobalClass: true },

    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage$$1.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation$$1.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };



  if (isPage$$1) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });


  initHooks(pageOptions.methods, hooks$1);

  pageOptions.methods.onLoad = function (args) {
    this.$vm.$mp.query = args; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', args);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (name === 'upx2px') {
        return upx2px;
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    } });

} else {
  uni.upx2px = upx2px;

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;

/***/ }),

/***/ "./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    {
      if(vm.$scope && vm.$scope.is){
        return vm.$scope.is
      }
    }
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null;
var targetStack = [];

function pushTarget (target) {
  targetStack.push(target);
  Dep.target = target;
}

function popTarget () {
  targetStack.pop();
  Dep.target = targetStack[targetStack.length - 1];
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      protoAugment(value, arrayMethods);
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Techinically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length));
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a speical value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack becaues all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu'){//百度 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(vm._getFormData || (vm.$parent && vm.$parent.__next_tick_pending)){
              return
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    vm.mpHost !== 'mp-toutiao' && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    vm.mpHost !== 'mp-toutiao' && initProvide(vm); // resolve provide after data/props
    vm.mpHost !== 'mp-toutiao' && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.10';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue != pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
    // 确保当前 vm 所有数据被同步
    var dataKeys = [].concat(
        Object.keys(vm._data || {}),
        Object.keys(vm._computedWatchers || {}));

    var ret = dataKeys.reduce(function(ret, key) {
        ret[key] = vm[key];
        return ret
    }, Object.create(null));
    //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
    Object.assign(ret, vm.$mp.data || {});
    if (
        Array.isArray(vm.$options.behaviors) &&
        vm.$options.behaviors.indexOf('uni://form-field') !== -1
    ) { //form-field
        ret['name'] = vm.name;
        ret['value'] = vm.value;
    }
    return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
    var this$1 = this;

    if (vnode === null) { //destroy
        return
    }
    if (this.mpType === 'page' || this.mpType === 'component') {
        var mpInstance = this.$scope;
        var data = cloneWithData(this);
        data.__webviewId__ = mpInstance.data.__webviewId__;
        var mpData = Object.create(null);
        Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
            mpData[key] = mpInstance.data[key];
        });
        var diffData = diff(data, mpData);
        if (Object.keys(diffData).length) {
            if (Object({"NODE_ENV":"development","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
                console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
                    ']差量更新',
                    JSON.stringify(diffData));
            }
            this.__next_tick_pending = true;
            mpInstance.setData(diffData, function () {
                this$1.__next_tick_pending = false;
                flushCallbacks$1(this$1);
            });
        } else {
            flushCallbacks$1(this);
        }
    }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  vm.mpHost !== 'mp-toutiao' && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
    var parts = path.split('.');
    var key = parts[0];
    if (key.indexOf('__$n') === 0) { //number index
        key = parseInt(key.replace('__$n', ''));
    }
    if (parts.length === 1) {
        return obj[key]
    }
    return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

    var oldEmit = Vue.prototype.$emit;

    Vue.prototype.$emit = function(event) {
        if (this.$scope && event) {
            this.$scope['triggerEvent'](event, {
                __args__: toArray(arguments, 1)
            });
        }
        return oldEmit.apply(this, arguments)
    };
    
    Vue.prototype.$nextTick = function (fn) {
      return nextTick$1(this, fn)
    };

    MP_METHODS.forEach(function (method) {
        Vue.prototype[method] = function(args) {
            if (this.$scope) {
                return this.$scope[method](args)
            }
        };
    });

    Vue.prototype.__init_provide = initProvide;

    Vue.prototype.__init_injections = initInjections;

    Vue.prototype.__call_hook = function(hook, args) {
        var vm = this;
        // #7573 disable dep collection when invoking lifecycle hooks
        pushTarget();
        var handlers = vm.$options[hook];
        var info = hook + " hook";
        var ret;
        if (handlers) {
            for (var i = 0, j = handlers.length; i < j; i++) {
                ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
            }
        }
        if (vm._hasHookEvent) {
            vm.$emit('hook:' + hook);
        }
        popTarget();
        return ret
    };

    Vue.prototype.__set_model = function(target, key, value, modifiers) {
        if (Array.isArray(modifiers)) {
            if (modifiers.indexOf('trim') !== -1) {
                value = value.trim();
            }
            if (modifiers.indexOf('number') !== -1) {
                value = this._n(value);
            }
        }
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__set_sync = function(target, key, value) {
        if(!target){
            target = this;
        }
        target[key] = value;
    };

    Vue.prototype.__get_orig = function(item) {
        if (isPlainObject(item)) {
            return item['$orig'] || item
        }
        return item
    };

    Vue.prototype.__get_value = function(dataPath, target) {
        return getTarget(target || this, dataPath)
    };


    Vue.prototype.__get_class = function(dynamicClass, staticClass) {
        return renderClass(staticClass, dynamicClass)
    };

    Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
        if (!dynamicStyle && !staticStyle) {
            return ''
        }
        var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
        var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
        return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
    };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onError',
    //Page
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime-module.js":
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ "./node_modules/regenerator-runtime/runtime.js");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map