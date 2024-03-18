import Form from '@/app/ui/room/edit-form';
import Breadcrumbs from '@/app/ui/room/breadcrumbs';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { fetchRoomByNumber } from '@/app/lib/api';

export const metadata: Metadata = {
  title: 'Zimmer bearbeiten',
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
            label: 'Zimmer bearbeiten',
            href: `/${roomNumber}/edit`,
            active: true,
          },
        ]}
      />
      <Form room={room} />
    </main>
  );
}
