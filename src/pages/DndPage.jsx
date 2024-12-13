import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useNavigate } from 'react-router-dom';
import '../DndPage.css'; 

function DndPage() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        { id: "1", content: "First task" },
        { id: "2", content: "Second task" },
      ],
    },
    inProgress: {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done",
      items: [],
    },
    blocked: {
      name: "Blocked",
      items: [],
    },
  });

  const navigate = useNavigate();

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destinationColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      //вставляем removed обратно в эту же колонку по нужному индексу
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destItems,
        },
      });
    }
  };

  const handleDeleteTask = (columnId, taskId) => {
    const updatedColumn = {
      ...columns[columnId],
      items: columns[columnId].items.filter((item) => item.id !== taskId),
    };
    setColumns({
      ...columns,
      [columnId]: updatedColumn,
    });
  };

  return (
    <div>
      <button className="button" onClick={() => navigate('/')}>
        Go to Todo Page
      </button>

      <div className="columns">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columns).map(([columnId, column], index) => (
            <div className="column" key={columnId}>
              <h2 className="column-header">{column.name}</h2>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`droppable ${snapshot.isDraggingOver ? 'droppable-dragging' : 'droppable-default'}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`draggable ${snapshot.isDragging ? 'draggable-dragging' : ''}`}
                          >
                            {item.content}
                            <button
                              className="delete-button"
                              onClick={() => handleDeleteTask(columnId, item.id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default DndPage;
