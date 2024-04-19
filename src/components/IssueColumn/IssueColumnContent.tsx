import { useSelector } from "react-redux";
import { Typography } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import IssueCard from "../IssueCard";
import { getCurrentIssuesStatus } from "../../store/selectors";

import styles from "./issues-column.module.css";

interface IssueColumnContentProps {
  columnName: string;
  issues: Array<any>;
}
const { Title } = Typography;

const IssueColumnContent: React.FC<IssueColumnContentProps> = ({
  columnName,
  issues,
}) => {
  const status = useSelector(getCurrentIssuesStatus);

  if (status[columnName] === "loading")
    return <SyncOutlined className={styles.loader} spin />;

  return (
    <>
      {issues.length === 0 ? (
        <Title level={4}>No issues</Title>
      ) : (
        issues.map((issue, index) => (
          <IssueCard key={issue.id} index={index} {...issue} />
        ))
      )}
    </>
  );
};

export default IssueColumnContent;
