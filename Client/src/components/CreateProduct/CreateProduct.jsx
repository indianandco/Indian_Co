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

    const handlerChange = (event)=>{
        const prop = event.target.name
        const value = event.target.value
        setProduct({
            ...product,
            [prop]:value
        })
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        console.log(product)
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
                        <input name="title" type="text" value={product.title} onChange={handlerChange}/>
                    </div>

                    <div className="label" >
                        <label htmlFor="price">Precio: </label>
                        <input type="number" name="price" value={product.price}onChange={handlerChange}/>
                    </div>

                    <div className="label" >
                        <label htmlFor="offer_boolean">Poner este precio en oferta?</label>
                        <select name="offer_boolean" onChange={handlerChange}>
                            <option value="---">---</option>
                            <option value="si">Sí</option>
                            <option value="No">No</option>
                        </select>
                    </div>

                    <div className="label" >
                        <label htmlFor="offer_price">Precio en oferta</label>
                        <input type="number" name="offer_price"onChange={handlerChange} />
                    </div>

                    <div className="label" >
                        <label htmlFor="description">Descripción del Producto: </label>
                        <textarea type="text-area" name="description" rows="4" cols="50" onChange={handlerChange}/>
                    </div>

                    <div className="label" >
                        <label htmlFor="stock">Cantidad disponible: </label>
                        <input type="number" name="stock"onChange={handlerChange} />
                    </div>

                    <div className="label" >
                        <label htmlFor="category">Categoria: </label>
                        <select name="category" id="category"onChange={handlerChange}>
                            <option value="---">---</option>
                            <option value="velas">Velas</option>
                            <option value={product.category}>Perfumes</option>
                        </select>
                    </div>

                    <div className="label" >
                        <label htmlFor="size">Tamaño del producto: </label>
                        <input type="text" name="size" value={product.size}onChange={handlerChange}/>
                    </div>

                    <div className="label" >
                        <label htmlFor="fragance">Fragancia: </label>
                        <input type="text" name="fragance" value={product.fragance}onChange={handlerChange} />
                    </div>

                    <div className="label" >
                        <label htmlFor="image">Subir imagen: </label>
                        <input type="file" name="image" value={product.image}onChange={handlerChange}/>

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