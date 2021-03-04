import React from 'react'
import useGetEvents from '~/hooks/useGetEvents'
import { Language } from '~/lang'
import { formatDate } from '~/utils'
import { langSeek } from 'balkan-tungumal'
import { langs } from 'prismic.config'

const LatestEvents = ({ lang }: { lang: Language }) => {
  const events = useGetEvents()
    .filter(node => node.lang === lang)
    .slice(0, 2)

  if (!events) {
    return null
  }

  return (
    <div className='latest-events col-lg-6 p-0'>
      <h1 className='latest-events__heading'>{langSeek('Events', lang)}</h1>
      {events.map((ev, ent) => (
        <div key={ent} className='mb-4'>
          <div className='d-flex mb-0'>
            <h1 className='mr-3'>{formatDate(ev.date, undefined, true)}</h1>
            <h1>{ev.time}</h1>
          </div>
          <h1>{ev.name.text}</h1>
        </div>
      ))}
    </div>
  )
}

export default LatestEvents
