module.exports = {
  devServer: {
    proxy: {
      //配置跨域
      "/api": {
        target: process.env.API_HOST, //這裡後台的地址模擬的，應該填寫真實的後台api
        changOrigin: true, //允許跨域
        pathRewrite: {
          "^/api": "", //請求的時候使用這個api就可以
        },
      },
    },
  },
};
