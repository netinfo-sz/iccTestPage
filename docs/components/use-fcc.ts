
let fccInstance: any = null

export const getInstanceFCC = () => {
    if (!fccInstance) {
        throw new Error('fccInstance is not initialized')
    }
    return fccInstance;
}

export const checkInstance = () => {
    return !!fccInstance
}

export const setInstance = (instance: any) => {
    fccInstance = instance
}

export default fccInstance