import { createContext, useContext, useState } from 'react';
import { useRecordContext } from './RecorderContext';

type PictureInPictureContextType = {
  pipWindow: Window | null;
  requestPipWindow: () => Promise<Window>;
};

const PictureInPictureContext = createContext<PictureInPictureContextType>({} as PictureInPictureContextType);

type PictureInPictureProviderProps = {
  children: React.ReactNode;
};

export const PictureInPictureProvider = ({ children }: PictureInPictureProviderProps) => {
  const { stopRecording } = useRecordContext();
  const [pipWindow, setPipWindow] = useState<Window | null>(null);

  const requestPipWindow = async () => {
    const pipWindow = await window.documentPictureInPicture.requestWindow({
      width: 300,
      height: 300,
    });

    pipWindow.onpagehide = () => {
      stopRecording();
      setPipWindow(null);
    };

    const allCSS = [...document.styleSheets]
      .map((styleSheet) => [...styleSheet.cssRules].map((r) => r.cssText).join(''))
      .filter(Boolean)
      .join('\n');
    const style = document.createElement('style');
    style.textContent = allCSS;
    pipWindow.document.head.appendChild(style);

    setPipWindow(pipWindow);

    return pipWindow;
  };

  return (
    <PictureInPictureContext.Provider value={{ pipWindow, requestPipWindow }}>
      {children}
    </PictureInPictureContext.Provider>
  );
};

export const usePictureInPicture = () => useContext(PictureInPictureContext);
