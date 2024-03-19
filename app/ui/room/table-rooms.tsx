import { EditRoom, DeleteRoom, ViewRoom } from '@/app/ui/room/buttons';
import { fetchRooms } from '@/app/lib/api';
import RoomStatus from './status';

export default async function RoomTable({ query }: { query: string }) {
  const rooms = await fetchRooms();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
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
