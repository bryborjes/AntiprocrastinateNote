document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');

    // Verificar si ya existe un token almacenado
    var storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
        // Validar el token con el servidor
        fetch('http://localhost:3000/CRUD/auth.php?action=validate_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ auth_token: storedToken })
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
                window.location.href = './app';
            } else {
                console.log('Invalid token:', data.message);
            }
        })
        .catch(error => console.error('Error validating token:', error));
    }

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;

            fetch('http://localhost:3000/CRUD/auth.php?action=login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email, password: password })
            })
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(function(data) {
                if (data.status === 'success') {
                    console.log('Logged in successfully:', data);
                    // Guardar el token en localStorage
                    localStorage.setItem('auth_token', data.token);
                    // Redirigir o hacer algo después del login exitoso
                    window.location.href = './app';
                } else {
                    console.error('Login failed:', data.message);
                }
            })
            .catch(function(error) {
                console.error('Fetch error:', error);
            });
        });
    }
});
