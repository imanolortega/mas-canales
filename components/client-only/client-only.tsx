//Client Only: Component to prevent rehydration issues

import { FC, HTMLAttributes, ReactNode, useEffect, useState } from 'react'

interface Props {
  children: ReactNode
}

const ClientOnly: FC<Props & HTMLAttributes<HTMLDivElement>> = ({
  children,
  ...delegated
}) => {
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

  return <div {...delegated}>{children}</div>
}

export default ClientOnly
