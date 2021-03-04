import React from 'react'
import { langSeek } from 'balkan-tungumal'
import { Language } from '~/lang'
import useGetNews from '~/hooks/useGetNews'
import { formatDate } from '~/utils'

const LatestNews = ({ lang }: { lang: Language }) => {
  const news = useGetNews()
    .filter(node => node.lang === lang)
    .slice(0, 2)

  return (
    <div className='mt-4 latest-news'>
      <h1 className='latest-news__heading'>{langSeek('News', lang)}</h1>
      <div className='d-flex flex-wrap'>
        {news.map(node => (
          <div className='latest-news__content col-lg-6 pl-0'>
            {node.featuredImage && (
              <img src={node.featuredImage.url} alt={node.featuredImage.alt} />
            )}
            <p className='parag--2 mb-0'>{formatDate(node.date)}</p>
            <h1>{node.title.text}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestNews
