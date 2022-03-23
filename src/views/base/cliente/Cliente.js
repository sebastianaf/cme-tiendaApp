import React, { useState } from 'react'
import { CCard, CCardBody, CCol, CRow } from '@coreui/react'

/* import {
    CChartBar,
    CChartPie
} from '@coreui/react-chartjs' */

import ControlIngresoTable from './ControlIngresoTable'
import ControlIngresoForm from './ControlIngresoForm'
import Confirmation from '../../../../../helper/Confirmation/Confirmation'
import Toaster from '../../../../../helper/Toaster/Toaster'

const ControlIngreso = (props) => {
  //Modal state props
  const [title, setTitle] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState({
    action: () => {},
    param: [],
  })
  const [editAction, setEditAction] = useState({ action: null, param: null })

  //Form state props
  const [modal, setModal] = useState(false)
  const [resetForm, setResetForm] = useState(() => {})

  //Toaster state props
  const [toasts, setToasts] = useState([])
  const [modalBody, setModalBody] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [modalLabel, setModalLabel] = useState('')

  const addToast = ({
    header,
    body,
    color,
    position,
    autohide,
    autohideValue,
    closeButton,
    fade,
  }) => {
    setToasts([
      ...toasts,
      {
        header,
        body,
        color,
        position,
        autohide: autohide && autohideValue,
        closeButton,
        fade: fade,
      },
    ])
  }

  return (
    <>
      <Toaster toasts={toasts} />
      <ControlIngresoForm
        {...props}
        modal={modal}
        resetForm={resetForm}
        addToast={addToast}
        setModal={setModal}
        setResetForm={setResetForm}
        //Form
        title={title}
        editAction={editAction}
        setEditAction={setEditAction}
      />
      <Confirmation
        setShowModal={setShowModal}
        showModal={showModal}
        title={modalTitle}
        body={modalBody}
        label={modalLabel}
        action={action}
        addToast={addToast}
      />
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <ControlIngresoTable
                {...props}
                modal={modal}
                idUsuario={'1'}
                addToast={addToast}
                showModal={showModal}
                setModal={setModal}
                setShowModal={setShowModal}
                setModalBody={setModalBody}
                setModalTitle={setModalTitle}
                setModalLabel={setModalLabel}
                setAction={setAction}
                //Form
                resetForm={resetForm}
                editAction={editAction}
                setTitle={setTitle}
                setEditAction={setEditAction}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      {/* <CRow>
                <CCol xs="12" lg="6">
                    <CCard>
                        <CCardHeader>
                            <CBadge className="mr-2" color="info">
                                Graficos demostrativos
                            </CBadge>
                            <span>Cantidad de miembros nuevos cada mes</span>
                        </CCardHeader>
                        <CCardBody>
                            <CChartBar
                                datasets={[
                                    {
                                        label: '2020',
                                        backgroundColor: '#edddaa',
                                        data: [0, 0, 2, 3, 1, 3, 2, 1, 3, 2, 5, 0]
                                    },
                                    {
                                        label: '2021',
                                        backgroundColor: '#dcbe5c',
                                        data: [5, 1, 2, 2, 1, 3, 0, 0, 0, 0, 0, 0]
                                    }
                                ]}
                                labels={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>

                <CCol xs="12" lg="6">
                    <CCard>
                        <CCardHeader>
                            <CBadge className="mr-2" color="info">
                                Graficos demostrativos
                            </CBadge>
                            Historico del uso de stocks
            </CCardHeader>
                        <CCardBody>
                            <CChartPie
                                datasets={[
                                    {
                                        backgroundColor: [
                                            '#ebedef',
                                            '#c4c9d0',
                                            '#9da5b1',
                                            '#636f83'
                                        ],
                                        data: [60, 15, 25]
                                    }
                                ]}
                                labels={['Palmira', 'Yumbo', 'Cali']}
                                options={{
                                    tooltips: {
                                        enabled: true
                                    }
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow> */}
    </>
  )
}

export default ControlIngreso
