import { useEffect, useState } from "react"
import { useAuth } from "../components/AuthContext"
import axios from "axios"
import Loader from '../components/Loader'
import { Link } from "react-router-dom"
import BookmarkRow from "../components/BookmarkRow"

export default function MyBookmarks() {
  const { user } = useAuth()
  const [bookmarks, setBookmarks] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  async function getBookmarks() {
    const { data } = await axios.get('/api/bookmarks/getusersbookmarks')
    setBookmarks(data)
    setIsLoading(false)
  }


  useEffect(() => {
    getBookmarks()
  }, [])



  return isLoading ? <Loader /> : <div className="container" style={{ marginTop: '80px' }}>
    <main role="main" className="pb-3">
      <div style={{ marginTop: '20px' }}>
        <div className="row">
          <div className="col-md-12">
            <h1>Welcome back {user.firstName} {user.lastName}</h1>
            <Link to='/addbookmark' className="btn btn-primary">Add Bookmark</Link>
          </div>
        </div>
        <div className="row" style={{ marginTop: '20px' }}>
          <table className="table table-hover table-striped table-bordered">
            <thead>
              <tr><th>Title</th><th>Url</th><th>Edit/Delete</th></tr>
            </thead>
            <tbody>
              {bookmarks.map(b => <BookmarkRow bm={b} reloadBookmarks={getBookmarks} key={b.id}/>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>


}