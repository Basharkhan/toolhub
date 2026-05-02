import { Link, NavLink } from 'react-router-dom'
import PageContainer from './PageContainer'

function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <PageContainer>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-lg font-semibold tracking-tight">
            ToolHub
          </Link>

          <nav className="flex items-center gap-4 text-sm text-slate-600">
            <NavLink
              to="/age-calculator"
              className={({ isActive }) =>
                isActive ? 'font-medium text-slate-900' : 'hover:text-slate-900'
              }
            >
              Age Calculator
            </NavLink>
            <NavLink
              to="/word-counter"
              className={({ isActive }) =>
                isActive ? 'font-medium text-slate-900' : 'hover:text-slate-900'
              }
            >
              Word Counter
            </NavLink>
          </nav>
        </div>
      </PageContainer>
    </header>
  )
}

export default Navbar
