module.exports = [
  ['flowchart'], // 流程图插件
  [
    "dynamic-title", //动态标题
    {
      showIcon: "/favicon.ico",
      showText: "(/≧▽≦/)NICE！又好了！",
      hideIcon: "/failure.ico",
      hideText: "(●—●)OMG，崩溃啦！",
      recoverTime: 2000
    }
  ],
  /*   ['meting',  // 音乐插件
      {
        //metingApi: "https://meting.sigure.xyz/api/music",
        meting: {
          server: "netease", // 网易
          type: "playlist", // 读取歌单
          mid: "2201957752",
        },
        aplayer: { // 不配置该项的话不会出现全局播放器
          fixed: true, // 吸底模式
          mini: true,
          autoplay: true,// 自动播放 
          listFolded: true, // 歌曲栏折叠
          theme: '#f9bcdd', // 颜色
          order: 'random', // 播放顺序为随机
          volume: 0.2, // 初始音量
          lrcType: 0 // 关闭歌词显示
        },
        mobile: {
          cover: false, // 手机端去掉cover图
        }
      }
    ], */
]