
import { Link } from 'react-router-dom';
import { CardImage } from './productImage';

export const ProductCard = ({ product }) => {
    return (

        <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <div className="card shadow-sm border-0 rounded">
                <div className="card-body   p-0">
                    <CardImage item={product} url='product' />
                    <div className="p-4">
                        <h5 className="mb-0">{product.name}</h5>
                        {/* <p className="small text-muted">CEO - Consultant</p> */}
                        <p className="small text-muted">{product.price}</p>
                        
                        <Link to={`/product/${product.slug}`}>
                            <button className="btn btn-outline-primary pt-2 mr-2 mb-2">
                                View
                                    </button>
                        </Link>
                        <button className="btn btn-outline-warning pt-2 mb-2">
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div>
        </div>


    )

}