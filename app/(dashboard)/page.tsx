import Table from '@/app/ui/room/table-rooms';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { CreateRoom } from '../ui/room/buttons';
import RoomFilter from '@/app/ui/room/filter';

export const metadata: Metadata = {
  title: 'Zimmerübersicht',
};

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    hasMinibar?: string;
    isVacant?: string;
  };
}) {
  const hasMinibar = Boolean(searchParams?.hasMinibar);
  const isVacant = Boolean(searchParams?.isVacant);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Zimmerübersicht</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <RoomFilter />
        <CreateRoom />
      </div>
      <Suspense
        key={`${hasMinibar}${isVacant}`}
        fallback={<InvoicesTableSkeleton />}
      >
        <Table roomFilter={{ hasMinibar, isVacant }} />
      </Suspense>
      {/* <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div> */}
    </div>
  );
}
