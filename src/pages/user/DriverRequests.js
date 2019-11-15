import React, {Component} from "react";
import axios from "axios/index";
import {API_BASE_URL} from "../../constants";
import {Avatar, Button, List, notification} from "antd";


class DriverRequests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [],
            loading: true
        }
    }


    componentDidMount() {
        const rideId = this.props.rideId;
        axios.get(`${API_BASE_URL}/${rideId}/request/list/`).then(res => {
            this.setState({
                requests: res.data,
                loading: false
            });
            console.log(res)
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err)
        })
    }

    applyRide=(id)=>{
      axios.put(`${API_BASE_URL}/${id}/request/deal/`).then(res=>{
          notification.success({
              message: "Вы приняли предложение!"
          });
          console.log(res)
      }).catch(err=>{
          notification.error({
              message: "Произошло ошибка! "
          });
          console.log(err)
      })
    };

    render() {
        return (
            <div>
                <h2>Предложения к данной заявке </h2>
                <List
                    loading={this.state.loading}
                    itemLayout="horizontal"
                    dataSource={this.state.requests}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={item.driverID.profile_image ?
                                    <Avatar src={item.driverID.profile_image}/> :
                                    <Avatar icon="user"/>}
                                title={item.driverID.first_name+" "+item.driverID.last_name}
                                description={<div>
                                    <p>Предлагаемая сумма: {item.price}</p>
                                </div>}
                            />
                            <Button onClick={()=>this.applyRide(item.id)} type="danger" shape="round" >Принять</Button>
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default DriverRequests;