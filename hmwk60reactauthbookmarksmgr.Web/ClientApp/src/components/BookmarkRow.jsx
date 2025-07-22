import axios from "axios";
import { useState } from "react";


export default function BookmarkRow({ bm, reloadBookmarks }) {

    const [isEditMode, setIsEditMode] = useState(false)
    const [title, setTitle] = useState(bm.title)

  async function onDeleteClick(bookmark) {
    await axios.post('/api/bookmarks/deletebookmark', bookmark)
    reloadBookmarks()
  }

    function onEditClick() {
        setIsEditMode(true)
    }

    async function onUpdateClick() {
        console.log("update clicked")
        await axios.post('/api/bookmarks/updatetitles',{...bm, title})
        setIsEditMode(false)
        reloadBookmarks()
    }

    function onCancelClick() {
        setTitle(bm.title)
        setIsEditMode(false);
    }

    return isEditMode ? <tr>
        <td>
            <input type="text" className="form-control" placeholder="Title" value={title} onChange={e =>{setTitle(e.target.value)}}/>
        </td>
        <td>
            <a href={bm.url} target="_blank">{bm.url}</a>
        </td>
        <td>
            <button className="btn btn-warning" onClick={onUpdateClick}>Update</button>
            <button className="btn btn-info" onClick={onCancelClick}>Cancel</button>
            <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => {onDeleteClick(bm)}}>Delete</button>
        </td>
    </tr> :
        <tr >
            <td>{bm.title}</td>
            <td>
                <a href={bm.url} target="_blank">{bm.url}</a>
            </td>
            <td>
                <button className="btn btn-success" onClick={onEditClick}>Edit Title</button>
                <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => {onDeleteClick(bm)}}>Delete</button>
            </td>
        </tr>

}