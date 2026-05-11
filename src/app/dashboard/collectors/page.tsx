'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, MoreVertical, Phone, Star, ShieldCheck } from 'lucide-react';
import styles from './collectors.module.css';

export default function CollectorsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock de coletores
  const collectors = [
    { id: 1, name: 'João Silva', phone: '(11) 98888-1111', status: 'DISPONÍVEL', rating: 4.9, activeColetas: 0, color: '#3b82f6' },
    { id: 2, name: 'Maria Oliveira', phone: '(11) 97777-2222', status: 'EM COLETA', rating: 4.8, activeColetas: 2, color: '#10b981' },
    { id: 3, name: 'Pedro Santos', phone: '(11) 96666-3333', status: 'DISPONÍVEL', rating: 5.0, activeColetas: 0, color: '#8b5cf6' },
    { id: 4, name: 'Lucia Braga', phone: '(11) 95555-4444', status: 'OFFLINE', rating: 4.7, activeColetas: 0, color: '#f43f5e' },
  ];

  const filteredCollectors = collectors.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={styles.container}
    >
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Gestão de Coletores</h1>
          <p>Supervisione a equipe de coleta e garanta a eficiência do condomínio.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} /> Novo Coletor
        </button>
      </header>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className={styles.filterBtn}>
          <Filter size={18} /> Filtros
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coletor</th>
              <th>Status</th>
              <th>Avaliação</th>
              <th>Coletas Ativas</th>
              <th>Contato</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredCollectors.map((col) => (
              <tr key={col.id}>
                <td>
                  <div className={styles.userName}>
                    <div className={styles.avatar} style={{ background: col.color }}>{col.name.split(' ').map(n => n[0]).join('')}</div>
                    <div className={styles.nameInfo}>
                      <span>{col.name}</span>
                      <div className={styles.verified}><ShieldCheck size={12} /> Verificado</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.statusBadge} data-status={col.status}>
                    {col.status}
                  </span>
                </td>
                <td>
                  <div className={styles.ratingInfo}>
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span>{col.rating}</span>
                  </div>
                </td>
                <td>
                  <span className={styles.activeColetas}>{col.activeColetas}</span>
                </td>
                <td>
                   <div className={styles.phoneInfo}>
                      <Phone size={14} /> {col.phone}
                   </div>
                </td>
                <td>
                  <button className={styles.actionBtn}><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
