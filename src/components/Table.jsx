import React, { useMemo, useState } from 'react'
import styles from './Table.module.css'
import Pagination from '../utils/Pagination';
import { BiEdit } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'

const PageSize = 5;
const Table = ({ tableData ,setopenTask,setUpdateId,setTableData}) => {
    const [currentPage, setCurrentPage] = useState(1);
    // Pagination
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return tableData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, tableData])

    const handleEdit = (id) => {
        console.log('editing--',id);
        setUpdateId(id)
        setopenTask(true);
    }

    const handleDelete = (id) => {
        const deleteItem = tableData.filter(item => item.id !== id);
        setTableData(deleteItem)
    }


    return (
        <>
            <table className={styles.rwdtable}>
            <tbody>
                <tr>
                    <th>Created At</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Due Date</th>
                    <th>Tags</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
                
                {currentTableData.map((item) => <tr key={item.id}>
                    <td>{item.createdAt}</td>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.tags.map(el=><span className={styles.chip}>{el}</span>)}</td>
                    <td>{item.status}</td>
                    <td>
                        <BiEdit className={styles.editIcon} onClick={() => handleEdit(item.id)} />
                        <MdDelete className={styles.deleteIcon} onClick={() => handleDelete(item.id)} />
                    </td>
                </tr>)}
                </tbody>
            </table>

            <Pagination
                className={styles.paginationBar}
                currentPage={currentPage}
                totalCount={tableData.length}
                pageSize={PageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    )
}

export default Table