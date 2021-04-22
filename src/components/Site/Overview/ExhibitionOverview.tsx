import React, { useState } from 'react'
import { getAllExhibitions } from '~/hooks/exhibitionHooks'
import { Language } from '~/lang'
import { ExhibitionInterface } from '~/utils/resolvers'
import {
  formatDate,
  groupExhibitionsByDate,
  multipleArtistsHandler,
} from '~/utils'
import { Link } from 'gatsby'
import Button from '~/components/Site/Button'
import { Fade } from 'react-reveal'
import LoadMoreButton from './LoadMoreButton'
import cn from 'classnames'
import { useExhibitionFilter } from '~/context/exhibitionFilter'

type BoxProps = {
  item: ExhibitionInterface
}

const Box = ({ item }: BoxProps) => {
  return (
    <div className='mb-lg-3 overview__grid__item'>
      <Fade>
        <Link to={item.url}>
          {item.featuredImage.url && (
            <img
              className='overview-box__featured-image'
              src={item.featuredImage.url}
              alt={item.featuredImage.alt}
            />
          )}
          <div className='overview-box__text'>
            <p className='mb-1 mt-2'>
              {formatDate(item.opening, item.closing)}
            </p>
            <h2 className='mb-0'>{multipleArtistsHandler(item.artist, '')}</h2>
            <h2 className='mb-2 overview-box__title font-italic'>
              {item.title.text}
            </h2>
          </div>
        </Link>
      </Fade>
    </div>
  )
}

const Exhibitions = ({
  exhibitions,
}: {
  exhibitions: ExhibitionInterface[]
}) => {
  const { loadMore, updateLoadMore } = useExhibitionFilter()

  return (
    <div>
      <div className='overview__grid mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
        {exhibitions.slice(0, loadMore).map((item, idx) => (
          <Box key={idx} item={item} />
        ))}
      </div>
      {loadMore < exhibitions.length && (
        <LoadMoreButton onClick={() => updateLoadMore()} />
      )}
    </div>
  )
}

export default ({ lang }: { lang: Language }) => {
  const exhibitions = getAllExhibitions().filter(node => node.lang === lang)

  const { past, open, upcoming } = groupExhibitionsByDate(exhibitions)

  const { filter, updateFilter } = useExhibitionFilter()

  const exhibitionArray = [open, past, upcoming]

  const labels: { [key: string]: string } = {
    Current: lang === 'is' ? 'Í gangi' : 'Current',
    Past: lang === 'is' ? 'Liðnar' : 'Past',
    Upcoming: lang === 'is' ? 'Framundan' : 'Upcoming',
  }

  return (
    <div>
      <div className='mb-3'>
        {exhibitionArray.map(
          (node, idx) =>
            !!node.exhibitions.length && (
              <Button
                key={idx}
                label={labels[node.status]}
                onClick={() => updateFilter(node.status)}
                type='secondary'
                className={cn(
                  filter === node.status ? 'btn--secondary--active' : '',
                  'pr-2'
                )}
              />
            )
        )}
      </div>
      <div>
        {exhibitionArray.map(
          (node, idx) =>
            filter === node.status && (
              <Exhibitions key={idx} exhibitions={node.exhibitions} />
            )
        )}
      </div>
    </div>
  )
}
