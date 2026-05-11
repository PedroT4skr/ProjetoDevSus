'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRepository } from '@/services/repositories';
import { Leaf, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Em mock não validamos senha, mas simulamos
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Simulação de delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const user = await UserRepository.findByEmail(email);
      
      if (user) {
        login(user);
        router.push('/dashboard');
      } else {
        setError('Usuário não encontrado. Experimente: admin@devsus.com ou joao@coletor.com');
      }
    } catch {
      setError('Ocorreu um erro ao tentar entrar.');
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
          <h1>Bem-vindo ao DevSus</h1>
          <p>Entre na sua conta para gerenciar suas coletas</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">E-mail</label>
            <div className={styles.inputWrapper}>
              <Mail size={20} className={styles.icon} />
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Senha</label>
            <div className={styles.inputWrapper}>
              <Lock size={20} className={styles.icon} />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? 'Entrando...' : (
              <>
                Entrar <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Ainda não tem conta? <a href="/register">Cadastre-se</a></p>
        </div>
      </div>
      
      <div className={styles.info}>
        <div className={styles.infoBadge}>
          <ShieldCheck size={16} /> 100% Sustentável
        </div>
        <p>Acesse o futuro da gestão de resíduos.</p>
      </div>
    </div>
  );
}
