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
import {
  MdFavorite
} from "react-icons/md"
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import ActionButton from "../../components/ActionButton";

export const actionBarHeight = 50;

const ActionBar: React.FC = observer(() => {
  const { canUndo, canRedo, undoAst, redoAst, editor } = useStores();
  const {
    isLeftDrawerOpen,
    setIsLeftDrawerOpen,
    isRightDrawerOpen,
    setIsRightDrawerOpen,
    selectedAstNode,
    pushToSnippets,
  } = editor;

  const onShortCutDelete = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Backspace") {
        if (selectedAstNode?.isSelfCanBeDeleted) {
          selectedAstNode.parent.deletChild(selectedAstNode);
        }
      }
    },
    [selectedAstNode]
  );

  const onShortCutUndo = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") {
        undoAst();
      }
    },
    [undoAst]
  );

  const onShortCutRedo = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "r") {
        redoAst();
      }
    },
    [redoAst]
  );

  const onShortCutAddToSnippets = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "f") {
        if (selectedAstNode) {
          pushToSnippets(selectedAstNode);
        }
      }
    },
    [pushToSnippets, selectedAstNode]
  );

  useEffect(() => {
    window.addEventListener("keyup", onShortCutDelete);
    window.addEventListener("keyup", onShortCutUndo);
    window.addEventListener("keyup", onShortCutRedo);
    window.addEventListener("keyup", onShortCutAddToSnippets);
    return () => {
      window.removeEventListener("keyup", onShortCutDelete);
      window.removeEventListener("keyup", onShortCutUndo);
      window.removeEventListener("keyup", onShortCutRedo);
      window.removeEventListener("keyup", onShortCutAddToSnippets);
    };
  }, [onShortCutDelete, onShortCutUndo, onShortCutRedo, onShortCutAddToSnippets]);

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
        >
          Undo(ctrl + z)
        </ActionButton>
        <ActionButton
          IconComponent={FaArrowRight}
          isDisable={!canRedo}
          onClick={canRedo ? redoAst : undefined}
        >
          Redo(ctrl + r)
        </ActionButton>
        <ActionButton
          IconComponent={FaTrash}
          isDisable={!selectedAstNode?.isSelfCanBeDeleted}
          onClick={
            selectedAstNode?.isSelfCanBeDeleted
              ? () => {
                  selectedAstNode.parent.deletChild(selectedAstNode);
                }
              : undefined
          }
        >
          Delete(ctrl + backspace)
        </ActionButton>
        <ActionButton
          IconComponent={MdFavorite}
          isDisable={!selectedAstNode}
          onClick={() => {
            if (selectedAstNode) {
              pushToSnippets(selectedAstNode);
            }
          }}
        >
          Add to Snippets(ctrl + f)
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
