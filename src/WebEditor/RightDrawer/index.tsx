import styles from "./RightDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import PositionPanel from "../components/panels/PositionPanel";
import LayoutPanel from "../components/panels/LayoutPanel";
import ArrangementPanel from "../components/panels/ArrangementPanel";
import TypographyPanel from "../components/panels/TypographyPanel"
import AstTagTreePanel from "../components/panels/AstTagTreePanel";
import { actionBarHeight } from "../ActionBar";
import { astTagTreePanelHeight } from "../components/panels/AstTagTreePanel";
import ActionButton from "../components/ActionButton";
import { TfiPanel } from "react-icons/tfi";
import { useState } from "react";

enum TabTypes {
  EDIT_STYLE = "EDIT_STYLE",
}
const tabs = [
  {
    type: TabTypes.EDIT_STYLE,
    IconComponent: TfiPanel,
  },
];

const RightDrawer: React.FC = observer(() => {
  const { editor } = useStores();
  const node = editor.selectedAstNode;
  const [tabType, setTabType] = useState(TabTypes.EDIT_STYLE);
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
              key={type}
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
        {tabType === TabTypes.EDIT_STYLE &&
          (node ? (
            <>
              <PositionPanel />
              <LayoutPanel />
              <ArrangementPanel />
              <TypographyPanel />
            </>
          ) : (
            <div className={styles.rightDrawerPanelAreaNoSelectedNode}>
              select node first
            </div>
          ))}
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
