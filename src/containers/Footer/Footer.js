import React, { Component } from 'react'
import {Icon} from "antd";
import './Footer.scss'
class Footer extends Component{
    render(){
        return(
            <div className={this.props.isOnHomePage ? ("footer"):("footerWithBackground")}>
              <div className='wrapper-footer'>
                <ul className='media'>
                    <li>
                        <a href='#www'>
                        <Icon type="global"/>
                        www.cardosh.uz</a>
                    </li>
                    <li>
                        <a href='#facebook'>
                            <Icon type="facebook"/>
                            @cardosh</a>
                    </li>
                    <li>
                        <a href='#instagram'>
                            <Icon type="instagram"/>
                            @cardosh</a>
                    </li>
                </ul>
              <p>Cardosh- крупнейший сервис поиска попутчиков. Мы объединяем людей
                  которым по пути. <br/> Отправиться в путь можно из пригрода или небольшого населенного
                  пункта</p>
                  <p>CarDosh, 2019 <Icon type="copyright" /></p>
              </div>
            </div>
        )
    }
}
export default Footer