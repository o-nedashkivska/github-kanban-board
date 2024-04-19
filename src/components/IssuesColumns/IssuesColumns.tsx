import { useSelector } from "react-redux";
import { Row } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import IssueColumn from "../IssueColumn";

import { getCurrentIssuesSelector } from "../../store/selectors";

import styles from "./issues-columns.module.css";

const IssuesColumns: React.FC = () => {
  const currentIssues = useSelector(getCurrentIssuesSelector);

  const { toDo = [], inProgress = [], done = [] } = currentIssues || {};

  const handleDragEnd = (result) => {
    console.log(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Row justify="space-evenly" className={styles.columns}>
        <IssueColumn title="ToDo" columnName="toDo" issues={toDo} />
        <IssueColumn
          title="In Progress"
          columnName="inProgress"
          issues={inProgress}
        />
        <IssueColumn title="Done" columnName="done" issues={done} />
      </Row>
    </DragDropContext>
  );
};

export default IssuesColumns;
