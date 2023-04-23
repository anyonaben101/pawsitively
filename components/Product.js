function Product({ product, addToCart, addToWishlist}) {
    return (<>
        <div className="card p-4 my-3">
            <div className="row">
                <div className="col-md-3">
                    <img src={product.image} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h4 className="font-weight-bold">{product.name}</h4>
                    <p className="text-muted">{product.description}</p>
                    <p className="text-muted text-secondary">Best for {product.age_preferred} year old pets</p>
                    <p className="text-muted">{product.quantity} in stock</p>
                </div>
                <div className="col-md-3">
                    <h3 className="font-weight-bold text-success">$20.00</h3>
                    <button className="btn btn-dark btn-block" onClick={() => addToCart(product.id)}>
                        Add to Cart
                    </button>
                    <button className="btn btn-outline-info btn-block" onClick={() => addToWishlist(product.id)}>
                        Add to Wishlist
                    </button>
                </div>

            </div>
        </div>

    </>);
}

export default Product;