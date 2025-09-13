type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ current, total, onPageChange }: PaginationProps) {
  const pages: (number | string)[] = [];

  if (total <= 7) {
    // afișăm toate
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 4) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < total - 3) pages.push('...');
    pages.push(total);
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
        className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        &lt;
      </button>

      {pages.map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={idx}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded ${p === current ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            {p}
          </button>
        ) : (
          <span key={idx} className="px-2 py-1">
            {p}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
        className="px-2 py-1 bg-gray-700 rounded disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
}
