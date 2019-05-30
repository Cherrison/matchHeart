// pages/home/heartbar/heartbar.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    articleId: 3,
    stickyNote: {
      friend_id: 55,
      user_id: 12,
      virtual_name: "只懂你心",
      content: "我很好奇为什么我喜欢的男生（ 他不喜欢我， 而且他知道我喜欢他） 一直躲避我的目光， 很无语， 我又怎么才能让他知道我不喜欢他了呢?",
      bg_id: 12,
    },
    card: [{
        id: 0,
        bg: "gradual-blue",
        name: "相信自己",
        content: "越活越坚强，我没有靠山，自己就是山，我没有天下，自己打天下，活着就该逢山开路，遇水架桥，生活！你给我压力，我还你奇迹 !",
        like_num: 45,
        like_status: 0,
        commemt_num: 7,
        comment_id: "051001"
      },
      {
        id: 1,
        bg: "gradual-green",
        name: "努力加油!!!",
        content: "\n别问我为什么这么努力，我只是为了以后我夹菜，没人敢转桌子 !",
        like_num: 32,
        like_status: 0,
        commemt_num: 5,
        comment_id: "051002"
      },
      {
        id: 2,
        bg: "gradual-pink",
        name: "不忘初心",
        content: "\n认定了的路，再痛也不要皱一下眉头，你要知道，再怎么难走都是你自己选的，你没有资格喊疼 !",
        like_num: 21,
        like_status: 0,
        commemt_num: 3,
        comment_id: "051003"
      }
    ],
  },
  toNoteDetail: function(e) {
    console.log('跳转到卡片详情界面!')
    var that = this
    if (app.globalData.userIdentity == true) {
      wx.request({
        url: 'https://www.clearn.site/wxapi/comment.php',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          type: 'update',
          id: e.currentTarget.dataset.id
        },
        success: function(res) {
          console.log(res)
        }
      })
      wx.navigateTo({
        url: './detail/detail?articleId=' + e.currentTarget.dataset.id + '&content=' + e.currentTarget.dataset.content,
      })

    } else {
      wx.showModal({
        title: '提示',
        content: '请先在我的页面完成身份认证!',
        showCancel: false
      })
    }

  },

  shareCard: function(e) {
    console.log('已分享卡片!')
    this.onShareAppMessage(e)
  },
  onShareAppMessage: function(e) {
    return {
      title: '心灵加油站', // 转发标题（默认：当前小程序名称）
      path: '/pages/home/heartbar/heartbar', // 转发路径（当前页面 path ），必须是以 / 开头的完整路径
    }
  },

  input: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  submit: function(e) {
    var that = this
    wx.request({
      url: 'https://www.clearn.site/wxapi/comment.php',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type: 'add',
        content: that.data.content,
        id: app.data.id
      },
      success: function(res) {
        console.log(res)
        if (res.data != "success")
          return
        that.setData({
          content: ""
        })
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      }
    })
  },

  clickLike: function(e) {
    console.log(e)
    var cid = e.currentTarget.dataset.cardId
    var noteChange = this.data.card[cid]
    switch (noteChange.like_status) {
      case 0:
        {
          noteChange.like_status = 1;
          noteChange.like_num += 1
          break;
        }
      case 1:
        {
          noteChange.like_status = 0;
          noteChange.like_num -= 1
          break;
        }
    }
    var ccard = 'card[' + cid + ']'; // 只改变数组中某一项
    this.setData({
      [ccard]: noteChange
    })
    if (noteChange.like_status) console.log('点了个赞')
    else console.log('取消了点赞')
  },
  back() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*var that = this
    wx.showLoading({
      title: '正在加载留言',
    })
    wx.request({
      url: 'https://www.clearn.site/wxapi/comment.php',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type:'get'
      },
      success:function(res){
        wx.hideLoading()
        console.log(res)
        that.setData({
          card:res.data
        })
      }
    })*/
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})