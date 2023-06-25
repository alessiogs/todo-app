import { useEffect, useState } from 'react'
import { TasksList } from './components'

const App = () => {

    const [user, setUser] = useState({ id: 1 })

    return (
        <div>
            <TasksList userId={user.id} />
        </div>
    )
}

export default App