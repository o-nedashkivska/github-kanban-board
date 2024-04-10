import { Card, Flex, Typography } from "antd";

import styles from "./issue-card.module.css";

const { Text } = Typography;

const IssueCard: React.FC = () => {
  return (
    <Card size="small" className={styles.card}>
      <Flex vertical>
        <Text>{"Issue title"}</Text>
        <Text type="secondary">
          {"# issue number"} {"issue open time"}
        </Text>
        <Text type="secondary">
          {"issue admin"} | Comments: {"3"}
        </Text>
      </Flex>
    </Card>
  );
};

export default IssueCard;
