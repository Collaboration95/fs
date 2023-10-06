const CreateNew = ({addBlog,handleBlogChange,newblog}) =>{
    return (
    <>
    <h2>Create new</h2>
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          name="title"
          value={newblog.title}
          onChange={handleBlogChange}
        />
      </div>
      <div>
      author:
        <input
          name="author"
          value={newblog.author}
          onChange={handleBlogChange}
        />
      </div>
      <div>
      url:
        <input
        name="url"
          value={newblog.url}
          onChange={handleBlogChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </>
    )
}

export default CreateNew