/*
map 设定为默认参数而不在函数中创建新的 Map 对象?map 在整个递归调用过程中是共享的，而不是在每次递归调用中都创建一个新的 Map 对象
map 的作用是用来记录已经克隆过的对象，防止函数陷入无限递归的循环。
*/
export function clone(target, map = new Map()) {
    if (typeof target === 'object') {
        let newTarget = Array.isArray(target) ? [] : {}
        if (map.get(target)) {
            //记录已经克隆过的对象，防止函数陷入无限递归的循环
            return map.get(target)
        }
        map.set(target, newTarget)

        for (const key in target) {
            newTarget[key] = clone(target[key], map)
        }
        return newTarget
    } else {
        return target
    }
}