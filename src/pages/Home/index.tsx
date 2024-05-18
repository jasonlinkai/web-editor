import { observer } from "mobx-react-lite";
import styles from "./Home.module.scss";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import { useNavigate } from "react-router-dom";

const Home = observer(() => {
  const navigate = useNavigate();
  const { pages, setSelectedPage } = useStores();
  return (
    <div className={styles.home}>
      <h1 className={styles.homeTitle}>web-editor.js</h1>
      <div className={styles.previousWork}>
        <h2 className={styles.previousWorkTitle}>Here is your previous works</h2>
        <div className={styles.previousWorkArea}>
          {pages.map((page) => {
            return (
              <div key={page.uuid} onClick={() => {
                setSelectedPage(page);
                navigate('/web-editor');
              }}>
                {page.title}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default Home;
