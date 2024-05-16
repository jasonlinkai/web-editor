import styles from "./WebEditor.module.scss";
import ActionBar from "./ActionBar";
import LeftDrawer from "./LeftDrawer";
import SizerBar from "./SizerBar";
import Renderer from "./Renderer";
import RightDrawer from "./RightDrawer";
import { MobxStateTreeStoreProvider } from "../mobx/MobxStateTreeProvider";
import UploadModal from "./components/Modals/UploadModal";

const WebEditor: React.FC = () => {
  return (
    <MobxStateTreeStoreProvider>
      <div id="web-editor" className={styles.webEditor}>
        <ActionBar />
        <div className={styles.webEditorMainArea}>
          <LeftDrawer />
          <div className={styles.webEditorMainAreaEditScreen}>
            <SizerBar />
            <Renderer />
          </div>
          <RightDrawer />
        </div>
      </div>
      <UploadModal />
    </MobxStateTreeStoreProvider>
  );
};

export default WebEditor;
