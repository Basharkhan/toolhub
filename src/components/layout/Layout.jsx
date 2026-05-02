import Navbar from './Navbar'
import PageContainer from './PageContainer'

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="py-10 sm:py-16">
        <PageContainer>{children}</PageContainer>
      </main>
    </div>
  )
}

export default Layout
