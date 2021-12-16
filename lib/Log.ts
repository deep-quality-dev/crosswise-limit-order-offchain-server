/* tslint:disable:no-console */

class Log {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static d(...value: any) {
    console.log('  ', ...value)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static w(...value: any) {
    console.warn('  ', ...value)
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static e(...value: any) {
    console.error('  ', ...value)
  }
}

export default Log
