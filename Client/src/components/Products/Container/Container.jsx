/* eslint-disable react/prop-types */
import "./Container.css"
import Cards from "../Card/Cards"

const Container = ({ allProducts }) => {

    return (
        <div className="products_container">
            {
                allProducts.payload?.map(({ id, title, price, offer_price, description, offer, size, fragance, image, category }) => {
                    return (
                        <Cards
                            key={id}
                            id={id}
                            title={title}
                            description={description}
                            image={image}
                            offer={offer}
                            offer_price={offer_price}
                            size={size}
                            price={price}
                            category={category}
                            fragance={fragance}
                        />
                    )
                })
            }
        </div>

    )
}

export default Container;