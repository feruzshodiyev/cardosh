import React, {PureComponent} from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import PropTypes from 'prop-types';

class ChoosePlace extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {


        };
    }



    render() {
        return (
            <div className="container-autocomplete">

{this.props.isFromPage ? (<h1>Где бы вы хотели, чтобы вас забрали?</h1>):(<h1>Где бы вы хотели, чтобы вас высадили?</h1>)}
                <GooglePlacesAutocomplete
                    onSelect={({description})=>{
                        if (this.props.isFromPage) {
                            this.props.onSelectFrom(description)
                        }else {
                            this.props.onSelectTo(description)
                        }

                    }}
                    inputClassName="autocomplete-input"
                    autocompletionRequest={{
                        componentRestrictions: {
                            country: ['uz'],
                        }
                    }}

                />
            </div>

        );
    }
}

ChoosePlace.propTypes = {
    isFromPage: PropTypes.bool,
    onSelectFrom: PropTypes.func,
    onSelectTo: PropTypes.func
};

export default ChoosePlace;