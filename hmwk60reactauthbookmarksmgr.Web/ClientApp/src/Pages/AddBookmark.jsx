import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function AddBookmark() {

  const [bookmark, setBookmark] = useState({ title: '', url: '' })
  const navigate = useNavigate()

  const onSubmitClick = async e => {
    e.preventDefault()
    await axios.post('/api/bookmarks/addbookmark', bookmark)
    navigate('/mybookmarks')
  }

  return <div className="container" style={{ marginTop: '80px' }}>
    <main role="main" className="pb-3">
      <div className="row" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
          <h3>Add Bookmark</h3>
          <form onSubmit={onSubmitClick}>
            <input type="text" name="title" placeholder="Title" className="form-control" value={bookmark.title} onChange={e => { setBookmark({ ...bookmark, [e.target.name]: e.target.value }) }} /><br />
            <input type="text" name="url" placeholder="Url" className="form-control" value={bookmark.url} onChange={e => { setBookmark({ ...bookmark, [e.target.name]: e.target.value }) }} /><br />
            <button className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    </main>
  </div>

}