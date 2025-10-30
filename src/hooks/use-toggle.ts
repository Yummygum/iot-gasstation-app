'use client'

import { useCallback, useState } from 'react'

export interface UseToggleReturn {
  isOn: boolean
  toggle: () => void
  turnOn: () => void
  turnOff: () => void
  setToggle: (_value: boolean) => void
}

export function useToggle(initialValue = false): UseToggleReturn {
  const [isOn, setIsOn] = useState(initialValue)

  const toggle = useCallback(() => setIsOn((prev) => !prev), [])
  const turnOn = useCallback(() => setIsOn(true), [])
  const turnOff = useCallback(() => setIsOn(false), [])

  return {
    isOn,
    toggle,
    turnOn,
    turnOff,
    setToggle: setIsOn
  }
}

// Hook for managing multiple toggles
export function useToggles<T extends string>(
  toggleNames: T[],
  initialValues: Partial<Record<T, boolean>> = {}
) {
  const [toggles, setToggles] = useState<Record<T, boolean>>(() => {
    const initial = {} as Record<T, boolean>
    toggleNames.forEach((name) => {
      initial[name] = initialValues[name] ?? false
    })
    return initial
  })

  const toggle = useCallback((name: T) => {
    setToggles((prev) => ({
      ...prev,
      [name]: !prev[name]
    }))
  }, [])

  const setToggle = useCallback((name: T, value: boolean) => {
    setToggles((prev) => ({
      ...prev,
      [name]: value
    }))
  }, [])

  const turnOn = useCallback(
    (name: T) => {
      setToggle(name, true)
    },
    [setToggle]
  )

  const turnOff = useCallback(
    (name: T) => {
      setToggle(name, false)
    },
    [setToggle]
  )

  const isOn = useCallback((name: T) => toggles[name], [toggles])

  const turnAllOn = useCallback(() => {
    setToggles((prev) => {
      const updated = { ...prev }
      toggleNames.forEach((name) => {
        updated[name] = true
      })
      return updated
    })
  }, [toggleNames])

  const turnAllOff = useCallback(() => {
    setToggles((prev) => {
      const updated = { ...prev }
      toggleNames.forEach((name) => {
        updated[name] = false
      })
      return updated
    })
  }, [toggleNames])

  return {
    toggles,
    toggle,
    setToggle,
    turnOn,
    turnOff,
    isOn,
    turnAllOn,
    turnAllOff
  }
}
