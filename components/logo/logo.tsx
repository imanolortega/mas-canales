import Image from 'next/image';

interface Logo {
  isOpen: boolean;
}

export default function Logo({ isOpen }: Logo) {
  return (
    <Image
      src={
        isOpen ?
          "/logo/mas-canales-logo.png" : "/logo/mas-canales-isotype.png"}
      alt={isOpen ? "Más Canales logo" : "Más Canales isotipo"}
      width={isOpen ? 169 : 48}
      height={isOpen ? 49 : 48}
    />
  );
}
