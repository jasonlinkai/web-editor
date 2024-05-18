import styles from "./WebEditor.module.scss";
import ActionBar from "./components/ActionBar";
import LeftDrawer from "./components/Drawers/LeftDrawer";
import SizerBar from "./components/SizerBar";
import Renderer from "./Renderer";
import RightDrawer from "./components/Drawers/RightDrawer";
import UploadModal from "./components/Modals/UploadModal";
import ImageGalleryModal from "./components/Modals/ImageGalleryModal";

const WebEditor: React.FC = () => {
  return (
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
      <UploadModal />
      <ImageGalleryModal />
    </div>
  );
};

export default WebEditor;
