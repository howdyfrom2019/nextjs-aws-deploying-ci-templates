import { Dialog } from "@/components/ui/dialog";
import useModal from "@/lib/hooks/use-modal";

export default function Modal() {
  const { modals, closeModal } = useModal();

  if (modals.length === 0) {
    return null;
  }

  return (
    <>
      {modals.map((modal) => (
        <Dialog
          defaultOpen
          key={modal.modalKey}
          onOpenChange={(open) => {
            if (!open) {
              closeModal(modal.modalKey);
            }
          }}
        >
          {modal.component}
        </Dialog>
      ))}
    </>
  );
}
