"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

const SESSION_KEY = "rc-promo-modal-dismissed";
const POPUP_ID = "2515";

function useIsHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function LoadPromoModal() {
  const isHydrated = useIsHydrated();

  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    return window.sessionStorage.getItem(SESSION_KEY) !== "1";
  });

  const promoImageUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_PROMO_MODAL_IMAGE_URL ||
      "https://recoverycenter.com.mx/wp-content/uploads/2024/04/recuperacion-de-datos.jpg",
    [],
  );

  const closeModal = useCallback(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(SESSION_KEY, "1");
    }
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, isOpen]);

  if (!isHydrated || !isOpen) {
    return null;
  }

  return (
    <div className="promo-modal" role="presentation">
      <button
        type="button"
        aria-label="Cerrar anuncio"
        className="promo-modal__overlay"
        onClick={closeModal}
      />

      <div
        id="sgpb-popup-dialog-main-div"
        className="promo-modal__dialog sgpb-content sgpb-content-2515 sgpb-theme-1-content sg-popup-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-modal-title"
      >
        <h2 id="promo-modal-title" className="promo-modal__sr-only">
          Promocion destacada
        </h2>

        <button type="button" className="promo-modal__close" onClick={closeModal}>
          X
        </button>

        <div
          className="promo-modal__image"
          data-id={POPUP_ID}
          style={{ backgroundImage: `url(${promoImageUrl})` }}
        />
      </div>
    </div>
  );
}
