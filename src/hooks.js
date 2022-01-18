/**
 * Copyright (c) 2022-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { useState, useEffect, useRef } from 'react'

export function useInterval(callback, delay = 1000) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export function useTarja(refreshInterval = 5000) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hash, setHash] = useState(null)
  const [payload, setPayload] = useState({})

  useInterval(() => {
    setError(null)
    fetch('http://localhost:2650/tarja/hash')
      .then(response => {
        if (response.status === 200) {
          return response.json()
        }

        return response.json()
          .then(error => Promise.reject(new Error(error.message)))
      })
      .then(nextHash => {
        if (nextHash !== hash) {
          setLoading(true)
          fetch('http://localhost:2650/tarja')
            .then(response => {
              if (response.status === 200) {
                return response.json()
              }

              return response.json()
                .then(error => Promise.reject(new Error(error.message)))
            })
            .then(tarja => {
              console.info(tarja)
              console.info('changed hash [%s=>%s]', hash, nextHash)
              setHash(nextHash)
              setPayload(tarja)
            })
            .catch(setError)
            .finally(() => setLoading(false))
        }
      })
      .catch(setError)
  }, refreshInterval)

  return {
    hash,
    loading,
    payload
  }
}
