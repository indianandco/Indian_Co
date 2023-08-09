import { useSelector } from "react-redux";

const Aside = ({ isLoading, stage, ticket }) => {
    const curso = useSelector((state) => state.curso);

    const fechaInicio = new Date(curso?.["Fecha Primera Clase"]);
    const fechaFin = new Date(curso?.["Fecha Última Clase"]);
    const locale = 'es';
    const cursoInicio = `${fechaInicio.getUTCDate()} de ${fechaInicio.toLocaleString(locale, { month: 'long' })}`;
    const cursoFin = `${fechaFin.getUTCDate()} de ${fechaFin.toLocaleString(locale, { month: 'long' })}`;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-slate-100"></div>
            </div>
        );
    }

    if (stage === 1) {
        return (
            <aside className="w-[248px] ml-[83px]">
                <h1 className="font-[Inter] text-[20px] font-medium leading-[30px]">Resumen de compra</h1>
                <div className="mt-[29px]">
                    <h6 className="font-semibold font-[Inter]">Curso</h6>
                    <p className="font-[Inter] text-[14px] leading-[20px]">{curso?.PublicName}</p>
                </div>
                <div>
                    <h6 className="font-semibold font-[Inter]">Instructor</h6>
                    <p className="text-[14px] leading-[20px] font-[Inter]">{curso?.["Nombre Profesor"]}</p>
                </div>
                <div className="grid grid-cols-2 gap-[38px]">
                    <div>
                        <h6 className="font-semibold font-[Inter]">Inicio</h6>
                        <p className="text-[14px] leading-[20px] font-[Inter]">{cursoInicio}</p>
                    </div>
                    <div>
                        <h6 className="font-semibold font-[Inter]">Fin</h6>
                        <p className="text-[14px] leading-[20px] font-[Inter]">{cursoFin}</p>
                    </div>
                </div>
                <div>
                    <h6 className="font-semibold">Días</h6>
                    <p className="text-[14px] leading-[20px] font-[Inter]">{curso?.["Fecha de Clases"]}</p>
                </div>
                <div>
                    <h6 className="font-semibold">Horario</h6>
                    <p className="text-[14px] leading-[20px] font-[Inter]">{curso?.["Hora Inicio (GMT-3)"]} a {curso?.["Hora Fin (GMT-3)"]}</p>
                </div>
            </aside>
        );
    }

    if (stage === 2) {
        const { descuento } = ticket;
        const descuentoValue = descuento && descuento.tipo === 'PORCENTAJE' ? descuento.valueARS || descuento.valueUSD : 0;

        return (
            <aside className="w-[248px] py-[162px] px-[48px]">
                <div className="w-[350px]">
                    <h1 className="font-[Inter] text-[20px] font-medium leading-[30px] mb-[29px]">Resumen de compra</h1>
                    <div>
                        <h6 className="font-semibold font-[Inter]">Curso</h6>
                        <p className="font-[Inter] text-[14px] leading-[20px]">{curso?.PublicName}</p>
                    </div>
                    <div>
                        <h6 className="font-semibold font-[Inter]">Instructor</h6>
                        <p className="text-[14px] leading-[20px] font-[Inter]">{curso?.["Nombre Profesor"]}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-[38px]">
                        <div>
                            <h6 className="font-semibold font-[Inter]">Inicio</h6>
                            <p className="text-[14px] leading-[20px] font-[Inter]">{cursoInicio}</p>
                        </div>
                        <div>
                            <h6 className="font-semibold font-[Inter]">Fin</h6>
                            <p className="text-[14px] leading-[20px] font-[Inter]">{cursoFin}</p>
                        </div>
                    </div>
                    <div>
                        <h6 className="font-semibold">Días</h6>
                        <p className="text-[14px] leading-[20px] font-[Inter]">{curso?.["Fecha de Clases"]}</p>
                    </div>
                    <div className="mb-[60px]">
                        <h6 className="font-semibold">Horario</h6>
                        <p className="text-[14px] leading-[20px] font-[Inter]">{curso?.["Hora Inicio (GMT-3)"]} a {curso?.["Hora Fin (GMT-3)"]}</p>
                    </div>
                    <div className="flex justify-between">
                        <h1 className="text-[20px] leading-[30px] font-[Inter]">Total:</h1>
                        {descuento ? (
                            <>
                                {descuento.tipo === 'Fijo' ? (
                                    <div>

                                        <h1 className="text-[20px] leading-[30px] font-[Inter]">
                                            {ticket.country === 'AR'
                                                ? `${ticket.price_ars - descuento.valueARS} ARS`
                                                : `${ticket.price_usd - descuento.valueUSD} USD`}
                                        </h1>
                                        <h1 className="text-[20px] leading-[30px] font-[Inter] line-through text-[#D0D5DD]">
                                            {ticket.country === 'AR' ? `${ticket.price_ars} ARS` : `${ticket.price_usd} USD`}
                                        </h1>
                                    </div>
                                ) : (
                                    <div>
                                        <h1 className="text-[20px] leading-[30px] font-[Inter]">
                                            {ticket.country === 'AR'
                                                ? `${ticket.price_ars - (ticket.price_ars * (descuento.valueARS / 100))} ARS`
                                                : `${ticket.price_usd - (ticket.price_usd * (descuento.valueUSD / 100))} USD`}
                                        </h1>
                                        <h1 className="text-[20px] leading-[30px] font-[Inter] line-through text-[#D0D5DD]">
                                            {ticket.country === 'AR' ? `${ticket.price_ars} ARS` : `${ticket.price_usd} USD`}
                                        </h1>

                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                <h1 className="text-[20px] leading-[30px] font-[Inter]">
                                    {ticket.country === 'AR' ? `${ticket.price_ars} ARS` : `${ticket.price_usd} USD`}
                                </h1>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        );
    }
}

export default Aside;