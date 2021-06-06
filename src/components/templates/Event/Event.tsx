import React from 'react'
import { graphql as gql } from 'gatsby'
import '~/fragments/event'
import { formatDate } from '~/utils'
import Breadcrumbs from '~/components/Site/Breadcrumbs'
import CloseButton from '~/components/Site/CloseButton'
import FeaturedImage from '~/components/Site/FeaturedImage'
import { eventResolver } from '~/utils/resolvers'
import useGetPage from '~/hooks/useGetPage'
import linkResolver from '~/utils/linkResolver'
import RichText from '~/components/Slices/RichText'

const Event: React.FC<{
  data: any
}> = ({ data }) => {
  const event = eventResolver(data.prismicEvent)

  const homepage = useGetPage(event.lang === 'is' ? 'vidburdir' : 'events')

  return (
    <div className='page'>
      <div className='content'>
        <CloseButton
          className='icon__exit'
          lang={event.lang}
          isSubpageOf={
            homepage ? { url: homepage.url, uid: homepage.uid } : undefined
          }
        />
        <div className='d-flex align-items-center'>
          <p className='pr-3'>{formatDate(event.date)}</p>
          <p className='mr-lg-3'>{event.time}</p>
          {homepage && (
            <Breadcrumbs
              parentLink={{
                text: homepage.title.text,
                url: linkResolver(homepage),
              }}
              childLink={{ text: event.name.text, url: `#` }}
            />
          )}
        </div>
        <h1 className='mb-2'>{event.name.text}</h1>
        {event.image.url && <FeaturedImage image={event.image} />}
        <RichText primary={{ text: event.text, type: 'large' }} />
      </div>
    </div>
  )
}

export const query = gql`
  query($id: String, $lang: String) {
    prismicEvent(id: { eq: $id }, lang: { eq: $lang }) {
      ...eventFragmentFull
    }
  }
`

export default Event
