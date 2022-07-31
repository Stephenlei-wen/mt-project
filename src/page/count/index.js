import React, { useContext, useEffect } from 'react'
import { context } from '../../reducer/index'
function Page(props) {
    const { api } = props
    console.log(api);
    let [state, dispatch] = useContext(context)
    useEffect(() => {
        api.test.list({ target: 'category' }).then((data) => {
        })
    }, [])
    return (
        <div>
            <h1>count:{state.count}</h1>
            <div className='count-page'>
                <button style={{ width: '128px', height: '30px' }} onClick={() => dispatch({ type: 'decrement' })}>-</button>
                <button style={{ width: '128px', height: '30px' }} onClick={() => dispatch({ type: 'increment' })}>+</button>
            </div>
        </div>
    )
}
export default Page
