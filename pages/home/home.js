// pages/about/about.js
var t = getApp(), a = t.globalData.bgAudio;
const util = require('../../utils/util.js')
const app = getApp()
Component({

  /**
   * 页面的初始数据
   */
  data: {
    binner: [
      {
        url:"https://s2.ax1x.com/2019/05/27/VZI6QH.png",
        msg:"简答的介绍"
      }, 
      {
        url: "https://s2.ax1x.com/2019/05/27/VZImss.png",
        msg: "简答的介绍"
      },
      {
        url: "https://s2.ax1x.com/2019/05/27/VZI5Y8.png",
        msg: "简答的介绍"
      }
    ],
    maxTime:"",
    inter: "",
    startTime: "0:00",
    endTime: "0",
    sliderBar: 0,

    userinfo: "",
    nickName: '',
    imageurl: '',

    StatusBar: t.globalData.StatusBar,
    CustomBar: t.globalData.CustomBar,
    cardCur: 0,
    stickyNote: {
      friend_id: 55,
      user_id: 12,
      virtual_name: "只懂你心",
      content: "我很好奇为什么我喜欢的男生（ 他不喜欢我， 而且他知道我喜欢他） 一直躲避我的目光， 很无语， 我又怎么才能让他知道我不喜欢他了呢?",
      bg_id: 12,
      bg_img: "https://www.52hertalk.cn/public/upload/friendBg/2018/12-11/62b2933ea6013dd694a5a7404670708c.jpg",
      like_num: 125,
      dislike_num: 3,
      like_status:1
    },
    card:{
      bg: "gradual-blue",
      name: "只懂你心",
      color: "我很好奇为什么我喜欢的男生（ 他不喜欢我， 而且他知道我喜欢他） 一直躲避我的目光， 很无语， 我又怎么才能让他知道我不喜欢他了呢?"
    },
    bgAudioState: {
      starttime: "00: 00",
      endtime: "03: 21",
      offset: 42,
      max: 100,
      playState: 0
    },
    playing: {
      starttime: "00: 00",
      endtime: "03: 21",
      offset: 42,
      max: 100,
      playState: 1
    },
    pause: {
      starttime: "00: 00",
      endtime: "03: 21",
      offset: 42,
      max: 100,
      playState: 0
    },
    listenIndex:0,
    listenList: [{
      id: 74,
      coverImgUrl: "https://www.52hertalk.cn/public/upload/listen/2019/01-14/e179a432d232e209ef84a5d0dd437ac0.png",
      title: "此时此刻",
      author: "小海",
      boutique: 1,
      classify: 1,
      src: "http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46",
      rank: 0,
      hot: 28293
    }],
    articleList: [{
      articleId: '1',
      title: '这里有个戏精铲屎官，主子了解一下？',
      image: 'https://image.weilanwl.com/img/4x3-3.jpg',
      description: '这是一个伪铲屎官为了给自己的程序凑字数瞎几把乱写的一堆文字，了解一下就OK！ヾ(=･ω･=)o',
      content: "",
      views: "123",
      author: "小海",
      picUrl: "https://www.52hertalk.cn/public/upload/article/2019/05-05/bd0442b85c9130330a4972ffb3d60530.jpg",
      tags: [{
        short: "假装有猫",
        color: "red"
      },
      {
        short: "戏精",
        color: "blue"
      },
      {
        short: "心灵治愈",
        color: "green"
      }
      ]
    },
  ],
  articleList: []
  },
  methods: {
    onLoad: function (options) {
      this.getData()
      var app = getApp()
      var data = this.data.listenList
      var index = this.data.listenIndex
      if(app.data.src=="")
        app.setMusic(data[index].title, data[index].coverImgUrl, data[index].author, data[index].title, data[index].src)
      var that = this
      t.getUserInfo(function (usercb) {
        that.setData({
          userinfo: usercb,
          nickName: usercb.nickName,
          imageurl: usercb.avatarUrl
        })//下面获取文章列表
        wx.request({
          url: 'https://www.clearn.site/wxapi/getArticle.php',
          method:"POST",
          header:{
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data:{
            type:'title',
            id:0,
            num:5
          },
          success:function(res){
            console.log(res)
            if(!res.data)
              return
            var tmp = []
            for(let i = 0;i < 5 && i<res.data.length;i++)
              tmp.push(res.data[i])
            that.setData({
              articleList:tmp
            })
          }
        })//下面获取歌曲列表
        wx.request({
          url: 'https://www.clearn.site/wxapi/getListenList.php',
          method: "POST",
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: {
            type: 'get',
            id: 0,
            num: 15
          },
          success: function (res) {
            console.log(res)
            if (res.data == null) {
              console.log("没有了...")
              return
            }
            else if (res.data == "获取失败")
              return
            that.setData({
              listenList: res.data,
            })//处理跳转页面歌曲状态
            if (app.data.src != "")
              for (let i = 0; i < that.data.listenList.length; i++)
                if (that.data.listenList[i].src == app.data.src) {
                  if(app.data.isPlay)
                  that.setData({
                    listenIndex: i,
                    'bgAudioState.playState': 1
                  })
                  if (app.data.isPlay)
                    that.play()
                  return
                }
            }
        })
        console.log('用户名称: ', usercb)
        console.log('用户名称1: ', that.data.userinfo)
      })
    },
    Show:function(e){
      console.log("show")
      if(app.data.src=="")
        return
      for(let i = 0;i < listenList.length;i++)
        if(listenList[i].src == app.data.src){
          console.log(i)
          this.setData({
            listenIndex:i,
            'bgAudioState.playState':1
          })
          if(app.data.isPlay)
            this.play()
          return
        }
    },
    onReady: function (options) {
      console.log("")
      var app = getApp()
      var length = app.getDuration()
      var m = parseInt(length / 60)
      var s = parseInt(length % 60)
      this.setData({
        endTime: m + ":" + s
      })
      app.pauseMusic()
    },
  
    // 轮播图
    // cardSwiper
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    // 头部便签部分
    toNoteDetail: function (e) {
      console.log('跳转到详情界面!')
      // wx.navigateTo({
      //   url: '',
      // })

    },
    clickLike: function (e) {
      var noteChange = this.data.stickyNote
      switch (noteChange.like_status) {
        case 0: {
          noteChange.like_status = 1;
          noteChange.like_num += 1
          break;
        }
        case 1: {
          noteChange.like_status = 0;
          noteChange.like_num -= 1
          break;
        }
      }
      this.setData({
        stickyNote: noteChange
      })
      if (noteChange.like_status) console.log('点了个赞')
      else console.log('取消了点赞')
    },
    loadStickyNote:function(e){
        console.log('已切换便签!')
    },

    // 播放器部分
    sliderChange: function (e) {
      var playing;
      app.setTime(e.detail.value)
      setInterval(this.setTime, 1000, this)
      playing = util.totime(e.detail.value, this.data.bgAudioState.endtime);
      var playChange = this.data.bgAudioState;
      playChange.starttime=playing;
      playChange.offset = e.detail.value;

      this.setData({
        bgAudioState: playChange
      })
      
      console.log('切换到 '+ playing +' 处');
    },
    setTime: function (that) {
      var app = getApp()
      var current = app.getCurrentTime()
      current = parseInt(current)
      var s = util.timeform(current)
      that.setData({
        sliderBar: app.getCurrentTime(),
        startTime: s
      })
    },
    play: function (t) {
      var app = getApp()
      if (this.data.bgAudioState.playState == 0) {
        console.log('播放')
        this.setData({
          bgAudioState: this.data.playing
        })
        app.data.inter = setInterval(this.setTime, 1000, this)
        app.playMusic()
        this.setData({
          maxTime:app.getDuration()
        })
      } else {
        console.log('暂停')
        app.pauseMusic()
        this.setData({
          bgAudioState: this.data.pause
        })
        this.endTime(this)
        clearTimeout()
      }
    },

    lastSong:function(e){
      console.log('切换到上一首')
      var app = getApp()
      var data = this.data.listenList
      if(this.data.listenIndex <= 0)
        return
      this.data.listenIndex--
      var index = this.data.listenIndex
      this.setData({ listenIndex: index })
      app.setMusic(data[index].title, data[index].coverImgUrl, data[index].author, data[index].title, data[index].src)
      if(!this.data.bgAudioState.playState)
        this.play()
    },

    nextSong:function(e){
      console.log('切换到下一首')
      var data = this.data.listenList
      if (this.data.listenIndex >= (data.length - 1))
        return
      this.data.listenIndex++
      var index = this.data.listenIndex
      this.setData({ listenIndex: index })
      console.log(data)
      app.setMusic(data[index].title, data[index].coverImgUrl, data[index].author, data[index].title, data[index].src)
      if (!this.data.bgAudioState.playState)
        this.play()
    },
    endTime(that) {
      var app = getApp()
      clearInterval(app.data.inter)
    },
    // 文章部分
    getData: function () {
      var that = this
      wx.request({
        url: 'https://www.clearn.site/wxapi/getArticle.php',
        method: "POST",
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          type: 'title',
          id: 0,
          num: 5
        },//此处传入showcnt标志已有的数据，加载已有数据编号后的数据

        success: function (res) {
          //此处处理数据中的tags，将其转换为json
          console.log(res)
          if (res.data == null) {
            console.log("没有了...")
            return
          }
          if (res.data == "获取失败")
            return
          that.setData({
            articleList: res.data
          })
        }
      })
    },
    toArticleDetail:function(e){
      var articleId=e.currentTarget.dataset.articleId
      console.log('跳转到文章详情页: '+articleId)
    },

     onShow: function () {
      
    }
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  }
})