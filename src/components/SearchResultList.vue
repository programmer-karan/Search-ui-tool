<template>
    <TransitionGroup name="results" tag="ul" class="results-list">
        <li v-for="result in results" :key="result.id">
            <SearchResultItem :result="result" :isExpanded="expandedId === result.id"
                @select="$emit('item-select', $event)" />
        </li>
    </TransitionGroup>

    <div v-if="!results.length && !isLoading && query" class="empty-state">
        No results found for "{{ query }}"
    </div>
</template>

<script setup>
import SearchResultItem from './SearchResultItem.vue'

defineProps({
    results: {
        type: Array,
        required: true
    },
    expandedId: {
        type: [Number, null],
        default: null
    },
    isLoading: {
        type: Boolean,
        default: false
    },
    query: {
        type: String,
        default: ''
    }
})

defineEmits(['item-select'])
</script>

<style scoped>
.results-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    position: relative;
}

.results-enter-active {
    transition: all 300ms ease;
}

.results-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.results-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.results-leave-active {
    position: absolute;
    width: 100%;
    transition: opacity 200ms ease;
}

.results-leave-to {
    opacity: 0;
}

.empty-state {
    text-align: center;
    padding: 2rem 0;
    color: var(--text-muted);
    font-size: 0.95rem;
}
</style>