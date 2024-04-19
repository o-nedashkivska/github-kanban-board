import { Col, Typography, Flex } from "antd";
import IssueColumnContent from "./IssueColumnContent";
import { Droppable } from "react-beautiful-dnd";

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
      <Droppable droppableId={columnName}>
        {(provided, snapshot) => (
          <Flex
            ref={provided.innerRef}
            {...provided.droppableProps}
            gap="middle"
            align="center"
            vertical
            className={styles["column__content"]}
            style={{
              backgroundColor: snapshot.isDraggingOver && "#69b1ff",
            }}
          >
            <IssueColumnContent columnName={columnName} issues={issues} />
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Col>
  );
};

export default IssueColumn;
