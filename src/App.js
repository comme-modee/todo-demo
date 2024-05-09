import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import api from "./utils/api"

function App() {
  const [ todoList, setTodoList ] = useState([]);
  const [ addTaskValue, setAddTaskValue ] = useState('');

  const addTask = async () => {
    const res = await api.post('/tasks', {
      task: addTaskValue,
      isComplete: false
    })
    if(res.status === 200) {
      getTasks()
      setAddTaskValue('')
    } else {
      console.log('등록 실패')
    }
  }

  const getTasks = async () => {
    const res = await api.get('/tasks')
    setTodoList(res.data.data)
  }

  const deleteTask = async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    if(res.status === 200) {
      getTasks()
    } 
  }

  const toggleComplete = async (id) => {
    try {
      const res = await api.put(`/tasks/${id}`);
      if(res.status === 200) {
        getTasks()
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(()=>{
    getTasks()
  },[])

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={addTaskValue}
            onChange={(e) => setAddTaskValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={() => addTask(addTaskValue)}>추가</button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} toggleComplete={toggleComplete}/>
    </Container>
  );
}

export default App;
