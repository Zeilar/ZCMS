import React, { forwardRef } from 'react';

import ArrowDownward from '@material-ui/icons/ArrowDownward';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import ChevronRight from '@material-ui/icons/ChevronRight';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ViewColumn from '@material-ui/icons/ViewColumn';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import SaveAlt from '@material-ui/icons/SaveAlt';
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
import Remove from '@material-ui/icons/Remove';
import Check from '@material-ui/icons/Check';
import Clear from '@material-ui/icons/Clear';
import Edit from '@material-ui/icons/Edit';

import MaterialTable from 'material-table';

const tableIcons = {
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
};

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#00af64',
        },
        secondary: {
            main: '#00af64',
        },
    },
});

export default function Table(props) {
    return (
        <ThemeProvider theme={theme}>
            <MaterialTable icons={tableIcons} {...props} />
        </ThemeProvider>
    );
};
