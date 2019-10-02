import React,{Component} from 'react'
import './Reasons.scss'
import {Icon} from "antd";
 class Reasons extends Component{
     render(){
         return(
             <div className='reasons-wrapper'>
                 <h1 className='reason-title'> 3 причины полюбить CarDosh</h1>
                 <div className='raw'>
                     <div>
                         <div>
                    <div className='col'>
                        <div>
                            <Icon type="file-protect" />
                            <h3>Сообщество</h3>
                        <p>
                            Мы проверяем и подтверждаем каждый <br/>профиль и отзыв,
                            чтобы Вы знали наверняка <br/> с кем садитесь
                            в машину 
                        </p>
                        </div>
                    </div>
                    <div className='col'>
                        <div>
                            <Icon type="environment" />
                        <h3>Рядом</h3>
                        <p>
                            Забудьте о том что надо спешить на станцию <br/>
                            через весь город. Ловите попуткупрямо за <br/>углом
                        </p>
                        </div>
                    </div>
                    <div className='col'>
                        <div>
                            <Icon type="clock-circle" />
                        <h3>Скорость</h3>
                        <p>
                            60 секунд. Именно столько в среднем <br/>
                            требуется, чтобы найти попутчиков <br/>поблизости
                        </p>
                        </div>
                    </div>
                         </div>
                     </div>
                 </div>
             </div>
         )
     }
 }
 export default Reasons

