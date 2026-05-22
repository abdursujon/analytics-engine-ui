import Header from './components/Header'
import Hero from './components/Hero'
import FileUpload from './components/FileUpload'
import Footer from './components/Footer'
import Article from './components/Article'
import SampleFile from './components/SampleFile'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Hero />
        <FileUpload />
        <SampleFile/>
        <Article/>
      </main>

      <Footer />
    </div>
  )
}

export default App
