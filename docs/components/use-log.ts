// 写日志
interface ILog {
  name: string
  time?: string | number
  msg?: string | object
}
const changeEvent: Array<any> = []
let handler = {
  get: function (target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set: function (target, prop, value, receiver) {
    if (prop === 'logs' && Array.isArray(value)) {
      value.forEach((log: ILog, index: number) => {
        if (index === 0) { // 只触发新添加的日志事件
          changeEvent.forEach(item => {
            item(log);
          });
        }
      });
    }
    return Reflect.set(target, prop, value, receiver);
  }
};

let proxy = new Proxy({
  logs: []
}, handler);
function formatCurrentDateTime(): string {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero based
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export const setLog = (log: ILog) => {
  log.time = log.time || formatCurrentDateTime()
  // proxy.logs.unshift(log)
  proxy.logs = [log, ...proxy.logs]; 
}
export const setLogEvent = (ev) => {
  ev && changeEvent.push(ev)
}
export const delLogEvent = (ev) => {
  ev && changeEvent.splice(changeEvent.indexOf(ev), 1)
}
export default proxy