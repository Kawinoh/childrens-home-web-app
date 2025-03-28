// Connect to Socket.IO server
const socket = io();

// Listen for child updates
socket.on('child_updated', function(data) {
    // Update the child's information in the UI
    const childElement = document.querySelector(`#child-${data.child_id}`);
    if (childElement) {
        // Update relevant fields
        Object.keys(data.updates).forEach(key => {
            const element = childElement.querySelector(`.child-${key}`);
            if (element) {
                element.textContent = data.updates[key];
            }
        });
        
        // Show notification
        showNotification(`Child record updated: ${data.message}`);
    }
});

// Listen for new child additions
socket.on('child_added', function(data) {
    // Show notification
    showNotification(data.message);
    
    // If we're on the view children page, refresh the list
    if (window.location.pathname.includes('view_children')) {
        location.reload();
    }
});

// Listen for notifications
socket.on('new_notification', function(data) {
    showNotification(data.message);
});

// Helper function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'alert alert-info alert-dismissible fade show';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to notification area
    const notificationArea = document.getElementById('notification-area');
    if (notificationArea) {
        notificationArea.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
}
