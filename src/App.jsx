import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ui/ScrollToTop';
import { ToastProvider } from './components/ui/Toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';
import ReadingPage from './pages/ReadingPage';
import BrowseLibrary from './pages/BrowseLibrary';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SearchResults from './pages/SearchResults';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForParents from './pages/ForParents';
import About from './pages/About';
import NotFound from './pages/NotFound';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
    <ToastProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/read/:id" element={<ReadingPage />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/book/:id" element={<Layout><BookDetails /></Layout>} />
        <Route path="/browse" element={<Layout><BrowseLibrary /></Layout>} />
        <Route path="/explore" element={<Layout><BrowseLibrary /></Layout>} />
        <Route path="/search" element={<Layout><SearchResults /></Layout>} />
        <Route path="/dashboard" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/reading-nook" element={<Layout><UserDashboard /></Layout>} />
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/join" element={<Layout><Signup /></Layout>} />
        <Route path="/for-parents" element={<Layout><ForParents /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </Router>
    </ToastProvider>
    </AuthProvider>
  );
}

export default App;
