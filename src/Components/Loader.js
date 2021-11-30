import React from 'react'
import loading from '../loading.gif';

export default function Loader(){
    return (
        <div className="text-center">
            <img className="my-5" src={loading} alt="Page is Loading! Please Wait!" />
        </div>
    )
}
