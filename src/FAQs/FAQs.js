import React, { useEffect, useState } from 'react'

import FAQ from './FAQ'
import style from './css/FAQs.module.css'
import { useNavigate } from 'react-router-dom'

const FAQs = () => {
    const navigate = useNavigate()
    const [ faqs, setFaqs ] = useState([])
    
    useEffect(() => {
        fetch('http://localhost:3000/faqs')
            .then((res) => res.json())
            .then((data) => setFaqs(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <section className={ style.faqs } >
            <h2>
                FAQs [Frequently Asked Questions]
            </h2>
            <hr />
            {
                faqs.map((faq) => {
                    return (
                        <FAQ key={faq.id} {...faq} />
                    )
                })
            }
            <div className='back-to-home'>
                <button onClick={() => navigate('/')}>Back to Home Page</button>
            </div>
        </section>
    )
}

export default FAQs
