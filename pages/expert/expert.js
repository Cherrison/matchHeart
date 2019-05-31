const app = getApp();
Component({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    TabCur: 0,
    scrollLeft: 0,
    headurl: getApp().globalData.HeadUrl,
    condition:'all',
    category:[
      'all',
      '情绪调节',
      '亲密关系',
      '学业压力',
      '心理创伤',
      '人际关系',
      '生涯规划'
    ],
    datalist: [{
      teacherid:4,
      name: "牟宏玮",
      tid: 19001,
      occu_info: {
        entryTime: "10+",
        option: "国家二级心理咨询师"
      },
      service_type: "面询/远程",
      tags: "压力管理、情绪调节、潜能开发",
      heartmsg:"不念过往，不畏将来，享受当下",
      pic_url: "https://www.cheery.pro/teacher/19001.png",
      category:'情绪调节'
    }, {
      teacherid: 3,
      name: "迟昊阳",
      tid: 19002,
      occu_info: {
        entryTime: 9,
        option: "国家一级心理咨询师"
      },
      service_type: "面询/远程",
      tags: "真诚、包容、启发",
      heartmsg: "长大，成为你自己",
      pic_url: "https://www.cheery.pro/teacher/19002.png",
      category: '亲密关系'
      }, {
        teacherid: 2,
        name: "宋秀",
        tid: 19003,
        occu_info: {
          entryTime: 3,
          option: "国家二级心理咨询师"
        },
        service_type: "面询/远程",
        tags: "包容、启发、引导、陪伴",
        heartmsg: "愿我的专业与真诚，可以是你的冬日暖阳",
        pic_url:"https://www.cheery.pro/teacher/19003.png",
        category: '人际关系'
      }, {
        teacherid: 1,
        name: "张迪",
        tid: 19004,
        occu_info: {
          entryTime: 10,
          option: "国家二级心理咨询师"
        },
        service_type: "面询/远程",
        tags: "包容、启发、情感",
        heartmsg: "不管此刻多么黑暗，爱和希望总在前方",
        pic_url: "https://www.cheery.pro/teacher/19004.png",
        category: '心理创伤'
      }, {
        teacherid: 5,
        name: "吴连海",
        tid: 19005,
        occu_info: {
          entryTime: "10+",
          option: "国家二级心理咨询师"
        },
        service_type: "面询/远程",
        tags: "包容、启发、引导、陪伴",
        heartmsg: "问题不是问题，如何对待问题才是问题！",
        pic_url: "https://www.cheery.pro/teacher/19005.png",
        category: '生涯规划'
      }, {
        teacherid: 6,
        name: "甄珍",
        tid: 19006,
        occu_info: {
          entryTime: "9",
          option: "国家二级心理咨询师"
        },
        service_type: "面询/远程",
        tags: "包容、启发、引导、陪伴",
        heartmsg: "苦难或困扰让我们对自己有更多的觉察，促进我们探索内在价值",
        pic_url: "https://www.cheery.pro/teacher/19006.png",
        category: '人际关系'
      }, {
        teacherid: 7,
        name: "崔帅",
        tid: 19007,
        occu_info: {
          entryTime: 7,
          option: "国家二级心理咨询师"
        },
        service_type: "面询/远程",
        tags: "包容、启发、引导、陪伴",
        heartmsg: "宁静,勇气,智慧",
        pic_url: "https://www.cheery.pro/teacher/19007.png",
        category: '学业压力'
      }
    ],
    scrollLeft: 0
  },
  methods: {
    tabSelect(e) {
      console.log('切换顶部导航栏到: '+e.currentTarget.dataset.id)
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
        var chgcondition = this.data.category[e.currentTarget.dataset.id];
        this.setData({
          condition: chgcondition
        })
    }
  },
  
  pageLifetimes: {
    show() {
      var that=this;
      wx.setStorage({
        key: 'dataList',
        data: that.data.datalist
      })
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
    }
  }
})