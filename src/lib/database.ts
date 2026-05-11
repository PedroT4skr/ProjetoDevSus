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
  }
}

export const db = new MockDatabase();
