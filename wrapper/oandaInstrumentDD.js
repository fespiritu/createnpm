import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getOandaInstruments, mySimpleSort } from "../../util";
// import { Label } from 'reactstrap';


class OandaInstrumentDD extends Component {

    // const { onChangeEvent, instrument, hasBlankItem } = this.props;
    constructor(props) {
        super(props);
    }

    render() {        
        const symbols = mySimpleSort(getOandaInstruments(), true);
        const { onChangeEvent, instrument, hasBlankItem } = this.props;
        return (
            <div>
                <label htmlFor="instrument">Instrument</label>
                <select required onChange={onChangeEvent} id="instrument" name="instrument"
                    value={instrument} className="form-control">
                    {hasBlankItem && <option value="">select</option>}
                    {symbols.map((s,index) => {
                        return <option value={s} key={index}>{s}</option>
                    })}
                </select> 
                <div className="invalid-feedback">
                    Required
                </div>              
            </div>
        )
    }  
}

OandaInstrumentDD.defaultProps = {
    hasBlankItem: false
};

OandaInstrumentDD.propTypes = {
    onChangeEvent: PropTypes.func.isRequired,
    instrument: PropTypes.string.isRequired,
    hasBlankItem: PropTypes.bool
}
export default OandaInstrumentDD;
