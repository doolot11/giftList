import React, { useState } from 'react'

import SignUp from '../authorization/SignUp'

export default function Lending() {
    const [state, setState] = useState(false)
    const click = () => {
        setState(true)
    }
    return (
        <div>
            <button onClick={click}>voiti</button>

            {state && <SignUp />}
        </div>
    )
}
