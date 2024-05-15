import styles from "./LeftDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import NewNodePanel from "../components/panels/NewNodePanel";
import { actionBarHeight } from "../ActionBar";
import { astTagTreePanelHeight } from "../components/panels/AstTagTreePanel";
import ActionButton   from "../components/ActionButton";
import { FaPlus } from "react-icons/fa";
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
];

const LeftDrawer: React.FC = observer(() => {
  const { editor } = useStores();
  const [tabType, setTabType] = useState(TabTypes.ADD_CHILDREN);
  return (
    <div
      className={clsx([
        styles.leftDrawer,
        {
          [styles.leftDrawerOpen]: editor.isLeftDrawerOpen,
        },
      ])}
    >
      <div className={styles.leftDrawerTabsArea}>
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
        className={styles.leftDrawerPanelArea}
        style={{
          height: window.innerHeight - actionBarHeight - astTagTreePanelHeight,
        }}
      >
        {tabType === TabTypes.ADD_CHILDREN && (
          <>
            <NewNodePanel />
          </>
        )}
      </div>
    </div>
  );
});

export default LeftDrawer;
