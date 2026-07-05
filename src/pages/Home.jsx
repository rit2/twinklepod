import SearchBar from '../components/ui/SearchBar';
import Hero from '../components/ui/Hero';
import TrendingStories from '../components/ui/TrendingStories';

export default function Home() {
  return (
    <main>
      <SearchBar />
      <Hero />
      <TrendingStories />
    </main>
  );
}
