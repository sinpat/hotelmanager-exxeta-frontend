import { fetchRooms } from '@/app/lib/api';
import { Room } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function RoomTable({ room }: { room: Room }) {
  const rooms = await fetchRooms();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Buchungsreferenz
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Gast
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Ankunft
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Abreise
                </th>
                <th scope="col" className="relative px-3 py-3">
                  <span className="sr-only">Buchung aktiv</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {room.bookings.map((booking) => (
                <tr
                  key={booking.bookingReference}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    {booking.bookingReference}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {booking.guestName}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(booking.startDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(booking.endDate)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {room.currentBooking?.bookingReference ===
                    booking.bookingReference ? (
                      <>
                        <b>Aktiv</b>
                      </>
                    ) : null}
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
