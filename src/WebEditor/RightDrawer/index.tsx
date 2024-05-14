import styles from "./RightDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import AstTagTreePanel from "./AstTagTreePanel";
import ArrangementPanel from "./ArrangementPanel";

const RightDrawer: React.FC = observer(() => {
  const { editor } = useStores();

  return (
    <div
      className={clsx([
        styles.rightDrawer,
        {
          [styles.rightDrawerOpen]: editor.isRightDrawerOpen,
        },
      ])}
    >
      <AstTagTreePanel />
      <ArrangementPanel />  
    </div>
  );
});

export default RightDrawer;
