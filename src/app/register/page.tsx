'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserRepository } from '@/services/repositories';
import { Leaf, User, Mail, Building, ArrowRight, Lock, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './register.module.css';
import { UserRole } from '@/lib/types';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
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
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.header}>
          <motion.div 
            className={styles.logo}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
          >
            <Leaf size={32} color="var(--primary)" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Criar Conta
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Junte-se ao movimento sustentável
          </motion.p>
        </div>

        <motion.div 
          className={styles.roleToggle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            type="button"
            className={`${styles.roleButton} ${formData.role === 'MORADOR' ? styles.activeRole : ''}`}
            onClick={() => setFormData({ ...formData, role: 'MORADOR' })}
          >
            <User size={18} /> Sou Morador
          </button>
          <button
            type="button"
            className={`${styles.roleButton} ${formData.role === 'COLETOR' ? styles.activeRole : ''}`}
            onClick={() => setFormData({ ...formData, role: 'COLETOR' })}
          >
            <Truck size={18} /> Sou Coletor
          </button>
        </motion.div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <motion.div 
            className={styles.inputGroup}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
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
          </motion.div>

          <motion.div 
            className={styles.inputGroup}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
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
          </motion.div>

          <motion.div 
            className={styles.inputGroup}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label>Senha</label>
            <div className={styles.inputWrapper}>
              <Lock size={20} className={styles.icon} />
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {formData.role === 'MORADOR' && (
              <motion.div 
                key="apartment-field"
                className={styles.inputGroup}
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                style={{ overflow: 'hidden' }}
              >
                <label>Apartamento</label>
                <div className={styles.inputWrapper}>
                  <Building size={20} className={styles.icon} />
                  <input
                    type="text"
                    placeholder="101A"
                    value={formData.apartment}
                    onChange={(e) => setFormData({...formData, apartment: e.target.value})}
                    required
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div 
              className={styles.error}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {error}
            </motion.div>
          )}

          <motion.button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isLoading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Criando...' : (
              <>
                Cadastrar <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div className={styles.footer}>
          <p>Já tem conta? <a href="/login">Entre aqui</a></p>
        </div>
      </motion.div>
    </div>
  );
}
