function CartItem({product, removeFromCart}) {
    return ( <>
        <div className="card p-4 my-3">
            <div className="row">
                <div className="col-md-3">
                    <img src={product.image_file} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h4 className="font-weight-bold">{product.name}</h4>
                    <p className="text-muted">{product.description}</p>
                    <p className="text-muted text-secondary">Best for {product.age_preferred} year old pets</p>
                    <p className="text-muted">{product.quantity} in stock</p>
                </div>
                <div className="col-md-3">
                    <h3 className="font-weight-bold text-success">${product.price}</h3>
                    <h3 className="font-weight-bold">QTY: {product.quantityOrdered}</h3>
                    <button className="btn btn-danger btn-block" onClick={() => removeFromCart(product._id)}>
                        Remove from Cart
                    </button>
                </div>
            </div>
        </div>
    </>);
}

export default CartItem;