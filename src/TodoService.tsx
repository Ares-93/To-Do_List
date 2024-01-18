import TodoTypes from "./todo";

const LOCAL_STORAGE_KEY = "todos";

const TodoService = {
  //Retrieve list of Todos
  getTodos: (): TodoTypes[] => {
    const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY);
    return todoStr ? JSON.parse(todoStr) : [];
  },

  //Adding Todos
  addTodos: (text: string): TodoTypes => {
    const todos = TodoService.getTodos(); //gets list from prev func
    const newTodo: TodoTypes = { id: todos.length + 1, text, completed: false };

    const updateTodos = [...todos, newTodo];
    //convert updated todos to JSON and put in local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));

    return newTodo;
  },

  //Updating the TODO
  updateTodo: (todo: TodoTypes): TodoTypes => {
    const todos = TodoService.getTodos();

    //for each todo check if ID matches the ID of provided todos

    const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t)); //if mathches updates todo with provided, else nothing is changed
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    return todo;
  },

  //Deleting the todo
  deleteTodo: (id: number): void => {
    const todos = TodoService.getTodos();
    //new array will keep only todos whos ID dont match

    const updateTodos = todos.filter((todo) => todo.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
  },
};

export default TodoService;
