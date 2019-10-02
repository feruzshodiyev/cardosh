/* global google */

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

{this.props.isFromPage ? (<h1>Откуда вы выезжаете?</h1>):(<h1>Куда вы едете?</h1>)}
                <GooglePlacesAutocomplete
                    onSelect={(res)=>{
                        if (this.props.isFromPage) {
                            this.props.onSelectFrom(res);
                        }else {
                            this.props.onSelectTo(res)
                        }

                    }}
                    inputClassName="autocomplete-input"
                    placeholder="Например: Шахрисабз"
                    autocompletionRequest={{
                        componentRestrictions: {
                            country: ['uz'],
                        },
                        types: ['(cities)']
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