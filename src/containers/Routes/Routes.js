import React, { Component } from 'react'
import './Routes.scss'
import {Button, Icon} from 'antd' 
import ButtonGroup from 'antd/lib/button/button-group';

class Routes extends Component{
    
    render(){
        return (
            <div className='wrapper-routes'>
                <article className='article-routes'>
                    <h2 className='title-text'>Выбрать маршрут</h2>
                    <ButtonGroup className='routes'>
                        <Button type='default' className='route-link'>Ташкент<br/> Термез <p className='icon-text'>80
                            тыс<Icon type='right'/></p></Button>
                        <Button type='default' className='route-link'>Ташкент <br/> Бухара <p
                            className='icon-text'>180 тыс<Icon type='right'/></p></Button>
                        <Button type='default' className='route-link'>Ташкент <br/> Хива <p className='icon-text'>120
                            тыс<Icon type='right'/></p></Button>
                    </ButtonGroup>
                    <Button type='default' className='popular-routes'>Популярные маршруты</Button>
                </article>
            </div>
        );
    }
}
export default Routes
