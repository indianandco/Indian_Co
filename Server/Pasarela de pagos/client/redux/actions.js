import axios from "axios";
import { GET_CURSOS, GET_CURSO, POST_CHECKOUT_STRIPE, POST_CHECKOUT_MP, POST_LEAD, GET_DESCUENTOS } from "./action-types";

export const getCursos = () => {
  return async function (dispatch) {
    try {
      const response = await axios("/cursos");
      const cursosPublicados = response.data.filter(
        (curso) => curso.Status === "Published"
      );
      const cursosOrdenados = cursosPublicados.sort((a, b) => {
        const fechaA = new Date(a["Fecha Primera Clase"]);
        const fechaB = new Date(b["Fecha Primera Clase"]);
        return fechaA - fechaB;
      });
      return dispatch({
        type: GET_CURSOS,
        payload: cursosOrdenados,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postLead = (payment) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/crear-lead", payment);
      return dispatch({
        type: POST_LEAD,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCheckoutStripe = (payment) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/crear-stripe", payment);
      return dispatch({
        type: POST_CHECKOUT_STRIPE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postCheckoutMP = (payment) => {
  return async function (dispatch) {
    try {
      const response = await axios.post("/crear-mp", payment);
      return dispatch({
        type: POST_CHECKOUT_MP,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCurso = (id) => {
  return async function (dispatch) {
      try {
          const response = await axios('/curso/' + id);
          return dispatch({
              type: GET_CURSO,
              payload: response.data
          })
      } catch (error) {
          console.log(error);
      };
  };
};

export const getDescuentos = () => {
  return async function (dispatch) {
    try {
      const response = await axios("/descuentos");
      return dispatch({
        type: GET_DESCUENTOS,
        payload: response.data
      });
    } catch (error) {
      console.log(error);
    }
  };
};