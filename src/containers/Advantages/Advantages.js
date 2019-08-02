import React, { Component } from 'react'
import './Advantage.scss'

class Advantages extends Component{
    render(){
        return(
            <div className='advantages-wrapper'>
                <h3 className='advant-title'>Куда угодно. Откуда угодно</h3>
                <div className='articles'>
                    <div>
                        <h3 className="title">Просто</h3>
                        <p>
                            Среди миллионов попутчиков вы легко найдете тех, <br/>кто рядом и кому с вами в пути.
                        </p>
                    </div>
                    <div>
                        <h3>Быстро </h3>
                        <p>
                            Введите точный адрес, Чтобы увидеть свою идеальную поездку. <br/>
                            Выбирайте сами, с кем хотите отправиться в дорогу. И бронируйте! 
                        </p>
                    </div>
                    <div>
                        <h3>Без хлопот</h3>
                        <p>
                            Добирайтесь до места назначения без пересадок. <br/> В поездках с попутчиками
                            не надо беспокоиться <br/> об очередях и часах, проведенных в ожидании на станции
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Advantages
