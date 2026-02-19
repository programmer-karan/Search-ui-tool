<template>
    <div class="search-wrapper" role="search">
        <input type="text" class="search-input" :value="modelValue" role="searchbox" aria-label="Search"
            placeholder="Search..." @input="$emit('update:modelValue', $event.target.value)"
            @keydown.escape="$emit('clear')" />

        <div class="right-slot">
            <slot name="right" />

            <span v-if="isLoading" class="bar-spinner" aria-hidden="true"></span>

            <button v-if="modelValue && !isLoading" type="button" class="clear-btn" aria-label="Clear search"
                @click="$emit('clear')">
                ✕
            </button>
        </div>
    </div>
</template>

<script setup>
defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    isLoading: {
        type: Boolean,
        default: false
    }
})

defineEmits(['update:modelValue', 'clear'])
</script>

<style scoped>
.search-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    border: 1px solid var(--border);
    background: var(--surface);
    border-radius: 999px;
    padding: 0.5rem 0.75rem;
    transition: border-color 0.2s ease;
}

.search-wrapper:focus-within {
    border-color: var(--accent);
    outline: 2px solid color-mix(in srgb, var(--accent) 20%, transparent);
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.95rem;
    background: transparent;
    color: var(--text-primary);
}

.search-input::placeholder {
    color: var(--text-muted);
}

.right-slot {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.bar-spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: bar-spin 0.8s linear infinite;
    flex-shrink: 0;
}

@keyframes bar-spin {
    to {
        transform: rotate(360deg);
    }
}

.clear-btn {
    background: none;
    border: none;
    font-size: 0.85rem;
    cursor: pointer;
    line-height: 1;
    padding: 0 0.25rem;
    color: var(--text-muted);
}

.clear-btn:hover {
    opacity: 0.7;
}
</style>