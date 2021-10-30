import React, { useState } from 'react'
import { useMobileMenu } from '~/context/mobileMenuContext'
import useLockBodyScroll from '~/hooks/useLockBodyScroll'
import { Language } from '~/lang'
import useGetMainMenu from '~/hooks/useGetMainMenu'
import MobileHeader from '~/components/Site/MobileHeader'
import { Link } from 'gatsby'
import { MenuInterface } from '~/utils/resolvers'

type Props = {
  lang: Language
}

type ItemProps = {
  page: {
    uid: string
    url: string
    lang: 'is' | 'en-us'
    tags: string[]
    title: {
      text: string
      html: string
    }
  }
  submenu: MenuInterface
}

const Item = ({ submenu, page }: ItemProps) => {
  const [openSubmenu, setOpenSubmenu] = useState(false)

  return (
    <div>
      <div className='d-flex align-items-center'>
        {submenu ? (
          <button
            onClick={() => setOpenSubmenu(!openSubmenu)}
            className='mr-3 mobile-menu__menu__submenu-button'
          >
            <h2>{openSubmenu ? '-' : '+'}</h2>
          </button>
        ) : null}
        <Link to={page.url} activeClassName='mobile-menu__menu__item--active'>
          <h2>{page.title.text}</h2>
        </Link>
      </div>
      {submenu && openSubmenu && (
        <div className='py-2 px-4'>
          {submenu.items.map((item, key) => (
            <Link
              key={key}
              to={item.page.url}
              activeClassName='mobile-menu__menu__item--active'
            >
              <p>{item.page.title.text}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

const Menu = ({ lang }: { lang: Language }) => {
  useLockBodyScroll()
  const mainmenu = useGetMainMenu().find(node => node.lang === lang)

  if (!mainmenu) return null

  return (
    <div className='mobile-menu__menu px-2'>
      {mainmenu.items.map((item, key) => (
        <Item key={key} {...item} />
      ))}
    </div>
  )
}

const MobileMenu = ({ lang }: Props) => {
  const { open, triggerMobileMenu } = useMobileMenu()
  if (!open) return null

  return (
    <div className='mobile-menu d-block d-lg-none'>
      <MobileHeader bg='bg-white' lang={lang} />
      {open && <Menu lang={lang} />}
    </div>
  )
}

export default MobileMenu
