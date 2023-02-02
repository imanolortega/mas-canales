import Image from 'next/image';

interface Logo {
  isOpen: boolean;
}

export default function Logo({ isOpen }: Logo) {
  return (
    <Image
      alt={isOpen ? "Más Canales logo" : "Más Canales isotipo"}
      src={
        isOpen ?
          "/logo/mas-canales-logo.png" : "/logo/mas-canales-isotype.png"}
      height={isOpen ? 49 : 48}
      width={isOpen ? 169 : 48}
    />
  );
}
