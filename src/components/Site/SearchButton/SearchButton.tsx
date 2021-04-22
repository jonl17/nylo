import React from 'react'
import { Link } from 'gatsby'
import { Language } from '~/lang'
import ButtonLink from '../ButtonLink'

const SearchButton = ({ lang }: { lang: Language }) => {
  return (
    <Link
      className='btn btn__search btn--primary'
      to={lang === 'is' ? '/leit' : '/en-us/search'}
    >
      <svg
        width='50'
        height='49'
        viewBox='0 0 50 49'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M29.4903 11.5246C34.3132 16.3475 34.3132 24.1671 29.4903 28.9901C24.6673 33.8131 16.8477 33.8131 12.0247 28.9901C7.20174 24.1671 7.20174 16.3475 12.0247 11.5246C16.8477 6.70158 24.6673 6.70158 29.4903 11.5246Z'
          stroke='black'
          strokeWidth='3.3'
        />
        <path
          d='M29.9497 29.4497L39.1421 38.6421'
          stroke='black'
          strokeWidth='3.3'
          strokeLinecap='round'
        />
      </svg>
    </Link>
  )
}

export default SearchButton
