import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const navItems = [
    { href: '/', label: 'Rozvrh', icon: '📅' },
    { href: '/teachers', label: 'Učitelé', icon: '👨‍🏫' },
    { href: '/classes', label: 'Třídy', icon: '🎓' },
    { href: '/subjects', label: 'Předměty', icon: '📚' },
    { href: '/classrooms', label: 'Učebny', icon: '🏫' },
    { href: '/classroom-types', label: 'Typy učeben', icon: '🎨' },
    { href: '/study-programs', label: 'Obor', icon: '📋' },
    { href: '/import-export', label: 'Import/Export', icon: '📁' }
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 0'
          }}>
            <h1 style={{ color: '#2563eb', margin: 0 }}>Rozvrh školy</h1>
            <div style={{ fontSize: '14px', color: '#666' }}>
              Systém pro tvorbu a správu rozvrhů
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav style={{
        background: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '20px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'flex',
            gap: '5px',
            overflowX: 'auto',
            padding: '10px 0'
          }}>
            {navItems.map(item => (
              <Link 
                key={item.href} 
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: router.pathname === item.href ? 'white' : '#374151',
                  background: router.pathname === item.href ? '#2563eb' : 'transparent',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{
        marginTop: '40px',
        padding: '20px',
        background: 'white',
        borderTop: '1px solid #e5e7eb',
        textAlign: 'center',
        color: '#666',
        fontSize: '14px'
      }}>
        <p>© 2024 Rozvrh školy - Vytvořeno s Next.js</p>
      </footer>
    </div>
  );
};

export default Layout;
