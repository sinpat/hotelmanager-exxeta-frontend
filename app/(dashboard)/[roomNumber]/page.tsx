import Breadcrumbs from '@/app/ui/room/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchRoomByNumber } from '@/app/lib/api';
import { lusitana } from '@/app/ui/fonts';

export const metadata: Metadata = {
  title: 'Zimmerdetails',
};

export default async function Page({
  params,
}: {
  params: { roomNumber: string };
}) {
  const roomNumber = params.roomNumber;
  const room = await fetchRoomByNumber(roomNumber);

  if (!room) {
    notFound();
  }

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Zimmerübersicht', href: '/' },
          {
            label: `Zimmer ${roomNumber}`,
            href: `/${roomNumber}`,
            active: true,
          },
        ]}
      />
      <h1 className={`${lusitana.className} text-2xl`}>Buchungen</h1>
      coming soon...
    </main>
  );
}
