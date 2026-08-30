const VALIDATION_PATTERNS = {
    email: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Enter a valid email address, e.g. name@example.com'
    },
    password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: 'Password must be at least 8 characters long and contain an uppercase letter,\n a lowercase letter, a number, and a special character'
    },
    phone: {
        regex: /^01[0125][0-9]{8}$/,
        message: 'Enter a valid Egyptian phone number'
    },
}

export default VALIDATION_PATTERNS