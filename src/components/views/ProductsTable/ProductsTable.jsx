import React from "react";
import { Container, Table } from "react-bootstrap";
import Product from "./Product/Product";
import { Link } from "react-router-dom";

const ProductTable = ({products, url, getProducts}) => {
  return (
    <div>
      <Container className="py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Products Table</h1>
          <Link to="/product/create" className="btn-yellow text-decoration-none text-center">Add Product</Link>
        </div>
        <hr />
        {/* Table of products */}
        {(products.length > 0)?
          <Table bordered hover responsive className="align-middle mt-3">
          <thead>
            <tr>
              <th>N.</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image url</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return <Product key={product.id} getProducts={getProducts} url={url} product={product}/>
            })}
          </tbody>
        </Table> :
        <div className="no-products-found d-flex align-items-center justify-content-center">
          <h1>🥐 No products found ☕</h1>
        </div>}
      </Container>
    </div>
  );
};

export default ProductTable;
