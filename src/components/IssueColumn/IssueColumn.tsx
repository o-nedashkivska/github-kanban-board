import { Col, Typography, Flex } from "antd";
import IssueCard from "../IssueCard";

import styles from "./issues-column.module.css";

interface IssueColumnProps {
  title: string;
}

const { Title } = Typography;

const IssueColumn: React.FC<IssueColumnProps> = ({
  title,
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
        <IssueCard />
        <IssueCard />
        <IssueCard />
      </Flex>
    </Col>
  );
};

export default IssueColumn;
