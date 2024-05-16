import styles from "./SizerBar.module.scss";
import { observer } from "mobx-react-lite";
import { FaArrowLeft } from "react-icons/fa";

import { useStores } from "../../mobx/useMobxStateTreeStores";
import ActionButton from "../components/ActionButton";

export const actionBarHeight = 50;

const SizerBar: React.FC = observer(() => {
  const { canUndo, undoAst } = useStores();

  return (
    <div
      className={styles.actionBar}
      style={{ height: `${actionBarHeight}px` }}
    >
      <div className={styles.actionBarLeftArea}>
        <ActionButton
          IconComponent={FaArrowLeft}
          isDisable={!canUndo}
          onClick={canUndo ? undoAst : undefined}
        >
          Undo(ctrl + z)
        </ActionButton>
      </div>
    </div>
  );
});

export default SizerBar;
