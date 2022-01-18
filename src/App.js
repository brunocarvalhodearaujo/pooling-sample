/**
 * Copyright (c) 2022-present, Bruno Carvalho de Araujo.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import { useTarja } from './hooks'

function App () {
  const tarja = useTarja()

  if (tarja.loading) {
    return (
      <div>Carregando...</div>
    )
  }

  return (
    <pre>{JSON.stringify(tarja, undefined, 2)}</pre>
  )
}

export default App
