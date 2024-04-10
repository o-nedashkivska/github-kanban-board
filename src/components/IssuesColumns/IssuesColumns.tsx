// import useOctokit from "../../hooks/useOctokit";
import { Row } from "antd";
import IssueColumn from "../IssueColumn";

import styles from "./issues-columns.module.css";

const IssuesColumns: React.FC = () => {
  // const { data } = useOctokit("facebook", "react");
  // console.log(data, "data");

  return (
    <Row justify="space-evenly" className={styles.columns}>
      <IssueColumn title="ToDo" />
      <IssueColumn title="In Progress" />
      <IssueColumn title="Done" />
    </Row>
  );
};

export default IssuesColumns;
