import { deleteRoom } from '@/app/lib/api';
import { Room } from '@/app/lib/definitions';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export function ViewRoom({ roomNumber }: Pick<Room, 'roomNumber'>) {
  return (
    <Link
      href={`/${roomNumber}`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <MagnifyingGlassIcon className="w-5" />
    </Link>
  );
}

export function CreateRoom() {
  return (
    <Link
      href="/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Neues Zimmer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function EditRoom({ roomNumber }: Pick<Room, 'roomNumber'>) {
  return (
    <Link
      href={`/${roomNumber}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteRoom({ roomNumber }: Pick<Room, 'roomNumber'>) {
  return (
    <form action={deleteRoom.bind(null, roomNumber)}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
