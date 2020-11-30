
Page({
  data:{
    imgUrl: ""
  },
  // 下载并打开excel文件
  openExcel(){
    wx.cloud.downloadFile({
      fileID: 'cloud://kai-g0dd3.6b61-kai-g0dd3-1302193798/biancheng.xlsx',
      success: res => {
        // get temp file path
        console.log(res.tempFilePath)
        wx.openDocument({
          filePath: res.tempFilePath,
          success: function (res) {
            console.log('打开文档成功')
          }
        })
      },
      fail: err => {
        // handle error
      }
    })
    
  },
  // 上传Excel文件
  uploadExcel(){
    wx.chooseMessageFile({
      count: 1,
      type: 'all',
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        // const tempFilePaths = res.tempFilePaths
        wx.cloud.uploadFile({
          // cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
          cloudPath: 'biancheng2.xlsx', // 上传至云端的路径
          filePath: res.tempFiles[0].path, // 小程序临时文件路径
          success: res => {
            // 返回文件 ID
            console.log("上传excel成功", res)//res.fileID)
          },
          fail: console.error
        })
      }
    })
    },
  // 上传文件
  upload(){
    let that = this ;
    console.log("点击了上传")

    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log("选择成功", res)
        that.uploadImg(res.tempFilePaths[0])
      }
    })
  },
  uploadImg(fileUrl){ 
    wx.cloud.uploadFile({
      cloudPath: new Date().getTime() + '.png', // 上传至云端的路径
      // cloudPath: 'tt.png', // 上传至云端的路径
      filePath: fileUrl, // 小程序临时文件路径
      success: res => {
        // 返回文件 ID
        console.log("上传成功", res)//res.fileID)
        this.setData({
          imgUrl:res.fileID
        })
      },
      fail: console.error
    })
  }
})
