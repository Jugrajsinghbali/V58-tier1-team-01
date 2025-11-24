import './App.css'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import ListPage from './components/ListPage.jsx'
import TeamCard from './components/TeamCard.jsx'
  
function App() {
  
  return (
    <>
      <Header />
      <Hero /> 
      <TeamCard />
      <ListPage />
      <Footer />
    </>
  )
}

export default App