'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRepository } from '@/services/repositories';
import { Leaf, User, Mail, Building, ArrowRight } from 'lucide-react';
import styles from './register.module.css';
import { UserRole } from '@/lib/types';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    apartment: '',
    role: 'MORADOR' as UserRole,
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existing = await UserRepository.findByEmail(formData.email);
      if (existing) {
        setError('Este e-mail já está em uso.');
        return;
      }

      const newUser = {
        id: crypto.randomUUID(),
        ...formData,
        createdAt: new Date().toISOString()
      };

      await UserRepository.create(newUser);
      login(newUser);
      router.push('/dashboard');
    } catch {
      setError('Erro ao criar conta.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Leaf size={32} color="var(--primary)" />
          </div>
          <h1>Criar Conta</h1>
          <p>Junte-se ao movimento sustentável</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label>Nome Completo</label>
            <div className={styles.inputWrapper}>
              <User size={20} className={styles.icon} />
              <input
                type="text"
                placeholder="João Silva"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <div className={styles.inputWrapper}>
              <Mail size={20} className={styles.icon} />
              <input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Apartamento</label>
              <div className={styles.inputWrapper}>
                <Building size={20} className={styles.icon} />
                <input
                  type="text"
                  placeholder="101A"
                  value={formData.apartment}
                  onChange={(e) => setFormData({...formData, apartment: e.target.value})}
                  required={formData.role === 'MORADOR'}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label>Eu sou...</label>
              <select 
                className={styles.select}
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value as UserRole})}
              >
                <option value="MORADOR">Morador</option>
                <option value="COLETOR">Coletor</option>
              </select>
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Criando...' : (
              <>
                Cadastrar <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Já tem conta? <a href="/login">Entre aqui</a></p>
        </div>
      </div>
    </div>
  );
}
