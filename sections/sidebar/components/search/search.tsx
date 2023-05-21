import { SearchProps } from '@utils/types'
import styles from './Search.module.scss'

import Button from '@components/buttons/button'
import CloseIcon from '@components/icons/close'
import SearchIcon from '@components/icons/search'

export default function Search({
  inputRef,
  isOpen,
  searchTerm,
  setSearchTerm,
}: SearchProps) {
  return (
    <form
      className={`${styles['search-container-inner']} ${
        styles[`${isOpen ? 'open' : ''}`]
      }`}
      name="channels-search"
    >
      <label
        htmlFor="channels-search"
        style={{
          display: 'none',
        }}
      >
        Buscador de canales
      </label>
      <input
        id="channels-search"
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
