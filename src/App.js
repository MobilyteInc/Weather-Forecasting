import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import {Select, Table, List, Row, Col } from 'antd';
import moment from 'moment';

import './App.css';
const { Option } = Select;

const languages = [
  {
    "id": 1273294,
    "name": "Delhi",
    "country": "IN",
    "coord": {
      "lon": 77.216667,
      "lat": 28.666668
    }
  },
  {
    "id": 1275339,
    "name": "Mumbai",
    "country": "IN",
    "coord": {
      "lon": 72.847939,
      "lat": 19.01441
    }
  },
  {
    "id": 1256237,
    "name": "Shimla",
    "country": "IN",
    "coord": {
      "lon": 77.166672,
      "lat": 31.1
    }
  },
  {
    "id": 1263780,
    "name": "Mangalore",
    "country": "IN",
    "coord": {
      "lon": 74.883331,
      "lat": 12.86667
    }
  },
  {
    "id": 4887398,
    "name": "Chicago",
    "country": "US",
    "coord": {
      "lon": -87.650047,
      "lat": 41.850029
    }
  },
  {
    "id": 7303783,
    "name": "Sydney Mines",
    "country": "CA",
    "coord": {
      "lon": -60.21767,
      "lat": 46.236691
    }
  },
  {
    "id": 6620367,
    "name": "Virginia Water",
    "country": "GB",
    "coord": {
      "lon": -0.56651,
      "lat": 51.403431
    }
  },
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
 
  return inputLength === 0 ? [] : languages.filter(lang =>{
    if(lang.name.toLowerCase().slice(0, inputLength) === inputValue)
    {return lang.id}
    }
  );
};

const getSuggestionValue = suggestion => suggestion.name;
 
// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.name}
  </div>
);

class App extends Component {
  constructor() {
    super();
    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: [],
      ouputdata:[]
    };
  }
 
  onChange = (event, { newValue }) => {
    const inputValue = newValue.trim().toLowerCase();
    const inputLength = inputValue.length;
   
    return inputLength === 0 ? [] : languages.filter(lang =>{
      if(lang.name.toLowerCase().slice(0, inputLength) === inputValue)
      { 
        this.setState({
        value: newValue,
        id : lang.id
      });
     }
      }
    );
  };

  handleSubmit = () => {
    event.preventDefault();
    let cityId = this.state.id;
    console.log("cityId",cityId);
    fetch("https://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&appid=efcf9397014bcda48e40c322961b515b")
    .then(res => res.json())
    .then(
      (result) => {
        var newarray = [];
        var list = result.list;
        var newdata = [];
        for(var i=0;i<list.length;i++){
           var dateNow = list[i].dt_txt.split(" ");

           if(i > 0){
            var datePre = list[i-1].dt_txt.split(" ");
              if(dateNow[0] == datePre[0]){
                console.log("datnow", dateNow[0] == datePre[0], dateNow[0], datePre[0])
                newarray[dateNow[0]].push(list[i]);
              }else{
                newarray[dateNow[0]]= [];         
            newarray[dateNow[0]].push(list[i]);
              }
           }
           else{
            newarray[dateNow[0]]= [];         
            newarray[dateNow[0]].push(list[i]);
            console.log("newArray in else",newarray)
           } 

        }


        this.setState({"data":newarray});
      console.log("stringify-data",JSON.stringify(this.state.data))
      console.log("statedata",this.state.data)
        if(this.state.data){
          const val = Object.keys(this.state.data);
          let dataval = Object.entries(this.state.data)
          this.setState({"keys":val});

          console.log('datavalue -', dataval)
          this.setState({ouputdata:dataval})
        }else{
          const rowVal = 0;
        }
       
      },
      (error) => {
        console.log("error",error);
      }
    )
  }
 
  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
 
  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };


  onChange=(value)=> {
      
    console.log(`selected ${value}`);
    this.findWeather(value);
  }
  
  onBlur=(value)=> {
    console.log('blur', value);
    // this.findWeather(value);
  }

  findWeather=(cityId)=>{
    fetch("https://api.openweathermap.org/data/2.5/forecast?id="+cityId+"&appid=efcf9397014bcda48e40c322961b515b")
    .then(res => res.json())
    .then(
      (result) => {
        var newarray = [];
        var list = result.list;
        var newdata = [];
        for(var i=0;i<list.length;i++){
           var dateNow = list[i].dt_txt.split(" ");

           if(i > 0){
            var datePre = list[i-1].dt_txt.split(" ");
              if(dateNow[0] == datePre[0]){
                console.log("datnow", dateNow[0] == datePre[0], dateNow[0], datePre[0])
                newarray[dateNow[0]].push(list[i]);
              }else{
                newarray[dateNow[0]]= [];         
            newarray[dateNow[0]].push(list[i]);
              }
           }
           else{
            newarray[dateNow[0]]= [];         
            newarray[dateNow[0]].push(list[i]);
            console.log("newArray in else",newarray)
           } 

        }


        this.setState({"data":newarray});
      console.log("stringify-data",JSON.stringify(this.state.data))
      console.log("statedata",this.state.data)
        if(this.state.data){
          const val = Object.keys(this.state.data);
          let dataval = Object.entries(this.state.data)
          this.setState({"keys":val});

          console.log('datavalue -', dataval)
          this.setState({ouputdata:dataval})
        }else{
          const rowVal = 0;
        }
       
      },
      (error) => {
        console.log("error",error);
      }
    )
  }
  
 
  render() {
    const { value, suggestions, ouputdata } = this.state;
    // Autosuggest will pass through all these props to the input.
    // const inputProps = {
    //   placeholder: 'Type City Name',
    //   value,
    //   onChange: this.onChange
    // };
    console.log("value",this.state.keys)
    const columns = [
      { title: "#", key: "index", render:(_,data,index)=> index },
      { title: "Date", render:(_,item)=>(moment(item.dt_txt).format('YYYY-MM-DD'))},
      { title: "Time", render:(_,item)=>(moment(item.dt_txt).format('hh:mm:ss a'))},
      { title: "Max Temp", render:(item)=>(item.main.temp_max)},
      { title: "Min Temp", render:(item)=>(item.main.temp_min)},
      {title:"weather", render:(item)=> {
        return item.weather.map(data=> <img src={"http://openweathermap.org/img/w/" +data.icon+ ".png"} />)
      }}
    ];	
    

    return (
      <div style={{width: '800px',margin: '0 auto',padding: '15px'}}>
      {/* <form onSubmit={this.handleSubmit} style={{testAlign:'center'}}>
      <label>
        SearchBox:
        <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        />
      </label>
      <input type="submit" value="Submit" />
      </form> */}
      
      {/* <Table dataSource={this.state.data} columns={columns} rowKey={this.state.keys}/> */}

      <Select showSearch style={{ width: 200 }} placeholder="Search City" optionFilterProp="children"
    onChange={this.onChange}
    // onFocus={this.onFocus}
    onBlur={this.onBlur}
    // onSearch={this.onSearch}
    // filterOption={(input, option) =>
    //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    // }
  >
    {languages.map(item=>
      <Option value={item.id}>{item.name}</Option>  
      )}
  </Select>

      <List header={<div>Header</div>} bordered dataSource={ouputdata}
      renderItem={item => (
        <List.Item>
          <Row style={{width:'100%'}}>
            <Col span={24}><h2>{item[0]}</h2></Col>
            <Col span={24}>
              <Table dataSource={item[1]} columns={columns} rowKey={'index'} pagination={false} style={{width:'100%'}}/>
              </Col>
          </Row>
        </List.Item>
      )}
      />

      </div>
    );   
  }
}

export default App;
