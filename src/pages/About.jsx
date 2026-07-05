import { Link } from 'react-router-dom';

export default function About() {
  return (
    <main className="px-4 md:px-12 py-8 max-w-4xl mx-auto">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">About Twinkle Pod</h1>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed">
            Twinkle Pod is a free, open digital library for children. We believe every child deserves access to wonderful stories, regardless of where they live or what their family can afford. Our mission is to spark imagination and nurture a lifelong love of reading.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">How It Works</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            We curate books that are legally available under Creative Commons licenses or in the public domain. Every book is:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li>Free to read online</li>
            <li>Properly attributed to the original creators</li>
            <li>Organized by age, reading level, and theme</li>
            <li>Available on any device with a browser</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-peach-light rounded-xl p-4">
              <h3 className="font-heading font-semibold text-text-primary mb-1">Accessibility</h3>
              <p className="text-sm text-text-secondary">Free for everyone, on any device.</p>
            </div>
            <div className="bg-peach-light rounded-xl p-4">
              <h3 className="font-heading font-semibold text-text-primary mb-1">Safety</h3>
              <p className="text-sm text-text-secondary">No ads, no tracking, no inappropriate content.</p>
            </div>
            <div className="bg-peach-light rounded-xl p-4">
              <h3 className="font-heading font-semibold text-text-primary mb-1">Respect</h3>
              <p className="text-sm text-text-secondary">Proper attribution and licensing always.</p>
            </div>
            <div className="bg-peach-light rounded-xl p-4">
              <h3 className="font-heading font-semibold text-text-primary mb-1">Joy</h3>
              <p className="text-sm text-text-secondary">Reading should feel like an adventure.</p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">Book Sources</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Our books come from trusted open sources:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li>Project Gutenberg (public domain)</li>
            <li>Internet Archive (verified licenses)</li>
            <li>Creative Commons Search</li>
            <li>Standard Ebooks (public domain)</li>
            <li>Open Library (verified per-book licensing)</li>
          </ul>
        </section>

        <div className="text-center py-4">
          <p className="text-text-secondary mb-4">Want to help grow the library?</p>
          <Link to="/join" className="bg-green-soft hover:bg-green-dark text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md inline-block">
            Get Involved
          </Link>
        </div>
      </div>
    </main>
  );
}
