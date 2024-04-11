import { useCallback } from "react";
import { Card, Flex, Typography } from "antd";

import { countDaysFromDate } from "../../utils/countDaysFromDate";

import styles from "./issue-card.module.css";

interface IssueCardProps {
  title: string;
  number: number;
  comments: number;
  assignee: string;
  created_at: string;
}

const { Text } = Typography;

const IssueCard: React.FC = ({
  title,
  number,
  comments,
  created_at,
}: IssueCardProps) => {
  const activeTime = countDaysFromDate(created_at);

  const formatActiveTime = useCallback(() => {
    if (!activeTime) return "opened today";

    return `opened ${activeTime} day ${activeTime === 1 ? "" : "s"} ago`;
  }, [activeTime]);

  return (
    <Card size="small" className={styles.card}>
      <Flex vertical>
        <Text>{title}</Text>
        <Text type="secondary">
          #{number} {formatActiveTime()}
        </Text>
        <Text type="secondary">
          {"issue admin"} | Comments: {comments}
        </Text>
      </Flex>
    </Card>
  );
};

export default IssueCard;
