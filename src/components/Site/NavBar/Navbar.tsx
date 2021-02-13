import React, { useContext } from 'react'
import { Link } from 'gatsby'
import useMenuQuery from './useMenuQuery'
import useSidebarQuery from './useSidebarQuery'
import { LanguageContext } from '~/context/LanguageContext'
import useOpeningHoursQuery from './useOpeningHoursQuery'
import cn from 'classnames'
import { langSeek } from 'balkan-tungumal'

const Menu = ({
  customPostType,
}: {
  customPostType?: 'news' | 'exhibition'
}) => {
  const { lang } = useContext(LanguageContext)
  const mainMenu = useMenuQuery(lang)
  return (
    <div>
      {mainMenu &&
        mainMenu.map(
          (item, idx) =>
            item.page && (
              <Link
                activeClassName='navbar__anchor--active'
                key={idx}
                to={item.page.url}
                className={cn('navbar__anchor', {
                  'navbar__anchor--active':
                    customPostType === 'news' &&
                    item.page.name.toLowerCase() === 'news',
                })}
              >
                <span />
                <h1>{item.page.name}</h1>
              </Link>
            )
        )}
    </div>
  )
}

const Sidebar = () => {
  const sidebar = useSidebarQuery()
  if (!sidebar) return null

  const openingHours = useOpeningHoursQuery()

  const { day, time } = openingHours

  const { lang } = useContext(LanguageContext)

  return (
    <div className='pt-5 pb-3'>
      <div
        className='sidebar__address parag--2'
        dangerouslySetInnerHTML={{ __html: sidebar.address.html }}
      />
      <div className='parag--2 pt-3'>
        <p className='mb-0'>{langSeek('Opening hours', lang)}</p>
        <p>{`${day.from} til ${day.to} ${time.from}-${time.to}`}</p>
      </div>
      <div className='d-flex flex-column pt-3'>
        {sidebar.socialMediaLinks.map((s: { url: string; title: string }) => (
          <a className='mb-0' target='_blank' key={s.url} href={s.url}>
            {s.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default ({
  customPostType,
}: {
  customPostType?: 'news' | 'exhibition'
}) => {
  return (
    <nav className='navbar d-flex flex-column pt-3 h-100' id='navbar'>
      <Menu customPostType={customPostType} />
      <Sidebar />
    </nav>
  )
}
