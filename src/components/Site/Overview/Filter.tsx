import React from 'react'
import Button from '~/components/Site/Button'
import { mergeQueryParams, useQueryParams } from '~/utils/url'
import cn from 'classnames'

type Props = {
  filteringItems: string[]
  lang: string
}

const Filter = ({ filteringItems, lang }: Props) => {
  if (filteringItems.length === 0) return null
  const qs = useQueryParams()
  return (
    <div>
      {filteringItems.map((item, key) => (
        <Button
          key={key}
          onClick={() => mergeQueryParams({ decade: item })}
          label={item}
          className={cn('mr-2 mb-3 mb-lg-0', {
            'btn--primary--active': qs.decade === item,
          })}
        />
      ))}
      <Button
        className={cn('mb-3 mb-lg-0', {
          'btn--primary--active': !qs.decade,
        })}
        label={lang === 'is' ? 'Sjá allt' : 'See all'}
        onClick={() => mergeQueryParams({ decade: undefined })}
      />
    </div>
  )
}

export default Filter
