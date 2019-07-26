import React, { Component } from 'react'
import './Routes.scss'
import {Button, Icon} from 'antd' 
import ButtonGroup from 'antd/lib/button/button-group';
import Plx from 'react-plx';

const textData = [
    {
        start: "self",
        startOffset: "20vw",
        end: "self",
        endOffset: "40vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: 0,
                endValue: -20,
                property: "translateY",
                unit: "vh"
            },

        ]
    },
    {
        start: "self",
        startOffset: "40vh",
        end: "self",
        endOffset: "60vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: -20,
                endValue: 10,
                property: "translateY",
                unit: "vh"
            },

        ]
    },

];

const rotateElements = [{
    start: "self",
    startOffset: "20vw",
    end: "self",
    endOffset: "40vh",
    easing: "easeInSine",
    properties:[
        {
                startValue: 0,
                endValue: 10,
                property: "rotate",
                unit: "deg"
            }  ,

        ]},
    {
        start: "self",
        startOffset: "40vh",
        end: "self",
        endOffset: "60vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: 10,
                endValue: 0,
                property: "rotate",
                unit: "deg"
            },
        ]
    },
    {
        start: "self",
        startOffset: "90vh",
        end: "self",
        endOffset: "110vh",
        easing: "easeInSine",
        properties: [
            {
                startValue: 0,
                endValue: -10,
                property: "rotate",
                unit: "deg"
            },
        ]
    },
];

const exampleParallaxData = [
    {
        start: 0,
        end: 1000,
        properties: [
            {
                startValue: 0,
                endValue: -500,
                property: "translateY"
            }
        ]
    }
];

const plxStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: 40,
    color: "#fff",
    // position: "fixed",
    width: "100%",
    height: 600,
    flexDirection: "column"
};

const wrapperStyles = {
    position: "relative",
    height: 600,
    overflow: "hidden",
    // background: "url(../../images/cardosh-sam.jpg) no-repeat",
    // backgroundPosition: '1000px',
    backgroundSize: "cover",
    backgroundAttachment: "fixed"
};

class Routes extends Component{
    
    render(){
        return (
            <div style={{ height: 3000 }}>
            <div className='wrapper-routes' style={wrapperStyles}>

                <Plx parallaxData={exampleParallaxData} style={plxStyles}>
                <article className='article-routes'>
                        <h2 className='title-text'>Выбрать маршрут</h2>

                    <ButtonGroup className='routes'>
                        <Plx parallaxData={rotateElements} className='plxButton'>
                            <Button type='default' className='route-link'>Ташкент<br/> Термез <p className='icon-text'>80
                                тыс<Icon type='right'/></p></Button>
                        </Plx>
                        <Plx parallaxData={rotateElements} className='plxButton'>
                            <Button type='default' className='route-link'>Ташкент <br/> Бухара <p
                                className='icon-text'>180 тыс<Icon type='right'/></p></Button>
                        </Plx>
                        <Plx parallaxData={rotateElements} className='plxButton'>
                            <Button type='default' className='route-link'>Ташкент <br/> Хива <p className='icon-text'>120
                                тыс<Icon type='right'/></p></Button>
                        </Plx>
                    </ButtonGroup>
                    <Button type='default' className='popular-routes'>Популярные маршруты</Button>
                </article>
                </Plx>
            </div>
            </div>
        );
    }
}
export default Routes
