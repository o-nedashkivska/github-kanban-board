import { Layout } from "antd";
import IssuesColumns from "./IssuesColumns";

import styles from "./app.module.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className={styles.layout}>
      <Header>Header</Header>
      <Content>
        <IssuesColumns />
      </Content>
    </Layout>
  );
}

export default App;
