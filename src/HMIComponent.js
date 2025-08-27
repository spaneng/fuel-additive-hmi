import React from 'react';
import RemoteAccess from 'doover_home/RemoteAccess';
// import { Grid, Button, TextField } from '@mui/material';

// import { ThemeProvider } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import { keyframes } from '@mui/system';
// import { 
//     Table, 
//     TableBody, 
//     TableCell, 
//     TableContainer, 
//     TableHead, 
//     TableRow, 
//     Paper,
//     Typography,
//     Collapse 
// } from '@mui/material';

import { Box, Grid, Typography, TextField, Card, CardHeader, CardContent, InputAdornment } from "@mui/material";

export default class HMIComponent extends RemoteAccess {
  constructor(props) {
    super(props);
    this.state = {
      volumePerInjection: "0.202",
      injectionRateInterval: "1000",
      injector: {
        perInject: "0.000",
        total: "0.00",
        dayTotal: "0.00",
      },
      header: {
        interval: "0.00",
        total: "0.0",
        dayTotal: "0.0",
      },
    };
    this.injectorIndex = this.getInjectorIndex();
  }

  getInjectorIndex() {
    return this.getUiState().reported.injector_index;
  }

  handleChange = (field) => (e) => {
    this.setState({ [field]: e.target.value });
  };

  renderReadout(label, value, adornment = "") {
    return (
      <TextField
        size="small"
        fullWidth
        value={value}
        InputProps={{
          readOnly: true,
          endAdornment: adornment ? (
            <InputAdornment position="end">{adornment}</InputAdornment>
          ) : undefined,
        }}
      />
    );
  }

  render() {
    const { volumePerInjection, injectionRateInterval, injector, header } = this.state;

    var injectorVolPerInject = this.getChildState(`injector${this.injectorIndex}VolPerInject`).currentValue;
    var injectorInjectRateInterval = this.getChildState(`injector${this.injectorIndex}InjectRateInterval`).currentValue;
    
    var injectorLInject = this.getChildState(`injector${this.injectorIndex}LInject`).currentValue;
    var injectorLTotal = this.getChildState(`injector${this.injectorIndex}LTotal`).currentValue;
    var injectorLDayTotal = this.getChildState(`injector${this.injectorIndex}LDayTotal`).currentValue;
    
    var headerLInject = this.getChildState(`header${this.injectorIndex}LInterval`).currentValue;
    var headerLTotal = this.getChildState(`header${this.injectorIndex}LTotal`).currentValue;
    var headerLDayTotal = this.getChildState(`header${this.injectorIndex}LDayTotal`).currentValue;

    return (
      <Box p={2}>
        {/* Title */}
        <Box mb={2}>
          <Typography variant="h6" align="center">HMI Process Settings</Typography>
        </Box>

        <Grid container spacing={2} alignItems="start">
          {/* Left form column: labels + inputs */}
          <Grid item xs={12} md={6} lg={5}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={6} md={5}>
                <Typography align="right">Volume Per Injection:</Typography>
              </Grid>
              <Grid item xs={6} md={7}>
                <TextField
                  size="small"
                  fullWidth
                  value={injectorVolPerInject}
                  InputProps={{
                    readOnly: true,
                    endAdornment: <InputAdornment position="end">L</InputAdornment>,
                  }}
                />
              </Grid>

              <Grid item xs={6} md={5}>
                <Typography align="right">Injection Rate Interval:</Typography>
              </Grid>
              <Grid item xs={6} md={7}>
                <TextField
                  size="small"
                  fullWidth
                  value={injectorInjectRateInterval}
                  InputProps={{
                    readOnly: true,
                    endAdornment: <InputAdornment position="end">L</InputAdornment>,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          {/* Right column: two summary cards side-by-side */}
          <Grid item xs={12} md={6} lg={7}>  
            <Grid container spacing={2}>
              {/* Injector 1 Card */}
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardHeader 
                    titleTypographyProps={{ variant: "subtitle2" }} 
                    title="Injector 1"
                    sx={{
                      textAlign: 'center',
                      pb: '5px',
                      pt: '5px'
                    }}
                  />
                  <CardContent sx={{ padding: '0px 16px 16px 16px !important' }}>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {this.renderReadout("Inject", injectorLInject, "l inject")}
                      {this.renderReadout("Total", injectorLTotal, "l total")}
                      {this.renderReadout("Day Total", injectorLDayTotal, "l day total")}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Header 1 Card */}
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                <CardHeader 
                    titleTypographyProps={{ variant: "subtitle2" }} 
                    title="Header 1"
                    sx={{
                      textAlign: 'center',
                      pb: '5px',
                      pt: '5px'
                    }}
                  />
                  <CardContent sx={{ padding: '0px 16px 16px 16px !important' }}>
                    <Box display="flex" flexDirection="column" gap={1}>
                      {this.renderReadout("Interval", headerLInject, "l interval")}
                      {this.renderReadout("Total", headerLTotal, "l total")}
                      {this.renderReadout("Day Total", headerLDayTotal, "l day total")}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    );
  }
}


// export default class DooverTables extends RemoteAccess {
//     constructor(props) {
//         super(props);
//         this.apiClient = this.getApiClient();
//         this.comms = new Comms(props, this.apiClient);
//         this.pageInputRef = React.createRef();
//         this.setState({
//           tableData: {},
//           headerList: [],
//           selectedDataset: 0,
//           tableCount: 0,
//           isPageInputActive: false,
//           pageInputValue: 1
//         });
//     }

//     async componentDidMount() {
//       const tableData = await this.comms.getTableData(this.getChannelName(), this.getTableName());
//       const headerList = tableData.header_order;
//       let defaultDataset = tableData.default_dataset;
//       if (defaultDataset >= tableData.data.length) {
//         defaultDataset = tableData.data.length - 1;
//       } else if (defaultDataset < 0) {
//         defaultDataset = tableData.data.length + defaultDataset;
//         if (defaultDataset < 0) {
//           defaultDataset = 0;
//         }
//       }
//       this.setState({
//         tableData: tableData,
//         headerList: headerList,
//         selectedDataset: defaultDataset,
//         tableCount: tableData.data.length
//       });
//     }

//     componentDidUpdate(prevProps, prevState) {
//       if (!prevState.isPageInputActive && this.state.isPageInputActive) {
//         // Focus the input when it becomes active
//         setTimeout(() => {
//           if (this.pageInputRef.current) {
//             this.pageInputRef.current.focus();
//           }
//         }, 0);
//       }
//     }

//     getApiClient() {
//       let client = window.dooverDataAPIWrapper.apiClient
//       client.setProxyAgentId(this.getAgentId())
//       return client
//     }