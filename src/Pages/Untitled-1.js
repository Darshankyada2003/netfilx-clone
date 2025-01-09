// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Crud = () => {
//     const [data, setData] = useState({
//         id: "",
//         title: "",
//         price: "",
//         resolution: "",
//         sound_quality: ""
//     });
//     const [sub, setSub] = useState([]);
//     const [isEditing, setIsEditing] = useState(false); // Flag to toggle between add and update

//     // Fetch data
//     useEffect(() => {
//         fetchSubscriptions();
//     }, []);

//     const fetchSubscriptions = () => {
//         axios.get(`${process.env.REACT_APP_BASE_URL}/subscriptions`)
//             .then(res => {
//                 if (res.data.status) {
//                     setSub(res.data.data);
//                 }
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     };

//     // Handle form changes
//     const handleChange = (e) => {
//         setData({ ...data, [e.target.name]: e.target.value });
//     };

//     // Insert (Create)
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (isEditing) {
//             // Update existing entry
//             axios.put(`${process.env.REACT_APP_BASE_URL}/subscriptions/${data.id}`, data)
//                 .then(res => {
//                     if (res.data.status) {
//                         fetchSubscriptions();
//                         setData({ id: "", title: "", price: "", resolution: "", sound_quality: "" });
//                         setIsEditing(false);
//                     }
//                 })
//                 .catch(err => console.log(err));
//         } else {
//             // Create new entry
//             axios.post(`${process.env.REACT_APP_BASE_URL}/subscriptions`, data)
//                 .then(res => {
//                     if (res.data.status) {
//                         fetchSubscriptions();
//                         setData({ id: "", title: "", price: "", resolution: "", sound_quality: "" });
//                     }
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     // Delete
//     const handleDelete = (id) => {
//         if (window.confirm("Are you sure you want to delete?")) {
//             axios.delete(`${process.env.REACT_APP_BASE_URL}/subscriptions/${id}`)
//                 .then(res => {
//                     if (res.data.status) {
//                         setSub(sub.filter(item => item.id !== id));
//                     }
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     // Edit
//     const handleEdit = (item) => {
//         setData(item);
//         setIsEditing(true);
//     };

//     return (
//         <div>
//             <h2>Subscription CRUD</h2>
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     name="title"
//                     value={data.title}
//                     onChange={handleChange}
//                     placeholder="Title"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="price"
//                     value={data.price}
//                     onChange={handleChange}
//                     placeholder="Price"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="resolution"
//                     value={data.resolution}
//                     onChange={handleChange}
//                     placeholder="Resolution"
//                     required
//                 />
//                 <input
//                     type="text"
//                     name="sound_quality"
//                     value={data.sound_quality}
//                     onChange={handleChange}
//                     placeholder="Sound Quality"
//                     required
//                 />
//                 <button type="submit">{isEditing ? "Update" : "Add"}</button>
//             </form>

//             <table>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Title</th>
//                         <th>Price</th>
//                         <th>Resolution</th>
//                         <th>Sound Quality</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {sub.map((item, index) => (
//                         <tr key={index}>
//                             <td>{item.id}</td>
//                             <td>{item.title}</td>
//                             <td>{item.price}</td>
//                             <td>{item.resolution}</td>
//                             <td>{item.sound_quality}</td>
//                             <td>
//                                 <button onClick={() => handleEdit(item)}>Edit</button>
//                                 <button onClick={() => handleDelete(item.id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Crud;
