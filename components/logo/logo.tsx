import Image from 'next/image';

interface Logo {
  isOpen: boolean;
}

export default function Logo({ isOpen }: Logo) {
  return (
    <>
      {
        isOpen ? (
          <Image src="/logo/logo-mas-canales-ligth.png" alt="logo" width={185} height={50} />
        ) : (
          <Image src="/logo/isotype-mas-canales.png" alt="logo" width={50} height={50} />
        )
      }
    </>
  );
}
