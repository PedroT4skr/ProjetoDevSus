'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { 
  LayoutDashboard, 
  History, 
  User, 
  LogOut, 
  Leaf,
  Bell,
  Menu,
  X,
  Users,
  Truck
} from 'lucide-react';
import { useState } from 'react';
import styles from './dashboard.module.css';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  const navItems = [
    { label: 'Início', icon: LayoutDashboard, href: '/dashboard' },
    ...(user.role === 'ADMIN' ? [
      { label: 'Moradores', icon: Users, href: '/dashboard/residents' },
      { label: 'Coletores', icon: Truck, href: '/dashboard/collectors' },
    ] : []),
    { label: 'Histórico', icon: History, href: '/dashboard/history' },
    { label: 'Perfil', icon: User, href: '/dashboard/profile' },
  ];

  return (
    <div className={`${styles.container} ${user.role === 'COLETOR' ? styles.collectorTheme : ''}`}>
      {/* Sidebar Desktop */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Leaf size={32} color={user.role === 'COLETOR' ? '#2563eb' : '#10b981'} />
          <span>Consus</span>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <button 
                key={item.label} 
                className={`${styles.navItem} ${isActive ? styles.activeNavItem : ''}`}
                onClick={() => router.push(item.href)}
              >
                <item.icon size={22} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarProfile}>
            <div className={styles.sidebarAvatar}>
              {user.name.charAt(0)}
            </div>
            <div className={styles.sidebarUserDetails}>
              <span className={styles.sidebarUserName}>{user.name}</span>
              <span className={styles.sidebarUserEmail}>{user.email}</span>
            </div>
          </div>
          <button className={styles.logoutButton} onClick={logout}>
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainWrapper}>
        <main className={styles.content}>
          {children}
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.mobileOverlay} onClick={() => setIsMobileMenuOpen(false)}>
          <div className={styles.mobileMenu} onClick={e => e.stopPropagation()}>
             {navItems.map((item) => (
              <button 
                key={item.label} 
                className={styles.navItem}
                onClick={() => {
                  router.push(item.href);
                  setIsMobileMenuOpen(false);
                }}
              >
                <item.icon size={20} />
                {item.label}
              </button>
            ))}
            <button className={styles.logoutButton} onClick={logout}>
              <LogOut size={20} />
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
