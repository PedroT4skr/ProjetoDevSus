'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, MoreVertical, Mail, Home, Calendar, ShieldCheck } from 'lucide-react';
import styles from './residents.module.css';

const MOCK_RESIDENTS = [
  { id: 1, name: 'Ana Oliveira', email: 'ana.o@gmail.com', apartment: '101', joined: '12/01/2026', status: 'Ativo', co2: '45kg' },
  { id: 2, name: 'Bruno Santos', email: 'bruno.s@gmail.com', apartment: '402', joined: '15/01/2026', status: 'Ativo', co2: '12kg' },
  { id: 3, name: 'Carla Lima', email: 'carla.l@gmail.com', apartment: '1203', joined: '02/02/2026', status: 'Inativo', co2: '89kg' },
  { id: 4, name: 'Daniel Rocha', email: 'daniel.r@gmail.com', apartment: '505', joined: '10/02/2026', status: 'Ativo', co2: '34kg' },
  { id: 5, name: 'Elena Costa', email: 'elena.c@gmail.com', apartment: '202', joined: '22/02/2026', status: 'Ativo', co2: '156kg' },
  { id: 6, name: 'Fabio Melo', email: 'fabio.m@gmail.com', apartment: '801', joined: '01/03/2026', status: 'Ativo', co2: '28kg' },
  { id: 7, name: 'Gisele Rosa', email: 'gisele.r@gmail.com', apartment: '304', joined: '15/03/2026', status: 'Ativo', co2: '10kg' },
  { id: 8, name: 'Hugo Souza', email: 'hugo.s@gmail.com', apartment: '1102', joined: '28/03/2026', status: 'Pendente', co2: '0kg' },
];

export default function ResidentsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={styles.container}
    >
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h1>Gestão de Moradores</h1>
          <p>Gerencie os moradores cadastrados no sistema e monitore o engajamento.</p>
        </div>
        <button className={styles.addBtn}>
          <Plus size={18} /> Novo Morador
        </button>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Buscar por nome, email ou apartamento..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button className={styles.toolBtn}><Filter size={18} /> Filtros</button>
        </div>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Morador</th>
              <th>Apartamento</th>
              <th>Data de Adesão</th>
              <th>Impacto (CO₂)</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RESIDENTS.map((res) => (
              <tr key={res.id}>
                <td>
                  <div className={styles.userCell}>
                    <div className={styles.avatar}>{res.name.charAt(0)}</div>
                    <div className={styles.info}>
                      <strong>{res.name}</strong>
                      <span>{res.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.iconCell}><Home size={14} /> Apto {res.apartment}</div>
                </td>
                <td>
                  <div className={styles.iconCell}><Calendar size={14} /> {res.joined}</div>
                </td>
                <td>
                  <div className={styles.impactBadge}>{res.co2}</div>
                </td>
                <td>
                  <span className={styles.statusBadge} data-status={res.status}>
                    {res.status}
                  </span>
                </td>
                <td>
                  <button className={styles.moreBtn}><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
