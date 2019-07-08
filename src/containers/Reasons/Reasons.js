import React,{Component} from 'react'
import './Reasons.scss'
 class Reasons extends Component{
     render(){
         return(
             <div className='reasons-wrapper'>
                 <h2 className='reason-title'> 3 причины полюбить CarDosh</h2>
                 <div className='raw'>
                    <div className='col'> 
                        <img alt="soobshestvo-icon"></img>
                            <h4>Сообщество</h4>
                        <p>
                            Мы хотим узнать наших пользователей как можно лучше.
                            Наша команда проверяет профили и отзывы. Когда в профили 
                            потверждено удостоверение личности вы наверняка, с кем садитесь 
                            в машину 
                        </p>
                    </div>
                    <div className='col'>
                            <img alt="ryadom-icon"></img>
                        <h4>Рядом</h4>
                        <p>
                            Забудьте о том что надо спешить на станцию 
                            через весь город. Ловите попуткупрямо за углом
                        </p>
                    </div>
                    <div className='col'>
                            <img alt="skorost-icon"></img>
                        <h4>Скорость</h4>
                        <p>
                            60 секунд. Именно столько в среднем 
                            требуется, чтобы найти попутчиков поблизости 
                        </p>
                    </div>
                 </div>
             </div>
         )
     }
 }
 export default Reasons

