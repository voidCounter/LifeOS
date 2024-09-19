
import React from 'react'

const StageView = ({ params }: { params: { stageId: string } }) => {

    

    return (
        <div>
            {params.stageId}
        </div>
    )
}

export default StageView