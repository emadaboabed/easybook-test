"use client";

import React from "react";
import { Popup } from "devextreme-react/popup";
import Image from "next/image";
import { Button } from "devextreme-react";
import { cn } from "@/lib/utils";

interface LogoutConfirmationModalProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmationModal({
  visible,
  onHide,
  onConfirm,
}: LogoutConfirmationModalProps) {
  return (
    <Popup
      visible={visible}
      onHiding={onHide}
      dragEnabled={false}
      closeOnOutsideClick={true}
      showTitle={false}
      showCloseButton={false}
      width={450}
      height={220}
      contentRender={() => (
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-md mr-3">
              <Image src="/logout.svg" alt="Sign out" width={24} height={24} />
            </div>
            <h2 className="text-xl font-semibold">Sign out</h2>
          </div>

          <p className="text-gray-600 mb-8">
            Are you sure you would like to sign out of your account?
          </p>

          <div className="mt-auto flex gap-3 justify-end">
            <Button
              className={cn(
                "min-w-[120px] border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
              )}
              onClick={onHide}
            >
              Cancel
            </Button>
            <Button
              className={cn(
                "min-w-[120px] bg-blue-500 text-white hover:bg-blue-600"
              )}
              onClick={onConfirm}
            >
              Sign out
            </Button>
          </div>
        </div>
      )}
    />
  );
}
