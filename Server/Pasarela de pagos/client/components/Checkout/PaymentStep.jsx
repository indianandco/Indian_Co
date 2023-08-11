import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCheckoutMP, postCheckoutStripe, getDescuentos } from '../../redux/actions';

const PaymentStep = ({ ticket, setTicket }) => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [cuotas, setCuotas] = useState(1);
    const [cupon, setCupon] = useState('');

    const dispatch = useDispatch();
    const descuentos = useSelector((state) => state.descuentos);

    const aplicarDescuento = () => {
        const descuentoAplicado = descuentos.find(
            (descuento) => descuento.codigo === cupon && descuento.active
        );

        if (descuentoAplicado) {
            const { tipo, valueARS, valueUSD } = descuentoAplicado;
            const precioSinDescuento = ticket.country !== 'AR' ? ticket.price_usd : ticket.price_ars;
            const montoDescuento = tipo === 'Fijo'
                ? ticket.country !== 'AR' ? valueUSD || 0 : valueARS || 0
                : (precioSinDescuento * (ticket.country !== 'AR' ? valueUSD || 0 : valueARS || 0)) / 100;
            const precioFinal = precioSinDescuento - montoDescuento;

            setTicket((prevTicket) => ({
                ...prevTicket,
                descuento: descuentoAplicado,
                precio_final: precioFinal,
            }));
        } else {
            setTicket((prevTicket) => ({
                ...prevTicket,
                descuento: null,
                precio_final: ticket.country !== 'AR' ? ticket.precio_final = ticket.price_usd : ticket.precio_final = ticket.price_ars,
            }));
        }
    };

    useEffect(() => {
        dispatch(getDescuentos());
    }, [dispatch]);

    const handleButtonClick = (buttonName) => {
        setSelectedButton(buttonName);

        if (buttonName === 'mp' || buttonName === 'transferencia') {
            setTicket((prevTicket) => ({
                ...prevTicket,
                country: "AR"
            }));
        }

        if (buttonName === 'stripe') {
            setTicket((prevTicket) => ({
                ...prevTicket,
                country: "USA"
            }));
        }
    };

    const getButtonStyle = (buttonName) => {
        return selectedButton === buttonName
            ? 'w-[200px] h-[75px] rounded-[8px] border border-[#6C8FE9] ring-2 ring-[#6C8FE9] mr-[20px] animate-pulse'
            : 'w-[200px] h-[75px] rounded-[8px] border border-[#D0D5DD] mr-[20px]';
    };

    const handleCuotasChange = (event) => {
        setCuotas(Number(event.target.value));
    };

    const handleCuponChange = (event) => {
        event.preventDefault();
        setCupon(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedButton === 'mp') {
            try {
                aplicarDescuento()
                const response = await dispatch(postCheckoutMP(ticket));
                if (response) {
                    window.location.href = response.payload;
                } else {
                    console.log(ticket)
                    console.log('Error: Invalid response format');
                }
            } catch (error) {
                console.log(error.message);
            }
        } else if (selectedButton === 'stripe') {
            try {
                aplicarDescuento()
                const response = await dispatch(postCheckoutStripe(ticket));
                if (response) {
                    window.location.href = response.payload;
                } else {
                    console.log('Error: Invalid response format');
                }
            } catch (error) {
                console.log(error.message);
            }
        } else if (selectedButton === 'transferencia') {
            // Implementar lógica para transferencia
        }
    };

    return (
        <section className="ml-[112px] mt-[40px] flex flex-col">
            <div className="mt-[20px] mb-[40px] flex items-center">
                <p className="font-[Inter] text-[14px] font-medium text-[#101828] mr-[10px]">Cuotas:</p>
                <label className="mr-[20px]">
                    <input
                        type="radio"
                        value={1}
                        checked={cuotas === 1}
                        onChange={handleCuotasChange}
                    />
                    1 cuota
                </label>
                <label>
                    <input
                        type="radio"
                        value={2}
                        checked={cuotas === 2}
                        onChange={handleCuotasChange}
                    />
                    2 cuotas
                </label>
            </div>
            <h3 className="font-[Inter] text-[18px] text-[#101828] font-semibold leading-[24px]">Selecciona el método de pago</h3>
            <div className="flex place-items-center mt-[20px] mb-[40px]">
                <button
                    className={getButtonStyle('mp')}
                    onClick={() => handleButtonClick('mp')}
                >
                    <img className="mx-auto" src="/mp_logo.png" alt="MercadoPago" />
                </button>
                <button
                    className={getButtonStyle('stripe')}
                    onClick={() => handleButtonClick('stripe')}
                >
                    <img className="mx-auto" src="/stripe_logo.png" alt="Stripe" />
                </button>
                <button
                    className={getButtonStyle('transferencia')}
                    onClick={() => handleButtonClick('transferencia')}
                >
                    <span className="mx-auto">Transferencia</span>
                </button>
            </div>
            <h6>Cupón de descuento</h6>
            <div className='flex'>
                <input
                    placeholder='Código'
                    className='w-[200px] h-[40px] border border-[#D0D5DD] rounded-[8px] p-[10px] mb-[5px]'
                    onChange={handleCuponChange}
                    value={cupon}></input>
                <button onClick={aplicarDescuento}
                    className="flex justify-center ml-[20px] transition-all w-[80px] h-[40px] p-[10px] rounded-[8px] bg-[#9B5FFF] disabled:bg-[#D0D5DD]">
                    <span className="leading-[20px] text-[14px] font-['Inter'] font-medium text-[#FFFFFF]">Aplicar</span>
                </button>
            </div>
            <button
                className="flex transition-all w-[176px] h-[44px] mt-[40px] py-[8px] px-[14px] justify-center place-items-center gap-[8px] rounded-[8px] ml-[465px] bg-[#9B5FFF] disabled:bg-[#D0D5DD]"
                onClick={(event) => handleSubmit(event)}
            >
                <span className="leading-[20px] text-[14px] font-['Inter'] font-medium text-[#FFFFFF]">Continuar al pago</span>
                <img fill='white' src='/arrow_r.svg' alt="Flecha derecha" />
            </button>
        </section>
    );
};

export default PaymentStep;
