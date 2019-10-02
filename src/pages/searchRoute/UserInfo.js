import React, {Component} from 'react';
import axios from 'axios';
import {API_BASE_URL} from "../../constants";
import {Avatar, Button, Icon, notification} from "antd";
import './UserInfo.scss';
import moment from "moment";


class UserInfo extends Component {
    constructor(props){
        super(props);
        this.state={
            loadSuccess: false,
            loadError: false,
            loading: false,
            user: {}
        }
}

    componentDidMount() {
        this.setState({
            loading: true
        });
        const userId = this.props.match.params.id;
        axios.get(API_BASE_URL+`/user/detail/${userId}/`).then(res=>{
            console.log(res);
            this.setState({
                loadSuccess: true,
                user: res.data
            },()=>{
                this.setState({
                    loading: false
                })
            })
        }).catch(err=>{
            notification.error({
                message: 'Ошибка!',
                description:'Что то пошло не так!'
            });
            this.setState({
                loadError: true,
                loading: false
            })
        })
    }

    handleReloadClick =()=>{
        window.location.reload();
    };





    render() {
        const {user, loadSuccess, loadError, loading} = this.state;

        const LoadingContent = () => {
            return (
                <div className="wrap-loading">

                    <div>
                        <Icon className="loading-icon" type="loading"/>
                    </div>
                </div>
            )
        };

       const Error =()=>{
            return(
                <div className="error">
                    <h1>У вас рет интернета или что то другое!</h1>
                    <div><Button onClick={this.handleReloadClick}>Перезапутить<Icon type="reload" /></Button></div>
                </div>
            )
        };

        if (loading){
            return <LoadingContent/>
        }

        if (loadError){
            return <Error/>
        }

        const formattedAge = moment(user.dob, "YYYY-MM-DD").fromNow(true);

        return (
            <div>
                <div className="user-avatar"> <Avatar icon="user" style={{backgroundColor: "#ff6600", verticalAlign: 'middle'}} size={90}/></div>
                <div className="user-name">
                    <h1>{user.first_name}</h1>
                    <p>{formattedAge}</p>
                </div>
            </div>
        );
    }
}

export default UserInfo;