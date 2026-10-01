import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

const LEADERBOARD_ENDPOINT = '/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection(LEADERBOARD_ENDPOINT, controller.signal).then((data) => { setEntries(data); setState({ loading: false, error: '' }) }).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }); return () => controller.abort() }, [])
  return <section className="data-page"><PageHeader eyebrow="COMPETITION / SEPTEMBER 2026" title="Leaderboard" description="Consistency compounds. Here is who is setting the pace." count={entries.length} /><CollectionState loading={state.loading} error={state.error} empty={!entries.length}><div className="leaderboard-list">{entries.map((entry) => <article className={`rank-row rank-${entry.rank}`} key={entry._id}><span className="rank-number">{String(entry.rank).padStart(2, '0')}</span><div className="avatar">{entry.user?.name?.split(' ').map((part) => part[0]).join('') || '?'}</div><div className="rank-person"><strong>{entry.user?.name || 'OctoFit member'}</strong><span>{entry.period}</span></div><strong className="points">{entry.points.toLocaleString()} <small>pts</small></strong></article>)}</div></CollectionState></section>
}

export default Leaderboard
