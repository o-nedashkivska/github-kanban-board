import { useMemo } from "react";
import { Row } from "antd";
import useOctokit from "../../hooks/useOctokit";
import IssueColumn from "../IssueColumn";

import { filterIssues } from "../../utils/filterIssues";

import styles from "./issues-columns.module.css";

const IssuesColumns: React.FC = () => {
  const { data } = useOctokit("facebook", "react");

  const issues = useMemo(() => data && filterIssues(data), [data]);

  if (!data) return;

  return (
    <Row justify="space-evenly" className={styles.columns}>
      <IssueColumn title="ToDo" issues={issues[0]} />
      <IssueColumn title="In Progress" issues={issues[1]} />
      <IssueColumn title="Done" issues={issues[2]} />
    </Row>
  );
};

export default IssuesColumns;
