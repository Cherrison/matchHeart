// // pages/testPage/testPage.js
// Page({
//   data: {
//     testList: [],

//   },

//   back: function (e) {
//     wx.navigateBack({

//     })
//   },
//   navigate: function (e) {
//     wx.navigateTo({
//       url: '/pages/testPage/testDetail/testDetail?title=' + e.target.dataset.title,
//     })
//   },
//   onLoad: function (options) {
//     var that = this
//     wx.request({
//       url: 'https://www.clearn.site/wxapi/getTest.php',
//       method: "POST",
//       header: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       },
//       data: {
//         type: "getall"
//       },
//       success: function (res) {
//         console.log(res)
//         that.setData({
//           testList: res.data
//         })
//       },
//       fail: function (res) {
//         console.log(res)
//       }
//     })
//   },


//   onReady: function () {

//   },


//   onShow: function () {

//   },


//   onHide: function () {

//   },

//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {

//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })




//index.js
//获取应用实例
import * as echarts from '../../../ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    backgroundColor: "#ffffff",
    color: ["#37A2DA", "#FF9F7F"],
    tooltip: {},
    xAxis: {
      show: false
    },
    yAxis: {
      show: false
    },
    radar: {
      // shape: 'circle',
      indicator: [{
          name: '乐观',
          max: 500
        },
        {
          name: '幸福',
          max: 500
        },
        {
          name: '开心',
          max: 500
        },
        {
          name: '抑郁',
          max: 500
        },
        {
          name: '孤独',
          max: 500
        },
        {
          name: '失落',
          max: 500
        }
      ]
    },
    series: [{
      name: '开心 vs 伤心',
      type: 'radar',
      data: [{
          value: [
            Math.round(Math.random() * 230 + 290),
            Math.round(Math.random() * 158 + 210),
            Math.round(Math.random() * 100 + 185),
            Math.round(Math.random() * 160 + 144),
            Math.round(Math.random() * 230 + 230),
            Math.round(Math.random() * 175 + 310)
          ],
          name: '开心'
        },
        {
          value: [
            Math.round(Math.random() * 180 + 160),
            Math.round(Math.random() * 230 + 155),
            Math.round(Math.random() * 190 + 310),
            Math.round(Math.random() * 160 + 250),
            Math.round(Math.random() * 320 + 200),
            Math.round(Math.random() * 150 + 245)
          ],
          name: '伤心'
        }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}
Page({
  data: {
    data: [ //储存所有问题的数据，包括问题内容，选项内容，不同选项的得分

    ],
    select: { //储存每个问题的选择

    },
    score: 0,
    heart_status:[  // 测评的可选状态
      {
        comment:"你的心理状态很好",
        analytics:"最近不时有一些事压在你心头，有时甚至感觉到很压抑，不能呼吸。总得来说你的负面情绪没有影响到你的正常生活，但你不是长期处于愉悦的状态。突然心情不好就容易钻牛角尖。压抑的时候尝试找个心理咨询师，释放一下心头的压力吧。"
      },
      {
        comment: "你的心理状态一般",
        analytics: "最近不时有一些事压在你心头，有时甚至感觉到很压抑，不能呼吸。总得来说你的负面情绪没有影响到你的正常生活，但你不是长期处于愉悦的状态。突然心情不好就容易钻牛角尖。压抑的时候尝试找个心理咨询师，释放一下心头的压力吧。"
      },
      {
        comment: "你的心理状态较差",
        analytics: "最近不时有一些事压在你心头，有时甚至感觉到很压抑，不能呼吸。总得来说你的负面情绪没有影响到你的正常生活，但你不是长期处于愉悦的状态。突然心情不好就容易钻牛角尖。压抑的时候尝试找个心理咨询师，释放一下心头的压力吧。"
      }
    ],
    analy_result:"",  // 测评的结果
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 500,
    isComplete: false, //标志是否完成答题
    current: 0,
    isFinal: false, //标志是否到了最后一页
    currentIndex: 0,
    show_result: false,
    ec: {
      onInit: initChart
    }
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  result: function(e) { //用于计算得分
    var sum = 0
    var data = this.data.data
    console.log(data)
    var select = this.data.select
    console.log("选择结果:",select)
    var len = select.length
    var result=0;
    for (let i = 0; i < len; i++) {
      console.log("第", i, "题", data[i][2][select[i]])
      sum = sum + data[i][2][select[i]] + 1 - 1
    }
    this.setData({
      score: sum,
      show_result: true
    })
    console.log(sum)
    if(sum<35) result = 0;
    else if(sum<60) result = 1;
    else result = 2;
    this.setData({
      analy_result: this.data.heart_status[result]
    })
  },

  back() {
    wx.navigateBack()
  },

  change: function(e) { //每次页面改变的时候触发

    // if (this.data.current == this.data.data.length-1)
    //   this.setData({
    //     isFinal: true
    //   })
    // else
    //   this.setData({
    //     isFinal: false
    //   })

    this.setData({
      currentIndex: e.detail.current
    })
    if (e.detail.current < 20) {
      this.setData({
        current: e.detail.current * 1 + 1
      })
    }
    console.log("current:" + this.data.current)
  },

  choose: function(e) { //单击选项的时候触发，用来将选择保存在select中
    var str = 'select[' + e.currentTarget.dataset.id + ']'
    this.setData({
      [str]: e.currentTarget.dataset.index
    })
    if (this.data.select.length == this.data.data.length) {
      console.log(this.data.select.length)
      this.setData({
        isComplete: true,
        isFinal: true
      })
    }
    if (this.data.currentIndex < this.data.data.length - 1)
      this.setData({
        currentIndex: this.data.currentIndex + 1
      })
    console.log(this.data.select)
  },

  showinfo: function(e) {


  },

  onLoad: function(options) {
    this.setData({
      currentIndex: 0
    })
    var that = this
    wx.showLoading({
      title: '正在载入...'
    })
    wx.request({
      url: 'https://www.clearn.site/wxapi/getTest.php',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type: "gettitle",
        title: '抑郁自测量'
      },
      success: function(res) {
        console.log(res)
        var data = res.data
        for (let i = 0; i < data.length; i++) { //这里将选项和得分转换成json格式
          data[i][1] = JSON.parse(data[i][1])
          data[i][2] = JSON.parse(data[i][2])
        }
        that.setData({
          data: data
        })
        console.log(that.data.data)
      },
      fail: function(res) {
        console.log(res)
      },
      complete: function(res) {
        console.log("完成")
        wx.hideLoading()
      }
    })
  }
})