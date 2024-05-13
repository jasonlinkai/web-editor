import styles from "./ActionBar.module.scss";
import { observer } from "mobx-react-lite";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const ActionButton: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <button className="action-button">{children}</button>;
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
    <div id="action-bar" className={styles.actionBar}>
      <div className={styles.actionBarLeftArea}>
        <ActionButton>
          {isLeftDrawerOpen ? (
            <FaAngleDoubleLeft
              onClick={() => {
                setIsLeftDrawerOpen(!isLeftDrawerOpen);
              }}
            />
          ) : (
            <FaAngleDoubleRight
              onClick={() => {
                setIsLeftDrawerOpen(!isLeftDrawerOpen);
              }}
            />
          )}
        </ActionButton>
        <ActionButton>
          <FaArrowLeft
            onClick={canUndo ? undoAst : undefined}
            color={canUndo ? "#333" : "#aaa"}
          />
        </ActionButton>
        <ActionButton>
          <FaArrowRight
            onClick={canRedo ? redoAst : undefined}
            color={canRedo ? "#333" : "#aaa"}
          />
        </ActionButton>
      </div>
      <div>
        <button
          className="open-drawer-button"
          onClick={() => {
            setIsRightDrawerOpen(!isRightDrawerOpen);
          }}
        >
          {isRightDrawerOpen ? "關閉樹狀編輯器" : "開啟樹狀編輯器"}
        </button>
      </div>
    </div>
  );
});

export default ActionBar;
