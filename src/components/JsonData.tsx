import React from 'react'

const JsonData = ({data}: any) => {
    return (
        <div className="flex flex-col w-auto">
            {data && (<pre>{data}</pre>)}
        </div>
    )
}

export default JsonData