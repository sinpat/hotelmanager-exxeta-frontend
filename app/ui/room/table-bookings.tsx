import { Room } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function RoomTable({ room }: { room: Room }) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* For small screens */}
          <div className="lg:hidden">
            {room.bookings.map((booking) => (
              <div
                key={booking.bookingReference}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between pb-1">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{booking.bookingReference}</p>
                    </div>
                    <p className="text-sm text-gray-500">{booking.guestName}</p>
                    <p className="text-sm text-gray-500">
                      {formatDateToLocal(booking.startDate)} -{' '}
                      {formatDateToLocal(booking.endDate)}
                    </p>
                    <p>
                      {room.currentBooking?.bookingReference ===
                      booking.bookingReference ? (
                        <>
                          <b>Aktiv</b>
                        </>
                      ) : null}
                    </p>
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
