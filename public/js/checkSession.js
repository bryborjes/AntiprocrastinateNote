document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya existe un token almacenado
    var storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
        // Validar el token con el servidor
        fetch('http://localhost:3000/CRUD/auth.php?action=validate_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: storedToken })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                console.log('Token is valid:', data);
                // Token válido, no redirigir
            } else {
                console.log('Invalid token:', data.message);
                // Token inválido, redirigir al login
                window.location.href = './signin.html';
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            // En caso de error, redirigir al login
            window.location.href = './signin.html';
        });
    } else {
        // Si no hay token, redirigir al login
        window.location.href = './signin.html';
    }
});
