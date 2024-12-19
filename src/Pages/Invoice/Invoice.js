import React from "react";
import "./Invoice.css";
import Navbar from "../../component/Navbar/Navbar";

const Invoice = ({ settings }) => {
    
    return (
        <div className="invoice">
            <div className="invoice_navbar">
                <Navbar settings={settings} />
            </div>
            <div className="invoice_form">
                <h1>Invoice</h1>
                <div className="user_detail">
                    <h2>User Details</h2>
                    <p><strong>Name:</strong> </p>
                    <p><strong>Email:</strong></p>
                </div>
                <div className="invoice_detail">
                    <h2>Plan Details</h2>
                    <table className="invoice_table">
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>$</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
