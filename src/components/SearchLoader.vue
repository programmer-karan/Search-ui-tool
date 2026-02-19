<template>
    <div v-if="type === 'spinner'" class="spinner-container">
        <div class="loader"></div>
    </div>

    <div v-else class="skeleton-list">
        <div v-for="n in 3" :key="n" class="skeleton-item">
            <div class="line title"></div>
            <div class="line desc"></div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    type: {
        type: String,
        default: 'spinner'
    }
})
</script>

<style scoped>
.spinner-container {
    padding: 40px;
    text-align: center;
}

.loader {
    width: 30px;
    height: 30px;
    border: 3px solid #ddd;
    border-top-color: #666;
    border-radius: 50%;
    animation: spin 1s infinite linear;
    margin: 0 auto;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.skeleton-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.skeleton-item {
    border: 1px solid #eee;
    padding: 15px;
    border-radius: 8px;
    background: #fff;
}

.line {
    height: 12px;
    background: #eee;
    border-radius: 4px;
    margin-bottom: 8px;
}

.title {
    width: 40%;
    height: 16px;
    margin-bottom: 12px;
}

.desc {
    width: 90%;
}
</style>