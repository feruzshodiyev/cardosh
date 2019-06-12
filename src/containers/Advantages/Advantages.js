import React, { Component } from 'react'
import './Advantage.css'

class Advantages extends Component{
    render(){
        return(
            <div className='advantages-wrapper'>
                <h3 className='advant-title'>Куда угодно. Откуда угодно</h3>
                <div className='articles'>
                    <article>
                        <h4>Просто</h4>
                        <p>
                            Среди миллионов попутчиков вы легко найдете тех, кто рядом и кому с вами в пути. 
                        </p>
                    </article>
                    <article>
                        <h4>Быстро </h4>
                        <p>
                            Введите точный адрес, Чтобы увидеть свою идеальную поездку.
                            Выбирайте сами, с кем хотите отправиться в дорогу. И бронируйте! 
                        </p>
                    </article>
                    <article>
                        <h4>Без хлопот</h4>
                        <p>
                            Добирайтесь до места назначения без пересадок. В поездках с попутчиками
                            не надо беспокоиться об очередях и часах, проведенных в ожидании на станции 
                        </p>
                    </article>
                </div>
            </div>
        )
    }
}

export default Advantages
