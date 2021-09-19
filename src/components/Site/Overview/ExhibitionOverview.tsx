import React, { useEffect } from 'react'
import { getAllExhibitions } from '~/hooks/exhibitionHooks'
import { Language } from '~/lang'
import { ExhibitionInterface } from '~/utils/resolvers'
import {
  formatDate,
  groupExhibitionsByDate,
  multipleArtistsHandler,
  onlyUnique,
} from '~/utils'
import { Link } from 'gatsby'
import Button from '~/components/Site/Button'
import { Fade } from 'react-reveal'
import LoadMoreButton from './LoadMoreButton'
import cn from 'classnames'
import { useExhibitionFilter } from '~/context/exhibitionFilter'
import Filter from './Filter'
import { mergeQueryParams, useQueryParams } from '~/utils/url'

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

  const qs = useQueryParams()

  const yrs = exhibitions.map(item => item.year)

  const uniqueYrs = yrs.filter(onlyUnique)

  const findDecades = () => {
    const result = []
    const yearSpan = uniqueYrs.length
    const range = 6
    if (yearSpan > 1) {
      for (let i = yearSpan - 1; i > 0; i = i - (range + 1)) {
        if (i > range) {
          if (i - range === 1) {
            result.push({ from: uniqueYrs[i], to: uniqueYrs[0] })
          } else {
            result.push({ from: uniqueYrs[i], to: uniqueYrs[i - range] })
          }
        } else {
          result.push({ from: uniqueYrs[i], to: uniqueYrs[0] })
        }
      }
    }
    return result
  }

  const decades = findDecades()

  const yearInRange = (year: number) => {
    if (qs.decade) {
      const years = qs.decade.toString().split('-')
      return year >= parseInt(years[0]) && year <= parseInt(years[1])
    }
    return false
  }

  const filteredExhibitions = qs.decade
    ? exhibitions.filter(item => yearInRange(item.year))
    : exhibitions

  return (
    <div>
      <div className='mt-2 mb-3'>
        <Filter
          filteringItems={decades.map(item => `${item.from}-${item.to}`)}
        />
      </div>
      <div>
        <div className='overview__grid mr-lg-6 mr-xl-0 mb-3 pr-lg-3'>
          {filteredExhibitions.slice(0, loadMore).map((item, idx) => (
            <Box key={idx} item={item} />
          ))}
        </div>
      </div>

      {loadMore < filteredExhibitions.length && (
        <LoadMoreButton onClick={() => updateLoadMore()} />
      )}
    </div>
  )
}

export default ({ lang }: { lang: Language }) => {
  const exhibitions = getAllExhibitions().filter(node => node.lang === lang)

  const { past, open, upcoming } = groupExhibitionsByDate(exhibitions)

  const qs = useQueryParams()

  useEffect(() => {
    if (!qs.status) {
      mergeQueryParams({ status: 'Current' })
    }
    if (open.exhibitions.length === 0) {
      mergeQueryParams({ status: 'Past' })
    }
  }, [])

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
                onClick={() => {
                  mergeQueryParams({ decade: undefined, status: node.status })
                }}
                type='secondary'
                className={cn(
                  qs.status === node.status ? 'btn--secondary--active' : '',
                  'pr-2'
                )}
              />
            )
        )}
      </div>
      <div>
        {exhibitionArray.map(
          (node, idx) =>
            qs.status === node.status && (
              <Exhibitions key={idx} exhibitions={node.exhibitions} />
            )
        )}
      </div>
    </div>
  )
}
