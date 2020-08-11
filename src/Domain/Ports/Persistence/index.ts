import TodoRepo from './TodoRepo';

interface PersistencePort {
  todoRepo: TodoRepo
}

export default PersistencePort