import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PageContainer from './PageContainer'

const NAV_LINKS = [
  { to: '/age-calculator', label: 'Age Calculator' },
  { to: '/bmi-calculator', label: 'BMI Calculator' },
  { to: '/word-counter', label: 'Word Counter' },
  { to: '/password-generator', label: 'Password Generator' },
]

function MobileMenu({ isMenuOpen, onCloseMenu, mobileLinkClassName }) {
  return (
    <div
      aria-hidden={!isMenuOpen}
      className={`absolute left-0 right-0 top-full z-20 border-b border-slate-200 bg-white shadow-sm transition-all duration-200 ease-out md:hidden ${
        isMenuOpen
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-1 opacity-0'
      }`}
    >
      <PageContainer>
        <nav className="py-3">
          <div className="flex flex-col gap-2 text-sm">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLinkClassName}
                onClick={onCloseMenu}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      </PageContainer>
    </div>
  )
}

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef(null)

  function handleToggleMenu() {
    setIsMenuOpen((current) => !current)
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  const linkClassName = ({ isActive }) =>
    isActive ? 'font-medium text-slate-900' : 'hover:text-slate-900'
  const mobileLinkClassName = ({ isActive }) =>
    `rounded-xl px-3 py-2.5 transition-colors ${
      isActive
        ? 'bg-slate-100 font-medium text-slate-900'
        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
    }`

  useEffect(() => {
    function handlePointerDown(event) {
      if (!isMenuOpen || !headerRef.current) {
        return
      }

      if (!headerRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isMenuOpen])

  return (
    <header
      ref={headerRef}
      className="relative overflow-x-clip border-b border-slate-200 bg-white"
    >
      <PageContainer>
        <div className="flex h-16 w-full items-center justify-between gap-3">
          <Link
            to="/"
            onClick={closeMenu}
            className="min-w-0 flex-1 truncate text-lg font-semibold tracking-tight"
          >
            ToolHub
          </Link>

          <nav className="hidden items-center gap-4 text-sm text-slate-600 md:flex">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className={linkClassName}>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleToggleMenu}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 md:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </PageContainer>

      <MobileMenu
        isMenuOpen={isMenuOpen}
        onCloseMenu={closeMenu}
        mobileLinkClassName={mobileLinkClassName}
      />
    </header>
  )
}

export default Navbar
