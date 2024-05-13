import styles from "./ActionBar.module.scss";
import { observer } from "mobx-react-lite";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { useStores } from "../../mobx/useMobxStateTreeStores";

const ActionButton: React.FC<
  React.PropsWithChildren<React.HTMLAttributes<HTMLButtonElement>>
> = ({ children, ...p }) => {
  return (
    <button {...p} className={styles.actionButton}>
      {children}
    </button>
  );
};

const ActionBar: React.FC = observer(() => {
  const { canUndo, canRedo, undoAst, redoAst, editor } = useStores();
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
  } = editor;

  return (
    <div className={styles.actionBar}>
      <div className={styles.actionBarLeftArea}>
        <ActionButton
          onClick={() => {
            setIsLeftDrawerOpen(!isLeftDrawerOpen);
          }}
        >
          {isLeftDrawerOpen ? (
            <FaAngleDoubleLeft />
          ) : (
            <FaAngleDoubleRight
              onClick={() => {
                setIsLeftDrawerOpen(!isLeftDrawerOpen);
              }}
            />
          )}
        </ActionButton>
        <ActionButton onClick={canUndo ? undoAst : undefined}>
          <FaArrowLeft color={canUndo ? "#333" : "#aaa"} />
        </ActionButton>
        <ActionButton onClick={canRedo ? redoAst : undefined}>
          <FaArrowRight color={canRedo ? "#333" : "#aaa"} />
        </ActionButton>
      </div>
      <div className={styles.actionBarRightArea}>
        <ActionButton
          onClick={() => {
            setIsRightDrawerOpen(!isRightDrawerOpen);
          }}
        >
          {isRightDrawerOpen ? (
            <FaAngleDoubleRight />
          ) : (
            <FaAngleDoubleLeft
              onClick={() => {
                setIsRightDrawerOpen(!isRightDrawerOpen);
              }}
            />
          )}
        </ActionButton>
      </div>
    </div>
  );
});

export default ActionBar;
