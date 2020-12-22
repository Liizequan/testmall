function getSearchMusic(keyword, pageindex, callbackcount, callback) {
  wx.request({
    url: 'http://songsearch.kugou.com/song_search_v2',
    data: {
      keywords: '庄心妍',
      clientver: '=& platform=WebFilter'
    },
    // method: 'post',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      // console.log(res)
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}

module.exports = {
  getSearchMusic: getSearchMusic
}
