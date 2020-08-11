import UseCasesPort from "../Ports/UseCases";

import createTodoItem from './CreateTodoItem';
import updateTodoItem from './UpdateTodoItem';
import deleteTodoItem from './DeleteTodoItem';
import fetchTodoItem from './FetchTodoItem';
import listTodoItems from './ListTodoItems';

const useCases: UseCasesPort = {
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
  fetchTodoItem,
  listTodoItems
}

export default useCases;