export const generatePassword = (): string => {
    var length = 8;
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$';
    var password = '';
    for (var i = 0; i < length; i++)
        password += characters.charAt(Math.floor(Math.random() * characters.length));
    // Verificamos que la contraseña cumpla con los requisitos
    if (/[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[@#$]/.test(password)) {
        return password;
    } else {
        // Si la contraseña no cumple con los requisitos, generamos una nueva
        return generatePassword()
    }
}