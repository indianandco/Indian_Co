import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useState } from 'react';
import validate from '../../functions/validate';
import { useDispatch } from 'react-redux';
import { postLead } from '../../redux/actions';

const DataStep = ({
    ticket,
    setStage,
    setTicket
}) => {
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('AR');
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({
        default: "Inicializado"
    });

    const handlePhoneChange = (value) => {
        setPhoneNumber(value),
        setTicket((prevTicket) => ({
            ...prevTicket,
            num: value || 0
        }))
        validate(ticket, setErrors);
    };

    const handleCountryChange = (value) => {
        setCountry(value),
        setTicket((prevTicket) => ({
            ...prevTicket,
            country: value
        }))
        validate(ticket, setErrors);
    };

    const handleChange = (event) => {
        setTicket((prevTicket) => ({
          ...prevTicket,
          [event.target.name]: event.target.value,
          num: phoneNumber || 0,
          country: country
        }));
        validate(ticket, setErrors);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
        try {
          const response = await dispatch(postLead(ticket));
          const leadId = response.payload[0].id

          setTicket((prevTicket) => ({
            ...prevTicket,
            leadId: leadId
          }));

          setStage(2);

        } catch (error) {
          console.log(error.message);
        }
    };

    return (
        <section className="ml-[112px] mt-[40px] flex flex-col">
            <h3 className="font-[Inter] text-[18px] text-[#101828] font-semibold leading-[24px]">Completa tus datos</h3>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mt-[20px]">
                    <label className="mb-[5px] leading-[20px] text-[14px] font-['Inter']">Nombre y apellido</label>
                    <input
                        className="w-[640px] h-[40px] border border-[#D0D5DD] rounded-[8px] px-[20px] py-[10px] mb-[5px]"
                        type='text'
                        value={ticket.name}
                        name='name'
                        onChange={handleChange}
                        placeholder="Matías Edison"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-[5px] leading-[20px] text-[14px] font-['Inter']">Email</label>
                    <input
                        className="w-[640px] h-[40px] border border-[#D0D5DD] rounded-[8px] px-[20px] py-[10px] mb-[5px] focus:outline-none focus:border-[#D0D5DD] focus:ring-1 focus:ring-[#D0D5DD] invalid:border-[#D92D20] focus:invalid:border-[#D92D20] focus:invalid:ring-[#D92D20] transition"
                        type='email'
                        value={ticket.email}
                        invalid={errors.email}
                        name='email'
                        onChange={handleChange}
                        placeholder="edison@somosedison.com"
                    />
                    <span className="leading-[18px] text-[12px] font-['Inter'] mb-[20px]">Lo utilizaremos para darle acceso a la plataforma educativa de Edison</span>
                </div>
                <div className="flex flex-col">
                    <label className="mb-[5px] leading-[20px] text-[14px] font-['Inter']">Teléfono</label>
                    <PhoneInput
                        international
                        className='w-[640px] h-[40px] border border-[#D0D5DD] rounded-[8px] px-[10px] py-[10px] mb-[5px]'
                        value={phoneNumber}
                        defaultCountry={country}
                        onChange={handlePhoneChange}
                        onCountryChange={handleCountryChange}
                        countryCallingCodeEditable={false}
                        placeholder="99 9999 9999"
                    />
                    <span className="leading-[18px] text-[12px] font-['Inter'] mb-[20px]">Lo utilizaremos para enviarle notificaciones importantes sobre el curso</span>
                </div>
                <button
                    disabled={errors.default || errors.name || errors.email || errors.num}
                    type='submit'
                    className="flex transition-all w-[144px] h-[44px] mt-[40px] py-[8px] px-[14px] justify-center place-items-center gap-[8px] rounded-[8px] ml-[488px] bg-[#9B5FFF] disabled:bg-[#D0D5DD]"
                >
                    <span className="leading-[20px] text-[14px] font-['Inter'] font-medium text-[#FFFFFF]">Continuar</span>
                    <img fill='white' src='/arrow_r.svg' alt="Flecha derecha" />
                </button>
            </form>
        </section>
    );
};

export default DataStep;
