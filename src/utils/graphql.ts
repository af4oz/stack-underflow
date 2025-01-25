import { DocumentNode } from '@apollo/client'

export function getGqlString(doc: DocumentNode) {
  return doc.loc && (doc.loc.source.body as string)
}
