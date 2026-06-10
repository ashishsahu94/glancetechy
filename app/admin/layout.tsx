'use client'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Cookies from 'js-cookie'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/blogs',     label: 'All Blogs',  icon: '📝' },
  { href: '/admin/blogs/new', label: 'New Blog',   icon: '➕' },
  { href: '/admin/portfolio', label: 'Portfolio', icon: '💼' },
  { href: '/admin/portfolio/new', label: 'New Portfolio', icon: '🎨' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router   = useRouter()

  if (pathname === '/admin/login') return <>{children}</>

  function handleLogout() {
    Cookies.remove('admin_token')
    localStorage.removeItem('admin_token')
    router.push('/admin/login')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: 220, background: '#0f172a', color: '#fff',
        display: 'flex', flexDirection: 'column',
        padding: '1.5rem 1rem', position: 'fixed', height: '100vh',
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: '2rem', paddingLeft: 8 }}>
          ✍️ Blog Admin
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <Link key={item.href} href={item.href} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, marginBottom: 4,
              textDecoration: 'none', fontSize: 14, transition: 'all 0.15s',
              color:      pathname === item.href ? '#fff'        : '#94a3b8',
              background: pathname === item.href ? '#1e40af'     : 'transparent',
              fontWeight: pathname === item.href ? 600           : 400,
            }}>
              <span>{item.icon}</span>{item.label}
            </Link>
          ))}
        </nav>

        <button onClick={handleLogout} style={{
          background: 'transparent', border: '1px solid #334155',
          color: '#94a3b8', borderRadius: 8, padding: '10px 12px',
          cursor: 'pointer', fontSize: 14, textAlign: 'left', width: '100%',
        }}>
          🚪 Logout
        </button>
      </aside>

      {/* ── Main ── */}
      <main style={{
        marginLeft: 220, flex: 1,
        background: '#f8fafc', minHeight: '100vh', padding: '2rem',
      }}>
        {children}
      </main>
    </div>
  )
}
