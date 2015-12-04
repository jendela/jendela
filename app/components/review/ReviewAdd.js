'use strict'

import Parse from 'parse'
import ParseReact from 'parse-react';
import React from 'react'
import CommonQuery from '../../queries/CommonQuery'

import DatePicker2 from 'react-datepicker'
import moment from 'moment'
require('react-datepicker/dist/react-datepicker.css');

var ParseComponent = ParseReact.Component(React);

const styles = {
    info: {
        background: "#9DBBD0",
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    title: {
        fontSize: "2em",
        fontWeight: "bold"
    },
    content: {
        paddingTop: "25px",
        paddingBottom: "25px"
    },
    entry: {
        paddingBottom: "10px"
    }
}


class ReviewAdd extends ParseComponent {

    constructor(props) {
        super(props);
        this.state = {
            province: "",
            isAnon: true,
            isAgree: false,
            date: moment()
        }
        ;

        CommonQuery.getProvinceNames().find().then((list)=>{
            this.state.provinces = list;
        })
        CommonQuery.getServiceNames().find().then((list)=>{
            this.state.services = list;
        })
    }

    observe(props, states) {

        // selected province
        let province = undefined;
        if (states.province)
            province = {
                "__type": "Pointer",
                "className": "Province",
                "objectId": states.province
            };

        return {
            cities: CommonQuery.getCityNamesByProvince(province)
        };
    }

    render() {

        // input provinsi
        let provinceInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="province">Provinsi</label>
                </div>
                <div className="large-9 columns">
                    <select id="province" value={this.state.province} onChange={this._onChange.bind(this)} required>
                        <option key="" value="">Pilih Propinsi</option>
                        {this.state.provinces?this.state.provinces.map((e)=> {
                            return <option key={e.id} value={e.id}>{e.get('name')}</option>
                        }):undefined}
                    </select>
                </div>
            </div>
        );

        // input city
        let cityInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="city">Kota</label>
                </div>
                <div className="large-9 columns">
                    {this.state.cityError ? <small className="error">Kota harus di isi</small> : <span />}
                    <select id="city" value={this.state.city} onChange={this._onChange.bind(this)} required>
                        <option key="" value="">Pilih Kota</option>
                        {this.data.cities.map((e)=> {
                            return <option key={e.objectId} value={e.objectId}>{e.name}</option>
                        })}
                    </select>
                </div>
            </div>
        );

        // input service
        let serviceInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="service">Layanan</label>
                </div>
                <div className="large-9 columns">
                    {this.state.serviceError ? <small className="error">Jenis layanan harus di isi</small> : <span />}
                    <select id="service" value={this.state.service} onChange={this._onChange.bind(this)} required>
                        <option key="" value="">Pilih Layanan</option>
                        {this.state.services?this.state.services.map((e)=> {
                            return <option key={e.id} value={e.id}>{e.get('name')}</option>
                        }):undefined}
                    </select>
                </div>
            </div>
        );

        // input rating
        let ratingInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="rating">Rating</label>
                </div>
                <div className="large-9 columns">
                    <input type="number" min="1" max="5" value={this.state.rating} placeholder="Rating" id="rating"
                           onChange={this._onChange.bind(this)}
                           required/>
                </div>
            </div>
        );

        // input title
        let titleInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="title">Judul</label>
                </div>
                <div className="large-9 columns">
                    <input type="text" value={this.state.title} placeholder="Judul" id="title"
                           onChange={this._onChange.bind(this)} required/>
                </div>
            </div>
        );

        // input content
        let contentInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="content">Konten</label>
                </div>
                <div className="large-9 columns">
                    <textarea rows="5" value={this.state.content} className="form-control" id="content"
                              placeholder="Konten"
                              onChange={this._onChange.bind(this)}/>
                </div>
            </div>
        );

        // optional content
        // fee
        let feeInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="fee">Biaya</label>
                </div>
                <div className="large-9 columns">
                    <input type="number" min="0" value={this.state.fee} placeholder="Biaya" id="fee"
                           onChange={this._onChange.bind(this)}/>
                </div>
            </div>
        );
        // duration
        let durationInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="duration">Durasi Pelayanan</label>
                </div>
                <div className="large-9 columns">
                    <input type="number" min="0" value={this.state.duration} placeholder="Durasi" id="duration"
                           onChange={this._onChange.bind(this)}/>
                </div>
            </div>
        );
        // date
        /*
        * <DatePicker
         hideFooter="true"
         minDate={(date.getFullYear()-1)+"-"+(date.getMonth()+1)+"-"+date.getDate()}
         maxDate={date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate()}
         date={this.state.date}
         onChange={this._onChangeDate.bind(this)} />
        * */
        const date = new Date();
        let dateInput = (
            <div className="row">
                <div className="large-3 columns">
                    <label htmlFor="date">Tanggal</label>
                </div>
                <div className="large-9 columns">
                    <DatePicker2
                        selected={this.state.date}
                        maxDate={moment()}
                        minDate={moment().subtract(1, 'year')}
                        onChange={this._onChangeDate.bind(this)} />
                </div>
            </div>
        );
        // identity
        let isAnonInput = (
            <div className="row">
                <div className="large-9 large-offset-3 columns">
                    <label><input checked={this.state.isAnon} type="checkbox" id="isAnon"
                                  onChange={(e)=>{this.setState({isAnon:e.target.checked})}}/> Saya mau mengirim ulasan
                        secara anonim</label>
                </div>
            </div>
        );
        let identitasInput = [];
        if (!this.state.isAnon) {
            let nameInput = (
                <div className="row">
                    <div className="large-3 columns">
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="large-9 columns">
                        <input value={this.state.name} required type="text" placeholder="Name" id="name"
                               onChange={this._onChange.bind(this)}/>
                    </div>
                </div>
            );
            let phoneInput = (
                <div className="row">
                    <div className="large-3 columns">
                        <label htmlFor="phone">Telepon</label>
                    </div>
                    <div className="large-9 columns">
                        <input value={this.state.phone} required type="text" placeholder="Telepon" id="phone"
                               onChange={this._onChange.bind(this)}/>
                    </div>
                </div>
            );
            let emailInput = (
                <div className="row">
                    <div className="large-3 columns">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="large-9 columns">
                        <input value={this.state.email} required type="email" placeholder="Email" id="email"
                               onChange={this._onChange.bind(this)}/>
                    </div>
                </div>
            );
            identitasInput.push(nameInput);
            identitasInput.push(phoneInput);
            identitasInput.push(emailInput);
        }
        let isAgreeInput = (
            <div className="row">
                <div className="large-9 large-offset-3 columns">
                    <label><input required type="checkbox" id="isAgree"
                                  onChange={(e)=>{this.setState({isAgree:e.target.checked})}}/> Saya menyetujui syarat
                        dan ketentuan berlaku</label>
                </div>
            </div>
        );
        let sendButton = (
            <div className="row">
                <div className="large-9 large-offset-3 columns">
                    <button className="button" type="submit">Kirim</button>
                </div>
            </div>
        );


        return (
            <div>
                <section style={styles.info}>
                    <div className="row">
                        <div className="small-12 columns">
                            <div style={styles.title}>Tulis Ulasan</div>
                            <section>
                                <div className="row">
                                    <div className="large-12 columns">
                                        Ojo ragu, berikan pendapatmu mengenai layanan publik yang kamu gunakan
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
                <section style={styles.content}>
                    <form onSubmit={this._onClick.bind(this)}>
                        {provinceInput}
                        {cityInput}
                        {serviceInput}
                        {ratingInput}
                        {titleInput}
                        {contentInput}
                        {feeInput}
                        {durationInput}
                        {dateInput}
                        {isAnonInput}
                        {identitasInput}
                        {isAgreeInput}
                        {sendButton}
                    </form>
                </section>
            </div>
        );
    }

    _onChange(e) {
        let newState = {};
        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }

    _onChangeDate(date, moment, e) {
        let newState = {};
        newState['date'] = date;
        this.setState(newState);
    }

    _onClick(e) {
        e.preventDefault();

        if (this.state.isAgree) {

            let errorState = false;
            if (!this.state.city) {
                this.setState({cityError: true});
            } else
                this.setState({cityError: false});
            if (!this.state.service) {
                this.setState({serviceError: true});
            } else
                this.setState({serviceError: false});
            if (errorState)
                return;

            var newReview = {
                city: {
                    "__type": "Pointer",
                    "className": "City",
                    "objectId": this.state.city
                },
                service: {
                    "__type": "Pointer",
                    "className": "Service",
                    "objectId": this.state.service
                },
                rating: Number(this.state.rating),
                title: this.state.title,
                content: this.state.content,
                fee: Number(this.state.fee),
                duration: Number(this.state.duration),
                date: this.state.date
            }
            if (!this.state.isAnon) {
                newReview["name"] = this.state.name;
                newReview["phone"] = this.state.phone;
                newReview["email"] = this.state.email;
            }
            ParseReact.Mutation.Create('Review', newReview).dispatch().then(()=> {
                alert('Terima kasih atas ulasan anda');

                this.setState({
                    province: "",
                    city: "",
                    service: "",
                    rating: "",
                    title: "",
                    content: "",
                    fee: "",
                    duration: "",
                    date: "",
                    name: "",
                    phone: "",
                    email: "",
                });

            });
            return false;
        }

        else {
            // TODO
            return false;
        }
    }

}
export default ReviewAdd
