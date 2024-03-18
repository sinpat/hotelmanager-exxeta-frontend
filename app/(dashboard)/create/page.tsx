import Form from '@/app/ui/room/create-form';
import Breadcrumbs from '@/app/ui/room/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Zimmer erstellen',
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Zimmerübersicht', href: '/' },
          {
            label: 'Zimmer erstellen',
            href: '/create',
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
