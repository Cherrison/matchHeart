//pages/index.js

const app = getApp();
Page({
  data: {
    teacherid:"",
    name: "",
    //article将用来存储towxml数据
    article: {},
    title: "咨询师详情",
    guaranteeH: "http://resource.soulbuddy.cn/public/images/miniprogram/check-circle.png",
    dataList: [],
    info: ""
  },
  onLoad: function(options) {
    console.log(options.teacherid)
    const _ts = this;
    this.data.name = options.name
    console.log(options)
    wx.getStorage({
      key: 'dataList',
      success: function(res) {
        _ts.setData({
          dataList: res.data,
          teacherid:options.teacherid
        })
        console.log(res.data)
        for (var i = 0; i < _ts.data.dataList.length; i++) {
          if (_ts.data.dataList[i].tid == options.id) {
            _ts.setData({
              info: _ts.data.dataList[i]
            })
            break;
          }
        }
      },
    })

    //请求markdown文件，并转换为内容
    wx.request({
      url: 'https://www.cheery.pro/teacher/' + options.id + '.md',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: (res) => {
        //将markdown内容转换为towxml数据
        let data = app.towxml.toJson(
          res.data, // `markdown`或`html`文本内容
          'markdown' // `markdown`或`html`
        );
        //前台初始化小程序数据（2.1.2新增，如果小程序中无相对资源需要添加`base`根地址，也无`audio`内容可无需初始化）
        data = app.towxml.initData(data, {
          base: 'https://xxx.com/', // 需要解析的内容中相对路径的资源`base`地址
          app: _ts // 传入小程序页面的`this`对象，以用于音频播放器初始化
        });

        //设置文档显示主题，默认'light'
        data.theme = 'light';

        //设置数据
        _ts.setData({
          article: data
        });
      }
    });
  },
  back() {
    wx.navigateBack()
  },
  gotoOrder() {
    var that = this
    if (app.globalData.userIdentity == true) {
      wx.navigateTo({
        url: '/pages/order/order?teacher=' + that.data.name + '&teacherid=' + that.data.teacherid,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '请先在我的页面完成身份认证!',
        showCancel: false
      })
    }
  }
})


// //全局的 getApp() 函数,获取到小程序实例
// var app = getApp()
// Page({
//   data: {
//     userInfo: null
//   },
//   //页面载入，获取全局变量userInfo
//   onLoad: function (options) {
//     console.log("tid:"+options.id)
//     this.setData({
//       userInfo: app.globalData.userInfo
//     })
//   },
//   //表单提交
//   formSubmit: function (e) {
//     var that = this
//     console.log(e)
//     var orderno = e.detail.value.orderno
//     var orderdate = e.detail.value.orderdate
//     var ordername = e.detail.value.ordername
//     var ordertel = e.detail.value.ordertel
//     var formid = e.detail.formId
//     //校验输入
//     if (orderno == "" || orderdate == "" || ordername == "" || ordertel == "") {
//       wx.showModal({
//         title: '提示',
//         content: '不能为空！'
//       })
//     }
//     else {
//       wx.showToast({
//         title: '成功',
//         icon: 'success',
//         duration: 2000
//       }),
//         wx.request({
//           url: 'https://www.cheery.pro/openid.php', //服务器信息
//           data: {
//             code: app.globalData.code,
//             FORMID: formid,
//             date: orderdate,
//             no: orderno,
//             name: ordername,
//             tel: ordertel
//           },
//           header: {
//             'content-type': 'application/x-www-form-urlencoded'
//           },
//           success: function (res) {
//             console.log(res.data)
//           }
//         })
//     }
//   },
//   back() {
//     wx.navigateBack()
//   },
//   //表单重置
//   formReset: function () {
//     this.setData({
//       date: ''
//     })
//   },
//   //日期选择
//   bindDateChange: function (e) {
//     this.setData({
//       date: e.detail.value
//     })
//   },
// })