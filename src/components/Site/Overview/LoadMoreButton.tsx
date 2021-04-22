import React from 'react'
import Button from '~/components/Site/Button'
import { useLanguage } from '~/context/langContext'

type Props = {
  onClick: () => void
}

const LoadMoreButton = ({ onClick }: Props) => {
  const { lang } = useLanguage()

  return (
    <div className='d-flex justify-content-center'>
      <Button
        label={lang === 'is' ? 'Hlaða fleiri' : 'Load more'}
        onClick={onClick}
      />
    </div>
  )
}

export default LoadMoreButton
