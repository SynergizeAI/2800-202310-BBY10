import { useState } from 'react';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            // send email and password to server for user creation
            console.log(`email: ${email}, password: ${password}`);
        } else {
            alert('Passwords do not match. Please try again.');
        }
    };

    return (
        <>
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail" />
                <br />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
                <br />
                <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password"/>
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    </>
        )
}

export default Signup;