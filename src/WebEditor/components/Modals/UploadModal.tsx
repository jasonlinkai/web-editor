import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef } from "react";
import { useStores } from "../../../mobx/useMobxStateTreeStores";
import Dialog, { DialogRefType } from "../Dialog";
import Upload from "../Upload";

const UploadModal = observer(() => {
  const { editor } = useStores();
  const { isUploadModalVisible, setIsUploadModalVisible } = editor;
  const dialogRef = useRef<DialogRefType>(null);

  const onSuccess = useCallback((image: string) => {
    setIsUploadModalVisible(false);
    alert('upload success!')
  }, [setIsUploadModalVisible]);

  useEffect(() => {
    if (isUploadModalVisible) {
      dialogRef.current?.openDialog();
    } else {
      dialogRef.current?.closeDialog();
    }
  }, [isUploadModalVisible]);

  return (
    <Dialog
      ref={dialogRef}
      onClose={() => {
        setIsUploadModalVisible(false);
      }}
    >
      <Upload onSuccess={onSuccess} />
    </Dialog>
  );
});

export default UploadModal;
