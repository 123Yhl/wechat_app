// miniprogram/pages/uploadInfo/uploadInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictureFilePaths: [], //里面存着所有图片
    pictureColumn: 1,
    pictureShowHeight: 285,
    description: "",
    title: "",
  },

  bindInputTitle: function (e) {
    var that = this;
    that.data.title = e.detail.value
  },

  picturePreview: function (event) {
    var src = event.currentTarget.dataset.src; //获取data-src
    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })

  },

  getPictureViewHeight : function(){
    var that = this
    var column = Math.ceil(that.data.pictureFilePaths.length / 3); //计算行数
    var height = 30 * 2 + 225 * column + (column - 1) * 5 + 20; //20为冗余;
    that.setData({
      pictureColumn: column,
      pictureShowHeight: height
    })
  },
  pictureDatele: function (event) {
    var that = this;
    var image = that.data.pictureFilePaths;
    var index = event.currentTarget.dataset.index; //获取当前长按图片下标
    wx.showActionSheet({
      itemList: ['删除图片'],
      success: function (res) {
        console.log(res.tapIndex)
        if (res.tapIndex == 0) { //删除图片
          wx.showModal({
            title: "删除图片",
            content: "确认要删除图片吗？",
            confirmColor: "",
            cancelColor: "#dddddd",
            success: function (res) {
              if (res.confirm) {
                console.log("确认删除")
                image.splice(index, 1);
                that.setData({
                  pictureFilePaths: image
                })
                wx.showToast({
                  title: '删除成功',
                  icon: 'success'
                })
                that.getPictureViewHeight()
              } else {
                wx.showToast({
                  title: '先不删啦(●´▽｀●) ',
                  icon: 'none'
                })
              }
            }
          })
        }
      }
    })

    /*console.log("image\n",image)
    console.log("pictureFilePaths\n",that.data.pictureFilePaths)*/
  },

  getPicture: function () {
    var that = this;
    var tempArray = that.data.pictureFilePaths.concat();
    var column = 0; //行数
    var height = 0; //高
    var leftChoose = 9 - that.data.pictureFilePaths.length; //还能选几张图片
    if (that.data.pictureFilePaths.length <= 9) {
      wx.showActionSheet({
        itemList: ['从手机相册选择', '拍照'],
        success: function (res) {
          console.log((res.tapIndex) == 0 ? '从手机相册选择' : '拍照')
          if (res.tapIndex == 0) { //从手机相册选择
            if (leftChoose != 0) {
              wx.chooseImage({
                count: leftChoose,
                sizeType: ['original', 'compressed'],
                sourceType: ['album'],
                success(res) {
                  // tempFilePath可以作为img标签的src属性显示图片
                  const tempFilePaths = res.tempFilePaths
                  for (let i = 0; i < tempFilePaths.length; i++)
                    tempArray.push(tempFilePaths[i])
                  that.setData({
                    pictureFilePaths: tempArray
                  })
                  console.log(tempFilePaths)

                  column = Math.ceil(that.data.pictureFilePaths.length / 3); //计算行数
                  height = 30 * 2 + 225 * column + (column - 1) * 5 + 20; //20为冗余;
                  that.setData({
                    pictureColumn: column,
                    pictureShowHeight: height
                  })
                  console.log(that.data.pictureColumn)
                }
              })
            } else {
              wx.showToast({
                title: '最多只能选9张图片嗷',
                icon: 'none'
              })
            }

          } else {
            if (leftChoose != 0) { //还不到九张
              wx.chooseImage({
                sizeType: ['original', 'compressed'],
                sourceType: ['camera'],
                success(res) {
                  // tempFilePath可以作为img标签的src属性显示图片
                  const tempFilePaths = res.tempFilePaths
                  for (let i = 0; i < tempFilePaths.length; i++)
                    tempArray.push(tempFilePaths[i])
                  that.setData({
                    pictureFilePaths: tempArray
                  })
                  console.log(tempFilePaths)

                  column = Math.ceil(that.data.pictureFilePaths.length / 3); //计算行数
                  height = 30 * 2 + 225 * column + (column - 1) * 5 + 20; //20为冗余
                  that.setData({
                    pictureColumn: column,
                    pictureShowHeight: height
                  })
                  console.log(that.data.pictureColumn)
                }
              })
            } else {
              wx.showToast({
                title: '最多只能选9张图片嗷',
                icon: 'none'
              })
            }

          }

        },
        fail: function (res) {
          console.log(res.errMsg)
          wx.showToast({
            title: '取消选择',
            icon: "none"
          })
        }
      })
    } else {
      wx.showToast({
        title: '最多选9个嗷',
        icon: "none"
      })
    }


  },

  bindInputDescription: function (e) {
    var that = this;
    that.data.description = e.detail.value
  },


  confirmUpload: function () {
    var that = this
    wx.showModal({
      cancelColor: 'cancelColor',
      title: "确认",
      content: "确认上传",
      success(res) {
        if (res.confirm) {
          that.upload()
        } else if (res.cancel) {
          return
        }
      }
    })
  },

  navigate : function(){
    wx.navigateTo({
      url: '../uploadInfo/uploadInfo',
    })
  },

  upload: function () {
    // 等待api
    var that = this
    console.log(that.data)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})