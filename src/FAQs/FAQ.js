import React, { useState } from 'react'


import style from './css/FAQ.module.css'

const FAQ = ({ id, title, description }) => {
    const [toggle, setToggle] = useState(false)
    
    return (
        <article className={ style.faq }>
            <div className={ style.header }>
                <h4>{ title }</h4>
                <button className={ toggle ? style["ico-minus"] : style["ico-plus"] } onClick={ () => setToggle(!toggle) }>{ toggle ? (<i className="fa fa-minus" />) : (<i className="fa fa-plus" />) }</button>
            </div>
            {
                toggle && (
                    <div className={ style.content } >
                        <hr />
                        <p>{ description }</p>
                    </div>
            )}
        </article>
    )
}

export default FAQ
