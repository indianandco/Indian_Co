import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurso } from '../../redux/actions';
import DataStep from '../../components/Checkout/DataStep';
import CountStep from "../../components/Checkout/CountStep";
import PaymentStep from '../../components/Checkout/PaymentStep';
import Aside from "../../components/Checkout/Aside";

const Checkout = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const curso = useSelector((state) => state.curso);

    const [isLoading, setLoading] = useState(true);
    const [stage, setStage] = useState(1);
    const [ticket, setTicket] = useState({
        name: '',
        email: '',
        num: '',
        title: '',
        description: '',
        price_ars: 0,
        price_usd: 0,
        precio_final: 0,
        descuento: null
    });

    useEffect(() => {
        dispatch(getCurso(id));
    }, [dispatch, id]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    useEffect(() => {
        if (curso) {
            setTicket((prevTicket) => ({
                ...prevTicket,
                id: curso?.recordId || '',
                title: curso?.PublicName || '',
                description: curso?.Description?.[0] || '',
                price_ars: Number(curso?.['Precio $ EB']) || 0,
                price_usd: Number(curso?.['Precio USD EB']) || 0,
            }));
        }
    }, [curso]);

    if (!curso) {
        return (
            <main className="h-screen w-full flex justify-center items-center bg-[#FCFCFD] transition">
                <img src="/favicon.png" className="animate-spin h-12 w-12" alt="Cargando..." />
            </main>
        );
    }

    return (
        <main className="flex transition">
            <section className="w-full h-[900px] bg-[#FCFCFD]">
                <img className="inline-block ml-[50px] mt-[28px] w-[177px] h-[44px] absolute" src="/logocheckout.png" alt="Logo" />
                <CountStep stage={stage} />
                {isLoading ? (
                    <div className="flex justify-center items-center h-[300px]">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#2D3277]"></div>
                    </div>
                ) : (
                    <h1 className="mt-[69px] ml-[112px] w-[640px] font-[Inter] text-[24px] leading-[32px]">
                        Ya estás un paso más cerca de impulsar tu carrera con el curso <span className="text-[#6941C6] font-[Inter] font-bold">{curso?.PublicName}</span>
                    </h1>
                )}
                {stage === 1 && !isLoading && (
                    <DataStep
                        ticket={ticket}
                        setStage={setStage}
                        setTicket={setTicket}
                    />
                )}
                {stage === 2 && !isLoading && (
                    <PaymentStep
                        ticket={ticket}
                        setTicket={setTicket}
                    />
                )}
            </section>
            <aside className="min-w-[446px] h-[960px] bg-[#6941C6] text-[#FCFCFD] flex flex-col justify-center">
                <Aside isLoading={isLoading} stage={stage} ticket={ticket}/>
            </aside>
        </main>
    );
};

export default Checkout;
