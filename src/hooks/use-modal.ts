'use client'

import { useCallback, useState } from 'react'

export interface UseModalReturn {
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: () => void
  setOpen: (_open: boolean) => void
}

export function useModal(initialOpen = false): UseModalReturn {
  const [isOpen, setIsOpen] = useState(initialOpen)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((prev) => !prev), [])

  return {
    isOpen,
    open,
    close,
    toggle,
    setOpen: setIsOpen
  }
}

// Hook for managing multiple modals
export function useModals<T extends string>() {
  const [openModals, setOpenModals] = useState<Set<T>>(new Set())

  const openModal = useCallback((name: T) => {
    setOpenModals((prev) => new Set(prev).add(name))
  }, [])

  const closeModal = useCallback((name: T) => {
    setOpenModals((prev) => {
      const newSet = new Set(prev)
      newSet.delete(name)
      return newSet
    })
  }, [])

  const toggleModal = useCallback((name: T) => {
    setOpenModals((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(name)) {
        newSet.delete(name)
      } else {
        newSet.add(name)
      }

      return newSet
    })
  }, [])

  const isModalOpen = useCallback(
    (name: T) => openModals.has(name),
    [openModals]
  )

  const closeAllModals = useCallback(() => {
    setOpenModals(new Set())
  }, [])

  return {
    openModal,
    closeModal,
    toggleModal,
    isModalOpen,
    closeAllModals,
    openModals: Array.from(openModals)
  }
}
