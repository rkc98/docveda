import React, { useEffect, useState } from 'react'
import styles from './AddTask.module.css'
const AddTask = ({ setopenTask, addTaskToTable, tableData, updateId }) => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [status, setStatus] = useState('OPEN');
    const [error, setError] = useState({ title: null, description: null })

    useEffect(() => {
        if (updateId) {
            console.log('updateId', updateId, 'tableData', tableData);
            const getElement = tableData.find(item => item.id === updateId);
            console.log("getElement---", getElement);
            setTitle(getElement.title);
            setDescription(getElement.description);
            setDueDate(getElement.dueDate);
            setStatus(getElement.status);
            console.log('tagsss', getElement.tags);
            setTags([...getElement.tags])
        }
        return () => { }
    }, [updateId, tableData])

    const handleTagKeyDown = (event) => {
        if (event.key === 'Enter' && newTag) {
            event.preventDefault();
            addTag(newTag);
            setNewTag('');
        }
    };

    const addTag = (tag) => {
        const uniqueTagsArray = Array.from(new Set([...tags, tag]));
        setTags(uniqueTagsArray);
    };

    const removeTag = (tag) => {
        const filteredTagsArray = tags.filter((t) => t !== tag);
        setTags(filteredTagsArray);
    };

    const handleNewTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleModalBackGroundClick = (e) => {
        setopenTask(false);
    }

    const validateInput = (title, description) => {
        if (!title) {
            setError(prev => ({ ...prev, title: 'Please enter a title' }))
        }
        if (!description) {
            setError(prev => ({ ...prev, description: 'Please enter a description' }))
        }
        if (title && description) {
            return true;
        }

        return false;

    }

    const formatDateTime = (date) => {
        const dateTime = new Date(date);

        const year = dateTime.getFullYear();
        const month = String(dateTime.getMonth() + 1).padStart(2, "0");
        const day = String(dateTime.getDate()).padStart(2, "0");
        const hours = String(dateTime.getHours()).padStart(2, "0");
        const minutes = String(dateTime.getMinutes()).padStart(2, "0");
        const seconds = String(dateTime.getSeconds()).padStart(2, "0");

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return formattedDateTime
    }

    const handleButtonClick = () => {
        const validate = validateInput(title, description);
        if (!validate) {
            return;
        }
        if (updateId) {
            const getIndex = tableData.findIndex(item => item.id === updateId);
            const data = [...tableData];
            data[getIndex] = { ...data[getIndex], title, description, dueDate, tags, status };
            addTaskToTable(data);
        }
        else {
            const date = new Date().toISOString();
            const formattedDateTime = formatDateTime(date)
            console.log('Date---', date);
            let tempArray = [];
            let id = tableData.length + 1;
            tempArray.push({ id, createdAt: formattedDateTime, title, description, dueDate, tags, status })
            addTaskToTable(prev => ([...prev, ...tempArray]))
            console.log(title, description, dueDate, tags, status);
        }

        setopenTask(false)
    }

    return (
        <div className={styles.innerModalBackGround} onClick={(e) => handleModalBackGroundClick(e)}>
            <div className={styles.addTaskModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.form}>
                    <div className={styles.row}>
                        <label htmlFor="title">Title<span className={styles.required}>*</span></label>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value); setError(prev => ({ ...prev, title: null })) }} maxLength={100} />
                    </div>
                    {error.title && <p className={styles.error}>{error.title}</p>}
                    <div className={styles.row}>
                        <label htmlFor="description">Description<span className={styles.required}>*</span></label>
                        <textarea id="description" name="description" rows="5" maxLength={1000} value={description} onChange={(e) => { setDescription(e.target.value); setError(prev => ({ ...prev, description: null })) }}></textarea>
                    </div>
                    {error.description && <p className={styles.error}>{error.description}</p>}
                    <div className={styles.row}>
                        <label htmlFor="due-date">Due Date</label>
                        <input type="date" id="due-date" name="due-date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                    </div>
                    <label htmlFor="tags">Tags</label>
                    <div className={styles.tagsContainer}>
                        {tags.map((tag) => (
                            <div key={tag} className={styles.tag}>
                                {tag} <button type="button" onClick={() => removeTag(tag)}>x</button>
                            </div>
                        ))}
                        <input
                            type="text"
                            id="tags"
                            name="tags"
                            value={newTag}
                            onKeyDown={handleTagKeyDown}
                            onChange={handleNewTagChange}
                            placeholder="Press enter to add a tag"
                        />
                    </div>
                    <div className={styles.row}>
                        <label htmlFor="status">Status<span className={styles.required}>*</span></label>
                        <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="OPEN">OPEN</option>
                            <option value="WORKING">WORKING</option>
                            <option value="DONE">DONE</option>
                            <option value="OVERDUE">OVERDUE</option>
                        </select>
                    </div>
                    <div className={styles.buttonConatiner}>
                        <button className={styles.button} onClick={handleButtonClick}>{updateId ? 'Up Date' : 'Add'}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddTask