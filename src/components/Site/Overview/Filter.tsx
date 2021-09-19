import React from 'react'
import Button from '~/components/Site/Button'
import { mergeQueryParams, useQueryParams } from '~/utils/url'
import cn from 'classnames'

type Props = {
  filteringItems: string[]
}

const Filter = ({ filteringItems }: Props) => {
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
        className='mb-3 mb-lg-0'
        label='Reset'
        onClick={() => mergeQueryParams({ decade: undefined })}
      />
    </div>
  )
}

export default Filter
