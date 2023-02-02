import Image from 'next/image';

interface Logo {
  isOpen: boolean;
}

export default function Logo({ isOpen }: Logo) {
  return (
    <>
      {
        isOpen ? (
          <Image src="/logo/mas-canales-logo.png" alt="Más Canales logo" width={169} height={49} />
        ) : (
          <Image src="/logo/mas-canales-isotype.png" alt="Más Canales isotipo" width={48} height={48} />
        )
      }
    </>
  );
}
