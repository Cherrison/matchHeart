const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isCard: 0,
    showcnt:"0",//已加载的文章数
    articleList: [],
  },

tolower:function(e){
  console.log("上滑")
  this.getData()
},


getData:function(){
  var that = this
  wx.showLoading({
    title: '正在载入...'
  })
  wx.request({
    url: 'https://www.clearn.site/wxapi/getArticle.php',
    method:"POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: {
      type:'title',
      id:that.data.showcnt,
      num:10
    },//此处传入showcnt标志已有的数据，加载已有数据编号后的数据

    success: function (res) {
      //此处处理数据中的tags，将其转换为json
      console.log(res)
      if (res.data == null){
        console.log("没有了...")
        return
      }
      if(res.data=="获取失败")
        return
      var cnt = that.data.showcnt + res.data.length
      that.data.articleList = that.data.articleList.concat(res.data)
      that.setData({
        articleList: that.data.articleList,
        showcnt: cnt
      })
      wx.hideLoading()
    }
  })
},

  todetail:function(e){
    var that = this
    var Id = e.currentTarget.dataset.id
    var articleId = e.currentTarget.dataset.articleid
    console.log(e)
    var read = this.data.articleList[Id].read
    var title = this.data.articleList[Id].title
    wx.request({
      url: 'https://www.clearn.site/wxapi/getArticle.php',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type:'update',
        title:title,
        read:read - 1 + 2
      },
      success:function(res){
        console.log(res)
        var str = 'articleList['+Id+'].read'
        that.setData({
          [str]:read - 1 + 2
        })
      }
    })
    console.log(articleId)
    wx.navigateTo({
      url: '/pages/article-detail/article-detail?articleId='+articleId,
    })
  },

  onShow:function(e){
    console.log("show")
  },

  onLoad: function (options) {
    this.getData()
  },

  back() {
    wx.navigateBack()
  },
  isCard(e) {
    this.setData({
      isCard: e.detail.value
    })
  },
});