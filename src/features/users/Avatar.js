import React, { useMemo } from 'react';


export const Avatar = (props) => {
    const imgSrc = useMemo(() => `/images/animals/${props.image}.svg`, [props.image]);
    return (
        <img className={props.className} src={imgSrc} />
    )
}