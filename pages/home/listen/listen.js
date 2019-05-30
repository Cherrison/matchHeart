const app = getApp();
Page({
  data: {
    has:false,
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    isCard: 0,
    showcnt: "0",//已加载的文章数
    listenList: [],
    isPlay: false,
    currentPlayId: 0,
  },

  tolower: function (e) {
    console.log("上滑")
    this.getData()
  },

  update:function(id1, id){
    var that = this
    console.log(that.data.listenList[id1].listen - 1 + 2)
    wx.request({
      url: 'https://www.clearn.site/wxapi/getListenList.php',
      method:"POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data:{
        type:'update',
        id:id,
        listen: that.data.listenList[id1].listen - 1 + 2
      },
      success:function(res){
        console.log(res)
        var tmp = that.data.listenList[id1].listen - 1 + 2
        var str = 'listenList['+id1+'].listen';
        that.setData({
          [str]:tmp
        })
      }
    })
  },

  play: function (e) {    //此函数控制播放与暂停
    console.log(e)
    var id = e.currentTarget.dataset.id
    var id2 = this.data.currentPlayId
    var data = this.data.listenList
    if (id != id2) {      //如果播放歌曲与点击歌曲不同
      data[id2].play = "/images/play-btn-start.png"
      data[id].play = "/images/play-btn-stop.png"
      data[id].isPlay = true
      data[id2].isPlay = false
      var list1 = 'listenList[' + id + '].play'
      var list2 = 'listenList[' + id2 + '].play'
      if (!this.data.has) {
        this.update(id, data[id].Id)
        this.data.has = true
      }
      app.setMusic(data[id].title, data[id].coverImgUrl, data[id].singer, data[id].title, data[id].src)
      this.setData({
        [list1]: data[id].play,
        [list2]: data[id2].play,
        currentPlayId: id
      })
    }
    //处理同一首歌的播放与暂停
    else if (data[id].isPlay) {
      data[id].play = "/images/play-btn-start.png"
      data[id].isPlay = !data[id].isPlay
      var list = 'listenList[' + id + '].play'
      this.setData({
        [list]: data[id].play,
      })
      app.pauseMusic()
    }
    else {
      data[id].play = "/images/play-btn-stop.png"
      data[id].isPlay = !data[id].isPlay
      var list = 'listenList[' + id + '].play'
      this.setData({
        [list]: data[id].play,
      })
      app.setMusic(data[id].title, data[id].coverImgUrl, data[id].singer, data[id].title, data[id].src)
      if (!this.data.has) {
        this.update(id, data[id].Id)
        this.data.has = true
      }
    }
  },

  getData: function () {
    var that = this
    wx.request({
      url: 'https://www.clearn.site/wxapi/getListenList.php',
      method: "POST",
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        type:'get',
        id: that.data.showcnt,
        num:15
      },//此处传入showcnt标志已有的数据，加载已有数据编号后的数据

      success: function (res) {
        //此处处理数据中的tags，将其转换为json
        console.log(res)
        if (res.data == null) {
          console.log("没有了...")
          return
        }
        else if (res.data == "获取失败")
          return
        for(let i = 0;i < res.data.length;i++){
          if(res.data[i].src == app.data.src && app.data.isPlay){
            res.data[i]['play'] = "/images/play-btn-stop.png"
            res.data[i]['isPlay'] = true
          }
          else{
            res.data[i]['play'] = "/images/play-btn-start.png"
            res.data[i]['isPlay'] = false
          }
            
        }
        var cnt = that.data.showcnt + res.data.length
        that.data.listenList = that.data.listenList.concat(res.data)
        that.setData({
          listenList: that.data.listenList,
          showcnt: cnt
        })

        console.log(app.data.src)
        if (app.data.src == "")
          return
        console.log(that.data.listenList)
        for (let i = 0; i < that.data.listenList.length; i++) {
          console.log(that.data.listenList[i].src, app.data.src)
          if (that.data.listenList[i].src == app.data.src) {
            var isplay = app.data.isPlay
            var img = '/images/play-btn-stop.png'
            if(!isplay)
              img = '/images/play-btn-start.png'
            var str1 = 'listenList[' + i + '].play'
            var str2 = 'listenList[' + i + '].isPlay'
            that.setData({
              currentPlayId:i,
              [str1]: img,
              [str2]: isplay
            })
          }
        }
      }
    })
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