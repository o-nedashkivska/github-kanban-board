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
  assignee: string;
  created_at: string;
}

const { Text } = Typography;

const IssueCard: React.FC = ({
  title,
  index,
  number,
  comments,
  created_at,
}: IssueCardProps) => {
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
              {"Admin"} | Comments: {comments}
            </Text>
          </Flex>
        </Card>
      )}
    </Draggable>
  );
};

export default IssueCard;
