import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'
import { CollectionState, PageHeader } from './CollectionState.jsx'

function Users() {
  const [users, setUsers] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })
  useEffect(() => { const controller = new AbortController(); fetchCollection('users', controller.signal).then((data) => { setUsers(data); setState({ loading: false, error: '' }) }).catch((error) => { if (error.name !== 'AbortError') setState({ loading: false, error: error.message }) }); return () => controller.abort() }, [])
  return <section className="data-page"><PageHeader eyebrow="PEOPLE / MEMBERS" title="Members" description="The humans behind every goal, streak and high five." count={users.length} /><CollectionState loading={state.loading} error={state.error} empty={!users.length}><div className="user-list">{users.map((user) => <article className="user-row" key={user._id}><div className="avatar">{user.name?.split(' ').map((part) => part[0]).join('')}</div><div className="user-info"><strong>{user.name}</strong><span>{user.email}</span></div><div className="goal"><span>WEEKLY GOAL</span><strong>{user.weeklyGoal} sessions</strong></div><span className="row-arrow">↗</span></article>)}</div></CollectionState></section>
}

export default Users
