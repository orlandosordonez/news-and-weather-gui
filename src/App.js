import React, {Component} from 'react';
//import * as React from 'react';
import './App.css';
import { DataGrid } from '@material-ui/data-grid';
import { v4 as uuidv4 } from 'uuid';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Autocomplete from '@material-ui/lab/Autocomplete';
//import {Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Button, TextField} from '@material-ui/core';
import {TextField, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography} from '@material-ui/core';

const columnsHistorial = [
  {field: 'city', headerName: 'Cuidad', width:100},
  {field: 'info', headerName: 'Informacion', width:100}

]

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      temperature : 0,
      weather : [],
      historial:[],
      news:[],
      name:"",
      lengthHistorial:0,
      lengthNews:0,
      isActivated: false,
    }
    this.getApi1 = this.getApi1.bind(this);
    this.getApi2 = this.getApi2.bind(this);
  }

  componentDidMount(){
    this.getApiini();
  }

  getApi2(citia) {
    const url = 'https://localhost:44359/weather-and-news/api/Cities/';
    const url2 = url + citia
    fetch(url2 ,{
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(weather =>{
      this.setState({
        weather : weather.current_weather
      })
      this.setState({
        news : weather.news
      })
      this.setState({
        lengthNews : weather.news.length
      })
      let a = this.state.weather.temperature
      this.setState({
        temperature : a
      })
      console.log(this.state.weather.temperature)
      console.log(this.state.news)
      console.log(weather)
    })

  }

  getApi1() {
    fetch('https://localhost:44359/weather-and-news/api/CheckHistory' ,{
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(response =>{
      this.setState({
        historial: response
      })
      this.setState({
        lengthHistorial: this.state.historial.history.length
      })
      if(this.state.isActivated){
        this.setState({
          isActivated : false
        })
      }else{
        this.setState({
          isActivated : true
        })
      }
      console.log(this.state.historial.history.length)
      console.log(response)

    })

  }

  getApiini() {
    fetch('https://localhost:44359/weather-and-news/api/CheckHistory' ,{
      method: 'GET'
    })
    .then(response => {
      return response.json();
    })
    .then(response =>{
      this.setState({
        historial: response
      })
      this.setState({
        lengthHistorial: this.state.historial.history.length
      })
      console.log(this.state.historial.history.length)
      console.log(response)

    })

  }

  handleChange = (e) => {
    const { value } = e.target
    this.setState({ name: value })
  }

  renderCardWeather(){
    return(
    <Card variant={'outlined'}>
      <CardContent>
        <Typography>
          <Box  m={1}>
            <Typography variant={'h3'} component={'div'} >
              {this.state.name}
            </Typography>
            <Typography variant={'h5'} component={'div'} >
              {((parseFloat(this.state.weather.temperature)).toFixed(2) - 273.15).toFixed(2) + "°C"}
            </Typography>
            <Typography variant={'body2'} component={'div'} >
              Decription: {this.state.weather.weather_description[0]}
              <br />
              Wind speed: {this.state.weather.wind_speed}
              <br />
              Wind Degrees: {this.state.weather.wind_degree}
              <br />
              Wind Direction: {this.state.weather.wind_dir}
              <br />
              <br />
              Humidity: {this.state.weather.humidity}
              <br />
              Visibility: {this.state.weather.visibility}
              <br />
            </Typography>
            <Typography variant={'overline'} color={'textSecondary'}>
              {this.state.weather.observation_time}
            </Typography>
          </Box>
        </Typography>
      </CardContent>
    </Card>
    )
  }

  renderCardNews(){
    return(
      <div>
      {this.state.news.map((contened, index) => {
        const {autor, title,description,url,urlImage,publishedAt,content} = contened //destructuring
        return (
          <div>
          <Card className="cardNews">
            <CardHeader
              title={title}
              subheader={publishedAt}
            />
            <CardMedia
              className="imageCard"
              image={urlImage}
              title={title}
            />
            <CardContent>
              <Typography variant={'body2'} color={'textSecondary'}>
                {content.slice(0,-13)}
                <a
                  href={url}
                  rel="noreferrer"
                  target="_blank"
                >
                  See more...
                </a>
              </Typography>
            </CardContent>
          </Card>
          </div>
          )
      })}
    </div>
    )
  }
  /*
  renderCardWeather(){
    return(
      <div>
      {this.state.weather.map((contened, index) => {
        const {
          observation_time,
          temperature,
          weather_description,
          wind_speed,
          wind_degree,
          wind_dir,
          pressure,
          precip,
          humidity,
          cloudcover,
          feelslike,
          uv_index,
          visibility
        } = contened //destructuring
        return (
          <Card variant="outlined">
            <CardContent>
              <Typography gutterBottom>
                {humidity}
              </Typography>
              <Typography variant="h5" component="h2">
                {parseFloat({temperature}) - 275}
              </Typography>
              <Typography  color="textSecondary">
                adjective
              </Typography>
              <Typography variant="body2" component="p">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
          </Card>
          )
      })}
    </div>
    )
  }*/

  renderTableData(){
    return(
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={this.state.historial.history} columns={columnsHistorial} pageSize={5} getRowId={(r) => uuidv4()}/>
      </div>
    )
  }
/*
  renderTableData(){
    return(
      <div width='30%'>
        <TableContainer>
          <Table width='20%'size='small' aria-label='a dense table'>
            <TableHead>
              <TableRow>
                <TableCell>Cuidad</TableCell>
                <TableCell>info</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {this.state.historial.history.map((student, index) => {
                const {city, info} = student //destructuring
                return (
                  <TableRow key = {index}>
                    <TableCell>{city}</TableCell>
                    <TableCell>{info}</TableCell>
                  </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }*/
  renderAutocomplete(name){
    return(
    <div className="autoCompleteDiv">
      <Autocomplete
        freeSolo
        disableClearable
        value= {name}
        options={this.state.historial.history}
        getOptionLabel={(option) => option.city}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }} />
          )
        }
      />
    </div>
    )
  }
  render(){
    const { name } = this.state
    return (
      <div className="App">
        <h4>Busqueda</h4>
          <div>
            <button onClick ={this.getApi1}> Historial </button>
            <input
              id='city'
              name='nameCity'
              placeholder='Cuidad'
              onChange = {this.handleChange} />
            <button onClick ={() => this.getApi2(name)}> nombre</button>
            <br />
            <div className="autoCompleteDiv">
              {this.state.lengthHistorial > 0 ?
                <Autocomplete
                  freeSolo
                  onChange = {(event, value) =>
                    this.setState(
                      value != undefined
                      ? {name:value.city}
                      : {name:null}
                    )
                  }
                  options={this.state.historial.history}
                  getOptionLabel={(option) =>
                    option !== undefined ?
                    option.city
                    : "Please enter a city..."
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search input"
                      margin="normal"
                      variant="outlined"
                       />
                    )
                  }
                />
              :""
              }
            </div>
          </div>
          <br></br>
        <div className="tableHistory">
          {

            this.state.lengthHistorial > 0 && this.state.isActivated ?
            this.renderTableData()
            :""
          }
        </div>
        <br></br>
        <div>
          <Grid container spacing={4}>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={7} >
              {
                this.state.lengthNews > 0 ?
                    this.renderCardNews()
                    : ""
              }
            </Grid>
            <Grid className="gridWeather" item xs >
              {
                this.state.lengthNews > 0 ?
                    this.renderCardWeather()
                    : ""
              }
            </Grid>
            <Grid item xs={1}>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}


export default App;
