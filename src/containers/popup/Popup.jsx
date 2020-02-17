import React from 'react'
import PropTypes from 'prop-types'
import Header from './Header'
import Search from './Search'
import Table from './Table'
import CreateTab from './CreateTab'
import DetailTab from './DetailTab'
import Login from './Login'
import './popup.scss'


export default function Popup(props) {
  
  function handleToggleCreateTab() {
    const { getCurrentTabs, toggleCreateView, createVisible } = props
    if(!createVisible) {
      getCurrentTabs()
    }
    toggleCreateView(!createVisible)

  }

  function handleToggleRowDetailTab(row) {
    const { detailVisible , toggleDetailView } = props
    toggleDetailView(!detailVisible, true, row)
  }
  
  const { loggedIn, detailVisible, createVisible, detailWasOpened, createWasOpened, selectedRow } = props
  console.log(props)
  return (
    <div className="popup" >
    {
      !loggedIn ? <Login /> 
        : <div>
          <Header />
          <div className="popup__body">
            <CreateTab visible={ createVisible } wasOpened={ createWasOpened } onCloseClick={ handleToggleCreateTab } />
            <DetailTab 
              visible= { detailVisible } 
              wasOpened={ detailWasOpened }
              onCloseClick={ handleToggleRowDetailTab } 
              toView={ selectedRow } 
            />
            <Search onPlusClick={ handleToggleCreateTab } />
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