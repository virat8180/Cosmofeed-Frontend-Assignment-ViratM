import React from 'react'
import '../App.css'

function Button({ setaddbuttonstate }) {
    return (
        <div>
            <button onClick={() => { setaddbuttonstate(true) }} className='add-button'>
                <span className='svg'><i className="bi bi-plus-circle-fill bi-2xl" style={{ fontSize: '60px' }}></i></span>

            </button>
        </div>
    )
}

export default Button
