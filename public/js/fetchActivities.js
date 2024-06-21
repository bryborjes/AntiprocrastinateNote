document.addEventListener('DOMContentLoaded', function () {
    const activitiesContainer = document.getElementById('activitiesContainer');
    const storedToken = localStorage.getItem('auth_token');

    if (storedToken) {
        fetch('http://localhost:3000/CRUD/agenda.php?action=getActivities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth_token: storedToken })
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const today = new Date();
                    const filteredActivities = data.data.filter(activity => {
                        const dueDate = new Date(activity.due_date);
                        return dueDate >= today;
                    });

                    activitiesContainer.innerHTML = ''; // Clear existing content

                    filteredActivities.forEach(activity => {
                        const activityCard = document.createElement('div');
                        activityCard.className = 'app-card';
                        activityCard.innerHTML = `
                    <span slot="Task">${activity.title}</span>
                    <span slot="Description">${activity.description}</span>
                    <span slot="Priority">${activity.priority}</span>
                    <span slot="TaskDate">${new Date(activity.due_date).toLocaleDateString()}</span>
                `;
                        activitiesContainer.appendChild(activityCard);
                    });
                } else {
                    console.log('Invalid token:', data.message);
                    // Dejar que checkSession.js maneje la redirección si es necesario
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                // Dejar que checkSession.js maneje la redirección si es necesario
            });
    }
});
