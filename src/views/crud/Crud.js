import React, { useEffect, useState } from 'react'
import CrudModal from './CrudModal';
import MyModal from '../../components/MyModal';
import { $deleteRequest, $getRequest, $questionAlert, $successAlert } from '../../helpers/Helper';

const Crud = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);
  const [option, setOption] = useState(1);
  const [info, setInfo] = useState({});
  const [title, setTitle] = useState('');  
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  const openModal = (option, id) => {    
    setOption(option);
    setTitle(`${option == 1 ? 'Agregar': 'Editar'} Crud`);
    setInfo(option == 1 ? {}: data.find(i => i.id == id));
    handleOpen();
  };

  const loadData = async () => {
    const data = await $getRequest('crud.all');
    setData(data.products);
    setCategories(data.categories);
  };

  const remove = async (id) => {
    if(!(await $questionAlert())) return;
    if(!(await $deleteRequest('crud.remove', {id: id}))) return;
    await $successAlert();
    setData(data.filter(i => i.id != id));
  };

  useEffect(()=> {
    loadData();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <button className="btn btn-primary" onClick={() => openModal(1)}>Agregar</button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((info, index) => {
                return (
                  <tr key={index}>
                    <td>{info.name}</td>                    
                    <td>{info.price}</td>                    
                    <td>{info.category}</td>                    
                    <td>{info.stock}</td>    
                    <td>
                      <button className="btn btn-secondary me-2" onClick={() => openModal(2, info.id)}>editar</button>
                      <button className="btn btn-danger" onClick={() => remove(info.id)}>remover</button>
                    </td>                
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
      <MyModal
        show={showModal}
        handleClose={handleClose}
        Component={CrudModal}
        title={title}
        option={option}
        info = {info}
        categories = {categories}
        onUpdate={loadData}
      />
    </>
  )
}

export default Crud