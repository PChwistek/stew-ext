import React from 'react'
import SlideIn from '../SlideIn'
import SessionView from '../SessionView'
import Button from '../../common-ui/Button'
import { getSrc } from '../utils'

export default function DetailTab(props) {
  const { toView, launchRecipe } = props
  return(
    <SlideIn { ...props }> 
    {
      toView && <div className={ 'detailtab' }>
        <div className={ 'detailtab__details'}>
          <div className={ 'detailtab__details__title'}>
            { toView && toView.name }
          </div>
          <div>
            Published by: { toView && toView.author }
            <div>
            {
              toView.attributes.map(attrib => {
                <img key={ attrib } src={ getSrc(attrib) } />
              })
            } 
            </div>
          </div>
          <div>
            <div className={ 'table__row__tags'}>
                {
                  toView && toView.tags.map(tag => (
                    <div key={ tag } className={ 'tag-result' }>
                      { tag }
                    </div>
                  ))
                }
                </div>
          </div>
          <div className={ 'detailtab__launch' }>
            <Button text={ 'Launch' } type={ 'primary' } onClick={ () => launchRecipe(toView || {}) } />
          </div>
        </div>
        <SessionView session={ toView ? toView.config : [] } canEdit={ false } />
      </div>
    }
      
    </SlideIn>
  )

}
