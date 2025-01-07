import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { $postRequest, $successAlert, $validateForm } from '../../helpers/Helper';

const CategoriesModal = ({ onClose, option, props }) => {
    const [info, setInfo] = useState(props.info);

    const submit = async (e) => {
        e.preventDefault();
        info['option'] = option;
        if(!$validateForm(e.target)) return;
        if (!(await $postRequest('categories.store', info))) return;
        await $successAlert();
        onClose();
        props.onUpdate();
    };

    return (
        <Form onSubmit={submit} noValidate>
            <div className='mb-3'>
                <label htmlFor="">Name:</label>
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
                <label htmlFor="">Description:</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='type description'
                    value={info.description ?? ''}
                    onChange={(e) => setInfo({ ...info, description: e.target.value })}
                    required
                />
            </div>            
            <div className="mb-3">
                <button className="btn btn-primary" type='submit'>Enviar</button>
            </div>
        </Form>
    )
}

export default CategoriesModal