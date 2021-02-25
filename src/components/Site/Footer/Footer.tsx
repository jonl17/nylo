import React from 'react'
import useGetFooter from '~/hooks/useGetFooter'
import { langSeek } from 'balkan-tungumal'
import { Language } from '~/lang'

const Footer = ({ lang }: { lang: Language }) => {
  const data = useGetFooter()
  if (!data) return null

  const blockClass = 'col-lg-4 p-0'

  return (
    <div className='footer'>
      <div className='d-flex flex-column flex-lg-row'>
        {/* block */}
        <div className={blockClass}>
          <div className='pb-3'>
            <h3>Nýlistasafnið</h3>
            <h3>Marshallhúsið</h3>
            <h3>Grandagarður 20</h3>
            <h3>101 Reykjavík</h3>
          </div>
          <div className='pb-3'>
            <p className='mb-0'>{langSeek('Public transportation', lang)}</p>
            <h3>Strætó: 14</h3>
            <h3>Stöð: Grandi</h3>
          </div>
        </div>

        {/* block */}
        <div className={blockClass}>
          <div className='pb-3'>
            <h3>+354 551 4350</h3>
            <h3>nylo(at)nylo.is</h3>
          </div>
          <div>
            <a
              href='https://www.facebook.com/thelivingartmuseum/'
              target='_blank'
            >
              <h3>Facebook</h3>
            </a>
            <a
              href='https://www.instagram.com/nylistasafnid/?hl=en'
              target='_blank'
            >
              <h3>Instagram</h3>
            </a>
          </div>
        </div>
      </div>
      <div className='pt-lg-5 footer__sponsors d-flex flex-column flex-lg-row align-items-lg-center'>
        {data.sponsors.map((sponsor, x) => (
          <img
            className='mb-4 mb-lg-0'
            key={x}
            src={sponsor.logo.url}
            alt={sponsor.logo.alt}
          />
        ))}
      </div>
    </div>
  )
}

export default Footer
