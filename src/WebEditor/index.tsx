import styles from "./WebEditor.module.scss"
import ActionBar from "./ActionBar";
import LeftDrawer from "./LeftDrawer";
import Renderer from "./Renderer";
import RightDrawer from "./RightDrawer";
import { MobxStateTreeStoreProvider } from "../mobx/MobxStateTreeProvider";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <div id="web-editor" className={styles.webEditor}>
        <ActionBar />
        <div className={styles.webEditorMainArea}>
          <LeftDrawer />
          <Renderer />
          <RightDrawer />
        </div>
      </div>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
