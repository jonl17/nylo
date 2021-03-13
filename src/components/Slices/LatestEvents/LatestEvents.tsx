import React from 'react'
import useGetEvents from '~/hooks/useGetEvents'
import { Language } from '~/lang'
import { formatDate } from '~/utils'
import { langSeek } from 'balkan-tungumal'
import { langs } from 'prismic.config'

const LatestEvents = ({ lang }: { lang: Language }) => {
  const tdy = new Date()
  const events = useGetEvents().filter(node => {
    if (node.lang === lang && new Date(node.date) > tdy) {
      return node
    }
  })

  if (!events) {
    return null
  }

  return (
    <div className='latest-events col-lg-6 p-0'>
      <h1 className='latest-events__heading'>{langSeek('Events', lang)}</h1>
      {events.map(
        (ev, ent) =>
          ent < 2 && (
            <div key={ent} className='mb-4'>
              <div className='d-flex mb-0'>
                <h1 className='mr-3'>{formatDate(ev.date, undefined, true)}</h1>
                <h1>{ev.time}</h1>
              </div>
              <h1>{ev.name.text}</h1>
            </div>
          )
      )}
    </div>
  )
}

export default LatestEvents
