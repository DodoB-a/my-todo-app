import { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [newTodo, setNewTodo] = useState("");

  // Ukladanie do localStorage pri zmene todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos([...todos, { text: newTodo, done: false }]);
    setNewTodo("");
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].done = !newTodos[index].done;
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div style={{ backgroundColor: 'aquamarine', minHeight: '100vh' }}>
      <h1>Moja Todo App</h1>

      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          style={{ flex: 1, padding: "8px" }}
        />
        <button onClick={addTodo} style={{ padding: "8px 12px", marginLeft: "8px" }}>
          Add
        </button>
      </div>

      {todos.map((todo, index) => (
        <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
          <input type="checkbox" checked={todo.done} onChange={() => toggleTodo(index)} />
          <span style={{ textDecoration: todo.done ? "line-through" : "none", flex: 1, marginLeft: "8px" }}>
            {todo.text}
          </span>
          <button onClick={() => deleteTodo(index)} style={{ marginLeft: "8px" }}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
