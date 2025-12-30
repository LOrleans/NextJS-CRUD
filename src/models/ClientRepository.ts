import Client from "./Client";

export default interface ClientRepository {
  save(client: Client): Promise<Client>
  delete(client: Client): Promise<void>
  getAll(): Promise<Client[]>
  // Snapshot
  subscribe(callback: (clients: Client[]) => void): () => void
}