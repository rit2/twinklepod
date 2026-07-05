import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setSubmitting(true);
    try {
      await register({ name, email, password, ageGroup });
      addToast('Account created! Welcome to Twinkle Pod!');
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="px-4 py-12 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-md p-8 md:p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl font-bold text-text-primary mb-2">Join Twinkle Pod</h1>
          <p className="text-text-secondary">Start your reading adventure today</p>
        </div>

        {error && <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-text-secondary block mb-1">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft transition-colors" />
          </div>
          <div>
            <label htmlFor="signup-email" className="text-sm font-semibold text-text-secondary block mb-1">Email</label>
            <input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft transition-colors" />
          </div>
          <div>
            <label htmlFor="signup-password" className="text-sm font-semibold text-text-secondary block mb-1">Password</label>
            <input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password (min 6 chars)" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft transition-colors" />
          </div>
          <div>
            <label htmlFor="confirm-password" className="text-sm font-semibold text-text-secondary block mb-1">Confirm Password</label>
            <input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft transition-colors" />
          </div>
          <div>
            <label htmlFor="age-group" className="text-sm font-semibold text-text-secondary block mb-1">Reader's Age Group</label>
            <select id="age-group" value={ageGroup} onChange={(e) => setAgeGroup(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-green-soft bg-white transition-colors">
              <option value="">Select age group</option>
              <option value="3-5">Ages 3-5 (Pre-K)</option>
              <option value="6-8">Ages 6-8 (Early Readers)</option>
              <option value="9-12">Ages 9-12 (Middle Grade)</option>
              <option value="parent">I'm a parent/guardian</option>
            </select>
          </div>
          <button type="submit" disabled={submitting} className="w-full bg-green-soft hover:bg-green-dark text-white font-semibold py-3 rounded-full transition-colors shadow-md disabled:opacity-50">
            {submitting ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-text-secondary text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-green-soft hover:text-green-dark font-semibold transition-colors">Log in</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
