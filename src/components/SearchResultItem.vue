<template>
    <article class="result-card" role="button" tabindex="0" :aria-expanded="isExpanded"
        @click="$emit('select', result.id)" @keydown.enter="$emit('select', result.id)">

        <h3 class="title">{{ result.title }}</h3>
        <p class="snippet">{{ result.snippet }}</p>

        <Transition name="expand">
            <div v-if="isExpanded" class="detail">
                <p>{{ result.detail }}</p>
            </div>
        </Transition>
    </article>
</template>

<script setup>
defineProps({
    result: {
        type: Object,
        required: true
    },
    isExpanded: {
        type: Boolean,
        default: false
    }
})

defineEmits(['select'])
</script>

<style scoped>
.result-card {
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1rem;
    cursor: pointer;
    background: var(--surface);
    color: var(--text-primary);
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}

.result-card:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
}

.title {
    font-weight: 600;
    margin: 0 0 0.5rem 0;
    color: var(--text-primary);
}

.snippet {
    color: var(--text-muted);
    font-size: 0.9rem;
    margin: 0 0 0.5rem 0;
}

.detail {
    border-top: 1px solid var(--border);
    padding-top: 0.75rem;
    color: var(--text-muted);
    font-size: 0.9rem;
}

.detail p {
    margin: 0;
}

.expand-enter-active,
.expand-leave-active {
    transition: max-height 300ms ease, opacity 300ms ease;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 200px;
    opacity: 1;
}
</style>