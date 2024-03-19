import { EditRoom, DeleteRoom, ViewRoom } from '@/app/ui/room/buttons';
import { fetchRooms } from '@/app/lib/api';
import RoomStatus from './status';

export type RoomFilter = {
  hasMinibar: Boolean;
  isVacant: Boolean;
};

export default async function RoomTable({
  roomFilter,
}: {
  roomFilter: RoomFilter;
}) {
  const rooms = await fetchRooms(roomFilter);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* For small screens */}
          <div className="lg:hidden">
            {rooms?.map((room) => (
              <div
                key={room.roomNumber}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{room.roomNumber}</p>
                    </div>
                    <p className="text-sm text-gray-500">{room.roomType}</p>
                    <p className="text-sm text-gray-500">
                      {room.hasMinibar ? 'Minibar' : null}
                    </p>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <RoomStatus room={room} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <ViewRoom roomNumber={room.roomNumber} />
                    <EditRoom roomNumber={room.roomNumber} />
                    <DeleteRoom roomNumber={room.roomNumber} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* For big screens */}
          <table className="hidden min-w-full text-gray-900 lg:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Zimmernummer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Zimmergröße
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Minibar
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {rooms?.map((room) => (
                <tr
                  key={room.roomNumber}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {room.roomNumber}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {room.roomType}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {room.hasMinibar ? 'Ja' : 'Nein'}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <RoomStatus room={room} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <ViewRoom roomNumber={room.roomNumber} />
                      <EditRoom roomNumber={room.roomNumber} />
                      <DeleteRoom roomNumber={room.roomNumber} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
