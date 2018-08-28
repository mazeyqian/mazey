<template>
  <div class="vue-screenfull">
    <button type="button" @click="request()" v-show="!fullStatus">全屏</button>
    <button type="button" @click="exit()" v-show="fullStatus">退出全屏</button>
  </div>
</template>

<script>
  export default {
    name: 'vue-screenfull',
    data () {
      return {
        prefixArr: ['', 'webkit', 'moz', 'ms'], // 浏览器前缀
        requestSuffixArr: ['RequestFullscreen', 'RequestFullScreen'], // 请求全屏后缀
        exitSuffixArr: ['ExitFullscreen', 'CancelFullScreen'], // 退出全屏后缀
        request: null,
        exit: null,
        fullStatus: false
      }
    },
    created () {
      let isRightRequest = null // 是否找到适配的方法
      let isRightExit = null
      let requestMethod = null // 全屏方法
      let exitMethod = null // 退出全屏方法
      this.prefixArr.forEach(prefix => {
        if (isRightRequest && isRightExit) {
          return
        }
        // 查找请求
        requestMethod = this.searchRightMethod(prefix, this.requestSuffixArr, document.documentElement)
        isRightRequest = Boolean(requestMethod)
        // 查找退出
        exitMethod = this.searchRightMethod(prefix, this.exitSuffixArr, document)
        isRightExit = Boolean(exitMethod)
      })
      this.request = function (element) {
        let domEle = document.querySelector(element) || document.documentElement
        domEle[requestMethod]()
        this.fullStatus = true
      }
      this.exit = function () {
        document[exitMethod]()
        this.fullStatus = false
      }
    },
    methods: {
      lowerFirst (str) {
        return str.slice(0, 1).toLowerCase() + str.slice(1)
      },
      searchRightMethod (prefix, suffixArr, documentParent) {
        let methodArr = suffixArr.map((suffix) => {
          return prefix + suffix
        })
        let method = null
        let isRight = null
        methodArr.forEach(wholePrefix => {
          if (isRight) {
            return
          }
          if (prefix.length === 0) {
            wholePrefix = this.lowerFirst(wholePrefix)
          }
          if (wholePrefix in documentParent) {
            method = wholePrefix
            isRight = true
            // console.log(method);
          }
        })
        return method
      }
    }
  }
</script>
