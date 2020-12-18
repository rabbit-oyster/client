class Logger {
  static debug (messages) {
    console.log(
      `%c${messages}`, // 뭐 봐야하는데 오류떠서 (s) 추가해둠
      'color:cyan;'
    )
  }

  static error () {

  }

  static info () {

  }

  static http () {

  }
}

export default Logger
