import { ref, watch } from 'vue'
import { searchTasks } from '@/services/searchService'

export function useSearch() {
    const query = ref('')
    const results = ref([])
    const isLoading = ref(false)
    const error = ref(null)
    const activeId = ref(null) 

    let timer = null

    watch(query, (val) => {
        // Clear previous timer
        if (timer) clearTimeout(timer)

        if (!val || val.trim() === '') {
            results.value = []
            return
        }

        isLoading.value = true
        error.value = null

        // Debounce search
        timer = setTimeout(async () => {
            try {
                results.value = await searchTasks(val)
            } catch (e) {
                console.error(e)
                error.value = 'Failed to load results. Try again.'
            } finally {
                isLoading.value = false
            }
        }, 350)
    })

    function toggleDetails(id) {
        activeId.value = activeId.value === id ? null : id
    }

    function clearSearch() {
        query.value = ''
        results.value = []
    }

    return {
        query,
        results,
        isLoading,
        error,
        activeId,
        toggleDetails,
        clearSearch,
    }
}
