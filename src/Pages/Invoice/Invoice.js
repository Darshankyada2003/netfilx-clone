import React, { useEffect, useState } from "react";
import "./Invoice.css";
import Navbar from "../../component/Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DateTime } from "luxon";

const Invoice = ({ settings }) => {

    const [invoicedata, setInvoicedata] = useState("");
    const { id } = useParams();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/singleInvoice/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                if (res.data.status) {
                    setInvoicedata(res.data.data);
                }
            })
            .catch(err => {
                console.log("invoice data is not found", err);
            })
    }, [id])

    const { invoice, subscription } = invoicedata;
    const gst = (invoice?.amount * 18) / 100;
    const discount = 0.00;
    const subtotal = (invoice?.amount - gst) - discount;

    return (
        <div className="invoice">
            <div className="invoice_navbar">
                <Navbar settings={settings} />
            </div>
            <div className="invoice_page">
                <div className="invoice_header">
                    {
                        settings && settings.data &&
                        (
                            <img src={settings.data.logo} alt='' className='invoice_logo' />
                        )
                    }
                    <p>Netflix International B.V.</p>
                    <p>207, Tirupati Plaza-A, Adajan Surat, Gujarat, India</p>
                    <p>Tax number: NL853746333B01</p>
                </div>

                <div className="invoice_body">
                    <div className="invoice_info">
                        <p>Invoice Date: <strong>{DateTime.fromISO(invoice?.validFrom).toFormat('MMMM dd, yyyy')}</strong></p>
                        <p>Invoice ID : <strong>#{invoice?.id}</strong></p>
                    </div>
                    <div className="btn-success">
                        {invoice !== null && (
                            <p className={invoice ? 'payment-success' : 'payment-failure'}>
                                {invoice ? 'Success' : 'Failed'}
                            </p>)}
                    </div>
                    <div className="subscription_details">
                        <h3>Subscription Information</h3>
                        <div className="subscription_row">
                            <p className="subscription_label">Subscription Name :</p>
                            <p className="subscription_value">{subscription?.title}</p>
                        </div>
                        <div className="subscription_row">
                            <p className="subscription_label">Resolution :</p>
                            <p className="subscription_value">{subscription?.resolution}</p>
                        </div>
                        <div className="subscription_row">
                            <p className="subscription_label">Sound Quality :</p>
                            <p className="subscription_value">{subscription?.sound_quality}</p>
                        </div>
                        <div className="subscription_row">
                            <p className="subscription_label">Supported Devices :</p>
                            <p className="subscription_value">{subscription?.supported_devices}</p>
                        </div>
                        <div className="subscription_row">
                            <p className="subscription_label">Connection :</p>
                            <p className="subscription_value">{subscription?.connection}</p>
                        </div>
                        <div className="subscription_row">
                            <p className="subscription_label">Date :</p>
                            <p className="subscription_value">{`${DateTime.fromISO(invoice?.validFrom).toFormat('MMMM dd, yyyy')} - ${DateTime.fromISO(invoice?.validTo).toFormat('MMMM dd, yyyy')}`}</p>
                        </div>
                        <div className="subscription_row">
                            <p className="subscription_label">Amount :</p>
                            <p className="subscription_value">₹{invoice?.amount}</p>
                        </div>
                    </div>
                    <div class="payment-summary">
                        <div class="payment-method">
                            <h3>Payment Methods:</h3>
                            <div class="payment-icons">
                                <img src="https://w7.pngwing.com/pngs/667/172/png-transparent-logo-brand-visa-font-visa-blue-text-trademark-thumbnail.png" alt="Visa" />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/MasterCard-Logo.svg/2560px-MasterCard-Logo.svg.png" alt="MasterCard" />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXPN5n9zXmWG6mjYxilOMCu9lK8A74gqv3g&s" alt="PayPal" />
                                <img src="https://icon2.cleanpng.com/20180810/ywr/d524e77dd45f2e6cbd2f72103119b8bf.webp" alt="PayPal" />
                            </div>
                            <p class="payment-info">
                                Etsy doostang zoodles disqus groupon greplin ooji voxy zoodles, weebly ning heekya handango imeem plugg dopplr jibjab, novelty jajah plickers sifteo edmodo iffitt zimbra.
                            </p>
                        </div>
                        <div class="summary-details">
                            <div class="summary-row">
                                <p class="summary-label">Sub Total :</p>
                                <p class="summary-value">₹{subtotal}</p>
                            </div>
                            <div class="summary-row">
                                <p class="summary-label">GST 18% :</p>
                                <p class="summary-value">₹{gst}</p>
                            </div>
                            <div class="summary-row">
                                <p class="summary-label">Discount :</p>
                                <p class="summary-value">₹{discount}.00</p>
                            </div>
                            <div class="summary-row total">
                                <p class="summary-label">Total Amount :</p>
                                <p class="summary-value">₹{subtotal + gst}.00</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invoice;
