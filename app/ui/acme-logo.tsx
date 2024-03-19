import { HomeModernIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <HomeModernIcon className="mr-2 h-12 w-12" />
      <p className="text-[20px] ">eXXellent Nights!</p>
    </div>
  );
}
