import styles from "./WebEditor.module.scss"
import ActionBar from "./ActionBar";
import LeftDrawer from "./LeftDrawer";
import SizerBar from "./SizerBar";
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
          <div className={styles.webEditorMainAreaEditScreen}>
              <SizerBar />
            <div className={styles.webEditorMainAreaEditScreenRendererWrap}>
              <Renderer />
            </div>
          </div>
          <RightDrawer />
        </div>
      </div>
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
