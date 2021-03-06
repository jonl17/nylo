import React from 'react'
import { Link } from 'gatsby'
import useSidebarQuery from './useSidebarQuery'
import useOpeningHoursQuery from './useOpeningHoursQuery'
import useMenuQuery from './useMenuQuery'
import cn from 'classnames'
import { langSeek } from 'balkan-tungumal'
import linkResolver from '../../../utils/linkResolver'
import { Language } from '~/lang'
import { hasSubmenu, isCustomType } from './methods'
import { useLocation } from '@reach/router'
import { openNow } from '~/utils'

const Menu = ({ lang, type }: { lang: Language; type: string }) => {
  const menu = useMenuQuery().find(m => m.lang === lang)
  const { pathname } = useLocation()
  return (
    <div>
      {menu &&
        menu.items
          .filter(node => node.page)
          .map((node, idx) => {
            return (
              <Link
                state={{
                  animate: true,
                }}
                activeClassName='navbar__anchor--active'
                key={idx}
                to={linkResolver(node.page)}
                className={cn('navbar__anchor', {
                  'navbar__anchor--active':
                    hasSubmenu(node.submenu, pathname) ||
                    isCustomType(node.page.uid, type),
                })}
              >
                <span />
                <h1>{node.page.title.text}</h1>
              </Link>
            )
          })}
    </div>
  )
}

const Sidebar = ({ lang }: { lang: Language }) => {
  const sidebar = useSidebarQuery()
  if (!sidebar) return null

  const openingHours = useOpeningHoursQuery()

  const { day, time } = openingHours

  const isOpen = openNow(day, time)

  return (
    <div className='pb-3'>
      <div
        className='sidebar__address parag--2'
        dangerouslySetInnerHTML={{ __html: sidebar.address.html }}
      />

      <div className='parag--2 pt-3'>
        <p className='mb-0'>{langSeek('Opening hours', lang)}</p>
        {day.from === day.to ? (
          <p>{`${day.from} ${time.from}—${time.to}`}</p>
        ) : (
          <p>{`${day.from} til ${day.to} ${time.from}—${time.to}`}</p>
        )}
      </div>
      {isOpen && (
        <p className='open parag--3'>
          {lang === 'is' ? 'Opið núna' : 'Open now'}
        </p>
      )}
      <div className='d-flex flex-column'>
        {sidebar.socialMediaLinks.map((s: { url: string; title: string }) => (
          <a className='mb-0' target='_blank' key={s.url} href={s.url}>
            {s.title}
          </a>
        ))}
      </div>
    </div>
  )
}

export default ({ lang, type }: { lang: Language; type: string }) => {
  return (
    <nav className='navbar d-none d-lg-flex flex-column pt-3 h-100' id='navbar'>
      <Menu lang={lang} type={type} />
      <Sidebar lang={lang} />
    </nav>
  )
}
