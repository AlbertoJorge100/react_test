import axios from "axios";
import Swal from 'sweetalert2';
const BaseUrl = process.env.REACT_APP_API_URL;

export const $successMessage = (msg = "Excelente") => $swalMessage(1, msg);
export const $warningMessage = (msg = "Aviso") => $swalMessage(2, msg);
export const $errorMessage = (msg = "Hay un error") => $swalMessage(3, msg);
export const $successAlert = (msg = "Proceso realizado exitosamente") => $swalAlert(1, msg);
export const $warningAlert = (msg) => $swalAlert(2, msg);
export const $errorAlert = (msg) => $swalAlert(3, msg);
export const $element = (id) => document.getElementById(id);
export const $typeOf = (id) => typeof id === 'string' ? $element(id) : id;
const $delay = (mSeconds) => new Promise(resolve => setTimeout(resolve, mSeconds));

export const $questionAlert = (
    text = '¿Está seguro(a) de realizar la acción?'
) => {
    return Swal.fire({
        title: "Confirmación",
        text: text,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
        icon: 'question',
    }).then((res) => { return res.isConfirmed; });
};

const $swalMessage = (type, message) => {
    return Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    }).fire({
        icon: type == 1 ? 'success' : (type == 2 ? 'warning' : 'error'),
        title: message,
    }).then((res) => { return res; });
};

const $swalAlert = (type, message) => {
    return Swal.fire({
        title: type != 3 ? 'Aviso' : 'Error',
        text: message,
        icon: type == 1 ? 'success' : (type == 2 ? 'warning' : 'error'),
        allowOutsideClick: false,
        confirmButtonText: "Aceptar",
    }).then((res) => { return res; });
};

export const $loadingAlert = () => {
    const overlay = document.createElement("div");
    overlay.id = "mi-overlay";
    overlay.style.backgroundColor = "transparent";
    overlay.style.opacity = "0.9";
    overlay.style.cursor = "wait";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "1500";
    const spinner = document.createElement("div");
    spinner.innerHTML =
        '<i class="fa-5x fas fa-spinner fa-spin" style="color: #27374D;"></i>';
    spinner.style.position = "absolute";
    spinner.style.top = "50%";
    spinner.style.left = "50%";
    spinner.style.transform = "translate(-50%, -50%)";
    overlay.appendChild(spinner);
    document.body.appendChild(overlay);
}

export const $closeAlert = () => {
    const overlay = document.getElementById("mi-overlay");
    if (!overlay) return;
    const animationId = overlay.dataset.animationId;
    cancelAnimationFrame(animationId);
    overlay.remove();
};

export const $getRequest = (url, ...data) => $request(1, url, data);
export const $postRequest = (url, ...data) => $request(2, url, data);
export const $putRequest = (url, ...data) => $request(3, url, data);

/**
 * 
 * @param {*} method int
 * @param {*} url string
 * @param {*} params ['/param1/param2', {key: value}]
 * @returns 
 */
const $request = (method, url, data = []) => {
    console.log(BaseUrl);
    const methodType = {
        1: 'GET',
        2: 'POST',
        3: 'PUT',
        4: 'DELETE',
    };   
    //return ['param1/param2...', {key:value}]
    const paramsAux = () => {
        let string = '';
        let obj = {};
        data.forEach(element => {
            if (element instanceof Object) obj = element;
            else string += `/${element}`;
        });
        return [string, obj];
    };
    const auxData = paramsAux();
    const buildRoute = () => {
        const arr = url.split('.');
        let route = '';
        arr.forEach(element => {
            route += `/${element}`;
        });
        return BaseUrl + route + auxData[0];
    };    
    $loadingAlert();
    return axios({
        method: methodType[method],
        url: buildRoute(),
        data: auxData[1],
        //withCredentials: true,
        headers: {            
            'Accept': 'application/json'
        }
    }).then(({ data }) => {
        $closeAlert();
        return data;
    }).catch(async (error) => {
        $closeAlert();
        const errorCode = error.response.status;
        await $errorMessage(error.request.response ?
            JSON.parse(error.request.response).message : error.message
        );        
    });
}

export const $validateForm = (formId, evPreventDefault = true, event) => {
    if(evPreventDefault) event.preventDefault();
    const form = $typeOf(formId);
    form.classList.add('was-validated');    
    if(!form.checkValidity()) return false;
    return true;
};
