import React from 'react';

import { InputGroup, DropdownButton, Dropdown, FormControl, Button  } from "react-bootstrap";

function SearchBar({searchKey, searchValue, handleOnKeyChange, onValueChange, triggerFreshSearch}){
    return (
        <InputGroup className="mb-3">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={searchKey || 'Search By'}
          id="input-group-dropdown-1"
        >
          <Dropdown.Item onClick={()=>handleOnKeyChange('location')}>Location</Dropdown.Item>
          <Dropdown.Item onClick={()=>handleOnKeyChange('experience')}>Expirence </Dropdown.Item>
          <Dropdown.Item onClick={()=>handleOnKeyChange('skills')}>Skill</Dropdown.Item>
          </DropdownButton>
        <FormControl aria-describedby="basic-addon1" value={searchValue} onChange={(evt)=>onValueChange(evt.target.value.trim())}/>
        <Button disabled={ (!searchKey || !searchValue) ? true : false} variant="primary" onClick={triggerFreshSearch}>Search</Button>

      </InputGroup>
    )
}

export default SearchBar;