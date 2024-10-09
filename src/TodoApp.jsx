import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodoList } from "./TodoList";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Icon from "@mui/material/Icon";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Checkbox from "@mui/material/Checkbox";
import Background from "./Background";

const TodoApp = ({}) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filter, setFilter] = useState("all");
  const [displayMode, setDisplayMode] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const handleFilterClick = (filter) => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  const addTodo = (text) => {
    const newTodo = {
      id: uuidv4(),
      text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleDisplayMode = () => {
    setDisplayMode(!displayMode);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      addTodo(inputValue);
      setInputValue("");
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "all") return true;
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
    });
  }, [todos, filter]);

  const filteredCount = filteredTodos.length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [movedTodo] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, movedTodo);

    setTodos(reorderedTodos);
  };

  return (
    <div className={`${displayMode ? "bg-vdb" : "bg-vlgb"} min-h-screen  `}>
      {/* background header image */}
      <Background displayMode={displayMode} />
      <div
        className={`flex flex-col items-center h-screen absolute w-full top-20 `}
      >
        {/* todo text*/}
        <div
          className={`font-body flex justify-between w-1/3 ${
            displayMode ? "text-vlg" : "text-vddb"
          } `}
        >
          <p
            className={`uppercase tracking-wider text-xl font-bold inline-block `}
          >
            todo
          </p>
          {/* light/dark mode icon */}
          <button className="inline-block">
            {displayMode ? (
              <LightModeIcon className="" onClick={toggleDisplayMode} />
            ) : (
              <DarkModeIcon onClick={toggleDisplayMode} className="" />
            )}
          </button>
        </div>
        {/* todo input box */}
        <div
          className={`flex w-1/3 ${
            displayMode ? "bg-vddb" : "bg-vlg"
          } mt-3 mb-6 border-vdgb1Dark rounded `}
        >
          <Checkbox defaultChecked disabled color="default" className="" />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a new todo"
            className={`w-5/6 my-3 p-2 px-0 
          ${
            displayMode
              ? "bg-vddb text-vlg border-vlg"
              : "bg-vlg text-vdb border-vddb"
          }          
          border-b-2 outline-none font-semibold`}
          />
        </div>
        {/* displaying todo list */}
        <div
          className={`w-1/3 flex flex-col ${
            displayMode ? "bg-vddb" : "bg-vlg"
          } font-josefin rounded `}
        >
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <TodoList
                  todos={filteredTodos}
                  toggleTodo={toggleTodo}
                  removeTodo={removeTodo}
                  provided={provided}
                  displayMode={displayMode}
                />
              )}
            </Droppable>
          </DragDropContext>
          {/* Filter buttons */}
          <div
            className={`flex justify-between items-center py-2 text-dgbDark`}
          >
            <span className="ml-4">{filteredCount} items left</span>
            <div className="flex-1 flex justify-center space-x-4 font-semibold  ">
              <button
                className={`${
                  activeFilter === "all"
                    ? "text-bb"
                    : `${displayMode ? "hover:text-lgbh" : "hover:text-black"}`
                }`}
                onClick={() => handleFilterClick("all")}
              >
                All
              </button>
              <button
                className={`${
                  activeFilter === "active"
                    ? "text-bb"
                    : `${displayMode ? "hover:text-lgbh" : "hover:text-black"}`
                }`}
                onClick={() => handleFilterClick("active")}
              >
                Active
              </button>
              <button
                className={`${
                  activeFilter === "completed"
                    ? "text-bb"
                    : `${displayMode ? "hover:text-lgbh" : "hover:text-black"}`
                }`}
                onClick={() => handleFilterClick("completed")}
              >
                Completed
              </button>
            </div>
            <button
              className={`${
                displayMode ? "hover:text-lgbh" : "hover:text-black"
              } font-semibold mr-4`}
              onClick={clearCompleted}
            >
              Clear Completed
            </button>
          </div>
        </div>
        <span
          className={`${
            displayMode ? "text-lgbDark" : "text-vddb"
          } mt-5 font-semibold`}
        >
          Drag and drop to reorder list
        </span>
      </div>
    </div>
  );
};

export default TodoApp;
