import styles from "./LeftDrawer.module.scss";
import StyleEditor from "./StyleEditor";
import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";

const LeftDrawer: React.FC = observer(() => {
  const { editor } = useStores();

  return (
    <div
      className={clsx([
        styles.leftDrawer,
        {
          [styles.leftDrawerOpen]: editor.isLeftDrawerOpen,
        },
      ])}
    >
      <StyleEditor />
    </div>
  );
});

export default LeftDrawer;
