import styles from "./Drawer.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { TfiPanel } from "react-icons/tfi";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import PositionPanel from "../../components/panels/PositionPanel";
import LayoutPanel from "../../components/panels/LayoutPanel";
import ArrangementPanel from "../../components/panels/ArrangementPanel";
import TypographyPanel from "../../components/panels/TypographyPanel";
import BorderPanel from "../../components/panels/BorderPanel";
import { useStores } from "../../../mobx/useMobxStateTreeStores";

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
        styles.drawer,
        {
          [styles.drawerOpen]: editor.isRightDrawerOpen,
        },
      ])}
    >
      <div className={styles.drawerTabsArea}>
        <ToggleButtonGroup
          value={tabType}
          exclusive
          onChange={(e: React.MouseEvent<HTMLElement>, v: TabTypes | null) => {
            if (v !== null) {
              setTabType(v);
            }
          }}
          aria-label="left drawer panel type"
        >
          {tabs.map((tab) => {
            const { IconComponent, type } = tab;
            return (
              <ToggleButton value={type} aria-label={type}>
                <IconComponent />
              </ToggleButton>
            );
          })}
        </ToggleButtonGroup>
      </div>
      <div className={styles.drawerPanelArea}>
        {tabType === TabTypes.EDIT_STYLE &&
          (node ? (
            <>
              <PositionPanel />
              <ArrangementPanel />
              <LayoutPanel />
              <BorderPanel />
              <TypographyPanel />
            </>
          ) : (
            <div className={styles.drawerPanelAreaNoSelectedNode}>
              select node first
            </div>
          ))}
      </div>
    </div>
  );
});

export default RightDrawer;
