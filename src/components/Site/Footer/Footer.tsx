import React, { useContext } from 'react'
import { LanguageContext } from '~/context/LanguageContext'
import useGetFooter from '~/hooks/useGetFooter'
import { langSeek } from '~/lang'

const Footer = () => {
  const data = useGetFooter()
  if (!data) return null

  const blockClass = 'col-4 p-0'

  const { lang } = useContext(LanguageContext)

  return (
    <div className='footer'>
      <div className='d-flex'>
        {/* block */}
        <div className={blockClass}>
          <div className='pb-3'>
            <h3>Nýlistasafnið</h3>
            <h3>Marshallhúsið</h3>
            <h3>Grandagarður 20</h3>
            <h3>101 Reykjavík</h3>
          </div>
          <div>
            <p className='mb-0'>{langSeek('Public transportation', lang)}</p>
            <h3>Strætó: 14</h3>
            <h3>Stöð: Grandi</h3>
          </div>
        </div>

        {/* block */}
        <div className={blockClass}>
          <div>
            <p className='mb-0'>{langSeek('Opening hours', lang)}</p>
            <div dangerouslySetInnerHTML={{ __html: data.openingHours.html }} />
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
      <div className='pt-5 footer__sponsors d-flex align-items-center'>
        {data.sponsors.map((sponsor, x) => (
          <img key={x} src={sponsor.logo.url} alt={sponsor.logo.alt} />
        ))}
      </div>
    </div>
  )
}

export default Footer
