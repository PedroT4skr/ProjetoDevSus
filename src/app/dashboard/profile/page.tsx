'use client';

import { useAuth } from '@/contexts/AuthContext';
import { 
  Mail, 
  Building, 
  Shield, 
  Camera,
  Settings
} from 'lucide-react';
import styles from './profile.module.css';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Meu Perfil</h2>
        <p>Gerencie suas informações pessoais.</p>
      </header>

      <div className={styles.content}>
        <div className={styles.profileCard}>
          <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
              {user.name.charAt(0)}
            </div>
            <button className={styles.cameraButton}>
              <Camera size={16} />
            </button>
          </div>
          <div className={styles.profileHeader}>
            <h3>{user.name}</h3>
            <span className={styles.roleTag}>{user.role}</span>
          </div>

          <div className={styles.infoList}>
            <div className={styles.infoItem}>
              <Mail size={18} />
              <div>
                <label>E-mail</label>
                <p>{user.email}</p>
              </div>
            </div>
            {user.role === 'MORADOR' && (
              <div className={styles.infoItem}>
                <Building size={18} />
                <div>
                  <label>Residência</label>
                  <p>Apartamento {user.apartment} {user.block ? `• Bloco ${user.block}` : ''}</p>
                </div>
              </div>
            )}
            <div className={styles.infoItem}>
              <Shield size={18} />
              <div>
                <label>Status da Conta</label>
                <p>Verificada</p>
              </div>
            </div>
          </div>

          <button className={styles.editButton}>
            Editar Perfil
          </button>
        </div>

        <div className={styles.settingsCard}>
          <div className={styles.settingsHeader}>
            <Settings size={20} />
            <h4>Configurações</h4>
          </div>
          <div className={styles.settingItem}>
            <div>
              <span>Notificações por E-mail</span>
              <p>Receba alertas sobre suas coletas.</p>
            </div>
            <div className={styles.toggle}></div>
          </div>
          <div className={styles.settingItem}>
            <div>
              <span>Modo Escuro</span>
              <p>Alterne a aparência da interface.</p>
            </div>
            <div className={styles.toggle}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
