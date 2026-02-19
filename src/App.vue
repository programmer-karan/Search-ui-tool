<script setup>
import { ref, watch } from 'vue'

// --- 1. MOCK DATA (Formerly in searchService.js) ---
const MOCK_DATA = [
  {
    id: 101,
    title: 'Fix login page layout on mobile',
    snippet: 'CSS overflow issue on iPhone SE.',
    detail: 'The login container is pushing the footer off-screen on smaller devices. Need to adjust padding-bottom and check flex-grow settings.',
  },
  {
    id: 102,
    title: 'Update API endpoint for User Profile',
    snippet: 'Migrate to v2 controller.',
    detail: 'Backend team deprecated /v1/user. We need to switch the profile fetch call to /v2/user/details and update the response mapping.',
  },
  {
    id: 103,
    title: 'Investigate slow query on Dashboard',
    snippet: 'Loading takes >3s on cold start.',
    detail: 'The analytics widget seems to be fetching all history at once. Needs pagination or a date range filter default.',
  },
  {
    id: 104,
    title: 'Add "Export to CSV" button',
    snippet: 'Requested by the finance team.',
    detail: 'Add a button to the transaction table. Should trigger a backend job to generate the report and email it to the user.',
  },
  {
    id: 105,
    title: 'Refactor modal component',
    snippet: 'Too many props, hard to maintain.',
    detail: 'The current Modal.vue is using 15+ props. We should switch to using slots for the header/footer content to clean it up.',
  },
  {
    id: 106,
    title: 'Dark mode flickering',
    snippet: 'FOUC on initial page load.',
    detail: 'Users reporting a white flash before the dark theme loads. Need to move the theme check to a script tag in head.',
  }
]

// --- 2. COMPONENT STATE ---
const query = ref('')
const results = ref([])
const isLoading = ref(false)
const error = ref(null)
const activeId = ref(null)
const isDark = ref(false)
let debounceTimer = null

// --- 3. LOGIC (Formerly in useSearch.js) ---
watch(query, (newVal) => {
  // Clear any pending search
  if (debounceTimer) clearTimeout(debounceTimer)

  // Reset if empty
  if (!newVal || newVal.trim() === '') {
    results.value = []
    isLoading.value = false
    error.value = null
    return
  }

  isLoading.value = true
  error.value = null

  // Simulate API call with debounce
  debounceTimer = setTimeout(() => {
    try {
      // Simulate network delay (200-500ms)
      const delay = Math.floor(Math.random() * 300) + 200
      
      setTimeout(() => {
        const term = newVal.toLowerCase()
        results.value = MOCK_DATA.filter(item => 
          item.title.toLowerCase().includes(term) || 
          item.snippet.toLowerCase().includes(term)
        )
        isLoading.value = false
      }, delay)
      
    } catch (err) {
      console.error(err)
      error.value = "Connection failed. Please try again."
      isLoading.value = false
    }
  }, 350) 
})

function toggleDetails(id) {
  activeId.value = activeId.value === id ? null : id
}

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.body.classList.add('dark-mode')
  } else {
    document.body.classList.remove('dark-mode')
  }
}
</script>

<template>
  <div class="container">
    
    <header>
      <h3>Backlog Search</h3>
      <button @click="toggleTheme" class="theme-btn">
        {{ isDark ? 'Light Mode' : 'Dark Mode' }}
      </button>
    </header>

    <div class="search-box">
      <input 
        v-model="query" 
        placeholder="Search tasks (e.g., 'login', 'api', 'bug')..." 
        type="text"
        autofocus
      />
      <div v-if="isLoading" class="loader"></div>
    </div>

    <div v-if="error" class="error-msg">
      {{ error }}
    </div>

    <div v-if="results.length" class="results-list">
      <div 
        v-for="item in results" 
        :key="item.id" 
        class="result-card"
        :class="{ active: activeId === item.id }"
        @click="toggleDetails(item.id)"
      >
        <div class="card-header">
          <span class="card-title">{{ item.title }}</span>
          <span class="card-id">#{{ item.id }}</span>
        </div>
        
        <p class="card-snippet">{{ item.snippet }}</p>
        
        <div v-if="activeId === item.id" class="card-details">
          <p><strong>Status:</strong> Open</p>
          <p>{{ item.detail }}</p>
        </div>
      </div>
    </div>

    <div v-else-if="query && !isLoading" class="empty-state">
      <p>No tickets found matching "<strong>{{ query }}</strong>"</p>
    </div>

    <div v-else-if="!query" class="initial-state">
      Type to search the engineering backlog...
    </div>

  </div>
</template>

<style>
/* Global Resets */
body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f4f5f7; /* Jira-ish light gray */
  color: #172b4d;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode {
  background-color: #1e1e1e;
  color: #e0e0e0;
}

/* Container */
.container {
  max-width: 600px;
  margin: 60px auto;
  padding: 0 20px;
}

/* Header */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h3 {
  margin: 0;
  font-weight: 600;
}

.theme-btn {
  background: none;
  border: 1px solid #dfe1e6;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: inherit;
}

body.dark-mode .theme-btn {
  border-color: #444;
}

/* Search Box */
.search-box {
  position: relative;
  margin-bottom: 24px;
}

input {
  width: 100%;
  padding: 14px 16px;
  font-size: 16px;
  border: 2px solid transparent;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  box-sizing: border-box;
  outline: none;
  transition: all 0.2s;
}

input:focus {
  border-color: #0052cc;
  box-shadow: 0 4px 12px rgba(0, 82, 204, 0.15);
}

body.dark-mode input {
  background: #2d2d2d;
  color: white;
  box-shadow: none;
}

/* Loader */
.loader {
  position: absolute;
  right: 16px;
  top: 16px;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top-color: #0052cc;
  border-radius: 50%;
  animation: spin 0.8s infinite linear;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Results */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.05);
  border: 1px solid transparent;
  transition: transform 0.1s, border-color 0.1s;
}

.result-card:hover {
  border-color: #0052cc;
  transform: translateY(-1px);
}

body.dark-mode .result-card {
  background: #2d2d2d;
  border-color: #444;
}

body.dark-mode .result-card:hover {
  border-color: #66b2ff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.card-title {
  font-weight: 600;
  font-size: 15px;
}

.card-id {
  font-size: 12px;
  color: #6b778c;
  background: #f4f5f7;
  padding: 2px 6px;
  border-radius: 3px;
}

body.dark-mode .card-id {
  background: #444;
  color: #aaa;
}

.card-snippet {
  margin: 0;
  font-size: 14px;
  color: #5e6c84;
}

body.dark-mode .card-snippet {
  color: #aaa;
}

/* Details Section */
.card-details {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #ebecf0;
  font-size: 14px;
  color: #172b4d;
  line-height: 1.5;
}

body.dark-mode .card-details {
  border-top-color: #444;
  color: #ddd;
}

/* States */
.empty-state, .initial-state {
  text-align: center;
  color: #6b778c;
  margin-top: 40px;
}

.error-msg {
  background: #ffebe6;
  color: #de350b;
  padding: 12px;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
}
</style>