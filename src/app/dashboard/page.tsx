'use client';

import { useAuth } from '@/contexts/AuthContext';
import ResidentDashboard from '@/features/ResidentDashboard';
import CollectorDashboard from '@/features/CollectorDashboard';
import AdminDashboard from '@/features/AdminDashboard';

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  switch (user.role) {
    case 'MORADOR':
      return <ResidentDashboard />;
    case 'COLETOR':
      return <CollectorDashboard />;
    case 'ADMIN':
      return <AdminDashboard />;
    default:
      return <div>Função não reconhecida.</div>;
  }
}
