import styles from "./RightDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import PositionPanel from "./panels/PositionPanel";
import LayoutPanel from "./panels/LayoutPanel";
import ArrangementPanel from "./panels/ArrangementPanel";
import AstTagTreePanel from "./panels/AstTagTreePanel";
import { actionBarHeight } from "../ActionBar";
import { astTagTreePanelHeight } from "./panels/AstTagTreePanel";

const RightDrawer: React.FC = observer(() => {
  const { editor } = useStores();
  const node = editor.selectedAstNode;
  return (
    <div
      className={clsx([
        styles.rightDrawer,
        {
          [styles.rightDrawerOpen]: editor.isRightDrawerOpen,
        },
      ])}
    >
      <div
        className={styles.rightDrawerPanelArea}
        style={{
          height: window.innerHeight - actionBarHeight - astTagTreePanelHeight,
        }}
      >
        {node ? (
          <>
            <PositionPanel />
            <LayoutPanel />
            <ArrangementPanel />
          </>
        ) : (
          <div className={styles.rightDrawerPanelAreaNoSelectedNode}>select node first</div>
        )}
      </div>
      <div className={styles.gap} />
      <div
        className={styles.rightDrawerTreeArea}
        style={{ height: astTagTreePanelHeight + 115 }}
      >
        <AstTagTreePanel />
      </div>
    </div>
  );
});

export default RightDrawer;
