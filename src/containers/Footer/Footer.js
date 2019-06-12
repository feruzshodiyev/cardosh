import React, { Component } from 'react'
import './Footer.css'
class Footer extends Component{
    render(){
        return(
            <div className='footer'>
              <div className='wrapper'> 
                <ul className='media'>
                    <li>
                        <a href='#www'>                    
                        www.cardosh.uz</a>
                    </li>
                    <li>
                        <a href='#facebook'>                    
                        @cardosh</a>
                    </li>
                    <li>
                        <a href='#instagram'>                    
                        @cardosh</a>
                    </li>
                </ul>
              <p className='cardosh-description'>Cardosh- крупнейший сервис поиска попутчиков. Мы объединяем людей
                  которым по пути. Отправиться в путь можно из пригрода или небольшого населенного
                  пункта</p>
                  <p>CarDosh, 2019</p>  
              </div>
            </div>
        )
    }
}
export default Footer