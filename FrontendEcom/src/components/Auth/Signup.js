import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [user, setUser] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (user.password !== user.confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/register', {
                name: user.name,
                email: user.email,
                password: user.password
            });
            if (response.data.success) {
                setSuccess('Signup Successful!');
                setError('');
                navigate('/');
                setUser({ name: '', email: '', password: '', confirmPassword: '' });
            } else {
                setError('Error during signup');
            }
        } catch (err) {
            setError('Error during signup');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-4">
                        <input
                            type="text"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            placeholder="Full Name"
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            placeholder="Confirm Password"
                            required
                            className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3">
                            <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-3 rounded-lg w-full hover:bg-blue-600 transition duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{' '}
                    <button onClick={() => navigate('/')} className="text-blue-500 hover:underline">
                        Log in here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Signup;
