import { db } from '../lib/database';
import { CollectionRequest, User, RequestStatus } from '../lib/types';

export class RequestRepository {
  static async getAll(): Promise<CollectionRequest[]> {
    return db.getRequests();
  }

  static async getByResident(residentId: string): Promise<CollectionRequest[]> {
    return (await this.getAll()).filter(r => r.residentId === residentId);
  }

  static async getByCollector(collectorId: string): Promise<CollectionRequest[]> {
    return (await this.getAll()).filter(r => r.collectorId === collectorId);
  }

  static async getPending(): Promise<CollectionRequest[]> {
    return (await this.getAll()).filter(r => r.status === 'PENDENTE');
  }

  static async create(data: Omit<CollectionRequest, 'id' | 'createdAt'>): Promise<CollectionRequest> {
    const newRequest: CollectionRequest = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString()
    };
    db.saveRequest(newRequest);
    return newRequest;
  }

  static async updateStatus(id: string, status: RequestStatus, collectorId?: string): Promise<void> {
    const requests = await this.getAll();
    const request = requests.find(r => r.id === id);
    if (request) {
      request.status = status;
      if (collectorId) request.collectorId = collectorId;
      db.saveRequest(request);
    }
  }
}

export class UserRepository {
  static async findByEmail(email: string): Promise<User | undefined> {
    return db.getUsers().find(u => u.email === email);
  }

  static async create(user: User): Promise<void> {
    db.saveUser(user);
  }
}
