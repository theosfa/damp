import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import Image  from 'next/image'

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
       <Image
          src='/favicon.png'
          className="mr-2 rounded-full"
          width={40}
          height={40}
          alt='logo'
        />
      <p className="text-[44px] ">DAMP</p>
    </div>
  );
}
