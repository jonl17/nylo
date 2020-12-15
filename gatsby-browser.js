import './src/styles/nylo.scss'

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location && location.state)
    location.state.referrer = prevLocation ? prevLocation.pathname : null
}
