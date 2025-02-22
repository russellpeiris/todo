import { Flex } from "antd";
import "antd/dist/reset.css";
import { AddTask, TaskList } from "./components";

const App = () => {


  return (
    <Flex justify="center" align="center" style={{ height: "100vh" }}>
      <AddTask />
      <div className="vl"></div>
      <TaskList />
    </Flex>
  );
};

export default App;
