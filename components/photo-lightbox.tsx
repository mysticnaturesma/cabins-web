"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type LightboxPhoto = {
  src: string;
  alt: string;
};

type LightboxContextValue = {
  openPhoto: (photo: LightboxPhoto) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

function useLightbox() {
  const value = useContext(LightboxContext);

  if (!value) {
    throw new Error("LightboxImage must be used inside PhotoLightboxProvider");
  }

  return value;
}

type ProviderProps = {
  children: ReactNode;
};

export function PhotoLightboxProvider({ children }: ProviderProps) {
  const [activePhoto, setActivePhoto] = useState<LightboxPhoto | null>(null);

  const openPhoto = useCallback((photo: LightboxPhoto) => {
    setActivePhoto(photo);
  }, []);

  const closePhoto = useCallback(() => {
    setActivePhoto(null);
  }, []);

  useEffect(() => {
    if (!activePhoto) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePhoto();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [activePhoto, closePhoto]);

  const value = useMemo(() => ({ openPhoto }), [openPhoto]);

  return (
    <LightboxContext.Provider value={value}>
      {children}
      {activePhoto ? (
        <button
          type="button"
          className="photo-lightbox"
          onClick={closePhoto}
          aria-label="Cerrar vista ampliada"
        >
          <span className="photo-lightbox-backdrop" aria-hidden="true" />
          <img
            src={activePhoto.src}
            alt={activePhoto.alt}
            className="photo-lightbox-image"
            onClick={closePhoto}
          />
        </button>
      ) : null}
    </LightboxContext.Provider>
  );
}

type LightboxImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  title?: string;
  children?: ReactNode;
};

export function LightboxImage({ src, alt, className, imgClassName, title, children }: LightboxImageProps) {
  const { openPhoto } = useLightbox();

  return (
    <button
      type="button"
      className={className}
      onClick={() => openPhoto({ src, alt })}
      aria-label={title ?? alt}
    >
      <img src={src} alt={alt} className={imgClassName} />
      {children}
    </button>
  );
}
