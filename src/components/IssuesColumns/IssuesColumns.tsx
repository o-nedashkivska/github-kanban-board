import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Row } from "antd";
import IssueColumn from "../IssueColumn";

import { getCurrentIssuesSelector } from "../../store/selectors";
import { filterIssues } from "../../utils/filterIssues";

import styles from "./issues-columns.module.css";

const IssuesColumns: React.FC = () => {
  const currentIssues = useSelector(getCurrentIssuesSelector);

  const filteredIssues = useMemo(
    () => currentIssues && filterIssues(currentIssues),
    [currentIssues]
  );

  return (
    <Row justify="space-evenly" className={styles.columns}>
      <IssueColumn title="ToDo" issues={filteredIssues?.[0]} />
      <IssueColumn title="In Progress" issues={filteredIssues?.[1]} />
      <IssueColumn title="Done" issues={filteredIssues?.[2]} />
    </Row>
  );
};

export default IssuesColumns;
