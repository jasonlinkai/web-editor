import styles from "./Drawer.module.scss";
import clsx from "clsx";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { FaPlus } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InfoPanel from "../../components/panels/InfoPanel";
import NewNodePanel from "../../components/panels/NewNodePanel";
import AstTagTreePanel from "../../components/panels/AstTagTreePanel";
import SnippetsPanel from "../../components/panels/SnippetsPanel";
import { useStores } from "../../../mobx/useMobxStateTreeStores";

enum TabTypes {
  INFO = "INFO",
  ADD_CHILDREN = "ADD_CHILDREN",
  ADD_SNIPPETS = "ADD_SNIPPETS",
}
const tabs = [
  {
    type: TabTypes.ADD_CHILDREN,
    IconComponent: FaPlus,
  },
  {
    type: TabTypes.ADD_SNIPPETS,
    IconComponent: MdFavoriteBorder,
  },
];

const LeftDrawer: React.FC = observer(() => {
  const { editor } = useStores();
  const [tabType, setTabType] = useState(TabTypes.ADD_CHILDREN);
  return (
    <div
      className={clsx([
        styles.drawer,
        {
          [styles.drawerOpen]: editor.isLeftDrawerOpen,
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
        {tabType === TabTypes.ADD_CHILDREN && (
          <>
            <NewNodePanel />
          </>
        )}
        {tabType === TabTypes.ADD_SNIPPETS && (
          <>
            <SnippetsPanel />
          </>
        )}
      </div>
      <div className={styles.drawerPanelArea}>
        <InfoPanel />
      </div>
      <div className={styles.drawerPanelArea}>
        <AstTagTreePanel />
      </div>
    </div>
  );
});

export default LeftDrawer;
