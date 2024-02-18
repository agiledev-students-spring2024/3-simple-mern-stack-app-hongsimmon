import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'
import MessageForm from './MessageForm'
import Message from './Message'

/**
 * A React component that shows a form the user can use to create a new message, as well as a list of any pre-existing messages.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [Name, setName] = useState([])
  const [Paragraph, setParagraph] = useState([])
  const [Image, setImage] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')

  /**
   * A nested function that fetches messages from the back-end server.
   */
  const fetchAboutUs = () => {
    setName([])
    setParagraph([])
    setImage([])
    // setLoaded(false)
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const Name = response.data.name
        const Paragraph = response.data.paragraph
        const Image = response.data.image
        setName(Name)
        setParagraph(Paragraph)
        setImage(Image)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

  // set up loading data from server when the component first loads
  useEffect(() => {
    // fetch messages this once
    fetchAboutUs()

    // set a timer to load data from server every n seconds
    const intervalHandle = setInterval(() => {
      fetchAboutUs()
    }, 5000)

    // return a function that will be called when this component unloads
    return e => {
      // clear the timer, so we don't still load messages when this component is not loaded anymore
      clearInterval(intervalHandle)
    }
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>{Name}</h1> <br></br>
      <img src={Image} alt="my picture"></img>
      <br></br>
      <p> {Paragraph}</p>
    </>
    
  )
}

// make this component available to be imported into any other file
export default AboutUs