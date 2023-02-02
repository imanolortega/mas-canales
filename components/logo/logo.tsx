import Image from 'next/image';
import styles from './Logo.module.scss';

interface Logo {
  isOpen: boolean;
}

export default function Logo({ isOpen }: Logo) {
  return (
    <>
      <Image
        alt="Más Canales Logo"
        className={`${styles['logo-transition']} ${isOpen ? styles['show'] : ''}`}
        src="/logo/mas-canales-logo.png"
        height={49}
        width={169}
      />
      <Image
        alt="Más Canales Isotipo"
        className={`${styles['isotype-transition']} ${!isOpen ? styles['show'] : ''}`}
        src="/logo/mas-canales-isotype.png"
        height={48}
        width={48}
      />
    </>
  );
}
