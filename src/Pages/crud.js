import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Crud = () => {

    const [data, setData] = useState({
        id: "",
        title: "",
        price: "",
        resolution: "",
        sound_quality: ""
    });
    const [sub, setSub] = useState([]);
    const [isedit, setIsedit] = useState(false);

    useEffect(() => {
        fetch();
    }, [])

    const fetch = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/subscriptions`)
            .then(res => {
                if (res.data.status) {
                    setSub(res.data.data);
                    console.log(res.data.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handledelete = (id) => {
        if (window.confirm("delete")) {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/subscriptions`)
                .then(res => {
                    if (res.data.status) {
                        setData(sub.filter(item => item.id !== id))
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
    const handleedit = (item) => {
        setData(item);
        setIsedit(true);
    }

    const handlechange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    };

    return (
        <div>
            <form>
                <input type='text' placeholder='title' name='title' value={data.title} onChange={handlechange} />
                <input type='text' placeholder='price' name='price' value={data.price} onChange={handlechange} />
                <input type='text' placeholder='resolution' name='resolution' value={data.resolution} onChange={handlechange} />
                <input type='text' placeholder='sound_quality' name='sound_quality' value={data.sound_quality} onChange={handlechange} />
                <button type='submit'>{isedit ? "update" : "add" }</button> 
            </form>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>title</th>
                        <th>price</th>
                        <th>resolution</th>
                        <th>sound_quality</th>
                    </tr>
                </thead>
            </table>
            <tbody>
                {
                    sub &&
                    sub.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.resolution}</td>
                            <td>{item.sound_quality}</td>
                            <td>
                                <button className='btn' onClick={() => handleedit(item)} >Edit</button>
                                <button className='btn btn-danger' onClick={() => handledelete(item.id)} >Delete</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>

        </div>
    )
}

export default Crud
