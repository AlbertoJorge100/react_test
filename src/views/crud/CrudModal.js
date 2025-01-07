import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { $postRequest, $successAlert, $validateForm } from '../../helpers/Helper';

const CrudModal = ({ onClose, option, props }) => {
    const [info, setInfo] = useState(props.info);

    const submit = async (e) => {
        e.preventDefault();
        info['option'] = option;
        if(!$validateForm(e.target)) return;
        if (!(await $postRequest('crud.store', info))) return;
        await $successAlert();
        onClose();
        props.onUpdate();
    };

    return (
        <Form onSubmit={submit} noValidate>
            <div className='mb-3'>
                <label htmlFor="">Name</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='type name'
                    value={info.name ?? ''}
                    onChange={(e) => setInfo({ ...info, name: e.target.value })}
                    required
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="">Price</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='type price'
                    value={info.price ?? ''}
                    onChange={(e) => setInfo({ ...info, price: e.target.value })}
                    required
                />
            </div>
            <div className='mb-3'>
                <label htmlFor="">Category</label>
                <select
                    className='form-control'
                    onChange={(e) => setInfo({ ...info, categoryId: e.target.value })}
                    value={info.categoryId ?? ''}
                    required
                >
                    <option value="">--</option>
                    {
                        props.categories.map((i, index) => {
                            return (
                                <option key={index} value={i.id}>{i.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className='mb-3'>
                <label htmlFor="">Stock</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='type stock'
                    value={info.stock ?? ''} 
                    onChange={(e) => setInfo({ ...info, stock: e.target.value })}
                    required
                />
            </div>
            <div className="mb-3">
                <button className="btn btn-primary" type='submit'>Enviar</button>
            </div>
        </Form>
    )
}

export default CrudModal