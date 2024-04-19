import { useSelector, useDispatch } from "react-redux";
import { Row } from "antd";
import { DragDropContext } from "react-beautiful-dnd";
import IssueColumn from "../IssueColumn";

import { getCurrentIssues, getCurrentRepoName } from "../../store/selectors";
import { changeIssueStatus } from "../../store";

import styles from "./issues-columns.module.css";

const IssuesColumns: React.FC = () => {
  const dispatch = useDispatch();
  const currentIssues = useSelector(getCurrentIssues);
  const repoName = useSelector(getCurrentRepoName);

  const { toDo = [], inProgress = [], done = [] } = currentIssues || {};

  const handleDragEnd = (result) => {
    const { source, destination } = result;

    const sameSpot =
      source.index === destination.index &&
      source.droppableId === destination.droppableId;

    if (!destination || sameSpot) {
      return;
    }

    dispatch(changeIssueStatus({ repoName, source, destination }));
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
