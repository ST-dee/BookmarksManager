import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import axios from 'axios'

const Home = () => {

const [bookmarks, setBookmarks] = useState([])


useEffect(()=>{
  async function getBookmarks() {
    const {data} = await axios.get('/api/bookmarks/gettopfivebookmarks')   
    setBookmarks(data) 
  }getBookmarks()
})

    
    
    return (
    
    <div className="container" style={{ marginTop: '80px' }}>
        <main role="main" className="pb-3">
          <div>
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links</h3>
            <table className="table table-hover table-striped table-bordered">
              <thead>
                <tr>
                  <th>Url</th>
                  <th>Count</th>
                </tr>
              </thead>
              <tbody>{bookmarks.map( (b, idx) => <tr key={idx}>
                  <td><a href={b.url} target="_blank" >{b.url}</a></td>
                  <td>{b.count}</td>
                </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
  )
}



export default Home;