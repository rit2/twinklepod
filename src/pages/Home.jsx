import SearchBar from '../components/ui/SearchBar';
import Hero from '../components/ui/Hero';
import FeaturedBooks from '../components/ui/FeaturedBooks';
import TrendingStories from '../components/ui/TrendingStories';
import ReadingThemes from '../components/ui/ReadingThemes';

export default function Home() {
  return (
    <main>
      <SearchBar />
      <Hero />
      <FeaturedBooks />
      <TrendingStories />
      <ReadingThemes />
    </main>
  );
}
