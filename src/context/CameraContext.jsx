import React, { createContext, useContext, useState } from "react";

const CameraContext = createContext(null);

export function CameraProvider({ children }) {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [photoBase64, setPhotoBase64] = useState(null);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);

  return (
    <CameraContext.Provider
      value={{
        isCameraOpen,
        openCamera,
        closeCamera,
        photoBase64,
        setPhotoBase64,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error("useCamera must be used inside CameraProvider");
  }
  return context;
}
