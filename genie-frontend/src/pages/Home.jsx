import Card from '../components/Card/Card'
import './Home.css'

const Home = () => {
  return (
    <>
        <div className="question">Are you afraid of Placement ?</div>
        <div className='question-cards'>
            <Card frontMsg='Who are we?'>We are placement genie</Card>
            <Card frontMsg='what we will do?'>We are removing your fear of placement</Card>
            <Card frontMsg='How we will do?'>We will provide you the questions asked in recent interviews</Card>
            <Card frontMsg='What you have to do?'>You just have to answer the questions</Card>
        </div>
        <div className="question">Still want to know more about us ?</div>
        <div className='video-tag'>
            // Add a video here
        </div>
    </>
  )
}
export default Home