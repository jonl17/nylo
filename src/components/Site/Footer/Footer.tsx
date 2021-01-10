import React from 'react'
import useGetFooter from '~/hooks/useGetFooter'

const Footer = () => {
  const data = useGetFooter()
  if (!data) return null

  const blockClass = 'col-4 p-0'

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
            <p className='mb-0'>Almenningssamgöngur</p>
            <h3>Strætó: 14</h3>
            <h3>Stöð: Grandi</h3>
          </div>
        </div>

        {/* block */}
        <div className={blockClass}>
          <div>
            <p className='mb-0'>Opnunartímar</p>
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
      <div className='pt-5 footer__sponsors'>
        {data.sponsors.map(sponsor => (
          <img src={sponsor.logo.url} alt={sponsor.logo.alt} />
        ))}
      </div>
    </div>
  )
}

export default Footer
