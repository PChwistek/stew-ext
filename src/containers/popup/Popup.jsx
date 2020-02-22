import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import CreateTab from './CreateTab'
import DetailTab from './DetailTab'
import Login from './Login'
import './popup.scss'

export default function Popup(props) {
  
  const [closing, setClosing] = useState(false)
  const [closingDetail, setClosingDetail] = useState(false)
  const { createVisible, detailVisible } = props

  function handleToggleCreateTab() {
    const { getCurrentTabs, toggleCreateView } = props
    if(!createVisible) {
      getCurrentTabs()
      setClosing(false)
    } else {
      setClosing(true)
    }
    toggleCreateView(!createVisible)
  }

  function handleToggleRowDetailTab(row) {
    const { toggleDetailView } = props
    if(!detailVisible) {
      setClosingDetail(false)
    } else {
      setClosingDetail(true)
    }
    toggleDetailView(!detailVisible, true, row)
  }

  function handleSearchTerms(terms) {
    const { setSearchTerms } = props
    setSearchTerms(terms)
  }
  
  const { loggedIn, selectedRow, getFirstResults, terms } = props
  console.log('props in popup', props)
  if(terms == '') {
    getFirstResults()
  }
  return (
    <div className="popup" >
    {
      !loggedIn ? <Login /> 
        : <div>
          <Header />
          <div className="popup__body">
            <CreateTab onCloseClick={ handleToggleCreateTab } wasOpened={ closing } />
            <DetailTab 
              visible= { detailVisible } 
              wasOpened={ closingDetail }
              onCloseClick={ handleToggleRowDetailTab }
            />
            <Search onPlusClick={ handleToggleCreateTab } setSearchTerms={ handleSearchTerms }/>
            <Table onRowSelect={ handleToggleRowDetailTab } />
          </div>
        </div>
    }
    </div>
  )
}

    // document.onkeydown = checkKey;
    // function checkKey(e) {
    //   e = e || window.event;
    //   if (e.keyCode == '38') {
    //     previousRow()
    //   }
    //   else if (e.keyCode == '40') {
    //     nextRow()
    //   }
      
    // }


Popup.propTypes = {
  getCurrentTabs: PropTypes.func,
}