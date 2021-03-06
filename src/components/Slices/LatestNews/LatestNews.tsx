import React from 'react'
import { langSeek } from 'balkan-tungumal'
import { Language } from '~/lang'
import useGetNews from '~/hooks/useGetNews'
import { formatDate } from '~/utils'
import { Link } from 'gatsby'

const LatestNews = ({ lang }: { lang: Language }) => {
  const news = useGetNews()
    .filter(node => node.lang === lang)
    .slice(0, 2)

  return (
    <div className='mt-4 latest-news'>
      <h1 className='latest-news__heading mb-2'>{langSeek('News', lang)}</h1>
      <div className='d-flex flex-wrap'>
        {news.map(node => (
          <Link
            to={node.url}
            key={node.url}
            className='latest-news__content col-lg-6 pl-0 mb-3 mb-lg-0'
          >
            {node.featuredImage && (
              <img
                className='mb-2'
                src={node.featuredImage.url}
                alt={node.featuredImage.alt}
              />
            )}
            <p className='parag--2 mb-0'>{formatDate(node.date)}</p>
            <h1>{node.title.text}</h1>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LatestNews
