import { useMemo } from "react";
import { Card, Flex, Typography } from "antd";
import { Draggable } from "react-beautiful-dnd";

import { formatCreatedAt } from "../../utils/formatCreatedAt";

import styles from "./issue-card.module.css";

interface IssueCardProps {
  index: number;
  title: string;
  number: number;
  comments: number;
  assignee: null | Partial<{ login: string }>;
  created_at: Date;
}

const { Text } = Typography;

const IssueCard: React.FC<IssueCardProps> = ({
  title,
  index,
  number,
  comments,
  assignee,
  created_at,
}) => {
  assignee = assignee ?? { login: "No assignee" };

  const activeTime = useMemo(() => formatCreatedAt(created_at), [created_at]);

  return (
    <Draggable draggableId={created_at} index={index}>
      {(provided, snapshot) => (
        <Card
          size="small"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={styles.card}
          style={{
            ...provided.draggableProps.style,
            backgroundColor: snapshot.isDragging && "#e6f4ff",
          }}
        >
          <Flex vertical>
            <Text>{title}</Text>
            <Text type="secondary">
              #{number} {activeTime}
            </Text>
            <Text type="secondary">
              {assignee.login} | Comments: {comments}
            </Text>
          </Flex>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;
