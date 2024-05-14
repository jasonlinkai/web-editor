import styles from "./ArrangementPanel.module.scss";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import {
  LuAlignHorizontalJustifyStart,
  LuAlignHorizontalJustifyCenter,
  LuAlignHorizontalJustifyEnd,
  LuAlignHorizontalSpaceBetween,
  LuAlignHorizontalSpaceAround,
} from "react-icons/lu";

const ArrangementPanel = observer(() => {
  const { editor } = useStores();
  return (
    <div className={styles.arrangementPanel}>
      <div className={styles.arrangementPanelTitle}>Arrangement</div>
      <div className={styles.arrangementPanelArea}>
        <div className={styles.arrangementPanelItem}>
          <label className={styles.arrangementPanelItemLabel}>
            justify-content
          </label>
          <div className={styles.arrangementPanelItemButtonGroup}>
            <LuAlignHorizontalJustifyStart />
            <LuAlignHorizontalJustifyCenter />
            <LuAlignHorizontalJustifyEnd />
            <LuAlignHorizontalSpaceBetween />
            <LuAlignHorizontalSpaceAround />
          </div>
        </div>
        <div className={styles.arrangementPanelItem}>
          <label className={styles.arrangementPanelItemLabel}>
            align-items
          </label>
          <div className={styles.arrangementPanelItemButtonGroup}>
            <LuAlignHorizontalJustifyStart />
            <LuAlignHorizontalJustifyCenter />
            <LuAlignHorizontalJustifyEnd />
            <LuAlignHorizontalSpaceBetween />
            <LuAlignHorizontalSpaceAround />
          </div>
        </div>
      </div>
    </div>
  );
});

export default ArrangementPanel;
