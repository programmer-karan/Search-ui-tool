export const DATA = [
    {
        id: 101,
        title: 'Fix login page layout on mobile',
        snippet: 'CSS overflow issue on iPhone SE.',
        detail:
            'The login container is pushing the footer off-screen on smaller devices. Need to adjust padding-bottom and check flex-grow settings.',
    },
    {
        id: 102,
        title: 'Update API endpoint for User Profile',
        snippet: 'Migrate to v2 controller.',
        detail:
            'Backend team deprecated /v1/user. We need to switch the profile fetch call to /v2/user/details and update the response mapping.',
    },
    {
        id: 103,
        title: 'Investigate slow query on Dashboard',
        snippet: 'Loading takes >3s on cold start.',
        detail:
            'The analytics widget seems to be fetching all history at once. Needs pagination or a date range filter default.',
    },
    {
        id: 104,
        title: 'Add "Export to CSV" button',
        snippet: 'Requested by the finance team.',
        detail:
            'Add a button to the transaction table. Should trigger a backend job to generate the report and email it to the user.',
    },
    {
        id: 105,
        title: 'Refactor modal component',
        snippet: 'Too many props, hard to maintain.',
        detail:
            'The current Modal.vue is using 15+ props. We should switch to using slots for the header/footer content to clean it up.',
    },
    {
        id: 106,
        title: 'Dark mode flickering',
        snippet: 'FOUC on initial page load.',
        detail:
            'Users reporting a white flash before the dark theme loads. Need to move the theme check to a script tag in head.',
    },
    {
        id: 107,
        title: 'Upgrade dependencies',
        snippet: 'Vue and Vite are 2 versions behind.',
        detail:
            'Routine maintenance. Check for breaking changes in the new major version before merging.',
    },
]

// Simulating a real API delay
export function searchTasks(query) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 500) + 200

        setTimeout(() => {
            if (!query) {
                resolve([])
                return
            }

            const term = query.toLowerCase()
            const results = DATA.filter(
                (item) =>
                    item.title.toLowerCase().includes(term) || item.snippet.toLowerCase().includes(term),
            )
            resolve(results)
        }, delay)
    })
}
