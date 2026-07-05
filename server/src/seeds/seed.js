require('dotenv').config();
const mongoose = require('mongoose');
const Book = require('../models/Book');
const User = require('../models/User');

const books = [
  {
    title: "Pip's Cosmic Trip",
    author: "Luna Starfield",
    illustrator: "Marco Brightbrush",
    description: "Join Pip the curious kitten on an extraordinary adventure through the stars! When Pip discovers a magical telescope in the attic, it opens a portal to a universe filled with friendly planets, dancing comets, and a wise old moon who teaches Pip about courage and curiosity.",
    coverImage: "https://placehold.co/400x560/1a1a2e/ffffff?text=Pip%27s+Cosmic+Trip",
    pages: [
      "Once upon a time, in a cozy little house at the edge of a sleepy town, there lived a curious kitten named Pip.",
      "One evening, Pip discovered an old brass telescope hidden behind forgotten books. It began to glow with golden light.",
      "The light lifted him into the starry night sky! The town below grew tiny like a toy village.",
      "\"Welcome, little traveler,\" said the Moon. \"I've been waiting for someone brave enough to visit.\"",
      "Pip met dancing comets, friendly planets, and a shy little star afraid to shine.",
      "\"Even the smallest light makes the dark less scary,\" Pip told the star. She beamed brightly.",
      "Back home, Pip could still see that star twinkling. \"Goodnight, friend,\" he whispered. The End."
    ],
    readingTime: "8 min",
    language: "English",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    tags: ["Space", "Adventure", "Animals", "Courage"],
    ageGroup: "Ages 3-5",
    readingLevel: "Beginner",
    theme: "Adventure",
    featured: true,
    publishedYear: 2023,
    status: "Published",
  },
  {
    title: "The Sleepy Bear's Secret",
    author: "Mia Honeywood",
    illustrator: "Sage Willowbark",
    description: "When the forest animals notice Bear sleeping longer than usual, they set out on a gentle adventure to discover his secret.",
    coverImage: "https://placehold.co/400x560/2d4a3e/ffffff?text=Sleepy+Bear",
    pages: [
      "Deep in the Whispering Woods, Bear had a secret. Every autumn, he'd yawn the biggest yawn and disappear into his cozy cave.",
      "\"Where does Bear go?\" asked Rabbit. The forest animals decided to find out.",
      "They followed honey drops to Bear's cave. Inside, it was warm and soft, lined with dried leaves.",
      "\"Bear is hibernating,\" explained Old Owl. \"His body slows down to save energy through winter.\"",
      "The animals left Bear berries and a note: \"Sweet dreams, dear friend. We'll be here when spring comes.\" The End."
    ],
    readingTime: "6 min",
    language: "English",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    tags: ["Animals", "Bedtime", "Nature", "Friendship"],
    ageGroup: "Ages 3-5",
    readingLevel: "Beginner",
    theme: "Bedtime",
    featured: true,
    publishedYear: 2023,
    status: "Published",
  },
  {
    title: "Luna's Night Flight",
    author: "Ava Moonlight",
    illustrator: "Iris Dawnpaint",
    description: "Luna the owl discovers she's afraid of flying at night. With help from her grandmother, she learns to trust her wings.",
    coverImage: "https://placehold.co/400x560/1a2a4a/ffffff?text=Luna%27s+Flight",
    pages: [
      "Luna was an owl with a secret: she was afraid of the dark.",
      "Her grandmother noticed. \"Come, little one. Let me show you something.\"",
      "\"Look up,\" Grandma whispered. The sky was alive with thousands of twinkling stars.",
      "\"The dark isn't empty. It's full of light you can only see when you're brave enough to fly into it.\"",
      "Luna stretched her wings and flew — really flew — for the first time. The stars seemed to cheer.",
      "From that night on, she flew farther than any owl in the forest. The End."
    ],
    readingTime: "12 min",
    language: "English",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    tags: ["Magic", "Animals", "Night", "Courage", "Family"],
    ageGroup: "Ages 6-8",
    readingLevel: "Intermediate",
    theme: "Magic & Fantasy",
    featured: true,
    publishedYear: 2022,
    status: "Published",
  },
  {
    title: "The Dragon Who Drew",
    author: "Berra Gners",
    illustrator: "Flame Artsworth",
    description: "A young dragon discovers that his fire doesn't destroy — it creates. He was never meant to be a warrior. He was always meant to be an artist.",
    coverImage: "https://placehold.co/400x560/c44d2b/ffffff?text=Dragon+Who+Drew",
    pages: [
      "In Dragon School, every young dragon practiced fire breath. All except Ember.",
      "Ember's fire was different. It transformed things. Sand became glass sculptures. Rocks got intricate patterns.",
      "The other dragons laughed. \"What use is fire that doesn't burn?\"",
      "One day, the Dragon Queen saw Ember's glass sculptures. \"Who made these masterpieces?\" she demanded.",
      "\"You have the rarest gift — Creative Fire,\" she told Ember. \"Come, there's a place in my court for an artist.\"",
      "Being different wasn't a weakness. It was his superpower. The End."
    ],
    readingTime: "20 min",
    language: "English",
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    tags: ["Dragons", "Art", "Magic", "Identity"],
    ageGroup: "Ages 9-12",
    readingLevel: "Advanced",
    theme: "Magic & Fantasy",
    featured: false,
    publishedYear: 2023,
    status: "Published",
  },
  {
    title: "Space Explorers",
    author: "Canea Explorers",
    illustrator: "Stella Cosmova",
    description: "Three kids build a cardboard spaceship — and it actually works! Join them as they visit each planet, learning real science facts.",
    coverImage: "https://placehold.co/400x560/2b6bc4/ffffff?text=Space+Explorers",
    pages: [
      "Maya, Leo, and Sam had one rule: never stop asking \"what if?\"",
      "They pressed the big red button and — WHOOSH! The cardboard became real metal. They were in space!",
      "Mars stretched out like an endless desert. \"Olympus Mons is three times taller than Everest!\" Maya said.",
      "They flew through Saturn's rings and waved at Neptune's howling winds.",
      "As Earth came back into view, Sam said quietly, \"It's so small. And so beautiful.\" The End."
    ],
    readingTime: "18 min",
    language: "English",
    license: "CC BY-SA 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    tags: ["Space", "Science", "STEM", "Friendship"],
    ageGroup: "Ages 9-12",
    readingLevel: "Advanced",
    theme: "STEM",
    featured: false,
    publishedYear: 2024,
    status: "Published",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Book.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Seed books
    await Book.insertMany(books);
    console.log(`Seeded ${books.length} books`);

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@twinklepod.com',
      password: 'admin123',
      role: 'admin',
    });
    console.log('Created admin user (admin@twinklepod.com / admin123)');

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

seed();
