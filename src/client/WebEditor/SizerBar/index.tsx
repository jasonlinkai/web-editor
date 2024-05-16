import styles from "./SizerBar.module.scss";
import { observer } from "mobx-react-lite";
import { FaLaptop, FaMobile } from "react-icons/fa";
import { TbDeviceIpad } from "react-icons/tb";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import ActionButton from "../components/ActionButton";

export const actionBarHeight = 50;

const SizerBar: React.FC = observer(() => {
  const { editor } = useStores();

  return (
    <div
      className={styles.actionBar}
      style={{ height: `${actionBarHeight}px` }}
    >
      <div className={styles.actionBarLeftArea}>
        <ActionButton
          IconComponent={FaLaptop}
          isActive={editor.editorLayout.width === "100%"}
          onClick={() => {
            editor.setEditorLayout({
              width: "100%",
            });
          }}
        >
          Laptop
        </ActionButton>
        <ActionButton
          IconComponent={TbDeviceIpad}
          isActive={editor.editorLayout.width === "768px"}
          onClick={() => {
            editor.setEditorLayout({
              width: "768px",
            });
          }}
        >
          Pad
        </ActionButton>
        <ActionButton
          IconComponent={FaMobile}
          isActive={editor.editorLayout.width === "320px"}
          onClick={() => {
            editor.setEditorLayout({
              width: "320px",
            });
          }}
        >
          Mobile
        </ActionButton>
      </div>
    </div>
  );
});

export default SizerBar;
