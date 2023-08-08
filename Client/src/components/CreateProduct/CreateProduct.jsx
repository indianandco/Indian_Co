import "./CreateProduct.css"
import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../services/ProductContext";
import validation from "../../utils/formValidation"
import Modal from 'react-bootstrap/Modal';
const CreateProduct = () => {


    const { postProduct } = useContext(ProductContext)
    const [productThumbnail, setProductThumbnail] = useState("")
    const [isFormValid, setIsFormValid] = useState(false)
    const [errors, setErrors] = useState({})
    const [show, setShow] = useState(false);

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

    })
    const [showPreviewModal, setShowPreviewModal] = useState(false);

    // Función para manejar el evento de mostrar/ocultar el modal de previsualización
    const handlePreviewModal = () => {
      setShowPreviewModal(!showPreviewModal);
    };
  
    // Función para manejar el envío de datos al backend
    const handleSendToBackend = () => {
      postProduct({
        ...product,
        image: productThumbnail
      });
  
      // Limpiar los campos y cerrar el modal de previsualización
      setProduct({
        title: "",
        price: 0,
        offer_boolean: null,
        offer_price: 0,
        description: "",
        stock: 0,
        category: "",
        size: "",
        fragance: "",
      });
      setErrors({});
      setProductThumbnail("");
      setShowPreviewModal(false);
    };
    useEffect(() => {
        const isValid = ((Object.keys(errors).length === Object.keys(product).length - 4) || (Object.keys(errors).length === Object.keys(product).length - 3) || (Object.keys(errors).length === Object.keys(product).length - 2)) && Object.values(errors).every((error) => error === "");
        setIsFormValid(isValid);
    }, [errors, product]);

    const handleProductThumbnailUpload = (event) => {
        const prop = event.target.name
        const file = event.target.files[0];
        validation(prop, file, errors, setErrors)
        transformFile(file)
    }
    const transformFile = (file) => {
        const reader = new FileReader()
        if (file) {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                setProductThumbnail(reader.result);
            }
        } else {
            setProductThumbnail("")
        }
    }
    const handlerChange = (event) => {
        const prop = event.target.name
        const value = event.target.value
        setProduct({
            ...product,
            [prop]: value
        })
        validation(prop, value, errors, setErrors)
    }

    const handlerSubmit = (event) => {
        event.preventDefault()
        postProduct({
            ...product,
            image: productThumbnail
        })
        if (isFormValid) {
            setProduct({
                title: "",
                price: 0,
                offer_boolean: null,
                offer_price: 0,
                description: "",
                stock: 0,
                category: "",
                size: "",
                fragance: "",
            })
            setErrors({})
        }
    }


    return (
        <div>


            <form className="form " onSubmit={handlerSubmit}>
                <div className="title2">
                    <h2> -- Subir producto al catalogo -- </h2>
                </div>
                <div className="formBox" >
                    <div className="input-field">
                        <label htmlFor="title" className="label">Nombre del Producto: </label>
                        <input className="input" name="title" type="text" value={product.title} onChange={handlerChange} />
                        {errors.title && <p>{errors.title}</p>}
                    </div>


                    <div className="input-field">
                        <label htmlFor="price" className="label">Precio: </label>
                        <input className="input" type="number" name="price" value={product.price} onChange={handlerChange} />
                        {errors.price && <p>{errors.price}</p>}
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="offer_boolean">Poner en oferta?</label>
                        <select className="input" name="offer_boolean" onChange={handlerChange}>
                            <option value="---">---</option>
                            <option value="si">Sí</option>
                            <option value="No">No</option>
                            {errors.offer_boolean && <p>{errors.offer_boolean}</p>}
                        </select>
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="offer_price">Precio en oferta</label>
                        <input className="input" type="number" name="offer_price" onChange={handlerChange} />
                        {errors.offer_price && <p>{errors.offer_price}</p>}
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="description">Descripción: </label>
                        <textarea className="input" type="text-area" name="description" rows="4" cols="50" onChange={handlerChange} />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    <div className="input-field">
                        <label className="label" htmlFor="stock">Cantidad disponible: </label>
                        <input className="input" type="number" name="stock" onChange={handlerChange} />
                        {errors.stock && <p>{errors.stock}</p>}
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="category">Categoria: </label>
                        <select className="input" name="category" id="category" onChange={handlerChange}>
                            <option value="---">---</option>
                            <option value="velas">Velas</option>
                            <option value={product.category}>Perfumes</option>
                            {errors.category && <p>{errors.category}</p>}
                        </select>
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="size">Tamaño del producto: </label>
                        <input className="input" type="text" name="size" value={product.size} onChange={handlerChange} />
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="fragance">Fragancia: </label>
                        <input className="input" type="text" name="fragance" value={product.fragance} onChange={handlerChange} />
                    </div>

                    <div className="input-field">
                        <label className="label" htmlFor="image">Subir imagen: </label>
                        <input className="input" type="file" name="image" accept="image/*" onChange={handleProductThumbnailUpload} />
                        {errors.image && <p>{errors.image}</p>}
                    </div>
                    <div>
                        <button className='send2' type="submit" disabled={!isFormValid} >Subir Producto</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default CreateProduct;