import { User, CollectionRequest } from '../types';

const STORAGE_KEYS = {
  USERS: 'consus_users',
  REQUESTS: 'consus_requests',
  SCHEDULES: 'consus_schedules',
  LOGGED_USER: 'consus_auth_user'
};

class MockDatabase {
  private get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  }

  private set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Users
  getUsers(): User[] {
    return this.get<User[]>(STORAGE_KEYS.USERS, []);
  }

  saveUser(user: User): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (index > -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    this.set(STORAGE_KEYS.USERS, users);
  }

  // Requests
  getRequests(): CollectionRequest[] {
    return this.get<CollectionRequest[]>(STORAGE_KEYS.REQUESTS, []);
  }

  saveRequest(request: CollectionRequest): void {
    const requests = this.getRequests();
    const index = requests.findIndex(r => r.id === request.id);
    if (index > -1) {
      requests[index] = request;
    } else {
      requests.unshift(request);
    }
    this.set(STORAGE_KEYS.REQUESTS, requests);
  }

  // Auth
  getLoggedUser(): User | null {
    return this.get<User | null>(STORAGE_KEYS.LOGGED_USER, null);
  }

  setLoggedUser(user: User | null): void {
    this.set(STORAGE_KEYS.LOGGED_USER, user);
  }

  // Initial Seed
  seed(): void {
    const existingUsers = this.getUsers();
    
    // Lista de usuários padrão desejados
    const defaultUsers: User[] = [
      {
        id: 'admin-1',
        email: 'admin@consus.com',
        password: 'admin',
        name: 'Administrador Consus',
        role: 'ADMIN',
        createdAt: new Date().toISOString()
      },
      {
        id: 'resident-1',
        email: 'morador@consus.com',
        password: '123456',
        name: 'Morador Teste',
        role: 'MORADOR',
        createdAt: new Date().toISOString()
      },
      {
        id: 'collector-1',
        email: 'coletor@consus.com',
        password: '123456',
        name: 'Carlos Coletor',
        role: 'COLETOR',
        createdAt: new Date().toISOString()
      }
    ];

    // Se não houver usuários, ou se quisermos garantir que os padrão existam
    if (existingUsers.length === 0) {
      defaultUsers.forEach(u => this.saveUser(u));
    } else {
      // Garantir que os usuários padrão específicos existam/estejam atualizados
      defaultUsers.forEach(u => {
        const exists = existingUsers.some(ex => ex.email === u.email);
        if (!exists) {
          this.saveUser(u);
        }
      });
    }

    // Seed de solicitações se estiver vazio
    if (this.getRequests().length === 0) {
      const mockRequests: CollectionRequest[] = [
        // Coletas em andamento
        { id: 'req-1', residentId: 'res-1', apartment: '101', residueType: 'PLASTICO', status: 'EM_ROTA', createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), collectorId: 'collector-1' },
        { id: 'req-2', residentId: 'res-2', apartment: '502', residueType: 'PAPEL', status: 'EM_ROTA', createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), collectorId: 'collector-2' },
        
        // Pendentes (Atividade recente)
        { id: 'req-3', residentId: 'res-3', apartment: '1204', residueType: 'VIDRO', status: 'PENDENTE', createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
        { id: 'req-4', residentId: 'res-4', apartment: '302', residueType: 'METAL', status: 'PENDENTE', createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
        { id: 'req-5', residentId: 'res-5', apartment: '805', residueType: 'ORGANICO', status: 'PENDENTE', createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
        
        // Histórico (Total de coletas)
        ...Array.from({ length: 37 }).map((_, i) => ({
          id: `old-req-${i}`,
          residentId: `res-${i % 5}`,
          apartment: `${100 + i}`,
          residueType: ['PLASTICO', 'PAPEL', 'VIDRO', 'METAL'][i % 4] as any,
          status: 'CONCLUIDO' as const,
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i + 1)).toISOString(),
          collectorId: 'collector-1'
        }))
      ];
      
      mockRequests.forEach(r => this.saveRequest(r));
    }
  }
}

export const db = new MockDatabase();
