/* eslint-disable no-undef */

const storage = {
  parseBoolean(value) {
    if (typeof value === 'boolean') {
      return value
    } else if (typeof value === 'string') {
      return value === 'true'
    } else {
      return false
    }
  },

  /**
   * 是否同步设置
   * 利用chrome.storage API实现登录谷歌账户时能够异地同步设置数据
   * @param value {boolean}
   */
  setSync(value) {
    chrome.storage.sync.set({'sync': this.parseBoolean(value)})
  },
  /**
   * @param callback {function}
   */
  getSync(callback) {
    chrome.storage.sync.get(['sync'], result => callback(result.sync))
  },

  /**
   * 将同步和未同步时的方法统一包装下，方便使用
   * @param key {String}
   * @param callback {function}
   */
  getItem(key, callback) {
    this.getSync(isSync => {
      if (isSync) {
        chrome.storage.sync.get([key], result => callback(result[key]))
      } else {
        chrome.storage.local.get([key], result => callback(result[key]))
      }
    })
  },
  /**
   *
   * @param key {String}
   * @param value {boolean}
   */
  setItem(key, value) {
    this.getSync(isSync => {
      if (isSync) {
        chrome.storage.sync.set({[key]: this.parseBoolean(value)})
      } else {
        chrome.storage.local.set({[key]: this.parseBoolean(value)})
      }
    })
  },

  /**
   * 设置是否关闭tooltip
   * @param value {boolean}
   */
  setCloseTooltip(value) {
    this.setItem('close_tooltip', value)
  },
  /**
   * @param callback {function}
   */
  getCloseTooltip(callback) {
    this.getItem('close_tooltip', callback)
  },

  /**
   * 是否关闭左键打开文件
   * @param value {boolean}
   */
  setLeftClickFile(value) {
    this.setItem('left_click_file', value)
  },
  /**
   * @param callback {function}
   */
  getLeftClickFile(callback) {
    this.getItem('left_click_file', callback)
  },

  /**
   * 是否启用右键复制文件名
   * @param value {boolean}
   */
  setRightClickFile(value) {
    this.setItem('right_click_file', value)
  },
  /**
   * @param callback {function}
   */
  getRightClickFile(callback) {
    this.getItem('right_click_file', callback)
  },

  /**
   * 是否启用左键打开文件下载链接
   * @param value {boolean}
   */
  setLeftClickUrl(value) {
    this.setItem('left_click_url', value)
  },
  /**
   * @param callback {function}
   */
  getLeftClickUrl(callback) {
    this.getItem('left_click_url', callback)
  },

  /**
   * 是否启用右键复制下载链接
   * @param value {boolean}
   */
  setRightClickUrl(value) {
    this.setItem('right_click_url', value)
  },
  /**
   * @param callback {function}
   */
  getRightClickUrl(callback) {
    this.getItem('right_click_url', callback)
  },

  /**
   * 下载开始时是否通知消息
   * @param value {boolean}
   */
  setDownloadStartedNotification(value) {
    this.setItem('download_started_notification', value)
  },
  /**
   * @param callback {function}
   */
  getDownloadStartedNotification(callback) {
    this.getItem('download_started_notification', callback)
  },

  /**
   * 下载完成时是否通知消息
   * @param value {boolean}
   */
  setDownloadCompletedNotification(value) {
    this.setItem('download_completed_notification', value)
  },
  /**
   * @param callback {function}
   */
  getDownloadCompletedNotification(callback) {
    this.getItem('download_completed_notification', callback)
  },

  /**
   * 下载有危险文件时是否通知消息
   * @param value {boolean}
   */
  setDownloadWarningNotification(value) {
    this.setItem('download_warning_notification', value)
  },
  /**
   * @param callback {function}
   */
  getDownloadWarningNotification(callback) {
    this.getItem('download_warning_notification', callback)
  },

  /**
   * 下载完成后是否声音提示
   * @param value {boolean}
   */
  setDownloadCompletionTone(value) {
    this.setItem('download_completion_tone', value)
  },
  /**
   * @param callback {function}
   */
  getDownloadCompletionTone(callback) {
    this.getItem('download_completion_tone', callback)
  },

  /**
   * 如果对应key的value为null的话，就设置默认的value
   * @param key {String}
   * @param defaultValue {boolean}
   */
  setDefaultIfNull(key, defaultValue) {
    this.getItem(key, value => {
      if (typeof value === 'undefined' || value === null) {
        this.setItem(key, defaultValue)
      }
    })
  },

  /**
   * 当获取配置为null时，提前设置默认配置
   * 只需要执行一次
   */
  defaultSettings() {
    // 插件设置默认启用同步
    this.setDefaultIfNull('sync', true)
    // 插件设置默认不展示提示信息
    this.setDefaultIfNull('close_tooltip', true)
    this.setDefaultIfNull('left_click_file', true)
    this.setDefaultIfNull('right_click_file', true)
    this.setDefaultIfNull('left_click_url', true)
    this.setDefaultIfNull('right_click_url', true)
    // 插件默认关闭下载过程中的通知
    this.setDefaultIfNull('close_download_notification', true)
    this.setDefaultIfNull('download_started_notification', false)
    this.setDefaultIfNull('download_completed_notification', false)
    this.setDefaultIfNull('download_warning_notification', false)
    // 插件默认关闭下载完成提示音
    this.setDefaultIfNull('download_completion_tone', false)
  }

}

export default storage