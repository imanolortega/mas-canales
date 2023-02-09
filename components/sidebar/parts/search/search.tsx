import { Dispatch, RefObject, SetStateAction } from 'react'
import styles from './Search.module.scss'

import Button from '@components/buttons/button'
import CloseIcon from '@components/icons/close'
import SearchIcon from '@components/icons/search'

interface Search {
  isOpen: boolean
  searchTerm: string
  setSearchTerm: Dispatch<SetStateAction<string>>
  inputRef: RefObject<HTMLInputElement>
}

export default function Search({
  inputRef,
  isOpen,
  searchTerm,
  setSearchTerm,
}: Search) {
  return (
    <form
      className={`${styles['search-container-inner']} ${
        styles[`${isOpen ? 'open' : ''}`]
      }`}
    >
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar canal"
        ref={inputRef}
        type="text"
        value={searchTerm}
      />
      {!searchTerm && <SearchIcon className={styles['search-btn']} />}
      {searchTerm && (
        <Button
          className={styles['close-btn']}
          onHandleClick={() => setSearchTerm('')}
          title="Borrar búsqueda"
        >
          <CloseIcon />
        </Button>
      )}
    </form>
  )
}
