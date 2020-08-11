import PersistencePort from "src/Domain/Ports/Persistence";
import todoRepo from './TodoRepoImpl';

const persistenceInMemoryAdapter: PersistencePort = {
  todoRepo
}

export default persistenceInMemoryAdapter;