import React, { useState } from 'react'
import AddTask from '../components/AddTask'
import Table from '../components/Table'
import styles from './Home.module.css'



let testData=[{
    id:1,
    createdAt:'2023-04-09 14:34:00',
    title:'Task1',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:['one','two','three'],
    status: 'OPEN'
},
{
    id:2,
    createdAt:'2023-04-09 14:34:00',
    title:'Task2',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:['one','two','three','four'],
    status: 'OPEN'
},
{
    id:3,
    createdAt:'2023-04-09 14:34:00',
    title:'Task3',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:['one','two'],
    status: 'OPEN'
},
{
    id:4,
    createdAt:'2023-04-09 14:34:00',
    title:'Task4',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:[],
    status: 'OPEN'
},
{
    id:5,
    createdAt:'2023-04-09 14:34:00',
    title:'Task5',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:['one','two','three','four'],
    status: 'OPEN'
},
{
    id:6,
    createdAt:'2023-04-09 14:34:00',
    title:'Task6',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:['one','six','seven','eight'],
    status: 'OPEN'
},
{
    id:7,
    createdAt:'2023-04-09 14:34:00',
    title:'Task7',
    description:'Test Description',
    dueDate: '2023-04-10',
    tags:['one','eight'],
    status: 'OPEN'
}


]


const Home = () => {

    const [openTaskMoal, setOpenTaskModal] = useState(false)
    const [tableData, setTableData] = useState([...testData]);
    const [updateId, setUpdateId] = useState(null)
    console.log("updateId---",updateId);

    return (
        <>
            <div className={styles.homeContainer}>
                <h1 className={styles.title}>To-Do List App using React</h1>
                <div className={styles.contentContainer}>
                    <div className={styles.buttonContainer}>
                        <button className={styles.button} onClick={()=>{setOpenTaskModal(true);setUpdateId(null)}}>Add Task</button>
                    </div>
                    <Table tableData={tableData} setopenTask={setOpenTaskModal} setUpdateId={setUpdateId} setTableData={setTableData} />
                </div>
            </div>
            {openTaskMoal && <AddTask setopenTask={setOpenTaskModal} addTaskToTable={setTableData} tableData={tableData} updateId={updateId} />}
        </>
    )
}

export default Home