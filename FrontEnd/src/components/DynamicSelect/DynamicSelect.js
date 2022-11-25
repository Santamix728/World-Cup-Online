import React from "react";
//import {useEffect} from "react";
import {useState} from "react";
import { Form, Row} from "react-bootstrap";

import PropTypes from "prop-types";
import BasicSelect from "components/Select/Select.js";

export default function DynamicSelect(props) {
    const {
        number,
        team,
        idText,
    } = props;

    const array = Array.from(Array(number).keys());
    const [playerData, setPlayerData] = useState(array);
    const handleSelect = (index, event) => {
        const values = [...playerData];
        values[index] = event.target.value;
        setPlayerData(values);
    };
    sessionStorage.setItem(idText,playerData);
    //alert(key);
    return (
    <Form>
        {array.map((i) => {
            return (
            <Row className="mt-3" key={idText+i}>
                <BasicSelect
                labelText="Player Select"
                id="Player-SelectID"
                handleChange={(newSelect) => handleSelect(i,newSelect)}
                options={team}
                formControlProps={{
                    fullWidth: true,
                }}
                />
            </Row>
        );})}
    </Form>
    );
}

DynamicSelect.propTypes = {
    number: PropTypes.number,
    team: PropTypes.array,
    idText: PropTypes.string,
};
