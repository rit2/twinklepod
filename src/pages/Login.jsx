import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      addToast('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="px-4 py-12 flex items-center justify-center min-h-[70vh]">
      <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Welcome Back</h1>
          <p className="text-text-secondary">Log in to continue your reading adventure</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-text-secondary block mb-1">Email</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft transition-colors" />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-text-secondary block mb-1">Password</label>
            <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft transition-colors" />
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-green-soft hover:bg-green-dark text-white font-semibold py-3 rounded-full transition-colors shadow-md disabled:opacity-50">
            {submitting ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Don't have an account?{' '}
            <Link to="/join" className="text-green-soft hover:text-green-dark font-semibold transition-colors">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
