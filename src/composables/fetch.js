import { ref, watchEffect, toValue } from 'vue'

export function useFetch(requestFunc, params, callback) {
  const loading = ref(true)
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null
    loading.value = true
    //toValue()将值、refs 或 getters 规范化为值
    requestFunc(toValue(params))
      .then((res) => {
        data.value = res
        if (typeof callback === 'function') {
          callback(res)
        }
      })
      .catch((err) => (error.value = err))
      .finally(() => {
        loading.value = false
      })
  }

   /* watchEffect 函数，创建一个响应式的副作用函数，该函数会立即执行一次，
    并响应式地追踪其依赖，在响应式数据发生变化时再次执行。 */
  watchEffect(() => {
    fetchData()
  })

  return { loading, data, error }
}