export default function Hero() {
  return (
    <section className="mx-4 md:mx-12 mt-4">
      <div className="relative rounded-3xl overflow-hidden">
        <img
          src="/hero-banner.png"
          alt="A magical treehouse with children reading books, surrounded by friendly animals and stacks of colorful books"
          className="w-full object-cover"
        />
        {/* Bottom fade to blend with paper texture background */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F5E6D3] to-transparent"></div>
      </div>
    </section>
  );
}
