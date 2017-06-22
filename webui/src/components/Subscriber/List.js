import PropTypes from 'prop-types';

import styled from 'styled-components';
import oc from 'open-color';
import { media, transitions } from 'helpers/style-utils';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { Layout } from 'components';
import Item from './Item';

const Wrapper = styled.div`
  display: block;
  
  ${media.mobile`
    margin-top: 0.25rem;
  `}

  .subscriber-enter {
    animation: ${transitions.stretchOut} .3s ease-in;
    animation-fill-mode: forwards;
  }   
    
  .subscriber-leave { 
    animation: ${transitions.shrinkIn} .15s ease-in;
    animation-fill-mode: forwards;
  }   
`

const propTypes = {
  subscribers: PropTypes.arrayOf(PropTypes.object)
}

const List = ({ subscribers, search }) => {
  const subscriberList = subscribers
    .filter(s => s.imsi.indexOf(search) !== -1)
    .sort( 
      (a,b) => {
        if(a.imsi > b.imsi) return 1;
        if (a.imsi < b.imsi) return -1;
        return 0;
      }
    )
    .map(subscriber =>
      <Item key={subscriber.imsi} subscriber={subscriber} />
    );

  return (
    <Wrapper>
      <CSSTransitionGroup
        transitionName="subscriber"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={150}>
        {subscriberList}
      </CSSTransitionGroup>
    </Wrapper>
  )
}

List.propTypes = propTypes;

export default List;