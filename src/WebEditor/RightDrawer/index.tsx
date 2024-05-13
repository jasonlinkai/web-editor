import styles from "./RightDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import AstTagTreePanel from "./AstTagTreePanel";

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
    </div>
  );
});

export default RightDrawer;
