import { Col, Typography, Flex } from "antd";
import IssueCard from "../IssueCard";

import styles from "./issues-column.module.css";

interface IssueColumnProps {
  title: string;
  issues: Array<any>;
}

const { Title } = Typography;

const IssueColumn: React.FC<IssueColumnProps> = ({
  title,
  issues = [],
}: IssueColumnProps) => {
  return (
    <Col span={6} className={styles.column}>
      <Title level={4} className={styles["column__title"]}>
        {title}
      </Title>
      <Flex
        gap="middle"
        align="center"
        vertical
        className={styles["column__content"]}
      >
        {issues.length === 0 ? (
          <Title level={4}>No issues</Title>
        ) : (
          issues.map((issue) => <IssueCard key={issue.id} {...issue} />)
        )}
      </Flex>
    </Col>
  );
};

export default IssueColumn;
