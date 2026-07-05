import { Link } from 'react-router-dom';

export default function ForParents() {
  return (
    <main className="px-4 md:px-12 py-8 max-w-4xl mx-auto">
      <h1 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">For Parents</h1>

      <div className="space-y-8">
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">A Safe Space for Reading</h2>
          <p className="text-text-secondary leading-relaxed">
            Twinkle Pod is a digital library designed specifically for children. Every book in our collection has been carefully selected and is available under Creative Commons licenses or is in the public domain. There are no ads, no in-app purchases, and no inappropriate content.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">Age-Appropriate Content</h2>
          <p className="text-text-secondary leading-relaxed mb-4">
            Books are organized by age group and reading level so you can easily find stories that match your child's abilities:
          </p>
          <ul className="space-y-2 text-text-secondary">
            <li className="flex items-start gap-2"><span className="text-green-soft font-bold">Ages 3-5:</span> Simple stories with repetition, rhyme, and colorful imagery.</li>
            <li className="flex items-start gap-2"><span className="text-green-soft font-bold">Ages 6-8:</span> Early chapter books with engaging plots and relatable characters.</li>
            <li className="flex items-start gap-2"><span className="text-green-soft font-bold">Ages 9-12:</span> Longer stories that develop critical thinking and empathy.</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">Track Reading Progress</h2>
          <p className="text-text-secondary leading-relaxed">
            Your child's dashboard shows reading streaks, books completed, and achievements earned. These gentle gamification features encourage consistent reading without pressure. You can see what they've been reading and celebrate milestones together.
          </p>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">Reading Tips</h2>
          <ul className="space-y-3 text-text-secondary">
            <li>Set a consistent reading time each day, even just 10 minutes.</li>
            <li>Let your child choose what they want to read — choice builds motivation.</li>
            <li>Ask open-ended questions about the story to build comprehension.</li>
            <li>Read together, even when they can read independently.</li>
            <li>Use the dark mode for bedtime reading to reduce screen strain.</li>
          </ul>
        </section>

        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <h2 className="font-heading text-xl font-bold text-text-primary mb-3">About Our Licenses</h2>
          <p className="text-text-secondary leading-relaxed">
            All books on Twinkle Pod are either in the public domain or shared under Creative Commons licenses. This means they are free to read and share. We always provide proper attribution to authors and illustrators.
          </p>
        </section>

        <div className="text-center py-4">
          <Link to="/join" className="bg-green-soft hover:bg-green-dark text-white font-semibold px-8 py-3 rounded-full transition-colors shadow-md inline-block">
            Create a Free Account
          </Link>
        </div>
      </div>
    </main>
  );
}
