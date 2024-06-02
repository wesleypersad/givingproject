import parse from 'html-react-parser';

const  BlogViewList= ({blogs}) => {

    const myComponent = {
        color: 'blue',
        background: 'gold',
        width: '90%',
        maxheight: '100px',
        overflow: 'scroll'
    };

    return (
        <div className="blog-list">
            <h2>List Of Blogs</h2>
            {blogs.map((blog) => (
                <div className="blog-details text-start" key={blog._id} style={myComponent}>
                    <h1>{blog.title}</h1>
                    <h3>{blog.author}</h3>
                    <h3>{blog.created}</h3>
                    <div>
                        {parse(blog.body)}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default BlogViewList;