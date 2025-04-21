import React from "react";
import { Popup } from "devextreme-react/popup";
import { Button } from "devextreme-react";
import Image from "next/image";

const DeleteConfirmationModal = ({
  visible,
  onHide,
  onConfirm,
  title = "Confirm permanent deletion?",
}) => {
  return (
    <Popup
      visible={visible}
      onHiding={onHide}
      dragEnabled={false}
      closeOnOutsideClick={true}
      showTitle={false}
      showCloseButton={false}
      width={400}
      height="auto"
      className="delete-confirmation-modal"
    >
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="bg-red-100 p-2 rounded-md mr-3">
            <Image
              src="/warning.svg"
              alt="Warning"
              width={24}
              height={24}
              className="text-red-500"
              // Fallback to a standard warning icon if image doesn't exist
              onError={(e) => {
                e.target.style.display = "none";
                const parent = e.target.parentElement;
                parent.innerHTML =
                  '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';
              }}
            />
          </div>
          <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Please note, once you confirm permanent deletion, all data will be
          permanently erased and this action cannot be undone.
        </p>

        <div className="flex justify-between gap-2">
          <Button
            text="Delete"
            onClick={onConfirm}
            width="100%"
            stylingMode="contained"
            type="danger"
            className="bg-red-500 hover:bg-red-600 text-white"
          />
          <Button
            text="Cancel"
            onClick={onHide}
            width="100%"
            stylingMode="outlined"
            className="border-gray-300 text-gray-700"
          />
        </div>
      </div>
    </Popup>
  );
};

export default DeleteConfirmationModal;
