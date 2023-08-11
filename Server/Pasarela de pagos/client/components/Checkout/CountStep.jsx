const CountStep = ({ stage }) => {

    return (
        <div>
        { stage === 1 &&
            <div className="ml-[112px] mt-[180px] mb-[77px] w-fit flex place-items-center">
                <div className="flex justify-center place-items-center">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">1</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Datos personales</span>
                </div>
                <img src="/stroke.svg" className="w-[96px] mx-[10px]" alt="Stroke" />
                <div className="flex justify-center place-items-center opacity-50">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">2</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Pago</span>
                </div>
                <img src="/stroke.svg" className="w-[96px] mx-[10px]" alt="Stroke" />
                <div className="flex justify-center place-items-center opacity-50">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">3</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Confirmación</span>
                </div>
            </div>
        }
        { stage === 2 &&
            <div className="ml-[112px] mt-[180px] mb-[77px] w-fit flex place-items-center">
                <div className="flex justify-center place-items-center opacity-50">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">1</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Datos personales</span>
                </div>
                <img src="/stroke.svg" className="w-[96px] mx-[10px]" alt="Stroke" />
                <div className="flex justify-center place-items-center">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">2</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Pago</span>
                </div>
                <img src="/stroke.svg" className="w-[96px] mx-[10px]" alt="Stroke" />
                <div className="flex justify-center place-items-center opacity-50">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">3</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Confirmación</span>
                </div>
            </div>
        }
        { stage === 3 &&
            <div className="ml-[112px] mt-[180px] mb-[77px] w-fit flex place-items-center">
                <div className="flex justify-center place-items-center opacity-50">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">1</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Datos personales</span>
                </div>
                <img src="/stroke.svg" className="w-[96px] mx-[10px]" alt="Stroke" />
                <div className="flex justify-center place-items-center opacity-50">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">2</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Pago</span>
                </div>
                <img src="/stroke.svg" className="w-[96px] mx-[10px]" alt="Stroke" />
                <div className="flex justify-center place-items-center">
                    <span className="w-[27px] rounded-full bg-[#42307D] font-[Inter] font-normal text-[#FCFCFD] text-center text-[18px] m-[7px]">3</span>
                    <span className="align-middle font-[Inter] font-normal text-center text-[18px]">Confirmación</span>
                </div>
            </div>
        }
        </div>
    )
};

export default CountStep;