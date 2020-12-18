class Logger {
  static debug (messages) {
    console.log(
      `%c${messages}`,
      'color:cyan;'
    )
  }

  static error (messages) {
    console.log(
      `%c${messages}`,
      'color:red;'
    )
  }

  static info (messages) {
    console.log(
      `%c${messages}`,
      'color:green;'
    )
  }

  static warn (messages) {
    console.log(
      `%c${messages}`,
      'color:yellow;'
    )
  }
}

export default Logger
