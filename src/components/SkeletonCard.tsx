import { Button } from '@fluid-design/fluid-ui';

export default function SkeletonCard() {
  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-800 shadow animate-pulse flex flex-col">
      {/* Poster placeholder */}
      <div className="w-full h-80 sm:h-96 md:h-96 lg:h-80 xl:h-96 bg-gray-700" />

      {/* Text placeholder */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div className="h-6 bg-gray-600 rounded w-3/4" />
        <div className="h-4 bg-gray-600 rounded w-1/2" />
      </div>

      {/* Button placeholder */}
      <div className="p-3 flex justify-end">
        <Button size="sm" color="gray" label="Loading..." disabled />
      </div>
    </div>
  );
}
