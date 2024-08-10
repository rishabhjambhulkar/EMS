import { toast } from 'react-toastify';

export const notify = (message, type) => {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');

    // Add Tailwind CSS classes based on the type
    notification.className = `
        fixed top-4 right-4 p-4 mb-4 border rounded-lg shadow-lg transition-opacity duration-500 ease-in-out
        ${type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}
    `;
    notification.innerText = message;

    container.appendChild(notification);

    // Automatically remove notification after 5 seconds
    setTimeout(() => {
        notification.classList.add('opacity-0');
        setTimeout(() => {
            container.removeChild(notification);
        }, 500); // Matches the CSS transition duration
    }, 5000); // Notification duration
};
