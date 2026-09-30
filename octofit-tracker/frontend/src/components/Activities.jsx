import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

function Activities() {
  const [activities, setActivities] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchCollection('activities', controller.signal).then((data) => { setActivities(data); setState({ loading: false, error: '' }) }).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) })
    return () => controller.abort()
  }, [])

  return <section className="data-page"><PageHeader eyebrow="MOVEMENT / ACTIVITY LOG" title="Activity feed" description="Every session is a signal that the team is moving." count={activities.length} /><CollectionState loading={state.loading} error={state.error} empty={!activities.length}><div className="activity-list">{activities.map((activity) => <article className="activity-row" key={activity._id}><div className="activity-mark">{activity.type?.slice(0, 1) || 'A'}</div><div className="activity-main"><strong>{activity.type}</strong><span>{activity.user?.name || 'OctoFit member'} · {new Date(activity.completedAt).toLocaleDateString()}</span></div><div className="activity-stat"><strong>{activity.durationMinutes}<small> min</small></strong><span>{activity.calories} kcal</span></div></article>)}</div></CollectionState></section>
}

export default Activities
