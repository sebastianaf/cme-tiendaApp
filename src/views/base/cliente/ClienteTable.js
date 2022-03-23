import React, { useEffect, useState, useMemo } from 'react';
import DataTable from 'react-data-table-component';

import {
    CInput,
    CButtonGroup,
    CButton,
    CSpinner
} from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { selectControlIngreso } from './ControlIngresoFetch'
//import { dropMiembros } from './MembresiasFetch'
import styles from 'src/helper/Table/styles'
import { onPrint, onExcel } from '../../../../../helper/Table/export'

//const c = console.log

const MembresiasTable = props => {

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [toggleCleared, setToggleCleared] = useState(false)
    const [tableData, setTableData] = useState()
    const [tableFields, setTableFields] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const loadTable = async () => {
            //console.log(`---from ClienteTable :loadTable---`)
            const res = await selectControlIngreso(props.idUsuario)
            //console.log(res)
            setTableData(res.data[0])
            setTableFields(res.fields[0])
        }

        if (!props.modal) {
            setLoading(true)
            loadTable()
            setLoading(false)
        }        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.modal])


    const filteredItems = tableData ? tableData.filter(item =>
        (item.Nombres && item.Nombres.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.Apellidos && item.Apellidos.toLowerCase().includes(filterText.toLowerCase())) ||
        (item.Momento_ingreso && item.Momento_ingreso.toLowerCase().includes(filterText.toLowerCase()))
    ) : []



    const subHeaderComponentMemo = useMemo(() => {

        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle)
                setFilterText('')
            }
        }


        const record = () => {
            props.setTitle("Registrar")
            props.setEditAction({ action: null, param: null })
            //props.resetForm.action()
            props.setModal(!props.modal)
            setToggleCleared(!toggleCleared)
            setResetPaginationToggle(!resetPaginationToggle)
        }


        return (
            <>
                <CButton className="mr-2 mb-1 py-1" color="primary" variant="outline" onClick={record} >
                    <CIcon className="px-0 py-0" name="cil-plus" />
                    <span className="ml-2 ">Registrar ingreso</span>
                </CButton>
                <CButton className="dataTableButtom mr-2 mb-1 py-1" color="secondary" variant="outline" onClick={() => {
                    onPrint(`${props.usuario.nombres} ${props.usuario.apellidos}`, filteredItems, tableFields.map(valor => valor.name), 'Control de ingreso') //change
                    //c(filteredItems)
                }}>
                    <CIcon name="cil-print" />
                </CButton>
                <CButton className="dataTableButtom mr-2 mb-1 py-1" color="success" variant="outline" onClick={() => {
                    onExcel(`${props.usuario.nombres} ${props.usuario.apellidos}`, filteredItems, tableFields.map(valor => valor.name), 'Control de ingreso')//change
                }} >
                    <CIcon name="cil-data-transfer-down" />
                </CButton>
                <CButtonGroup className="mr-2 mb-1">
                    <CInput
                        id="search"
                        placeholder="Buscar..."
                        aria-label="Search Input"
                        value={filterText}
                        onChange={e => setFilterText(e.target.value)}
                        autocomplete="off"
                    />
                    <CButton className="py-1" color="primary" onClick={handleClear} >
                        <CIcon className="px-0 py-0" name="cil-x-circle" />
                    </CButton>
                </CButtonGroup>

            </>
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterText, tableFields]);

    //[filterText, resetPaginationToggle, filteredItems, table, props]

    
    const calculateWidth = value => {
        switch (value.name) {
            case "id":
                return '80px'
            case "Culto":
                return '80px'
            case "Nombres":
                return '180px'
            case "Apellidos":
                return '180px'
            case "Temp":
                return '60px'
            case "Ingresó":
                return '160px'
            case "Momento_ingreso":
                return '200px'
            default:
                return `${value.length * 1}px`
        }

    }

    return (
        <>
            <DataTable
                title="Control de ingreso"
                columns={tableFields.map(valor => {
                    return {
                        name: valor.name,
                        selector: valor.name,
                        sortable: true,
                        minWidth: calculateWidth(valor)
                    }
                })}
                data={filteredItems}
                paginationResetDefaultPage={resetPaginationToggle}
                subHeaderComponent={subHeaderComponentMemo}
                
                clearSelectedRows={toggleCleared}

                progressPending={loading}
                progressComponent={<CSpinner className="my-5" color="primary" />}

                defaultSortField={'id'}
                defaultSortAsc={false}

                pagination
                subHeader


                dense

                selectableRowsHighlight
                persistTableHead
                striped
                highlightOnHover
                noDataComponent="No hay registros para mostrar"
                responsive

                paginationComponentOptions={{
                    rowsPerPageText: 'Registros por página:',
                    rangeSeparatorText: 'de',
                    noRowsPerPage: false,
                    selectAllRowsItem: false,
                    selectAllRowsItemText: 'Todas'
                }}
                contextMessage={{
                    singular: '',
                    plural: '',
                    message: 'seleccionado(s)'
                }}
                customStyles={styles}
            />

        </>
    )
}

export default MembresiasTable
