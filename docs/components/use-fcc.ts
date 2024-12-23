
let fccInstance: any = null
import * as logs from './use-log'
export const setLog = logs.setLog
export const getInstanceFCC = () => {
    if (!fccInstance) {
        setLog({
            name: '实例化',
            msg: '还未实例化初始对象'
        })
        throw new Error('fccInstance is not initialized')
    }
    return fccInstance;
}

export const checkInstance = () => {
    return !!fccInstance
}

export const setInstance = (instance: any) => {
    if (fccInstance) {
        setLog({
            name: '实例化',
            msg: '已实例化'
        })
        return
    }
    fccInstance = instance
}

export default fccInstance