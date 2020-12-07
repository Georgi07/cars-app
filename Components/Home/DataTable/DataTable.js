import React from "react";
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios';

export default function DataTable() {
    const { useState, useEffect } = React;
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
        Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    const [columns, setColumns] = useState([
        { title: 'City', field: 'city' },
        { title: 'Color', field: 'color' },
        { title: 'Condition', field: 'condition' },
        { title: 'Engine Type', field: 'engineType' },
        { title: 'Extras', field: 'extras' },
        { title: 'Gear Box', field: 'gearBox' },
        { title: 'Horse Power', field: 'horsePower' },
        { title: 'Make', field: 'make' },
        { title: 'Mileage', field: 'mileage' },
        { title: 'Model', field: 'model' },
        { title: 'Price', field: 'price' },
        {title: 'Year', field: 'year'}

    ]);

    const [data, setData] = useState([]);
    const userToken =localStorage.getItem('token');
    const updateDataObject = (dataObj) => {
        const newObj = {...dataObj};
        delete newObj.tableData;
        Object.assign(newObj, {user: JSON.parse(window.localStorage.getItem('user'))});
        return newObj; };
        
     useEffect(() => {
        axios.get('http://localhost:8083/cars/all', data).then(response => {setData(response.data)});
         }, []);
    return (
        <MaterialTable
            title="Editable Preview"
            icons={tableIcons}
            columns={columns}
            data={data}
            editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            setData([...data, newData]);
                         const carData = updateDataObject(newData);
                            axios.post('http://localhost:8083/cars', carData, {
                                    headers: {'Authorization': `Bearer ${userToken}`,
                                     'Content-Type': 'application/json'}
                                }).then(response => {
                                    setData([...data, carData])
                                });
                                resolve();
                        }, 1000)
                    }), 
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataUpdate = [...data];
                            const index = oldData.tableData.id;
                            dataUpdate[index] = newData;

                             axios.put(`http://localhost:8083/cars/${newData.user.id}`, newData, {
                                headers: {'Authorization': `Bearer ${userToken}`,
                                 'Content-Type': 'application/json'}
                            }).
                                  then(response => {
                                      setData([...data, newData])
                                });
                            resolve();
                        }, 1000)
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            //  console.log(data[index])
                            axios.delete(`http://localhost:8083/cars/${data[index].id}/${data[index].user.id}`, {
                                headers: {'Authorization': `Bearer ${userToken}`,
                                 'Content-Type': 'application/json'}
                            }).then(response => {
                                setData([...dataDelete])
                            });
                            resolve()
                        }, 1000)
                    }),
            }}
        />
    )
}
