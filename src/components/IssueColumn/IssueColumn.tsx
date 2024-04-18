import { Col, Typography, Flex } from "antd";
import IssueColumnContent from "./IssueColumnContent";

import styles from "./issues-column.module.css";

interface IssueColumnProps {
  title: string;
  columnName: string;
  issues: Array<any>;
}

const { Title } = Typography;

const IssueColumn: React.FC<IssueColumnProps> = ({
  title,
  columnName,
  issues = [],
}) => {
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
        <IssueColumnContent columnName={columnName} issues={issues} />
      </Flex>
    </Col>
  );
};

export default IssueColumn;
