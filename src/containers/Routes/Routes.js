import React, {Component} from 'react'
import './Routes.scss'
import {Button, Icon} from 'antd'
import ButtonGroup from 'antd/lib/button/button-group';


class Routes extends Component {

    render() {
        return (
                <div className='wrapper-routes'>

                    <div className='article-routes'>
                        <h2 className='title-text'>Куда вы хотите поехать?</h2>
                        <div className='popular-routes'>Популярные маршруты</div>

                        <div className='routes'>
                            <div className='route-link'>
                                <div className="route-text">
                                    Ташкент
                                    <hr/>
                                    Самарканд
                                </div>
                                <div className="route-price">
                                    <p>80 тыс</p>
                                </div>
                            </div>
                            <div className='route-link'>
                                <div className="route-text">
                                    Ташкент
                                    <hr/>
                                    Бухара
                                </div>
                                <div className="route-price">
                                <p>120 тыс</p>
                                </div>
                            </div >
                            <div className='route-link'>
                                <div className="route-text">
                                    Ташкент
                                    <hr/>
                                    Хива
                                </div>
                                <div className="route-price">
                                    <p>150 тыс</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Routes
