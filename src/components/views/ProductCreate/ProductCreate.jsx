import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { validateProductName, validateCategory, validatePrice, validateUrl } from "../../helpers/ValidateFields";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ProductCreate = ({url, getProducts}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();

    if (!validateProductName(name) || !validatePrice(price) || !validateUrl(urlImg) || !validateCategory(category)){
      alert("Validacion Erronea");
      return;
    }

    const newProduct = {
      productName: name,
      price,
      urlImg,
      category
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Save'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try{
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
          });
          if(response.status === 201) {
            getProducts();
            Swal.fire(
              'Created!',
              'success'
            )
            navigate("/product/table");
          }
        }catch(error){
          console.log(error);
        }
      }
    })
  }

  return (
    <div>
      <Container className="py-5">
        <h1>Add Product</h1>
        <hr />
        {/* Form Product */}
        <Form className="my-5" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name*</Form.Label>
            <Form.Control type="text" placeholder="Ej: Café" value={name} onChange={(e)=>{
              setName(e.target.value);
            }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price*</Form.Label>
            <Form.Control type="number" placeholder="Ej: 50" value={price} onChange={(e)=>{
              setPrice(e.target.value);
            }}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image URL*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: https://media.istockphoto.com/photos/two-freshly-baked-french-id1277579771?k=20"
              value={urlImg}
              onChange={(e)=>{
                setUrlImg(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Label>Category*</Form.Label>
            <Form.Select onChange={(e)=> setCategory(e.target.value)}>
              <option value="">Select an option</option>
              <option value="bebida-caliente">Bebida Caliente</option>
              <option value="bebida-fria">Bebida Fria</option>
              <option value="sandwitch">Sandwich</option>
              <option value="dulce">Dulce</option>
              <option value="salado">Salado</option>
            </Form.Select>
          </Form.Group>
          <div className="text-end">
            <button className="btn-yellow">Save</button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default ProductCreate;
