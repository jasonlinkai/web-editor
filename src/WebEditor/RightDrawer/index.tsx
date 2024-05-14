import styles from "./RightDrawer.module.scss";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import PositionPanel from "./panels/PositionPanel";
import LayoutPanel from "./panels/LayoutPanel";
import ArrangementPanel from "./panels/ArrangementPanel";
// import AstTagTreePanel from "./panels/AstTagTreePanel";

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
      <PositionPanel />
      <LayoutPanel />
      <ArrangementPanel />  
      {/* <AstTagTreePanel /> */}
    </div>
  );
});

export default RightDrawer;
