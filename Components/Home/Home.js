import React, {Component} from 'react';
import {connect} from "react-redux";
import * as actionTypes from '../../Store/actions';
import DataTable from "./DataTable/DataTable";
import './Home.css';

class HomePage extends Component {
    render() {
        return (
            <div>
                <header className="app-header">
                    <h1>Welcome to my app</h1>
                </header>
                <main className="app-main">
                    <DataTable/>
                </main>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        num: state.numbers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddedNumber: () => dispatch({type: actionTypes.TEST_ACTION}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);