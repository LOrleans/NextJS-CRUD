import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  setDoc, 
  deleteDoc, 
  QueryDocumentSnapshot, 
  SnapshotOptions,
  onSnapshot
} from "firebase/firestore";
import { app } from "../config"; // Importando a instância 'app' que configuramos antes
import Client from "@/src/models/Client";
import ClientRespository from "@/src/models/ClientRepository";

export default class ClientCollection implements ClientRespository {

  #converter = {
    toFirestore(client: Client) {
      return {
        name: client.name,
        age: client.age,
      };
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Client {
      const dados = snapshot.data(options);
      return new Client(dados.name, dados.age, snapshot.id);
    }
  };

  #getCollection() {
    const db = getFirestore(app);
    return collection(db, 'clients').withConverter(this.#converter);
  }

  async save(client: Client): Promise<Client> {
    if (client?.id && client.id.trim() !== "") {
      // Atualizar
      const docRef = doc(this.#getCollection(), client.id);
      await setDoc(docRef, client);
      return client;
    } else {
      // Criar novo
      const docRef = await addDoc(this.#getCollection(), client);
      const snapshot = await getDoc(docRef);
      return snapshot.data() as Client;
    }
  }

  async delete(client: Client): Promise<void> {
    const docRef = doc(this.#getCollection(), client.id);
    return deleteDoc(docRef);
  }

  async getAll(): Promise<Client[]> {
    const snapshot = await getDocs(this.#getCollection());
    return snapshot.docs.map(doc => doc.data()) ?? [];
  }

  subscribe(callback: (clients: Client[]) => void) {
    return onSnapshot(this.#getCollection(), (snapshot) => {
      const clients = snapshot.docs.map(doc => doc.data());
      callback(clients);
    });
  }
}