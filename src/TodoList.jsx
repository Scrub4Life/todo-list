import React from "react";
import { Draggable } from "react-beautiful-dnd";
import Icon from "@mui/material/Icon";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";

export const TodoList = ({
  todos,
  toggleTodo,
  removeTodo,
  provided,
  displayMode,
}) => {
  return (
    <div>
      <ul
        {...provided.droppableProps}
        ref={provided.innerRef}
        className="flex flex-col prose"
      >
        {todos.map((todo, index) => (
          <Draggable key={todo.id} draggableId={todo.id} index={index}>
            {(provided) => (
              <li
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className={`{todo.completed ? "line-through" : ""} flex items-center border-b-2  ${
                  displayMode ? "text-vlg border-vlg" : "text-vddb border-vddb"
                } text-vlg font-semibold`}
              >
                {/* drag icon */}
                {/* <DragHandleIcon className="text-black" /> */}
                {/* checkbox */}
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  color="default"
                  className={`ml-4 py-0 pl-0 bg-vlg`}
                />
                {todo.text}
                {/* delete icon */}
                <DeleteIcon
                  className="ml-auto text-black mr-3"
                  onClick={() => removeTodo(todo.id)}
                />
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    </div>
  );
};
