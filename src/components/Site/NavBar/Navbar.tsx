import React, { useContext } from 'react'
import { Link } from 'gatsby'
import useSidebarQuery from './useSidebarQuery'
import { LanguageContext } from '~/context/LanguageContext'
import useOpeningHoursQuery from './useOpeningHoursQuery'
import cn from 'classnames'
import { langSeek } from 'balkan-tungumal'
import linkResolver from '../../../utils/linkResolver'

const Menu = ({
  customPostType,
  mainMenu,
}: {
  customPostType?: 'news' | 'exhibition'
  mainMenu: any[]
}) => {
  const menu = mainMenu.data.items
  console.log(linkResolver(menu[0].page))
  return (
    <div>
      {menu &&
        menu.map(
          (item, idx) =>
            item.page && (
              <Link
                activeClassName='navbar__anchor--active'
                key={idx}
                to={linkResolver(item.page)}
                className={cn('navbar__anchor', {
                  'navbar__anchor--active':
                    customPostType === 'news' &&
                    item.page.name.toLowerCase() === 'news',
                })}
              >
                <span />
                <h1>{item.page.document.data.title.text}</h1>
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
  mainMenu,
}: {
  customPostType?: 'news' | 'exhibition'
  mainMenu: any[]
}) => {
  return (
    <nav className='navbar d-none d-lg-flex flex-column pt-3 h-100' id='navbar'>
      <Menu customPostType={customPostType} mainMenu={mainMenu} />
      <Sidebar />
    </nav>
  )
}
