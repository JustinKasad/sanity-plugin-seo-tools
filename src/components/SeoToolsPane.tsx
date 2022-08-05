import React, { useMemo } from 'react'
import { SeoToolsContext, SeoToolsContextValue } from '../context'
import { SeoToolsPaneView } from './SeoToolsPaneView'
import type { SanityDocument } from '@sanity/types'
import { SeoToolsPaneEmptyView } from './SeoToolsPaneEmptyView'

type Props = React.PropsWithChildren<{
  options?: Partial<SeoToolsContextValue>
  document?: {
    displayed?: SanityDocument
  }
}>

export const SeoToolsPane: React.FC<Props> = ({ children, options, document }) => {
  const contextValue = useMemo<SeoToolsContextValue>(() => ({
    fetch: true,
    select: () => ({}),
    render: (seo, data, serpPreview) => serpPreview,
    resolveProductionUrl: () => new URL('https://sanity.io'),
    ...options,
  }), [])

  return (
    <SeoToolsContext.Provider value={contextValue}>
      {document?.displayed && <SeoToolsPaneView document={document?.displayed} />}
      {!document?.displayed && <SeoToolsPaneEmptyView />}
    </SeoToolsContext.Provider>
  )
}