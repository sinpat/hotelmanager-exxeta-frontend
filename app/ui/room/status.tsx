import { Room } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function RoomStatus({ room }: { room: Room }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-gray-100 text-gray-500': !room.isVacant,
          'bg-green-500 text-white': room.isVacant,
        },
      )}
    >
      {room.currentBooking ? (
        <>
          Gebucht bis {formatDateToLocal(room.currentBooking.endDate)}
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : (
        <>
          Frei
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      )}
    </span>
  );
}
