'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function RoomFilter() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleFilter = (key: 'minibar' | 'vacant', value: Boolean) => {
    console.log(`Filter change... ${key} ${value}`);
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, 'true');
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <div className="mx-4 flex items-center space-x-2">
        <input
          id="filterMinibar"
          type="checkbox"
          onChange={(e) => handleFilter('minibar', e.target.checked)}
          defaultChecked={Boolean(searchParams.get('minibar'))}
          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
        />
        <label htmlFor="filterMinibar" className="block font-medium">
          Zimmer mit Minibar
        </label>
      </div>

      <div className="mx-4 flex items-center space-x-2">
        <input
          id="filterVacant"
          type="checkbox"
          onChange={(e) => handleFilter('vacant', e.target.checked)}
          defaultChecked={Boolean(searchParams.get('vacant'))}
          className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
        />
        <label htmlFor="filterMinibar" className="block font-medium">
          Freie Zimmer
        </label>
      </div>
    </div>
  );
}
