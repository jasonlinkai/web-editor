import styles from "./ActionBar.module.scss";
import { useCallback, useEffect } from "react";
import { observer } from "mobx-react-lite";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaArrowLeft,
  FaArrowRight,
  FaTrash,
} from "react-icons/fa";
import { useStores } from "../../mobx/useMobxStateTreeStores";
import ActionButton from "../components/ActionButton";

export const actionBarHeight = 50;

const ActionBar: React.FC = observer(() => {
  const { canUndo, canRedo, undoAst, redoAst, editor } = useStores();
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
    selectedAstNode,
  } = editor;

  const onShortCutDelete = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        if (selectedAstNode?.isSelfCanBeDeleted) {
          selectedAstNode.parent.deletChild(selectedAstNode);
        }
      }
    },
    [selectedAstNode]
  );

  const onShortCurUndo = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.ctrlKey && e.key === "z") {
        undoAst();
      }
    },
    [undoAst]
  );

  const onShortCurRedo = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.ctrlKey && e.key === "r") {
        redoAst();
      }
    },
    [redoAst]
  );

  useEffect(() => {
    window.addEventListener("keyup", onShortCutDelete);
    window.addEventListener("keyup", onShortCurUndo);
    window.addEventListener("keyup", onShortCurRedo);
    return () => {
      window.removeEventListener("keyup", onShortCutDelete);
      window.removeEventListener("keyup", onShortCurUndo);
      window.removeEventListener("keyup", onShortCurRedo);
    };
  }, [onShortCutDelete, onShortCurUndo, onShortCurRedo]);

  return (
    <div
      className={styles.actionBar}
      style={{ height: `${actionBarHeight}px` }}
    >
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
        <ActionButton
          IconComponent={FaArrowLeft}
          isDisable={!canUndo}
          onClick={canUndo ? undoAst : undefined}
          >Undo(ctrl + z)</ActionButton>
        <ActionButton
          IconComponent={FaArrowRight}
          isDisable={!canRedo}
          onClick={canRedo ? redoAst : undefined}
        >Redo(ctrl + r)</ActionButton>
        <ActionButton
          IconComponent={FaTrash}
          isDisable={!selectedAstNode?.isSelfCanBeDeleted}
          onClick={canRedo ? redoAst : undefined}
        >
          Delete(Backspace)
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
