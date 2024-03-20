'use client';

import Link from 'next/link';
import {
  ArrowsPointingOutIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { useFormState } from 'react-dom';
import { createRoom } from '@/app/lib/api';
import { mapRoomType } from '@/app/lib/utils';

export default function Form() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createRoom, initialState);

  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Room Number */}
        <div className="mb-4">
          <label
            htmlFor="roomNumber"
            className="mb-2 block text-sm font-medium"
          >
            Zimmernummer
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="roomNumber"
                name="roomNumber"
                type="number"
                step="1"
                placeholder="Zimmernummer eingeben"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="roomNumber-error"
              />
              <HashtagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          <div id="roomNumber-error" aria-live="polite" aria-atomic="true">
            {state.errors?.roomNumber &&
              state.errors.roomNumber.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Room Type */}
        <div className="mb-4">
          <label htmlFor="roomType" className="mb-2 block text-sm font-medium">
            Zimmergröße
          </label>
          <div className="relative">
            <select
              id="roomType"
              name="roomType"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="roomType-error"
            >
              <option value="" disabled>
                Zimmergröße wählen
              </option>
              {['SINGLE', 'DOUBLE', 'SUITE'].map((roomType) => (
                <option key={roomType} value={roomType}>
                  {mapRoomType(roomType)}
                </option>
              ))}
            </select>
            <ArrowsPointingOutIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <div id="roomType-error" aria-live="polite" aria-atomic="true">
            {state.errors?.roomType &&
              state.errors.roomType.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Minibar */}
        <div className="mb-2">
          <label
            htmlFor="hasMinibar"
            className="mb-2 block text-sm font-medium"
          >
            Zimmer hat eine Minibar
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="hasMinibar"
                name="hasMinibar"
                type="checkbox"
                className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
              />
            </div>
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {state.message ? (
            <p className="mt-2 text-sm text-red-500">{state.message}</p>
          ) : null}
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Abbrechen
        </Link>
        <Button type="submit">Zimmer erstellen</Button>
      </div>
    </form>
  );
}
