import { ageGroups } from '../../data/books';

export default function AgeGroupFilter() {
  return (
    <section className="px-4 md:px-12 py-8">
      <div className="flex flex-wrap justify-center gap-4">
        {ageGroups.map((group) => (
          <button
            key={group.id}
            className="flex items-center gap-3 bg-peach-light hover:bg-peach px-6 py-3 rounded-full shadow-sm transition-all hover:shadow-md cursor-pointer"
          >
            <div className="text-left">
              <div className="font-heading font-semibold text-text-primary">{group.label}</div>
              {group.sublabel && (
                <div className="text-sm text-text-secondary">{group.sublabel}</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
