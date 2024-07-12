document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Simple validation (for demonstration purposes)
        if (username === 'admin' && password === 'password') {
            alert('Login successful');
            // Redirect to the main dashboard (index.html)
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });
});
