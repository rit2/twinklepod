export default function StarRating({ rating, max = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-star' : 'text-gray-300'}
        >
          ★
        </span>
      ))}
    </div>
  );
}
