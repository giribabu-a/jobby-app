import {Routes, Route} from 'react-router-dom';

import './App.css';

import Authentication from './Components/Authentication/Authentication';
import Home from './Components/Home/Home';
import Jobs from './Components/Jobs/Jobs';
import JobCardDetails from './Components/JobCardDetails/JobCardDetails';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return (
    <div>
      <Routes>
          <Route exact path='/auth' element={<Authentication/>}></Route>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/jobs' element={<Jobs/>}></Route>
          <Route path='/jobs/:jobId' element={<JobCardDetails/>}></Route>
          <Route path='/*' element={<NotFound/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
