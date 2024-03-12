import { ref } from 'vue'

export function useFetchs(PromiseArr) {
  const loading = ref(true)
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null
    loading.value = true

    Promise.all(PromiseArr)
      .then((res) => {
        data.value = res
      })
      .catch((err) => (error.value = err))
      .finally(() => {
        loading.value = false
      })
  }

  fetchData()

  return { loading, data, error }
}