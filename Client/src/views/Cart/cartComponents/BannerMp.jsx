import styles from "./BannerMp.module.css";

const BannerMp = () => {
  return (
    <>
    <div className={styles.bannerMp}>
        <p className={styles.bannerMp_Title}>Inicia sesión en Mercado Pago y obtén beneficios</p>
        <div className={styles.bannerMp_benefitList}>
            <div className={styles.bannerMp_benefitList_Item}>
                <img className={styles.bannerMp_benefitList_logo} src="/mpLogos/blue-wallet.png" alt=""/>
                <div>
                    <p className={styles.bannerMp_benefitList_p_title}>Paga rápido</p>
                    <p className={styles.bannerMp_benefitList_p_subTitle}>Usa tu dinero disponible o tarjetas guardadas.</p>
                </div>
            </div>
            <div className={styles.bannerMp_benefitList_Item}>
                <img className={styles.bannerMp_benefitList_logo} src="/mpLogos/blue-phone-installments.png" alt=""/>
                <div>
                    <p className={styles.bannerMp_benefitList_p_title}>Accede a cuotas</p>
                    <p className={styles.bannerMp_benefitList_p_subTitle}>Paga con o sin tarjeta de crédito.</p>
                </div>
            </div>
            <div className={styles.bannerMp_benefitList_Item}>
                <img className={styles.bannerMp_benefitList_logo} src="/mpLogos/blue-protection.png" alt=""/>
                <div>
                    <p className={styles.bannerMp_benefitList_p_title}>Compra con confianza</p>
                    <p className={styles.bannerMp_benefitList_p_subTitle}>Recibe ayuda si tienes algún problema con tucompra.</p>
                </div>
            </div>
        </div>
        <div className={styles.bannerMp_redirect}>
            <i className="bi bi-lock-fill"></i>
            <p>Al continuar, te llevaremos a Mercado Pago para completar tu compra de forma segura.</p>
        </div>
    </div>
        <p className={styles.bannerMp_TermnsCondition}>Al continuar, aceptas nuestros<a href="https://www.mercadopago.com.ar/ayuda/terminos-y-politicas_194" target="_blank" rel="noreferrer">Términos y condiciones</a>.</p>
    </>
  )
}
export default BannerMp