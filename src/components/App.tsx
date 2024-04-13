import { Layout } from "antd";
import SearchBar from "./SearchBar";
import IssuesColumns from "./IssuesColumns";

import styles from "./app.module.css";

const { Header, Content } = Layout;

function App() {
  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <SearchBar />
      </Header>
      <Content>
        <IssuesColumns />
      </Content>
    </Layout>
  );
}

export default App;
