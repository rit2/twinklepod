import SearchBar from '../components/ui/SearchBar';
import Hero from '../components/ui/Hero';
import TrendingStories from '../components/ui/TrendingStories';
import ReadingThemes from '../components/ui/ReadingThemes';

export default function Home() {
  return (
    <main>
      <SearchBar />
      <Hero />
      <TrendingStories />
      <ReadingThemes />
    </main>
  );
}
