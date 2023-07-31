import "./CreateProduct.css"
import { useState, useContext } from "react";
import { ProductContext } from "../../services/ProductContext";

const CreateProduct = () => {


    const { postProduct } = useContext(ProductContext)

    const [product, setProduct] = useState({
        title: "",
        price: 0,
        offer_boolean: null,
        offer_price: 0,
        description: "",
        stock: 0,
        category: "",
        size: "",
        fragance: "",
        image: ""

    })

    const handlerSubmit = (event) => {
        event.preventDefault()
        postProduct(product)

    }


    return (
        <div>
            <div className="title">
                <h2>Subir producto al catalogo</h2>
            </div>

            <form onSubmit={handlerSubmit}>
                <div className="container" >
                    <div className="label" >
                        <label htmlFor="title">Nombre del Producto: </label>
                        <input name="title" type="text" />
                    </div>

                    <div className="label" >
                        <label htmlFor="price">Precio: </label>
                        <input type="number" name="price" />
                    </div>

                    <div className="label" >
                        <label htmlFor="offer_boolean">Poner este precio en oferta?</label>
                        <select name="offer_boolean">
                            <option value="---">---</option>
                            <option value="si">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="label" >
                        <label htmlFor="offer_price">Precio en oferta</label>
                        <input type="number" name="offer_price" />
                    </div>

                    <div className="label" >
                        <label htmlFor="description">Descripción del Producto: </label>
                        <textarea type="text-area" name="description" rows="4" cols="50" />
                    </div>

                    <div className="label" >
                        <label htmlFor="stock">Cantidad disponible: </label>
                        <input type="number" name="stock" />
                    </div>

                    <div className="label" >
                        <label htmlFor="category">Categoria: </label>
                        <select name="category" id="category">
                            <option value="---">---</option>
                            <option value="Velas">Velas</option>
                            <option value="Perfumes">Perfumes</option>
                        </select>
                    </div>

                    <div className="label" >
                        <label htmlFor="size">Tamaño del producto: </label>
                        <input type="text" name="size" />
                    </div>

                    <div className="label" >
                        <label htmlFor="fragance">Fragancia: </label>
                        <input type="text" name="frangance" />
                    </div>

                    <div className="label" >
                        <label htmlFor="image">Subir imagen: </label>
                        <input type="file" name="image" />

                    </div>
                    <div>
                        <button type="submit" >Subir Producto</button>
                    </div>

                </div>
            </form>
        </div>

    )
}

export default CreateProduct;