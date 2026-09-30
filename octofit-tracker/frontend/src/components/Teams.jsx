import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

function Teams() {
  const [teams, setTeams] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection('teams', controller.signal).then((data) => { setTeams(data); setState({ loading: false, error: '' }) }).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }); return () => controller.abort() }, [])
  return <section className="data-page"><PageHeader eyebrow="PEOPLE / COLLECTIVES" title="Teams" description="Shared goals have a way of becoming shared momentum." count={teams.length} /><CollectionState loading={state.loading} error={state.error} empty={!teams.length}><div className="team-grid">{teams.map((team, index) => <article className={`team-card team-card-${index % 2}`} key={team._id}><div className="team-number">0{index + 1}</div><h2>{team.name}</h2><p>{team.motto}</p><div className="member-stack">{team.members?.slice(0, 4).map((member) => <span className="avatar avatar-small" title={member.name} key={member._id}>{member.name?.split(' ').map((part) => part[0]).join('')}</span>)}</div><span className="member-count">{team.members?.length || 0} members</span></article>)}</div></CollectionState></section>
}

export default Teams
