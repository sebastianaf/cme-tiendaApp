import React, { useEffect, useState } from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CFormGroup,
    CInvalidFeedback,
    CLabel,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle,
    CRow,
    CSelect,
    CTextarea,
} from '@coreui/react'
import { selectTipoMiembro, selectTipoConvocacionCultoAbierta, selectTipoBinario } from './ControlIngresoFetch'
import { insertControlRegistro } from './ControlIngresoFormInsert'

import { useFormik } from 'formik'
import * as Yup from 'yup'

import RSelect from 'react-select';
import { styles, warningStyle } from '../../../../../helper/RSelectStyles';

const MembresiasForm = props => {

    const [tipoMiembroOptions, setTipoMiembroOptions] = useState([])
    const [tipoConvocacionAbiertaOptions, setTipoConvocacionAbiertaOptions] = useState([])
    const [tipoBinarioOptions, setTipoBinarioOptions] = useState([])
    const [dataMembresiasForm] = useState({
        convocacion: '',
        miembro: null,
        temp: 36.2,
        tapabocas: 1,
        manos: 1,
        calzado: 1,
        signos: 0,
        obs: '',
    })

    const selectTipoMiembroOP = async () => {
        const res = await selectTipoMiembro()
        setTipoMiembroOptions(res.data[0])
    }

    const selectTipoConvocacionAbiertaOP = async () => {
        const res = await selectTipoConvocacionCultoAbierta()
        setTipoConvocacionAbiertaOptions(res.data[0])
    }

    const selectTipoBinarioOP = async () => {
        const res = await selectTipoBinario()
        setTipoBinarioOptions(res.data[0])
    }

    useEffect(() => {
        selectTipoMiembroOP()
        selectTipoConvocacionAbiertaOP()
        selectTipoBinarioOP()
        formik.handleReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.modal])

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: dataMembresiasForm,
        validationSchema: Yup.object().shape({
            convocacion: Yup.string().nullable().required("Campo necesario"),
            miembro: Yup.object().shape({
                value: Yup.number(),
                label: Yup.string()
            }).nullable().required("Campo necesario"),
            temp: Yup.number("Solo numeros (usar punto)").required("Campo numérico necesario (usar punto)").max(38, "Temperatura demasiado alta").min(35, "Temperatura demasiado baja"),
            tapabocas: Yup.string().nullable(),
            manos: Yup.string().nullable(),
            calzado: Yup.string().nullable(),
            signos: Yup.string().nullable(),
            obs: Yup.string().nullable(),
        }),
        onSubmit: async data => {
            await insertControlRegistro(data, props)
        }
    })


    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <CModal
                    size="lg"
                    show={props.modal}
                    onClose={props.setModal}
                >

                    <CModalHeader closeButton>
                        <CModalTitle className="font-weight-bold">Registrar ingreso </CModalTitle>
                    </CModalHeader>
                    <CModalBody className="text-mielBlue-09 bg-mielBlue-01">
                        <CCard className="mb-0">
                            <CCardBody>
                                <CRow>
                                    <CCol md sm="12" className="mb-sm-2 mb-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="convocacion" className="font-weight-bold">Convocación</CLabel>
                                            <CSelect
                                                className="text-mielBlue-07"
                                                id="convocacion"
                                                name="convocacion"
                                                value={formik.values.convocacion}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                invalid={formik.touched.convocacion && formik.errors.convocacion}
                                                custom
                                            >
                                                <option key="0" value="" disabled hidden></option>
                                                {tipoConvocacionAbiertaOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                            </CSelect>
                                            {formik.touched.convocacion && formik.errors.convocacion ? (
                                                <CInvalidFeedback className="font-weight-normal">{formik.errors.convocacion}</CInvalidFeedback>
                                            ) : null}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md sm="12" className="mb-sm-2 mb-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="miembro" className="font-weight-bold">Miembro</CLabel>
                                            <RSelect
                                                id="miembro"
                                                name="miembro"
                                                value={formik.values.miembro}
                                                onChange={value => {
                                                    formik.handleChange({
                                                        target: {
                                                            id: 'miembro',
                                                            name: 'miembro',
                                                            value
                                                        }
                                                    })
                                                }}
                                                onBlur={value => {
                                                    formik.handleBlur({
                                                        target: {
                                                            id: 'miembro',
                                                            name: 'miembro',
                                                            value
                                                        }
                                                    })
                                                }}
                                                styles={formik.errors.miembro ? warningStyle : styles}
                                                isClearable
                                                isSearchable
                                                loadingMessage={() => "Buscando..."}
                                                noOptionsMessage={() => "Sin resultados"}
                                                placeholder="Buscar desde membresía"
                                                options={tipoMiembroOptions}
                                            />
                                            {formik.touched.miembro && formik.errors.miembro ? (
                                                <div className="font-weight-normal warning-field">{formik.errors.miembro}</div>
                                            ) : null}
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol md sm="12" className="mb-sm-2 mb-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="signos" className="font-weight-bold">Signos de gripa</CLabel>
                                            <CSelect
                                                className="text-mielBlue-07"
                                                id="signos"
                                                name="signos"
                                                value={formik.values.signos}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                invalid={formik.touched.signos && formik.errors.signos}
                                                custom
                                            >
                                                {tipoBinarioOptions.reverse().map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                            </CSelect>
                                            {formik.touched.signos && formik.errors.signos ? (
                                                <CInvalidFeedback className="font-weight-normal">{formik.errors.signos}</CInvalidFeedback>
                                            ) : null}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md sm="12" className="mb-sm-2 mb-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="tapabocas" className="font-weight-bold">Tapabocas</CLabel>
                                            <CSelect
                                                className="text-mielBlue-07"
                                                id="tapabocas"
                                                name="tapabocas"
                                                value={formik.values.tapabocas}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                invalid={formik.touched.tapabocas && formik.errors.tapabocas}
                                                custom
                                            >
                                                {tipoBinarioOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                            </CSelect>
                                            {formik.touched.tapabocas && formik.errors.tapabocas ? (
                                                <CInvalidFeedback className="font-weight-normal">{formik.errors.tapabocas}</CInvalidFeedback>
                                            ) : null}
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                                <CRow>
                                    <CCol md sm="12" className="mb-sm-2 mb-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="manos" className="font-weight-bold">Lavado de manos</CLabel>
                                            <CSelect
                                                className="text-mielBlue-07"
                                                id="manos"
                                                name="manos"
                                                value={formik.values.manos}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                invalid={formik.touched.manos && formik.errors.manos}
                                                custom
                                            >
                                                {tipoBinarioOptions.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                            </CSelect>
                                            {formik.touched.manos && formik.errors.manos ? (
                                                <CInvalidFeedback className="font-weight-normal">{formik.errors.manos}</CInvalidFeedback>
                                            ) : null}
                                        </CFormGroup>
                                    </CCol>
                                    <CCol md sm="12" className="mb-sm-2 mb-0">
                                        <CFormGroup>
                                            <CLabel htmlFor="obs" className="font-weight-bold">Observaciones</CLabel>
                                            <CTextarea
                                                id="obs"
                                                name="obs"
                                                className="text-mielBlue-07"
                                                value={formik.values.obs}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                invalid={formik.touched.obs && formik.errors.obs}
                                                placeholder="Informacion adicional relevante"
                                            />
                                            {formik.touched.obs && formik.errors.obs ? (
                                                <CInvalidFeedback className="font-weight-normal">{formik.errors.obs}</CInvalidFeedback>
                                            ) : null}
                                        </CFormGroup>
                                    </CCol>
                                </CRow>
                            </CCardBody>
                        </CCard>
                    </CModalBody>
                    <CModalFooter>
                        <CButton
                            type="submit"
                            color="primary"
                            onClick={() => {
                                /* console.log('************');
                                console.log(formik.values); */
                            }}
                        >
                            Registrar
                        </CButton>{' '}
                        <CButton
                            color="secondary"

                            onClick={() => {
                                props.setModal(!props.modal)
                            }}
                        >
                            Cancelar
                        </CButton>
                    </CModalFooter>
                </CModal >
            </form>
        </>
    )
}

export default MembresiasForm