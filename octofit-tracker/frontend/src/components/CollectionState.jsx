export function CollectionState({ loading, error, empty, children }) {
  if (loading) return <div className="collection-state"><span className="loader" /> Loading live data...</div>
  if (error) return <div className="collection-state collection-error"><strong>Could not reach the API.</strong><span>{error}</span></div>
  if (empty) return <div className="collection-state">Nothing here yet.</div>
  return children
}

export function PageHeader({ eyebrow, title, description, count }) {
  return <div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="heading-copy">{description}</p></div>{count !== undefined && <div className="count-badge">{String(count).padStart(2, '0')} ITEMS</div>}</div>
}
