import React, { useState, useEffect } from 'react';
import './App.css';
import executeApi from './services/listing-service';
import SearchBar from './Components/SearchBar';
import JobList from './Components/List';
import {  Card  } from "react-bootstrap";

const App = () =>  {
  const [jobs, setJobs] = useState([]);
  const [filterJobs, setFilterJobs] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchStatus, setSearchStatus] = useState(false);


  useEffect(()=>{
    fetchJobs()
  },[]);

  const handleOnKeyChange = (newKey) => {
    setSearchKey(newKey);
    setSearchValue('');
    setFilterJobs([]);  //reset on location change
    setSearchStatus(false);
  } 

  const onValueChange  = (newValue) => {
    setSearchValue(newValue);
  } 

  const triggerFreshSearch = event => {
    // as api is not dynamic, we will filter out the data we already have.
    const filterResult = [];
    setFilterJobs(filterResult);
    jobs.map(job=>{
      const content = job[searchKey];
      if(content){
        if(searchKey === 'experience'){
           const range = content.split(' ')[0].split('-')
          if(+searchValue >= range[0] && +searchValue <= range[1]){
            filterResult.push(job)
          }
        }else if(content.toLowerCase().search(searchValue) > -1){
          filterResult.push(job);
      
        }
      }
    });
    setSearchStatus(true);
    setFilterJobs(filterResult);
  }

  async function fetchJobs(){
    const URL = 'https://nut-case.s3.amazonaws.com/jobs.json';
    const { data } = await executeApi(URL);

    if(data){
      setJobs(data);
    }
  }

  let contents = <div></div>;

  if(!searchStatus){
    contents = <JobList jobs={jobs}/>
  }

  if( filterJobs.length > 0){
    contents = <div>
    <p> { filterJobs.length } matches found. </p>
    <br />
    <JobList jobs={filterJobs}/> 
  </div>
  }

  if(searchStatus && filterJobs.length === 0 ){
    contents = <h3>No job matching criteria. Try again!</h3> 
  }

  return (
    <div className="App">
      <header style={{ textAlign:"center", margin: '10px' }}>
        <h2>Searching jobs made easy.!</h2>
      </header>
     <div>
       <Card style={{ margin: '10px', padding: '1rem 1rem 0rem 1rem'  }}>
       <SearchBar 
          searchKey={searchKey}
          searchValue={searchValue}
          handleOnKeyChange={handleOnKeyChange}
          onValueChange={onValueChange}
          triggerFreshSearch={triggerFreshSearch} />
          {
            contents
          }
       </Card>    
        
      </div>
    </div>
  );
}

export default App;
