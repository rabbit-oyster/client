class Logger {
  static debug (messages) {
    console.log(
      `%c[DEBUG] ${messages}`,
      'color:cyan;'
    )
  }

  static error (messages) {
    console.log(
      `%c[ERROR] ${messages}`,
      'color:red;'
    )
  }

  static info (messages) {
    console.log(
      `%c[INFO] ${messages}`,
      'color:green;'
    )
  }

  static warn (messages) {
    console.log(
      `%c[WARN] ${messages}`,
      'color:yellow;'
    )
  }
}

export default Logger
