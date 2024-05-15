import styles from "./LeftDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import NewNodePanel from "../components/panels/NewNodePanel";
import AstTagTreePanel from "../components/panels/AstTagTreePanel";
import ActionButton from "../components/ActionButton";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import InfoPanel from "../components/panels/InfoPanel";
import { MdFavoriteBorder } from "react-icons/md";
import SnippetsPanel from "../components/panels/SnippetsPanel";

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
      <div className={styles.leftDrawerPanelArea}>
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
      <div className={styles.leftDrawerPanelArea}>
        <InfoPanel />
      </div>
      <div className={styles.leftDrawerPanelArea}>
        <AstTagTreePanel />
      </div>
    </div>
  );
});

export default LeftDrawer;
