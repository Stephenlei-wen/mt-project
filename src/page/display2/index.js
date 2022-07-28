import React, { useState } from "react";
export default function Page(props) {
    const [show, setShow] = useState(false)
    const [count, setCount] = useState(0)
    return <div>
        {count}
        <button onClick={() => { setCount(count + 1) }}>增加</button>

    </div>
}