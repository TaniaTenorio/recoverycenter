"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import type { PointerEvent as ReactPointerEvent } from "react"
import type { ServicePage } from "@/data/services"

type HomeServicesSliderProps = {
  services: ServicePage[]
}

export default function HomeServicesSlider({
  services,
}: HomeServicesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const viewportRef = useRef<HTMLDivElement | null>(null)
  const dragStartX = useRef(0)
  const activePointerId = useRef<number | null>(null)
  const [viewportWidth, setViewportWidth] = useState(1)
  const total = services.length
  const dragOffsetPercent = (dragOffset / viewportWidth) * 100
  const trackTransform = `translateX(calc(-${currentIndex * 100}% + ${dragOffsetPercent}%))`

  const goTo = (index: number) => {
    setCurrentIndex(index)
  }

  const goPrev = () => {
    setCurrentIndex((index) => Math.max(0, index - 1))
  }

  const goNext = () => {
    setCurrentIndex((index) => Math.min(total - 1, index + 1))
  }

  useEffect(() => {
    const updateViewportWidth = () => {
      setViewportWidth(viewportRef.current?.clientWidth || 1)
    }

    updateViewportWidth()
    window.addEventListener("resize", updateViewportWidth)

    return () => {
      window.removeEventListener("resize", updateViewportWidth)
    }
  }, [])

  const finishDrag = () => {
    if (Math.abs(dragOffset) > viewportWidth * 0.18) {
      if (dragOffset > 0) {
        setCurrentIndex((index) => Math.max(0, index - 1))
      } else {
        setCurrentIndex((index) => Math.min(total - 1, index + 1))
      }
    }

    setDragOffset(0)
    setIsDragging(false)
    activePointerId.current = null
  }

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return
    }

    dragStartX.current = event.clientX
    setIsDragging(true)
    activePointerId.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isDragging || activePointerId.current !== event.pointerId) {
      return
    }

    setDragOffset(event.clientX - dragStartX.current)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return
    }

    finishDrag()
  }

  const handlePointerCancel = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) {
      return
    }

    setDragOffset(0)
    setIsDragging(false)
    activePointerId.current = null
  }

  return (
    <div className="services-slider" aria-label="Servicios principales">
      <div
        ref={viewportRef}
        className={`services-slider__viewport ${isDragging ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onLostPointerCapture={finishDrag}
      >
        <div
          className="services-slider__track"
          style={{
            transform: trackTransform,
            transition: isDragging ? "none" : undefined,
          }}
        >
          {services.map((service) => (
            <div key={service.slug} className="services-slider__slide">
              <article
                className={`service-card service-card--wide tone-indigo`}
              >
                {/* <div  aria-hidden="true"> */}
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={service.width}
                    height={service.height}
                    // style={{ maxWidth: "300px", height: "auto" }}
                    className="service-card-image"
                  />
                {/* </div> */}
                <div className="service-card-content">
                  <div className="service-card-header">
                    <span
                      className={`icon-badge tone-${service.tone}`}
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined">
                        {service.icon}
                      </span>
                    </span>
                    <h3>{service.title}</h3>
                  </div>

                  <div className="service-card-summary">
                    <p>{service.summary}</p>
                    <br />
                    <p>{service.intro}</p>
                    <br />
                    <Link
                      href={`/servicios/${service.slug}`}
                      className="service-link"
                    >
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      <div className="services-slider__controls">
        {currentIndex > 0 ? (
          <button
            type="button"
            className="services-slider__btn"
            onClick={goPrev}
            aria-label="Servicio anterior"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
        ) : (
          <span className="services-slider__btn-spacer" />
        )}

        <div className="services-slider__dots">
          {services.map((service, index) => (
            <button
              key={service.slug}
              type="button"
              className={`services-slider__dot ${index === currentIndex ? "is-active" : ""}`}
              onClick={() => goTo(index)}
              aria-label={`Ir a ${service.shortTitle}`}
            />
          ))}
        </div>

        {currentIndex < total - 1 ? (
          <button
            type="button"
            className="services-slider__btn"
            onClick={goNext}
            aria-label="Siguiente servicio"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        ) : (
          <span className="services-slider__btn-spacer" />
        )}
      </div>
    </div>
  )
}
