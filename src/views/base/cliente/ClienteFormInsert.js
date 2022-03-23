import { insertControlIngreso } from './ControlIngresoFetch'

const insertControlRegistro = async (data,props) => {
    try {
        const out = await insertControlIngreso(data)
        if (!out.error) {
            props.addToast({
                header: "Aviso",
                body: `Ingreso registrado correctamente`,
                color: "success",
                position: "top-right",
                autohide: true,
                autohideValue: 2000,
                closeButton: true,
                fade: true
            })
            props.setModal(false)
        } else {
            props.addToast({
                header: "Error",
                body: `Error registrando el ingreso`,
                color: "danger",
                position: "top-right",
                autohide: true,
                autohideValue: 2000,
                closeButton: true,
                fade: true
            })
        }
    } catch (error) {
        props.addToast({
            header: "Error",
            body: `Ha ocurrido un error en el registro`,
            color: "danger",
            position: "top-right",
            autohide: true,
            autohideValue: 2000,
            closeButton: true,
            fade: true
        })
    }
}

export { insertControlRegistro }