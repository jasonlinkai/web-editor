import styles from "./RightDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import PositionPanel from "./panels/PositionPanel";
import LayoutPanel from "./panels/LayoutPanel";
import ArrangementPanel from "./panels/ArrangementPanel";
import NewNodePanel from "./panels/NewNodePanel";
import AstTagTreePanel from "./panels/AstTagTreePanel";
import { actionBarHeight } from "../ActionBar";
import { astTagTreePanelHeight } from "./panels/AstTagTreePanel";
import ActionButton from "../components/ActionButton";
import { FaPlus } from "react-icons/fa";
import { TfiPanel } from "react-icons/tfi";
import { useState } from "react";

enum TabTypes {
  ADD_CHILDREN = "ADD_CHILDREN",
  EDIT_STYLE = "EDIT_STYLE",
}
const tabs = [
  {
    type: TabTypes.ADD_CHILDREN,
    IconComponent: FaPlus,
  },
  {
    type: TabTypes.EDIT_STYLE,
    IconComponent: TfiPanel,
  },
];

const RightDrawer: React.FC = observer(() => {
  const { editor } = useStores();
  const node = editor.selectedAstNode;
  const [tabType, setTabType] = useState(TabTypes.ADD_CHILDREN);
  return (
    <div
      className={clsx([
        styles.rightDrawer,
        {
          [styles.rightDrawerOpen]: editor.isRightDrawerOpen,
        },
      ])}
    >
      <div className={styles.rightDrawerTabsArea}>
        {tabs.map((tab) => {
          const { IconComponent, type } = tab;
          return (
            <ActionButton
              IconComponent={IconComponent}
              isActive={type === tabType}
              onClick={() => {
                setTabType(type);
              }}
            />
          );
        })}
      </div>
      <div
        className={styles.rightDrawerPanelArea}
        style={{
          height: window.innerHeight - actionBarHeight - astTagTreePanelHeight,
        }}
      >
        {node ? (
          <>
            {tabType === TabTypes.ADD_CHILDREN && (
              <>
                <NewNodePanel />
              </>
            )}
            {tabType === TabTypes.EDIT_STYLE && (
              <>
                <PositionPanel />
                <LayoutPanel />
                <ArrangementPanel />
              </>
            )}
          </>
        ) : (
          <div className={styles.rightDrawerPanelAreaNoSelectedNode}>
            select node first
          </div>
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
