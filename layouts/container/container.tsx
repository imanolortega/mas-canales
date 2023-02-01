import { ElementType, ReactNode, useMemo } from 'react';
import styles from './container.module.scss';

interface ContainerProps {
  Tag?: ElementType;
  size?: 'default' | 'medium' | 'small' | 'full';
  children: ReactNode;
  className?: string;
  classNameInner?: string;
  noPadding?: boolean;
}

export const Container = ({
  Tag = 'section',
  size = 'default',
  children,
  className,
  classNameInner,
  noPadding,
}: ContainerProps) => {
  const getSizeContainer = (size: string) => {
    const sizeOptions = {
      small: 'container-small',
      medium: 'container-medium',
      full: 'container-full',
      default: 'container',
    };
    return sizeOptions[size as keyof typeof sizeOptions] || 'default';
  };

  const containerSize = useMemo(() => getSizeContainer(size), [size]);

  return (
    <Tag
      className={`${styles[containerSize]} ${className}`}
    >
      <div className={`${classNameInner} ${styles['container-inner']}`}>
        {children}
      </div>
    </Tag>
  );
};