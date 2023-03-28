import React from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Item from './Item'
import '../css/Form.css'

const AddNewProduct = () => {
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            rating: '',
            reviews: '',
        },
        validationSchema: yup.object({
            name: yup.string().min(2, "Product title must have at least 2 characters.").required(),
            price: yup.number().min(0, "Price can't be negative.").required(),
            rating: yup.number().min(1, "Rating can't be less than 1.").max(5, "Rating can't be more than 5.").notRequired(),
            reviews: yup.number().min(0, "Reviews can't be negative.").notRequired(),
        }),
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values)
            resetForm({values: ''})
        },
    })
    
    const { name, price, rating, reviews } = formik.values

    const handleSubmit = (values) => {
        const packet = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values)
        }

        fetch('http://localhost:3000/products', {...packet})
            .then(response => response.json())
            .then(data => toast("New product added!"))
    }

    return (
        <div className='form-wrapper'>
            <h2>
                Add Product
            </h2>
            <div className="form">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        { formik.touched.name && formik.errors.name && <span style={{'color': 'red'}}>{formik.errors.name}</span> }
                        <input placeholder="Title" type="text" onChange={formik.handleChange} name='name' value={name} />
                    </div>
                    <div>
                        { formik.touched.price && formik.errors.price && <span style={{'color': 'red'}}>{formik.errors.price}</span> }
                        <input placeholder="Price" type="number" onChange={formik.handleChange} name='price' value={price} />
                    </div>
                    <div>
                        { formik.touched.rating && formik.errors.rating && <span style={{'color': 'red'}}>{formik.errors.rating}</span> }
                        <input placeholder="Rating" type="text" onChange={formik.handleChange} name='rating' value={rating} />
                    </div>
                    <div>
                        { formik.touched.reviews && formik.errors.reviews && <span style={{'color': 'red'}}>{formik.errors.reviews}</span> }
                        <input placeholder="Review" type="text" onChange={formik.handleChange} name='reviews' value={reviews} />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div className='livePreview'>
                {
                    (name !== '' || price !== '' || rating !== '' || reviews !== '') && <Item data={formik.values} preview={true} />
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default AddNewProduct
