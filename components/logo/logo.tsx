import Image from 'next/image';

interface Logo {
  isOpen: boolean;
}

export default function Logo({ isOpen }: Logo) {
  return (
    <>
      {
        isOpen ? (
          <Image src="/logo/logo-mas-canales-ligth.png" alt="Más Canales logo" width={185} height={50} />
        ) : (
          <Image src="/logo/isotype-mas-canales.png" alt="Más Canales isotipo" width={48} height={48} />
        )
      }
    </>
  );
}
