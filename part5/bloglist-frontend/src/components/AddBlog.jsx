import React, { useState } from 'react'

const AddBlog= ({addNewBlog,addLike}) =>{
  const [newblog, setNewBlog] = useState({title:'',author:'',url:''})
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {...newblog}
    addNewBlog(blogObject)
    setNewBlog({ title: '', author: '', url: '' });
  }
    return (
    <>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          name="title"
          value={newblog.title}
          onChange={event=>setNewBlog({...newblog,title:event.target.value})}
        />
      </div>
      <div>
      author:
        <input
          name="author"
          value={newblog.author}
          onChange={event=>setNewBlog({...newblog,author:event.target.value})}
        />
      </div>
      <div>
      url:
        <input
        name="url"
          value={newblog.url}
          onChange={event=>setNewBlog({...newblog,url:event.target.value})}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </>
    )
}

export default AddBlog