import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

const WORKOUTS_ENDPOINT = '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection(WORKOUTS_ENDPOINT, controller.signal).then((data) => { setWorkouts(data); setState({ loading: false, error: '' }) }).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }); return () => controller.abort() }, [])
  return <section className="data-page"><PageHeader eyebrow="COACHING / LIBRARY" title="Workouts" description="A focused session for wherever your energy is today." count={workouts.length} /><CollectionState loading={state.loading} error={state.error} empty={!workouts.length}><div className="workout-grid">{workouts.map((workout) => <article className="workout-card" key={workout._id}><span className={`difficulty difficulty-${workout.difficulty}`}>{workout.difficulty}</span><h2>{workout.title}</h2><p>{workout.description}</p><div className="workout-meta"><span>{workout.durationMinutes} min</span><span>{workout.focus}</span><span>→</span></div></article>)}</div></CollectionState></section>
}

export default Workouts
