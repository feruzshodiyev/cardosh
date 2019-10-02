import React, {Component} from 'react';
import "./MobLinks.scss"
class MobLinks extends Component {
    render() {
        return (
            <div className="wrap-mob">
                <div>
                    <h1>Скачайте мобильное <br/> приложение CarDosh</h1>
                    <div>
                    <a href="#"><div id="app-store">

                    </div></a>
                   <a> <div id="play-market">

                   </div></a>
                    </div>
                </div>
            </div>
        );
    }
}

export default MobLinks;